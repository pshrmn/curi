import registerRoutes from './utils/registerRoutes';
import pathnameAddon from './addons/pathname';
import createResponse from './response';
import createRoute from './route';

import { History, HickoryLocation, PendingNavigation, Action } from '@hickory/root';
import { PathFunctionOptions } from 'path-to-regexp';
import { RouteDescriptor, InternalRoute } from './route';
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
  refresh: (routeArray: Array<RouteDescriptor>) => void;
  subscribe: (fn: Subscriber, initial?: boolean) => UnsubscribeFn;
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

  let routes: Array<InternalRoute> = [];
  const registeredAddons: Addons = {};
  const subscribers: Array<Subscriber> = [];

  // This is the response generated for the previous navigation
  // and the action type of the navigation. These will be passed
  // to config.subscribe on their initial call.
  let previous: [Response, string] = [] as [Response, string];
  let currentResponse: Promise<Response>;

  // add the pathname addon to the provided addons
  const allAddons = userAddons.concat(pathnameAddon(pathnameOptions));

  function setupRoutesAndAddons(routeArray: Array<RouteDescriptor>): void {
    routes = routeArray.map(createRoute);

    for (let key in registeredAddons) {
      delete registeredAddons[key];
    }

    allAddons.forEach(addon => {
      addon.reset();
      registeredAddons[addon.name] = addon.get;
      registerRoutes(routes, addon);
    });
  }

  function getResponse(location: HickoryLocation): Promise<Response> {
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

  function emit(response: Response, action: Action): void {
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
  }

  let activeResponse: PendingNavigation;

  function respond(pending: PendingNavigation): void {
    if (activeResponse) {
      activeResponse.cancel(pending.action);
      activeResponse.cancelled = true;
    }
    activeResponse = pending;

    currentResponse = getResponse(pending.location).then(response => {
      if (pending.cancelled) {
        return;
      }
      pending.finish();
      activeResponse = undefined;
      emit(response, pending.action);
      previous = [response, pending.action];

      if (response.redirectTo) {
        history.replace(response.redirectTo);
      }
      return response;
    });
  }

  // now that everything is defined, actually do the setup
  setupRoutesAndAddons(routeArray);
  history.respondWith(respond);

  return {
    addons: registeredAddons,
    history,
    subscribe: function(fn: Subscriber, initial?: boolean): UnsubscribeFn {
      if (typeof fn !== 'function') {
        throw new Error('The argument passed to subscribe must be a function');
      }

      if (initial) {
        fn.apply(null, previous);
      }

      const newLength = subscribers.push(fn);
      return () => {
        subscribers[newLength - 1] = null;
      };
    },
    refresh: setupRoutesAndAddons
  };
}

export default createConfig;
