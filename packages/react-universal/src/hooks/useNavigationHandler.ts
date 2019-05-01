import React from "react";
import useRouter from "./useRouter";

import { ReactNode } from "react";
import { NavType } from "@hickory/root";

export interface NavigationHookProps<T> {
  onNav?: (e: T) => void;
  method?: NavType;
  target?: string;
  state?: any;
}
export type NavigatingChildren = (navigating: boolean) => ReactNode;
export type CanNavigate<T> = (e: T, target?: string) => boolean;

function defaultCanNavigate() {
  return true;
}

export function useNavigationHandler<T extends React.BaseSyntheticEvent>(
  url: string,
  props: NavigationHookProps<T>,
  canNavigate: CanNavigate<T> = defaultCanNavigate
) {
  const router = useRouter();
  // @ts-ignore
  const target = props.target;
  const eventHandler = React.useCallback(
    function eventHandler(event: T) {
      if (props.onNav) {
        props.onNav(event);
      }

      if (canNavigate(event, target)) {
        event.preventDefault();

        router.navigate({
          url,
          state: props.state,
          method: props.method
        });
      }
    },
    [url, props.method, props.state, props.onNav, target]
  );
  return {
    url,
    eventHandler
  };
}

export function useStatefulNavigationHandler<
  T extends React.BaseSyntheticEvent
>(
  url: string,
  props: NavigationHookProps<T>,
  canNavigate: CanNavigate<T> = defaultCanNavigate
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

  // @ts-ignore
  const target = props.target;
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
          url,
          state: props.state,
          method: props.method,
          cancelled: done,
          finished: done
        });
      }
    },
    [url, props.method, props.state, props.onNav, target]
  );

  return {
    url,
    eventHandler,
    navigating
  };
}
