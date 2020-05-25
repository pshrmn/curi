import { pathname as pathnameInteraction } from "@curi/interactions";

import {
  History,
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
  AsyncRoute,
  IntrinsicResponse,
  RedirectLocation,
  SettableResponseProperties,
  RedirectProps,
  ExternalRedirect
} from "@curi/types";

export interface RouterOptions<O = HistoryOptions> {
  sideEffects?: Observer[];
  invisibleRedirects?: boolean;
  external?: any;
  history?: O;
}

let isAsyncRoute = (route: Route): route is AsyncRoute => {
  return typeof route.methods.resolve !== "undefined";
};

let isExternalRedirect = (
  redirect: ExternalRedirect | RedirectLocation | RedirectProps
): redirect is ExternalRedirect => {
  return "externalURL" in redirect;
};

let createRedirect = (
  redirect: RedirectProps | RedirectLocation | ExternalRedirect,
  router: CuriRouter
): RedirectLocation | ExternalRedirect => {
  if (isExternalRedirect(redirect)) {
    return redirect;
  }
  let { name, params, query, hash, state } = redirect;
  let url =
    "url" in redirect
      ? redirect.url
      : router.url({ name, params, query, hash });
  return {
    name,
    params,
    query,
    hash,
    state,
    url
  };
};

let finishResponse = (
  route: Route,
  match: IntrinsicResponse,
  resolvedResults: ResolveResults | null,
  router: CuriRouter,
  external: any
): Response => {
  let { resolved = null, error = null } = resolvedResults || {};

  let response: Response = {
    data: undefined,
    body: undefined,
    meta: undefined
  } as Response;
  for (let key in match) {
    response[key as keyof Response] = match[key as keyof IntrinsicResponse];
  }

  if (!route.methods.respond) {
    return response;
  }

  let results = route.methods.respond({
    resolved,
    error,
    match,
    external
  });

  if (!results) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `"${
          match.name
        }"'s response function did not return anything. Did you forget to include a return statement?`
      );
    }
    return response;
  }

  if (process.env.NODE_ENV !== "production") {
    let validProperties: {
      [key in keyof SettableResponseProperties]: boolean
    } = {
      meta: true,
      body: true,
      data: true,
      redirect: true
    };
    Object.keys(results).forEach(property => {
      if (!(property in validProperties)) {
        console.warn(`"${property}" is not a valid response property. The valid properties are:

  ${Object.keys(validProperties).join(", ")}`);
      }
    });
  }

  response["meta"] = results["meta"];
  response["body"] = results["body"];
  response["data"] = results["data"];
  if (results["redirect"]) {
    response["redirect"] = createRedirect(results["redirect"], router);
  }

  return response;
};

export let createRouter = <O = HistoryOptions>(
  historyConstructor: HistoryConstructor<O>,
  routes: RouteMatcher,
  options: RouterOptions<O> = {}
): CuriRouter => {
  let {
    history: historyOptions = {} as O,
    sideEffects,
    external,
    invisibleRedirects = false
  } = options;

  let history: History;
  let router: CuriRouter;

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

  let assignCallbacks = (
    cancelled: (() => void) | undefined,
    finished: (() => void) | undefined
  ) => {
    cancelCallback = cancelled;
    finishCallback = finished;
    return resetCallbacks;
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
    if (sideEffects) {
      sideEffects.forEach(fn => {
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
      let emit = { response, navigation, router };
      callObservers(emit);
      callOneTimersAndSideEffects(emit);
    }

    if (
      response.redirect !== undefined &&
      !isExternalRedirect(response.redirect)
    ) {
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
    let response = finishResponse(route, match, resolved, router, external);
    finishAndResetNavCallbacks();
    emitImmediate(response, navigation);
  };

  // let any async navigation listeners (observers from router.cancel)
  // know that there is an asynchronous navigation happening
  let announceAsyncNav = () => {
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
  };

  history = historyConstructor((pendingNav: PendingNavigation) => {
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
        .resolve(match, external)
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
  }, historyOptions);

  router = {
    route: routes.route,
    history,
    external,
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
        return assignCallbacks(details.cancelled, details.finished);
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
