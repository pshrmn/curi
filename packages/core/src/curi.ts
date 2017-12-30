import registerRoutes from "./utils/registerRoutes";
import pathnameAddon from "./addons/pathname";
import createResponse from "./createResponse";
import finishResponse from "./finishResponse";
import createRoute from "./route";

import {
  History,
  HickoryLocation,
  PendingNavigation,
  Action
} from "@hickory/root";

import { RouteDescriptor, InternalRoute } from "./types/route";
import { Response, PendingResponse } from "./types/response";
import { Addon, Addons } from "./types/addon";
import {
  CuriRouter,
  RouterOptions,
  SideEffect,
  ResponseHandler,
  RespondOptions,
  RemoveResponseHandler,
  Cache,
  CurrentResponse
} from './types/curi';

function createRouter(
  history: History,
  routeArray: Array<RouteDescriptor>,
  options: RouterOptions = {}
): CuriRouter {
  const {
    addons: userAddons = [],
    sideEffects = [],
    cache,
    pathnameOptions,
    emitRedirects = true
  } = options as RouterOptions;

  const beforeSideEffects: Array<ResponseHandler> = [];
  const afterSideEffects: Array<ResponseHandler> = [];
  sideEffects.forEach(se => {
    if (se.after) {
      afterSideEffects.push(se.fn);
    } else {
      beforeSideEffects.push(se.fn);
    }
  });

  let routes: Array<InternalRoute> = [];
  const registeredAddons: Addons = {};

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

  const responseHandlers: Array<ResponseHandler> = [];
  const oneTimers: Array<ResponseHandler> = [];

  const mostRecent: CurrentResponse = {
    response: null,
    action: null
  };

  function respond(
    fn: ResponseHandler,
    options?: RespondOptions
  ): RemoveResponseHandler {
    if (typeof fn !== "function") {
      throw new Error(
        'The first argument passed to "respond" must be a function'
      );
    }

    const { once = false } = options || {};

    if (once) {
      if (mostRecent.response) {
        fn.call(null, mostRecent.response, mostRecent.action, curi);
      } else {
        oneTimers.push(fn);
      }
    } else {
      if (mostRecent.response) {
        fn.call(null, mostRecent.response, mostRecent.action, curi);
      }

      const newLength = responseHandlers.push(fn);
      return () => {
        responseHandlers[newLength - 1] = null;
      };
    }
  }

  function emit(response: Response, action: Action): void {
    beforeSideEffects.forEach(fn => {
      fn(response, action, curi);
    });

    responseHandlers.forEach(fn => {
      if (fn != null) {
        fn(response, action, curi);
      }
    });
    // calling one time responseHandlers after regular responseHandlers
    // ensures that those are called prior to the one time fns
    while (oneTimers.length) {
      const fn = oneTimers.pop();
      fn(response, action, curi);
    }

    afterSideEffects.forEach(fn => {
      fn(response, action, curi);
    });
  }

  let activeResponse: PendingNavigation;

  function navigationHandler(pendingNav: PendingNavigation): void {
    if (activeResponse) {
      activeResponse.cancel(pendingNav.action);
      activeResponse.cancelled = true;
    }
    activeResponse = pendingNav;

    if (cache) {
      const cachedResponse = cache.get(pendingNav.location);
      if (cachedResponse != null) {
        cacheAndEmit(cachedResponse, pendingNav.action);
      }
    }

    createResponse(pendingNav.location, routes).then(pendingResponse => {
      if (pendingNav.cancelled) {
        return;
      }
      pendingNav.finish();
      const response = finishResponse(pendingResponse, registeredAddons);
      cacheAndEmit(response, pendingNav.action);
    });
  }

  function cacheAndEmit(response: Response, action: Action) {
    activeResponse = undefined;
    if (cache) {
      cache.set(response);
    }

    if (!response.redirectTo || emitRedirects) {
      mostRecent.response = response;
      mostRecent.action = action;
      emit(response, action);
    }

    if (response.redirectTo) {
      history.replace(response.redirectTo);
    }
  }

  // now that everything is defined, actually do the setup
  setupRoutesAndAddons(routeArray);
  history.respondWith(navigationHandler);

  const curi: CuriRouter = {
    addons: registeredAddons,
    history,
    respond,
    refresh: setupRoutesAndAddons,
    current() {
      return {
        response: mostRecent.response,
        action: mostRecent.action
      };
    }
  };

  return curi;
}

export default createRouter;
