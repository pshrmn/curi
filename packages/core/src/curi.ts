import registerRoutes from './utils/registerRoutes';
import pathnameAddon from './addons/pathname';
import createResponse from './response';
import createRoute from './route';

import { History, HickoryLocation } from '@hickory/root';
import { PathFunctionOptions } from 'path-to-regexp';
import {
  RouteDescriptor,
  Route,
  LoadModifiers,
  LoadRoute
} from './route';
import { Response } from './response';
import {
  Addon,
  Addons,
  SideEffect,
  Subscriber,
  UnsubscribeFn,
  Cache
} from './interface';

export interface ConfigOptions {
  addons?: Array<Addon>;
  sideEffects?: Array<SideEffect>;
  cache?: Cache;
  pathnameOptions?: PathFunctionOptions;
}

export interface CuriConfig {
  ready: () => Promise<Response>;
  refresh: (routeArray: Array<RouteDescriptor>) => void;
  subscribe: (fn: Subscriber) => UnsubscribeFn;
  addons: Addons;
  history: History;
}

function createConfig(
  history: History,
  routeArray: Array<RouteDescriptor>,
  options: ConfigOptions = {}
): CuriConfig {
  const {
    addons: userAddons = [],
    sideEffects = [],
    cache,
    pathnameOptions
  } = options as ConfigOptions;

  const beforeSideEffects: Array<Subscriber> = [];
  const afterSideEffects: Array<Subscriber> = [];
  sideEffects.forEach(se => {
    if (se.after) {
      afterSideEffects.push(se.fn);
    } else {
      beforeSideEffects.push(se.fn);
    }
  });

  // add the pathname addon to the provided addons
  const finalAddons = userAddons.concat(pathnameAddon(pathnameOptions));
  let routes: Array<Route> = [];
  const registeredAddons: Addons = {};
  const subscribers: Array<Subscriber> = [];

  let mostRecentKey: string;
  let previous: [Response, string] = [] as [Response, string];
  let responseInProgress: Promise<Response>;

  function setupRoutesAndAddons(routeArray: Array<RouteDescriptor>): void {
    // clear out any existing addons
    for (let key in registeredAddons) {
      delete registeredAddons[key];
    }

    routes = routeArray.map(createRoute);

    finalAddons.forEach(addon => {
      addon.reset();
      registeredAddons[addon.name] = addon.get;
      registerRoutes(routes, addon);
    });

    makeResponse(history.location, history.action);
  }

  function prepareResponse(location: HickoryLocation): Promise<Response> {
    mostRecentKey = location.key;

    if (cache) {
      const cachedResponse = cache.get(location);
      if (cachedResponse != null) {
        return Promise.resolve(cachedResponse);
      }
    }

    return createResponse(location, routes, registeredAddons).then(response => {
      if (cache) {
        cache.set(response);
      }
      return response;
    });
  }

  function subscribe(fn: Subscriber): UnsubscribeFn {
    if (typeof fn !== 'function') {
      throw new Error('The argument passed to subscribe must be a function');
    }

    // Immediately call subscriber function. If this is called before the
    // initial response has resolved, both params will be undefined. If called
    // after init resp has resolved, first param is the most recent response and
    // action is last history.action.
    fn.apply(null, previous);

    const newLength = subscribers.push(fn);
    return () => {
      subscribers[newLength - 1] = null;
    };
  }

  function emit(response: Response, action: string): boolean {
    // don't emit old responses
    if (response.key !== mostRecentKey) {
      return false;
    }

    beforeSideEffects.forEach(fn => {
      fn(response, action);
    });

    subscribers.forEach(fn => {
      if (fn != null) {
        fn(response, action);
      }
    });

    afterSideEffects.forEach(fn => {
      fn(response, action);
    });

    return true;
  }

  // create a response object using the current location and
  // emit it to any subscribed functions
  function makeResponse(location: HickoryLocation, action: string): void {
    responseInProgress = prepareResponse(location).then(
      response => {
        const emitted = emit(response, action);
        // only store these after we have emitted.
        if (emitted) {
          previous = [response, action];
        }

        if (response.redirectTo) {
          history.replace(response.redirectTo);
        }
        return response;
      },
      err => {
        console.error(err);
        return null;
      }
    );
  }

  // now that everything is defined, actually do the setup
  setupRoutesAndAddons(routeArray);
  const unlisten = history.subscribe(makeResponse);

  return {
    ready: () => responseInProgress,
    refresh: setupRoutesAndAddons,
    subscribe,
    addons: registeredAddons,
    history
  };
}

export default createConfig;
