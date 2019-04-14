import React from "react";
import useRouter from "./useRouter";
import { stringifyFlatObject } from "../utils";

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

function defaultCanNavigate() {
  return true;
}

export type CanNavigate<T> = (e: T, target?: string) => boolean;

export function useNavigationHandler<T extends React.BaseSyntheticEvent>(
  props: NavigationHookProps<T>,
  canNavigate: CanNavigate<T> = defaultCanNavigate,
  target?: string
) {
  const router = useRouter();
  const eventHandler = React.useCallback(
    function eventHandler(event: T) {
      if (props.onNav) {
        props.onNav(event);
      }

      if (canNavigate(event, target)) {
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
    },
    [
      props.method,
      props.name,
      stringifyFlatObject(props.params),
      props.query,
      props.hash,
      props.state,
      props.onNav,
      target
    ]
  );
  return {
    eventHandler
  };
}

export function useStatefulNavigationHandler<
  T extends React.BaseSyntheticEvent
>(
  props: StatefulNavigationHookProps<T>,
  canNavigate: CanNavigate<T> = defaultCanNavigate,
  target?: string
) {
  const router = useRouter();
  const removeCallbacks = React.useRef(undefined);
  const [navigating, setNavigating] = React.useState(false);

  React.useEffect(() => {
    return () => {
      if (removeCallbacks.current) {
        removeCallbacks.current();
      }
    };
  }, []);

  const eventHandler = React.useCallback(
    function eventHandler(event: T) {
      if (props.onNav) {
        props.onNav(event);
      }

      if (canNavigate(event, target)) {
        event.preventDefault();

        const done = () => {
          removeCallbacks.current = undefined;
          setNavigating(false);
        };
        setNavigating(true);

        removeCallbacks.current = router.navigate({
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
    },
    [
      props.method,
      props.name,
      stringifyFlatObject(props.params),
      props.query,
      props.hash,
      props.state,
      props.onNav,
      target
    ]
  );

  return {
    eventHandler,
    navigating
  };
}
