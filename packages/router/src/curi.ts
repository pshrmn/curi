import registerRoutes from "./utils/registerRoutes";
import pathnameInteraction from "./interactions/pathname";
import finishResponse from "./finishResponse";
import matchLocation from "./matchLocation";
import resolveMatchedRoute from "./resolveMatchedRoute";

import { History, PendingNavigation } from "@hickory/root";

import { CompiledRouteArray, ResolveResults } from "./types/route";
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
  CancelActiveNavigation,
  RemoveCancellable,
  CancelNavigateCallbacks
} from "./types/curi";

export default function createRouter(
  history: History,
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

  // the last finished response & navigation
  const mostRecent: CurrentResponse = {
    response: null,
    navigation: null
  };

  /* routes & route interactions */

  let routes: CompiledRouteArray;
  const routeInteractions: Interactions = {};

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

  /* history observer */

  function navigationHandler(pendingNav: PendingNavigation): void {
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
      finishAndResetNavCallbacks();
      return;
    }

    if (match.route.sync) {
      finalizeResponseAndEmit(match as Match, pendingNav, navigation, null);
    } else {
      announceAsyncNav();
      resolveMatchedRoute(match as Match, external).then(
        (resolved: ResolveResults) => {
          if (pendingNav.cancelled) {
            return;
          }
          finalizeResponseAndEmit(
            match as Match,
            pendingNav,
            navigation,
            resolved
          );
        }
      );
    }
  }

  function finalizeResponseAndEmit(
    match: Match,
    pending: PendingNavigation,
    navigation: Navigation,
    resolved: ResolveResults | null
  ) {
    asyncNavComplete();
    pending.finish();
    const response = finishResponse(
      match,
      routeInteractions,
      resolved,
      history,
      external
    );
    finishAndResetNavCallbacks();
    emitImmediate(response, navigation);
  }

  function emitImmediate(response: Response, navigation: Navigation) {
    if (!response.redirectTo || emitRedirects) {
      mostRecent.response = response;
      mostRecent.navigation = navigation;

      callObservers({ response, navigation, router });
      callOneTimersAndSideEffects({ response, navigation, router });
    }

    if (response.redirectTo !== undefined && automaticRedirects) {
      history.navigate(response.redirectTo, "replace");
    }
  }

  /* router.observer & router.once */

  let observers: Array<Observer> = [];
  const oneTimers: Array<Observer> = [];

  function observe(
    fn: Observer,
    options?: ResponseHandlerOptions
  ): RemoveObserver {
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
  }

  function once(fn: Observer, options?: ResponseHandlerOptions) {
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

  /* router.navigate */

  let cancelCallback: (() => void) | undefined;
  let finishCallback: (() => void) | undefined;

  function navigate(details: NavigationDetails): CancelNavigateCallbacks {
    cancelAndResetNavCallbacks();

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

  function cancelAndResetNavCallbacks() {
    if (cancelCallback) {
      cancelCallback();
    }
    resetCallbacks();
  }

  function finishAndResetNavCallbacks() {
    if (finishCallback) {
      finishCallback();
    }
    resetCallbacks();
  }

  function resetCallbacks() {
    cancelCallback = undefined;
    finishCallback = undefined;
  }

  /* router.cancel */

  let cancelWith: CancelActiveNavigation | undefined;
  let asyncNavNotifiers: Array<Cancellable> = [];

  function cancel(fn: Cancellable): RemoveCancellable {
    asyncNavNotifiers.push(fn);
    return () => {
      asyncNavNotifiers = asyncNavNotifiers.filter(can => {
        return can !== fn;
      });
    };
  }

  // let any async navigation listeners (observers from router.cancel)
  // know that there is an asynchronous navigation happening
  function announceAsyncNav() {
    if (asyncNavNotifiers.length && cancelWith === undefined) {
      cancelWith = () => {
        history.cancel();
        asyncNavComplete();
        cancelAndResetNavCallbacks();
      };
      asyncNavNotifiers.forEach(fn => {
        fn(cancelWith);
      });
    }
  }

  function asyncNavComplete() {
    if (cancelWith) {
      cancelWith = undefined;
      asyncNavNotifiers.forEach(fn => {
        fn();
      });
    }
  }

  /* router.refresh */

  // when true, navigation.previous will re-use the previous
  // navigation.previous instead of using mostRecent.response
  // TODO: is there a better approach?
  let refreshing = false;

  function refresh(routes?: CompiledRouteArray) {
    refreshing = true;
    setupRoutesAndInteractions(routes);
  }

  const router: CuriRouter = {
    route: routeInteractions,
    history,
    external,
    observe,
    once,
    cancel,
    navigate,
    refresh,
    current() {
      return mostRecent;
    }
  };

  // now that everything is defined, actually do the setup
  setupRoutesAndInteractions(routeArray);

  return router;
}
