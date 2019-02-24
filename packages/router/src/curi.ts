import registerRoutes from "./utils/registerRoutes";
import pathnameInteraction from "./interactions/pathname";
import finishResponse from "./finishResponse";
import matchLocation from "./matchLocation";
import resolveMatchedRoute from "./resolveMatchedRoute";

import { History, PendingNavigation, Action, NavType } from "@hickory/root";

import {
  RouteDescriptor,
  CompiledRouteArray,
  ResolveResults
} from "./types/route";
import { Response } from "./types/response";
import { Interactions } from "./types/interaction";
import { Match } from "./types/match";
import {
  CuriRouter,
  RouterOptions,
  Observer,
  Emitted,
  ResponseHandlerOptions,
  RemoveObserver,
  CurrentResponse,
  Navigation,
  NavigationDetails,
  Cancellable,
  RemoveCancellable,
  CancelNavigateCallbacks
} from "./types/curi";

export default function createRouter<Q>(
  history: History<Q>,
  routeArray: CompiledRouteArray,
  options: RouterOptions = {}
): CuriRouter {
  const {
    route: userInteractions = [],
    sideEffects = [],
    emitRedirects = true,
    automaticRedirects = true,
    external
  } = options;

  let routes: CompiledRouteArray;
  const routeInteractions: Interactions = {};

  // the navigation currently being processed
  let activeNavigation: PendingNavigation<Q> | undefined;

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
  let cancellers: Array<Cancellable> = [];

  function setupRoutesAndInteractions(userRoutes?: CompiledRouteArray): void {
    if (userRoutes) {
      routes = userRoutes;
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

  function navigationHandler(pendingNav: PendingNavigation<Q>): void {
    cancelActiveNavigation(pendingNav.action);
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
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          `The current location (${
            pendingNav.location.pathname
          }) has no matching route, ` +
            'so a response could not be emitted. A catch-all route ({ path: "(.*)" }) ' +
            "can be used to match locations with no other matching route."
        );
      }
      pendingNav.finish();
      if (finishCallback) {
        finishCallback();
      }
      resetCallbacks();
      activeNavigation = undefined;
      return;
    }

    if (match.route.sync) {
      finalizeResponseAndEmit(match as Match<Q>, pendingNav, navigation, null);
    } else {
      activateCancellers(pendingNav.action);
      resolveMatchedRoute(match as Match<Q>, external).then(
        (resolved: ResolveResults) => {
          if (pendingNav.cancelled) {
            return;
          }
          finalizeResponseAndEmit(
            match as Match<Q>,
            pendingNav,
            navigation,
            resolved
          );
        }
      );
    }
  }

  function finalizeResponseAndEmit(
    match: Match<Q>,
    pending: PendingNavigation<Q>,
    navigation: Navigation,
    resolved: ResolveResults | null
  ) {
    deactivateCancellers();
    const response = finishResponse(
      match,
      routeInteractions,
      resolved,
      history,
      external
    );
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
    oneTimers.splice(0).forEach(fn => {
      fn(emitted);
    });
    sideEffects.forEach(fn => {
      fn(emitted);
    });
  }

  function emitImmediate(response: Response<Q>, navigation: Navigation) {
    if (finishCallback) {
      finishCallback();
    }
    resetCallbacks();

    if (!response.redirectTo || emitRedirects) {
      // store for current(), observe(), and once()
      mostRecent.response = response;
      mostRecent.navigation = navigation;

      callObservers({ response, navigation, router });
      callOneTimersAndSideEffects({ response, navigation, router });
    }

    if (response.redirectTo !== undefined && automaticRedirects) {
      history.navigate(response.redirectTo, "replace");
    }
  }

  let canCancel: boolean;
  function activateCancellers(action: Action) {
    if (cancellers.length) {
      canCancel = true;
      const cancel = () => {
        cancelActiveNavigation(action);
        deactivateCancellers();
        if (cancelCallback) {
          cancelCallback();
        }
        resetCallbacks();
      };
      cancellers.forEach(fn => {
        fn(cancel);
      });
    }
  }

  function deactivateCancellers() {
    if (canCancel) {
      canCancel = false;
      cancellers.forEach(fn => {
        fn();
      });
    }
  }

  function cancelActiveNavigation(action: Action) {
    if (activeNavigation) {
      activeNavigation.cancel(action);
      activeNavigation.cancelled = true;
    }
  }

  const router: CuriRouter = {
    route: routeInteractions,
    history,
    external,
    observe(fn: Observer, options?: ResponseHandlerOptions): RemoveObserver {
      const { initial = true } = options || {};

      observers.push(fn);
      if (mostRecent.response && initial) {
        fn.call(null, {
          response: mostRecent.response,
          navigation: mostRecent.navigation,
          router
        });
      }
      return () => {
        observers = observers.filter(obs => {
          return obs !== fn;
        });
      };
    },
    once(fn: Observer, options?: ResponseHandlerOptions) {
      const { initial = true } = options || {};

      if (mostRecent.response && initial) {
        fn.call(null, {
          response: mostRecent.response,
          navigation: mostRecent.navigation,
          router
        });
      } else {
        oneTimers.push(fn);
      }
    },
    cancel(fn: Cancellable): RemoveCancellable {
      cancellers.push(fn);
      return () => {
        cancellers = cancellers.filter(can => {
          return can !== fn;
        });
      };
    },
    refresh(routes?: CompiledRouteArray) {
      refreshing = true;
      setupRoutesAndInteractions(routes);
    },
    current() {
      return mostRecent;
    },
    navigate(details: NavigationDetails): CancelNavigateCallbacks {
      if (cancelCallback) {
        cancelCallback();
      }
      resetCallbacks();

      let { name, params, hash, query, state, method } = details;
      const pathname =
        name != null
          ? routeInteractions.pathname(name, params)
          : history.location.pathname;

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

      return resetCallbacks;
    }
  };

  // now that everything is defined, actually do the setup
  setupRoutesAndInteractions(routeArray);

  return router;
}
