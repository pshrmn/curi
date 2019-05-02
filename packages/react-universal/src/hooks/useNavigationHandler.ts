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
  const {
    url,
    onNav,
    method,
    target,
    state,
    canNavigate = defaultCanNavigate
  } = props;
  const router = useRouter();
  const eventHandler = React.useCallback(
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
  const {
    url,
    onNav,
    method,
    target,
    state,
    canNavigate = defaultCanNavigate
  } = props;
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
      if (onNav) {
        onNav(event);
      }

      if (canNavigate(event, target)) {
        event.preventDefault();
        const done = () => {
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
