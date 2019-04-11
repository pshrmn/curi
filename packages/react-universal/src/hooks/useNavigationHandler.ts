import React from "react";
import useRouter from "./useRouter";

import { ReactNode } from "react";
import { RouteLocation } from "@curi/types";
import { NavType } from "@hickory/root";

export type NavigatingChildren = (navigating: boolean) => ReactNode;

export interface NavigationHookProps<T> extends BaseNavigationHookProps<T> {
  children: React.ReactNode;
}

export interface StatefulNavigationHookProps<T>
  extends BaseNavigationHookProps<T> {
  children: NavigatingChildren;
}

export interface BaseNavigationHookProps<T> extends RouteLocation {
  onNav?: (e: T) => void;
  forward?: object;
  method?: NavType;
}

function default_can_navigate() {
  return true;
}

export type CanNavigate<T> = (e: T, forward?: object) => boolean;

export function useNavigationHandler<T extends React.BaseSyntheticEvent>(
  props: NavigationHookProps<T>,
  can_navigate: CanNavigate<T> = default_can_navigate
) {
  const router = useRouter();

  function event_handler(event: T) {
    if (props.onNav) {
      props.onNav(event);
    }

    if (can_navigate(event, props.forward)) {
      event.preventDefault();

      router.navigate({
        method: props.method,
        name: props.name,
        params: props.params,
        query: props.query,
        state: props.state,
        hash: props.hash
      });
    }
  }
  return {
    event_handler
  };
}

export function useStatefulNavigationHandler<
  T extends React.BaseSyntheticEvent
>(
  props: StatefulNavigationHookProps<T>,
  can_navigate: CanNavigate<T> = default_can_navigate
) {
  const router = useRouter();
  const cancel = React.useRef(undefined);
  const [navigating, set_navigating] = React.useState(false);

  React.useEffect(() => {
    return () => {
      if (cancel.current) {
        cancel.current();
      }
    };
  }, []);

  function event_handler(event: T) {
    if (props.onNav) {
      props.onNav(event);
    }

    if (can_navigate(event, props.forward)) {
      event.preventDefault();

      // only trigger re-renders when children uses state
      const done = () => {
        cancel.current = undefined;
        set_navigating(false);
      };
      set_navigating(true);

      cancel.current = router.navigate({
        method: props.method,
        name: props.name,
        params: props.params,
        query: props.query,
        state: props.state,
        hash: props.hash,
        cancelled: done,
        finished: done
      });
    }
  }

  return {
    event_handler,
    navigating
  };
}
