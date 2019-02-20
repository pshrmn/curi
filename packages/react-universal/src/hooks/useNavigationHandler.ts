import React from "react";
import useCuri from "./useCuri";

import { ReactNode } from "react";
import { RouteLocation } from "@curi/router";
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

function defaultCanNavigate() {
  return true;
}

export type CanNavigate<T> = (e: T, forward?: object) => boolean;

export function useNavigationHandler<T extends React.BaseSyntheticEvent>(
  props: NavigationHookProps<T>,
  canNavigate: CanNavigate<T> = defaultCanNavigate
) {
  const { router } = useCuri();

  function eventHandler(event: T) {
    if (props.onNav) {
      props.onNav(event);
    }

    if (canNavigate(event, props.forward)) {
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
    eventHandler
  };
}

export function useStatefulNavigationHandler<
  T extends React.BaseSyntheticEvent
>(
  props: StatefulNavigationHookProps<T>,
  canNavigate: CanNavigate<T> = defaultCanNavigate
) {
  const { router } = useCuri();
  const cancel = React.useRef(undefined);
  const [navigating, setNavigating] = React.useState(false);

  React.useEffect(() => {
    return () => {
      if (cancel.current) {
        cancel.current();
      }
    };
  }, []);

  function eventHandler(event: T) {
    if (props.onNav) {
      props.onNav(event);
    }

    if (canNavigate(event, props.forward)) {
      event.preventDefault();

      // only trigger re-renders when children uses state
      const done = () => {
        cancel.current = undefined;
        setNavigating(false);
      };
      setNavigating(true);

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
    eventHandler,
    navigating
  };
}
