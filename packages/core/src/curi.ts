import registerRoutes from "./utils/registerRoutes";
import pathnameInteraction from "./interactions/pathname";
import finishResponse from "./finishResponse";
import matchLocation from "./utils/match";
import resolveMatchedRoute from "./resolveMatchedRoute";
import createRoute from "./route";
import hasAsyncRoute from "./utils/async";

import { History, PendingNavigation } from "@hickory/root";

import { RouteDescriptor, InternalRoute } from "./types/route";
import {
  Response,
  MatchResponse,
  PendingResponse,
  Params,
  Resolved
} from "./types/response";
import { Interaction, Interactions } from "./types/interaction";
import { BestMatch } from "./types/match";
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

function createRouter<B>(
  history: History,
  routeArray: Array<RouteDescriptor>,
  options: RouterOptions<B> = {}
): CuriRouter<B> {
  const {
    route: userInteractions = [],
    sideEffects = [],
    cache,
    pathnameOptions,
    emitRedirects = true
  } = options;

  let sync = true;

  const beforeSideEffects: Array<ResponseHandler<B>> = [];
  const afterSideEffects: Array<ResponseHandler<B>> = [];
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

  const responseHandlers: Array<ResponseHandler<B> | null> = [];
  const oneTimers: Array<ResponseHandler<B>> = [];

  const mostRecent: CurrentResponse<B> = {
    response: null,
    navigation: null
  };

  function respond(
    fn: ResponseHandler<B>,
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

  function emit(response: Response<B>, navigation: Navigation<B>): void {
    // store for current() and respond()
    mostRecent.response = response;
    mostRecent.navigation = navigation;

    const resp: Emitted<B> = { response, navigation, router };
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
        cacheAndEmit<B>(cachedResponse as MatchResponse<B>, navigation);
        return;
      }
    }

    const match = matchLocation(pendingNav.location, routes);
    // bail out early on misses
    if (!match.route) {
      pendingNav.finish();
      emit(match.response, navigation);
      return;
    }

    if (sync) {
      pendingNav.finish();
      const response = finishResponse<B>(
        match as BestMatch,
        registeredInteractions,
        null
      );
      cacheAndEmit<B>(response as MatchResponse<B>, navigation);
    } else {
      resolveMatchedRoute(match as BestMatch).then((resolved: Resolved) => {
        if (pendingNav.cancelled) {
          return;
        }
        pendingNav.finish();
        const response = finishResponse<B>(
          match as BestMatch,
          registeredInteractions,
          resolved
        );
        cacheAndEmit<B>(response as MatchResponse<B>, navigation);
      });
    }
  }

  function cacheAndEmit<B>(
    response: MatchResponse<B>,
    navigation: Navigation<B>
  ) {
    activeResponse = undefined;
    if (cache) {
      cache.set(response);
    }

    if (!response.redirectTo || emitRedirects) {
      emit(response, navigation);
    }

    if (response.redirectTo !== undefined) {
      history.replace(response.redirectTo);
    }
  }

  // now that everything is defined, actually do the setup
  setupRoutesAndInteractions(routeArray);
  history.respondWith(navigationHandler);

  const router: CuriRouter<B> = {
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
