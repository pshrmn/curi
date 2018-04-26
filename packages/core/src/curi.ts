import registerRoutes from "./utils/registerRoutes";
import pathnameInteraction from "./interactions/pathname";
import finishResponse from "./finishResponse";
import matchLocation from "./utils/match";
import resolveMatchedRoute from "./resolveMatchedRoute";
import createRoute from "./route";

import { History, PendingNavigation } from "@hickory/root";

import { RouteDescriptor, InternalRoute } from "./types/route";
import { Response, Params, Resolved } from "./types/response";
import { Interaction, Interactions } from "./types/interaction";
import { PossibleMatch, Match } from "./types/match";
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
  Navigation,
  NavigationDetails
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
  } = options;

  const beforeSideEffects: Array<ResponseHandler> = [];
  const afterSideEffects: Array<ResponseHandler> = [];
  sideEffects.forEach(se => {
    if (se.after) {
      afterSideEffects.push(se.effect);
    } else {
      beforeSideEffects.push(se.effect);
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
    for (let key in registeredInteractions) {
      delete registeredInteractions[key];
    }

    allInteractions.forEach(interaction => {
      interaction.reset();
      registeredInteractions[interaction.name] = interaction.get;
      registerRoutes(routes, interaction);
    });
  }

  const responseHandlers: Array<ResponseHandler | null> = [];
  const oneTimers: Array<ResponseHandler> = [];

  const mostRecent: CurrentResponse = {
    response: null,
    navigation: null
  };

  function respond(
    fn: ResponseHandler,
    options?: RespondOptions
  ): RemoveResponseHandler | void {
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
    // store for current() and respond()
    mostRecent.response = response;
    mostRecent.navigation = navigation;

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
      if (fn) {
        fn(resp);
      }
    }

    afterSideEffects.forEach(fn => {
      fn(resp);
    });
  }

  let activeResponse: PendingNavigation | undefined;

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
        return;
      }
    }

    const match = matchLocation(pendingNav.location, routes);
    // if no routes match, do nothing
    if (!match.route) {
      console.error(
        `The current location (${
          pendingNav.location.pathname
        }) has no matching route, ` +
          'so a response could not be generated. A catch-all route ({ path: "(.*)" }) ' +
          "can be used to match locations with no other matching route."
      );
      pendingNav.finish();
      return;
    }

    if (match.route.sync) {
      pendingNav.finish();
      const response = finishResponse(
        match as Match,
        registeredInteractions,
        null
      );
      cacheAndEmit(response, navigation);
    } else {
      resolveMatchedRoute(match as Match).then((resolved: Resolved) => {
        if (pendingNav.cancelled) {
          return;
        }
        pendingNav.finish();
        const response = finishResponse(
          match as Match,
          registeredInteractions,
          resolved
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
      emit(response, navigation);
    }

    if (response.redirectTo !== undefined) {
      history.navigate(response.redirectTo, "REPLACE");
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
    },
    navigate(details: NavigationDetails): void {
      const { name, params, hash, query, state } = details;
      let { method = "ANCHOR" } = details;
      const pathname =
        name !== undefined
          ? registeredInteractions.pathname(name, params)
          : history.location.pathname;
      if (method !== "ANCHOR" && method !== "PUSH" && method !== "REPLACE") {
        method = "ANCHOR";
      }
      history.navigate(
        {
          pathname,
          hash,
          query,
          state
        },
        method
      );
    }
  };

  return router;
}

export default createRouter;
