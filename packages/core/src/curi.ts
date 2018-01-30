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
  Emitted,
  RespondOptions,
  RemoveResponseHandler,
  Cache,
  CurrentResponse,
  Navigation
} from "./types/curi";

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
    navigation: null
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

    const { observe = false, initial = true } = options || {};

    if (mostRecent.response && initial) {
      fn.call(null, { ...mostRecent, router });
      return;
    }

    if (observe) {
      const newLength = responseHandlers.push(fn);
      return () => {
        responseHandlers[newLength - 1] = null;
      };
    } else {
      oneTimers.push(fn);
    }
  }

  function emit(response: Response, navigation: Navigation): void {
    const resp: Emitted = { response, navigation, router };
    beforeSideEffects.forEach(fn => {
      fn(resp);
    });

    responseHandlers.forEach(fn => {
      if (fn != null) {
        fn(resp);
      }
    });
    // calling one time responseHandlers after regular responseHandlers
    // ensures that those are called prior to the one time fns
    while (oneTimers.length) {
      const fn = oneTimers.pop();
      fn(resp);
    }

    afterSideEffects.forEach(fn => {
      fn(resp);
    });
  }

  let activeResponse: PendingNavigation;

  function navigationHandler(pendingNav: PendingNavigation): void {
    if (activeResponse) {
      activeResponse.cancel(pendingNav.action);
      activeResponse.cancelled = true;
    }
    activeResponse = pendingNav;

    const navigation = {
      action: pendingNav.action,
      previous: mostRecent.response
    };

    if (cache) {
      const cachedResponse = cache.get(pendingNav.location);
      if (cachedResponse != null) {
        cacheAndEmit(cachedResponse, navigation);
      }
    }

    createResponse(pendingNav.location, routes).then(pendingResponse => {
      if (pendingNav.cancelled) {
        return;
      }
      pendingNav.finish();
      const response = finishResponse(pendingResponse, registeredAddons);
      cacheAndEmit(response, navigation);
    });
  }

  function cacheAndEmit(response: Response, navigation: Navigation) {
    activeResponse = undefined;
    if (cache) {
      cache.set(response);
    }

    if (!response.redirectTo || emitRedirects) {
      mostRecent.response = response;
      mostRecent.navigation = navigation;
      emit(response, navigation);
    }

    if (response.redirectTo) {
      history.replace(response.redirectTo);
    }
  }

  // now that everything is defined, actually do the setup
  setupRoutesAndAddons(routeArray);
  history.respondWith(navigationHandler);

  const router: CuriRouter = {
    addons: registeredAddons,
    history,
    respond,
    refresh: setupRoutesAndAddons,
    current() {
      return {
        response: mostRecent.response,
        navigation: mostRecent.navigation
      };
    }
  };

  return router;
}

export default createRouter;
