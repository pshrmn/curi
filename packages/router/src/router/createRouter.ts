import { pathname as pathnameInteraction } from "@curi/interactions";
import finishResponse from "./finishResponse";
import { isAsyncRoute, isExternalRedirect } from "./typeGuards";

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
  RouteLocation,
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
  suspend?: boolean;
}

export default function createRouter<O = HistoryOptions>(
  historyConstructor: HistoryConstructor<O>,
  routes: RouteMatcher,
  options: RouterOptions<O> = {}
): CuriRouter {
  let latestResponse: Response;
  let latestNavigation: Navigation;

  const { invisibleRedirects = false, suspend = false } = options;
  const emit = suspend ? emitSuspended : emitImmediate;

  const history = historyConstructor((pendingNav: PendingNavigation) => {
    const navigation: Navigation = {
      action: pendingNav.action,
      previous: latestResponse
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
      route.methods
        .resolve(match, options.external)
        .then(
          resolved => ({ resolved, error: null }),
          error => ({ error, resolved: null })
        )
        .then(resolved => {
          if (pendingNav.cancelled) {
            return;
          }
          finalizeResponseAndEmit(
            route,
            match,
            pendingNav,
            navigation,
            resolved
          );
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
    const response = finishResponse(
      route,
      match,
      resolved,
      router,
      options.external
    );
    emit(pending, response, navigation);
  }

  function emitImmediate(
    pending: PendingNavigation,
    response: Response,
    navigation: Navigation
  ) {
    asyncNavComplete();
    pending.finish();
    finishAndResetNavCallbacks();

    if (
      !response.redirect ||
      !invisibleRedirects ||
      isExternalRedirect(response.redirect)
    ) {
      latestResponse = response;
      latestNavigation = navigation;
      const output = { response, navigation, router };
      callObservers(output);
      callOneTimers(output);
      callSideEffects(output);
    }

    autoRedirect(response);
  }

  function emitSuspended(
    pending: PendingNavigation,
    response: Response,
    navigation: Navigation
  ) {
    navigation.finish = createFinisher(pending, response, navigation);

    if (
      !response.redirect ||
      !invisibleRedirects ||
      isExternalRedirect(response.redirect)
    ) {
      latestResponse = response;
      latestNavigation = navigation;

      const output = { response, navigation, router };
      callObservers(output);
      callOneTimers(output);
    }

    autoRedirect(response);
  }

  function autoRedirect(response: Response) {
    if (
      response.redirect !== undefined &&
      !isExternalRedirect(response.redirect)
    ) {
      history.navigate(response.redirect, "replace");
    }
  }

  function createFinisher(
    pending: PendingNavigation,
    response: Response,
    navigation: Navigation
  ) {
    let called = false;
    return function finisher() {
      if (called || pending.cancelled) {
        return;
      }
      called = true;
      asyncNavComplete();
      finishAndResetNavCallbacks();
      if (pending.finish) {
        pending.finish();
      }

      callSideEffects({ response, navigation, router });
    };
  }

  function callObservers(emitted: Emitted) {
    observers.forEach(fn => {
      fn(emitted);
    });
  }

  function callOneTimers(emitted: Emitted) {
    oneTimers.splice(0).forEach(fn => {
      fn(emitted);
    });
  }

  function callSideEffects(emitted: Emitted) {
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
    if (latestResponse && initial) {
      fn({
        response: latestResponse,
        navigation: latestNavigation,
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

    if (latestResponse && initial) {
      fn({
        response: latestResponse,
        navigation: latestNavigation,
        router
      });
    } else {
      oneTimers.push(fn);
    }
  }

  /* router.url */
  function url(details: RouteLocation): string {
    let { name, params, hash, query } = details;
    let pathname;
    if (name) {
      const route = router.route(name);
      if (route) {
        pathname = pathnameInteraction(route, params);
      }
    }
    return history.url({ pathname, hash, query });
  }

  /* router.navigate */

  let cancelCallback: (() => void) | undefined;
  let finishCallback: (() => void) | undefined;

  function navigate(details: NavigationDetails) {
    cancelAndResetNavCallbacks();

    let { url, state, method } = details;
    history.navigate({ url, state }, method);

    if (details.cancelled || details.finished) {
      cancelCallback = details.cancelled;
      finishCallback = details.finished;
      return resetCallbacks;
    }
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
    route: routes.route,
    history,
    external: options.external,
    observe,
    once,
    cancel,
    url,
    navigate,
    current() {
      return {
        response: latestResponse,
        navigation: latestNavigation
      };
    },
    destroy() {
      history.destroy();
    },
    suspends() {
      return suspend;
    }
  };

  history.current();
  return router;
}
