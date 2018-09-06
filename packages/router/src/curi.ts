import registerRoutes from "./utils/registerRoutes";
import pathnameInteraction from "./interactions/pathname";
import finishResponse from "./finishResponse";
import matchLocation from "./matchLocation";
import resolveMatchedRoute from "./resolveMatchedRoute";
import createRoute from "./route";

import { History, PendingNavigation } from "@hickory/root";

import { RouteDescriptor, InternalRoute, ResolveResults } from "./types/route";
import { Response } from "./types/response";
import { Interactions } from "./types/interaction";
import { Match } from "./types/match";
import {
  CuriRouter,
  RouterOptions,
  Observer,
  Emitted,
  ObserveOptions,
  RemoveObserver,
  CurrentResponse,
  Navigation,
  NavigationDetails
} from "./types/curi";

export default function createRouter(
  history: History,
  routeArray: Array<RouteDescriptor>,
  options: RouterOptions = {}
): CuriRouter {
  const {
    route: userInteractions = [],
    sideEffects = [],
    emitRedirects = true
  } = options;

  let routes: Array<InternalRoute> = [];
  const routeInteractions: Interactions = {};

  // the navigation currently being processed
  let activeNavigation: PendingNavigation | undefined;

  // the last finish response & navigation
  const mostRecent: CurrentResponse = {
    response: null,
    navigation: null
  };
  // when true, navigation.previous will re-use the previous
  // navigation.previous instead of using mostRecent.response
  let refreshing = false;

  // router.navigate() hooks
  let cancelCallback: (() => void) | undefined;
  let finishCallback: (() => void) | undefined;

  let observers: Array<Observer> = [];
  const oneTimers: Array<Observer> = [];

  function setupRoutesAndInteractions(
    routeArray?: Array<RouteDescriptor>
  ): void {
    if (routeArray) {
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

    // assign navigation response handler
    // this will be re-called if router.refresh() is called
    history.respondWith(navigationHandler);
  }

  function navigationHandler(pendingNav: PendingNavigation): void {
    if (activeNavigation) {
      activeNavigation.cancel(pendingNav.action);
      activeNavigation.cancelled = true;
    }
    activeNavigation = pendingNav;

    const navigation: Navigation = {
      action: pendingNav.action,
      previous: refreshing
        ? mostRecent.navigation
          ? mostRecent.navigation.previous
          : null
        : mostRecent.response
    };
    refreshing = false;

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
      if (finishCallback) {
        finishCallback();
      }
      resetCallbacks();
      activeNavigation = undefined;
      return;
    }

    if (match.route.sync) {
      finalizeResponseAndEmit(match as Match, pendingNav, navigation, null);
    } else {
      resolveMatchedRoute(match as Match).then((resolved: ResolveResults) => {
        if (pendingNav.cancelled) {
          return;
        }
        finalizeResponseAndEmit(
          match as Match,
          pendingNav,
          navigation,
          resolved
        );
      });
    }
  }

  function finalizeResponseAndEmit(
    match: Match,
    pending: PendingNavigation,
    navigation: Navigation,
    resolved: ResolveResults | null
  ) {
    const response = finishResponse(match, routeInteractions, resolved);
    pending.finish();
    emitImmediate(response, navigation);
    activeNavigation = undefined;
  }

  function resetCallbacks() {
    cancelCallback = undefined;
    finishCallback = undefined;
  }

  function callObservers(emitted: Emitted) {
    observers.forEach(fn => {
      fn(emitted);
    });
  }

  function callOneTimersAndSideEffects(emitted: Emitted) {
    [...oneTimers.splice(0), ...sideEffects].forEach(fn => {
      fn(emitted);
    });
  }

  function emitImmediate(response: Response, navigation: Navigation) {
    if (finishCallback) {
      finishCallback();
    }
    resetCallbacks();

    if (!response.redirectTo || emitRedirects) {
      // store for current() and observe()
      mostRecent.response = response;
      mostRecent.navigation = navigation;

      callObservers({ response, navigation, router });
      callOneTimersAndSideEffects({ response, navigation, router });
    }

    if (response.redirectTo !== undefined) {
      history.navigate(response.redirectTo, "REPLACE");
    }
  }

  const router: CuriRouter = {
    route: routeInteractions,
    history,
    observe(fn: Observer, options?: ObserveOptions): RemoveObserver {
      const { initial = true } = options || {};

      observers.push(fn);
      if (mostRecent.response && initial) {
        fn.call(null, { ...mostRecent, router });
      }
      return () => {
        observers = observers.filter(obs => {
          return obs !== fn;
        });
      };
    },
    once(fn: Observer, options?: ObserveOptions) {
      const { initial = true } = options || {};

      if (mostRecent.response && initial) {
        fn.call(null, { ...mostRecent, router });
      } else {
        oneTimers.push(fn);
      }
    },
    refresh(routes?: Array<RouteDescriptor>) {
      refreshing = true;
      setupRoutesAndInteractions(routes);
    },
    current() {
      return mostRecent;
    },
    navigate(details: NavigationDetails): void {
      if (cancelCallback) {
        cancelCallback();
      }
      resetCallbacks();

      let { name, params, hash, query, state, method = "ANCHOR" } = details;
      const pathname =
        name != null
          ? routeInteractions.pathname(name, params)
          : history.location.pathname;
      if (method !== "ANCHOR" && method !== "PUSH" && method !== "REPLACE") {
        method = "ANCHOR";
      }

      cancelCallback = details.cancelled;
      finishCallback = details.finished;

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

  return router;
}
