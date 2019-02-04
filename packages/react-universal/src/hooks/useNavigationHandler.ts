import React from "react";
import useCuri from "./useCuri";

import { ReactNode } from "react";
import { RouteLocation } from "@curi/router";
import { NavType } from "@hickory/root";

export type NavigatingChildren = (navigating: boolean) => ReactNode;

export interface NavigationHookProps<T> extends RouteLocation {
  children: NavigatingChildren | React.ReactNode;
  onNav?: (e: T) => void;
  forward?: object;
  method?: NavType;
}

function defaultCanNavigate() {
  return true;
}

export type CanNavigate<T> = (e: T, forward?: object) => boolean;

export default function useNavigationHandler<
  T extends React.BaseSyntheticEvent
>(
  props: NavigationHookProps<T>,
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

      let cancelled, finished;
      // only trigger re-renders when children uses state
      if (typeof props.children === "function") {
        cancelled = finished = () => {
          cancel.current = undefined;
          setNavigating(false);
        };
        setNavigating(true);
      }

      cancel.current = router.navigate({
        method: props.method || "ANCHOR",
        name: props.name,
        params: props.params,
        query: props.query,
        state: props.state,
        hash: props.hash,
        cancelled,
        finished
      });
    }
  }
  return {
    eventHandler,
    children:
      typeof props.children === "function"
        ? (props.children as NavigatingChildren)(navigating)
        : props.children
  };
}
