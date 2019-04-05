import register_routes from "./utils/register_routes";
import pathname_interaction from "./interactions/pathname";
import finish_response from "./finish_response";
import { match_location, is_real_match } from "./match_location";
import { resolve_route, is_async_route } from "./resolve_matched_route";

import {
  HistoryConstructor,
  HistoryOptions,
  PendingNavigation
} from "@hickory/root";

import {
  PreparedRoutes,
  Response,
  Interactions,
  CuriRouter,
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
  CancelNavigateCallbacks,
  ResolveResults,
  RouterOptions,
  PreparedRoute,
  IntrinsicResponse
} from "@curi/types";

export default function create_router<HOpts = HistoryOptions>(
  history_constructor: HistoryConstructor<HOpts>,
  route_array: PreparedRoutes,
  options: RouterOptions<HOpts> = {}
): CuriRouter {
  const {
    route: user_interactions = [],
    side_effects = [],
    emit_redirects = true,
    external,
    history: history_options = <HOpts>{}
  } = options;

  const history = history_constructor((pending_nav: PendingNavigation) => {
    let previous: Response | null = refreshing
      ? most_recent.navigation
        ? most_recent.navigation.previous
        : null
      : most_recent.response;
    refreshing = false;
    const navigation: Navigation = {
      action: pending_nav.action,
      previous
    };

    const matched = match_location(pending_nav.location, routes);
    // if no routes match, do nothing
    if (!is_real_match(matched)) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          `The current location (${
            pending_nav.location.pathname
          }) has no matching route, ` +
            'so a response could not be emitted. A catch-all route ({ path: "(.*)" }) ' +
            "can be used to match locations with no other matching route."
        );
      }
      pending_nav.finish();
      finish_and_reset_nav_callbacks();
      return;
    }
    const { route, match } = matched;
    const public_route = route.public;
    if (!is_async_route(public_route)) {
      finalize_response_and_emit(route, match, pending_nav, navigation, null);
    } else {
      announe_async_nav();
      resolve_route(public_route, match, external).then(resolved => {
        if (pending_nav.cancelled) {
          return;
        }
        finalize_response_and_emit(
          route,
          match,
          pending_nav,
          navigation,
          resolved
        );
      });
    }
  }, history_options);

  // the last finished response & navigation
  const most_recent: CurrentResponse = {
    response: null,
    navigation: null
  };

  /* routes & route interactions */

  let routes: PreparedRoutes;
  const route_interactions: Interactions = {};

  function setup_routes_and_interactions(user_routes?: PreparedRoutes): void {
    if (user_routes) {
      routes = user_routes;
      for (let key in route_interactions) {
        delete route_interactions[key];
      }

      // add the pathname interaction to the provided interactions
      user_interactions
        .concat(pathname_interaction(options.pathname_options))
        .forEach(interaction => {
          interaction.reset();
          route_interactions[interaction.name] = interaction.get;
          register_routes(routes, interaction);
        });
    }
  }

  function finalize_response_and_emit(
    route: PreparedRoute,
    match: IntrinsicResponse,
    pending: PendingNavigation,
    navigation: Navigation,
    resolved: ResolveResults | null
  ) {
    async_nav_complete();
    pending.finish();
    const response = route.response
      ? finish_response(
          route.response,
          match,
          route_interactions,
          resolved,
          history,
          external
        )
      : match;
    finish_and_reset_nav_callbacks();
    emit_immediate(response, navigation);
  }

  function emit_immediate(response: Response, navigation: Navigation) {
    if (!response.redirect || emit_redirects) {
      most_recent.response = response;
      most_recent.navigation = navigation;

      call_observers({ response, navigation, router });
      call_one_timers_and_side_effects({ response, navigation, router });
    }

    if (response.redirect !== undefined) {
      history.navigate(response.redirect, "replace");
    }
  }

  /* router.observer & router.once */

  let observers: Array<Observer> = [];
  const one_timers: Array<Observer> = [];

  function observe(
    fn: Observer,
    options?: ResponseHandlerOptions
  ): RemoveObserver {
    const { initial = true } = options || {};

    observers.push(fn);
    if (most_recent.response && initial) {
      fn.call(null, {
        response: most_recent.response,
        navigation: most_recent.navigation,
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

    if (most_recent.response && initial) {
      fn.call(null, {
        response: most_recent.response,
        navigation: most_recent.navigation,
        router
      });
    } else {
      one_timers.push(fn);
    }
  }

  function call_observers(emitted: Emitted) {
    observers.forEach(fn => {
      fn(emitted);
    });
  }

  function call_one_timers_and_side_effects(emitted: Emitted) {
    one_timers.splice(0).forEach(fn => {
      fn(emitted);
    });
    side_effects.forEach(fn => {
      fn(emitted);
    });
  }

  /* router.navigate */

  let cancel_callback: (() => void) | undefined;
  let finish_callback: (() => void) | undefined;

  function navigate(details: NavigationDetails): CancelNavigateCallbacks {
    cancel_and_reset_nav_callbacks();

    let { name, params, hash, query, state, method } = details;
    const pathname =
      name != null
        ? route_interactions.pathname(name, params)
        : history.location.pathname;

    cancel_callback = details.cancelled;
    finish_callback = details.finished;

    history.navigate(
      {
        pathname,
        hash,
        query,
        state
      },
      method
    );

    return reset_callbacks;
  }

  function cancel_and_reset_nav_callbacks() {
    if (cancel_callback) {
      cancel_callback();
    }
    reset_callbacks();
  }

  function finish_and_reset_nav_callbacks() {
    if (finish_callback) {
      finish_callback();
    }
    reset_callbacks();
  }

  function reset_callbacks() {
    cancel_callback = undefined;
    finish_callback = undefined;
  }

  /* router.cancel */

  let cancel_with: CancelActiveNavigation | undefined;
  let async_nav_notifiers: Array<Cancellable> = [];

  function cancel(fn: Cancellable): RemoveCancellable {
    async_nav_notifiers.push(fn);
    return () => {
      async_nav_notifiers = async_nav_notifiers.filter(can => {
        return can !== fn;
      });
    };
  }

  // let any async navigation listeners (observers from router.cancel)
  // know that there is an asynchronous navigation happening
  function announe_async_nav() {
    if (async_nav_notifiers.length && cancel_with === undefined) {
      cancel_with = () => {
        history.cancel();
        async_nav_complete();
        cancel_and_reset_nav_callbacks();
      };
      async_nav_notifiers.forEach(fn => {
        fn(cancel_with);
      });
    }
  }

  function async_nav_complete() {
    if (cancel_with) {
      cancel_with = undefined;
      async_nav_notifiers.forEach(fn => {
        fn();
      });
    }
  }

  /* router.refresh */

  let refreshing = false;
  function refresh(routes?: PreparedRoutes) {
    setup_routes_and_interactions(routes);
    refreshing = true;
    history.current();
  }

  const router: CuriRouter = {
    route: route_interactions,
    history,
    external,
    observe,
    once,
    cancel,
    navigate,
    refresh,
    current() {
      return most_recent;
    }
  };

  // now that everything is defined, actually do the setup
  setup_routes_and_interactions(route_array);
  history.current();
  return router;
}
