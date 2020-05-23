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
  sideEffects?: Observer[];
  invisibleRedirects?: boolean;
  external?: any;
  history?: O;
}

let createRouter = <O = HistoryOptions>(
  historyConstructor: HistoryConstructor<O>,
  routes: RouteMatcher,
  options: RouterOptions<O> = {}
): CuriRouter => {
  let { invisibleRedirects = false } = options;

  let latestResponse: Response;
  let latestNavigation: Navigation;

  let cancelWith: (() => void) | undefined;
  let asyncNavNotifiers: Cancellable[] = [];
  let observers: Observer[] = [];
  let oneTimers: Observer[] = [];
  let cancelCallback: (() => void) | undefined;
  let finishCallback: (() => void) | undefined;

  let resetCallbacks = () => {
    cancelCallback = undefined;
    finishCallback = undefined;
  };

  let cancelAndResetNavCallbacks = () => {
    if (cancelCallback) {
      cancelCallback();
    }
    resetCallbacks();
  };

  let finishAndResetNavCallbacks = () => {
    if (finishCallback) {
      finishCallback();
    }
    resetCallbacks();
  };

  let asyncNavComplete = () => {
    if (cancelWith) {
      cancelWith = undefined;
      asyncNavNotifiers.forEach(fn => {
        fn();
      });
    }
  };

  let callObservers = (emitted: Emitted) => {
    observers.forEach(fn => {
      fn(emitted);
    });
  };

  let callOneTimersAndSideEffects = (emitted: Emitted) => {
    oneTimers.splice(0).forEach(fn => {
      fn(emitted);
    });
    if (options.sideEffects) {
      options.sideEffects.forEach(fn => {
        fn(emitted);
      });
    }
  };

  let emitImmediate = (response: Response, navigation: Navigation) => {
    if (
      !response.redirect ||
      !invisibleRedirects ||
      isExternalRedirect(response.redirect)
    ) {
      latestResponse = response;
      latestNavigation = navigation;
      /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
      let emit = { response, navigation, router };
      callObservers(emit);
      callOneTimersAndSideEffects(emit);
    }

    if (
      response.redirect !== undefined &&
      !isExternalRedirect(response.redirect)
    ) {
      /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
      history.navigate(response.redirect, "replace");
    }
  };

  let finalizeResponseAndEmit = (
    route: Route,
    match: IntrinsicResponse,
    pending: PendingNavigation,
    navigation: Navigation,
    resolved: ResolveResults | null
  ) => {
    asyncNavComplete();
    pending.finish();
    let response = finishResponse(
      route,
      match,
      resolved,
      /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
      router,
      options.external
    );
    finishAndResetNavCallbacks();
    emitImmediate(response, navigation);
  };

  // let any async navigation listeners (observers from router.cancel)
  // know that there is an asynchronous navigation happening
  let announceAsyncNav = () => {
    if (asyncNavNotifiers.length && cancelWith === undefined) {
      cancelWith = () => {
        /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
        history.cancel();
        asyncNavComplete();
        cancelAndResetNavCallbacks();
      };
      asyncNavNotifiers.forEach(fn => {
        fn(cancelWith);
      });
    }
  };

  let history = historyConstructor((pendingNav: PendingNavigation) => {
    let navigation: Navigation = {
      action: pendingNav.action,
      previous: latestResponse
    };

    let matched = routes.match(pendingNav.location);
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
    let { route, match } = matched;
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
  }, options.history || ({} as O));

  let router: CuriRouter = {
    route: routes.route,
    history,
    external: options.external,
    observe(fn: Observer, options?: ResponseHandlerOptions) {
      let { initial = true } = options || {};

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
    },
    once(fn: Observer, options?: ResponseHandlerOptions) {
      let { initial = true } = options || {};

      if (latestResponse && initial) {
        fn({
          response: latestResponse,
          navigation: latestNavigation,
          router
        });
      } else {
        oneTimers.push(fn);
      }
    },
    cancel(fn: Cancellable) {
      asyncNavNotifiers.push(fn);
      return () => {
        asyncNavNotifiers = asyncNavNotifiers.filter(can => {
          return can !== fn;
        });
      };
    },
    url(details: RouteLocation): string {
      let { name, params, hash, query } = details;
      let pathname;
      if (name) {
        let route = router.route(name);
        if (route) {
          pathname = pathnameInteraction(route, params);
        }
      }
      return history.url({ pathname, hash, query });
    },
    navigate(details: NavigationDetails) {
      cancelAndResetNavCallbacks();

      let { url, state, method } = details;
      history.navigate({ url, state }, method);

      if (details.cancelled || details.finished) {
        cancelCallback = details.cancelled;
        finishCallback = details.finished;
        return resetCallbacks;
      }
    },
    current() {
      return {
        response: latestResponse,
        navigation: latestNavigation
      };
    },
    destroy() {
      history.destroy();
    }
  };

  history.current();
  return router;
};

export default createRouter;
