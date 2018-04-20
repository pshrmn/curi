import registerRoutes from "./utils/registerRoutes";
import pathnameInteraction from "./interactions/pathname";
import finishResponse from "./finishResponse";
import { createResponse, asyncCreateResponse } from "./createResponse";
import createRoute from "./route";
import hasAsyncRoute from "./utils/async";

import { History, PendingNavigation } from "@hickory/root";

import { RouteDescriptor, InternalRoute } from "./types/route";
import { Response, PendingResponse, Params } from "./types/response";
import { Interaction, Interactions } from "./types/interaction";
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
    route: userInteractions = [],
    sideEffects = [],
    cache,
    pathnameOptions,
    emitRedirects = true
  } = options as RouterOptions;

  let sync = true;

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
  const registeredInteractions: Interactions = {};

  // add the pathname interaction to the provided interactions
  const allInteractions = userInteractions.concat(
    pathnameInteraction(pathnameOptions)
  );

  function setupRoutesAndInteractions(
    routeArray: Array<RouteDescriptor>
  ): void {
    routes = routeArray.map(createRoute);
    sync = !hasAsyncRoute(routes);
    for (let key in registeredInteractions) {
      delete registeredInteractions[key];
    }

    allInteractions.forEach(interaction => {
      interaction.reset();
      registeredInteractions[interaction.name] = interaction.get;
      registerRoutes(routes, interaction);
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
    const { observe = false, initial = true } = options || {};

    if (observe) {
      const newLength = responseHandlers.push(fn);
      if (mostRecent.response && initial) {
        fn.call(null, { ...mostRecent, router });
      }
      return () => {
        responseHandlers[newLength - 1] = null;
      };
    } else {
      if (mostRecent.response && initial) {
        fn.call(null, { ...mostRecent, router });
      } else {
        oneTimers.push(fn);
      }
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

    if (sync) {
      const pendingResponse = createResponse(pendingNav.location, routes);
      pendingNav.finish();
      const response = finishResponse(pendingResponse, registeredInteractions);
      cacheAndEmit(response, navigation);
    } else {
      asyncCreateResponse(pendingNav.location, routes).then(pendingResponse => {
        if (pendingNav.cancelled) {
          return;
        }
        pendingNav.finish();
        const response = finishResponse(
          pendingResponse,
          registeredInteractions
        );
        cacheAndEmit(response, navigation);
      });
    }
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
  setupRoutesAndInteractions(routeArray);
  history.respondWith(navigationHandler);

  const router: CuriRouter = {
    route: registeredInteractions,
    history,
    respond,
    replaceRoutes: setupRoutesAndInteractions,
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
