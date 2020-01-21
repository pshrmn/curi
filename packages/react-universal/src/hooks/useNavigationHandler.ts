import React from "react";
import useRouter from "./useRouter";

import { ReactNode } from "react";
import { NavType } from "@hickory/root";

export interface NavigationHookProps<T> {
  url: string;
  onNav?: (e: T) => void;
  method?: NavType;
  target?: string;
  state?: any;
  canNavigate: CanNavigate<T>;
}
export type NavigatingChildren = (navigating: boolean) => ReactNode;
export type CanNavigate<T> = (e: T, target?: string) => boolean;

function defaultCanNavigate() {
  return true;
}

export function useNavigationHandler<T extends React.BaseSyntheticEvent>(
  props: NavigationHookProps<T>
) {
  let {
    url,
    onNav,
    method,
    target,
    state,
    canNavigate = defaultCanNavigate
  } = props;
  let router = useRouter();
  let eventHandler = React.useCallback(
    function eventHandler(event: T) {
      if (onNav) {
        onNav(event);
      }

      if (canNavigate(event, target)) {
        event.preventDefault();
        router.navigate({ url, state, method });
      }
    },
    [url, method, state, onNav, target]
  );
  return {
    url,
    eventHandler
  };
}

export function useStatefulNavigationHandler<
  T extends React.BaseSyntheticEvent
>(props: NavigationHookProps<T>) {
  let {
    url,
    onNav,
    method,
    target,
    state,
    canNavigate = defaultCanNavigate
  } = props;
  let router = useRouter();
  let removeCallbacks = React.useRef(undefined);
  let [navigating, setNavigating] = React.useState(false);

  React.useEffect(() => {
    return () => {
      if (removeCallbacks.current) {
        removeCallbacks.current();
      }
    };
  }, []);

  let eventHandler = React.useCallback(
    function eventHandler(event: T) {
      if (onNav) {
        onNav(event);
      }

      if (canNavigate(event, target)) {
        event.preventDefault();
        let done = () => {
          removeCallbacks.current = undefined;
          setNavigating(false);
        };
        setNavigating(true);
        removeCallbacks.current = router.navigate({
          url,
          state,
          method,
          cancelled: done,
          finished: done
        });
      }
    },
    [url, method, state, onNav, target]
  );

  return {
    url,
    eventHandler,
    navigating
  };
}
