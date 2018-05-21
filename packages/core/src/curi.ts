import registerRoutes from "./utils/registerRoutes";
import pathnameInteraction from "./interactions/pathname";
import finishResponse from "./finishResponse";
import matchLocation from "./matchLocation";
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
  Observer,
  Emitted,
  RespondOptions,
  RemoveObserver,
  CurrentResponse,
  Navigation,
  NavigationDetails
} from "./types/curi";

interface GroupedEffects {
  before: Array<Observer>;
  after: Array<Observer>;
}

function createRouter(
  history: History,
  routeArray: Array<RouteDescriptor>,
  options: RouterOptions = {}
): CuriRouter {
  const {
    route: userInteractions = [],
    sideEffects = [],
    emitRedirects = true
  } = options;

  const groupedEffects: GroupedEffects = sideEffects.reduce(
    (acc: GroupedEffects, curr: SideEffect) => {
      if (curr.after) {
        acc.after.push(curr.effect);
      } else {
        acc.before.push(curr.effect);
      }
      return acc;
    },
    {
      before: [],
      after: []
    }
  );

  let routes: Array<InternalRoute> = [];
  const routeInteractions: Interactions = {};

  function setupRoutesAndInteractions(
    routeArray: Array<RouteDescriptor>
  ): void {
    routes = routeArray.map(createRoute);
    for (let key in routeInteractions) {
      delete routeInteractions[key];
    }

    // add the pathname interaction to the provided interactions
    userInteractions
      .concat(pathnameInteraction(options.pathnameOptions))
      .forEach(interaction => {
        interaction.reset();
        routeInteractions[interaction.name] = interaction.get;
        registerRoutes(routes, interaction);
      });
  }

  const observers: Array<Observer | null> = [];
  const oneTimers: Array<Observer> = [];

  const mostRecent: CurrentResponse = {
    response: null,
    navigation: null
  };

  function respond(
    fn: Observer,
    options?: RespondOptions
  ): RemoveObserver | void {
    const { observe = false, initial = true } = options || {};

    if (observe) {
      const newLength = observers.push(fn);
      if (mostRecent.response && initial) {
        fn.call(null, { ...mostRecent, router });
      }
      return () => {
        observers[newLength - 1] = null;
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
    groupedEffects.before.forEach(fn => {
      fn(resp);
    });
    observers.forEach(fn => {
      if (fn != null) {
        fn(resp);
      }
    });

    while (oneTimers.length) {
      const fn = oneTimers.pop();
      if (fn) {
        fn(resp);
      }
    }

    groupedEffects.after.forEach(fn => {
      fn(resp);
    });
  }

  let activeResponse: PendingNavigation | undefined;
  let cancelCallback: (() => void) | undefined;
  let finishCallback: (() => void) | undefined;
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

    const match = matchLocation(pendingNav.location, routes);
    // if no routes match, do nothing
    if (!match.route) {
      console.error(
        `The current location (${
          pendingNav.location.pathname
        }) has no matching route, ` +
          'so a response could not be emitted. A catch-all route ({ path: "(.*)" }) ' +
          "can be used to match locations with no other matching route."
      );
      pendingNav.finish();
      cancelCallback = undefined;
      return;
    }

    if (match.route.sync) {
      pendingNav.finish();
      const response = finishResponse(match as Match, routeInteractions, null);
      emitAndRedirect(response, navigation);
    } else {
      resolveMatchedRoute(match as Match).then((resolved: Resolved) => {
        if (pendingNav.cancelled) {
          return;
        }
        pendingNav.finish();
        const response = finishResponse(
          match as Match,
          routeInteractions,
          resolved
        );
        emitAndRedirect(response, navigation);
      });
    }
  }

  function emitAndRedirect(response: Response, navigation: Navigation) {
    activeResponse = undefined;
    cancelCallback = undefined;
    if (finishCallback) {
      finishCallback();
      finishCallback = undefined;
    }

    if (!response.redirectTo || emitRedirects) {
      emit(response, navigation);
    }

    if (response.redirectTo !== undefined) {
      history.navigate(response.redirectTo, "REPLACE");
    }
  }

  const router: CuriRouter = {
    route: routeInteractions,
    history,
    respond,
    replaceRoutes: setupRoutesAndInteractions,
    current() {
      return mostRecent;
    },
    navigate(details: NavigationDetails): void {
      if (cancelCallback) {
        cancelCallback();
      }
      let { name, params, hash, query, state, method = "ANCHOR" } = details;
      const pathname =
        name != null
          ? routeInteractions.pathname(name, params)
          : history.location.pathname;
      if (method !== "ANCHOR" && method !== "PUSH" && method !== "REPLACE") {
        method = "ANCHOR";
      }
      if (details.cancelled) {
        cancelCallback = details.cancelled;
      }
      if (details.finished) {
        finishCallback = details.finished;
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

  // now that everything is defined, actually do the setup
  setupRoutesAndInteractions(routeArray);
  history.respondWith(navigationHandler);

  return router;
}

export default createRouter;
