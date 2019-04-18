import finishResponse from "./finishResponse";
import { resolveRoute, isAsyncRoute } from "./resolveMatchedRoute";
import { isExternalRedirect } from "./redirect";

import {
  HistoryConstructor,
  HistoryOptions,
  PendingNavigation
} from "@hickory/root";

import {
  RouteMatcher,
  Response,
  CuriRouter,
  Observer,
  Emitted,
  ResponseHandlerOptions,
  CurrentResponse,
  Navigation,
  NavigationDetails,
  Cancellable,
  ResolveResults,
  Route,
  IntrinsicResponse
} from "@curi/types";

export interface RouterOptions<O = HistoryOptions> {
  sideEffects?: Array<Observer>;
  invisibleRedirects?: boolean;
  external?: any;
  history?: O;
}

export default function createRouter<O = HistoryOptions>(
  historyConstructor: HistoryConstructor<O>,
  routes: RouteMatcher,
  options: RouterOptions<O> = {}
): CuriRouter {
  const mostRecent: CurrentResponse = {
    response: null,
    navigation: null
  };

  const history = historyConstructor((pendingNav: PendingNavigation) => {
    const navigation: Navigation = {
      action: pendingNav.action,
      previous: mostRecent.response
    };

    const matched = routes.match(pendingNav.location);
    if (!matched) {
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
    const { route, match } = matched;
    if (!isAsyncRoute(route)) {
      finalizeResponseAndEmit(route, match, pendingNav, navigation, null);
    } else {
      announceAsyncNav();
      resolveRoute(route, match, options.external).then(resolved => {
        if (pendingNav.cancelled) {
          return;
        }
        finalizeResponseAndEmit(route, match, pendingNav, navigation, resolved);
      });
    }
  }, options.history || <O>{});

  function finalizeResponseAndEmit(
    route: Route,
    match: IntrinsicResponse,
    pending: PendingNavigation,
    navigation: Navigation,
    resolved: ResolveResults | null
  ) {
    asyncNavComplete();
    pending.finish();
    const response = finishResponse(
      route,
      match,
      routes,
      resolved,
      history,
      options.external
    );
    finishAndResetNavCallbacks();
    emitImmediate(response, navigation);
  }

  const { invisibleRedirects = false } = options;

  function emitImmediate(response: Response, navigation: Navigation) {
    if (
      !response.redirect ||
      !invisibleRedirects ||
      isExternalRedirect(response.redirect)
    ) {
      mostRecent.response = response;
      mostRecent.navigation = navigation;

      callObservers({ response, navigation, router });
      callOneTimersAndSideEffects({ response, navigation, router });
    }

    if (
      response.redirect !== undefined &&
      !isExternalRedirect(response.redirect)
    ) {
      history.navigate(response.redirect, "replace");
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
    if (options.sideEffects) {
      options.sideEffects.forEach(fn => {
        fn(emitted);
      });
    }
  }

  /* router.observer & router.once */

  let observers: Array<Observer> = [];
  const oneTimers: Array<Observer> = [];

  function observe(fn: Observer, options?: ResponseHandlerOptions) {
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

  /* router.navigate */

  let cancelCallback: (() => void) | undefined;
  let finishCallback: (() => void) | undefined;

  function navigate(details: NavigationDetails) {
    cancelAndResetNavCallbacks();

    let { name, params, hash, query, state, method } = details;
    const pathname =
      name != null
        ? routes.interactions.pathname(name, params)
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

  let cancelWith: (() => void) | undefined;
  let asyncNavNotifiers: Array<Cancellable> = [];

  function cancel(fn: Cancellable) {
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

  const router: CuriRouter = {
    route: routes.interactions,
    history,
    external: options.external,
    observe,
    once,
    cancel,
    navigate,
    current() {
      return mostRecent;
    }
  };

  history.current();
  return router;
}
