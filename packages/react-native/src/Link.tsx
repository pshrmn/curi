import React from "react";
import { TouchableHighlight } from "react-native";
import { Curious } from "@curi/react-universal";
import shallowEqual from "shallowequal";

import { GestureResponderEvent } from "react-native";
import { Emitted, CuriRouter } from "@curi/router";
import { NavType } from "@hickory/root";

export type NavigatingChildren = (navigating: boolean) => React.ReactNode;

export interface LinkProps {
  to?: string;
  name?: string;
  params?: object;
  hash?: string;
  query?: any;
  state?: any;
  onPress?: (e: GestureResponderEvent) => void;
  anchor?: React.ReactType;
  target?: string;
  style?: any;
  method?: NavType;
  children: NavigatingChildren | React.ReactNode;
  forward?: object;
}

interface BaseLinkProps extends LinkProps {
  router: CuriRouter;
  forwardedRef: React.Ref<any> | undefined;
}

interface LinkState {
  navigating: boolean;
}

let hasWarnedTo = false;
let hasWarnedForward = false;

class BaseLink extends React.Component<BaseLinkProps, LinkState> {
  removed: boolean;

  state = {
    navigating: false
  };

  shouldComponentUpdate(nextProps: BaseLinkProps, nextState: LinkState) {
    const { params: nextParams, ...nextRest } = nextProps;
    const { params: currentParams, ...currentRest } = this.props;
    return (
      !shallowEqual(nextState, this.state) ||
      !shallowEqual(nextParams, currentParams) ||
      !shallowEqual(nextRest, currentRest)
    );
  }

  pressHandler = (event: GestureResponderEvent) => {
    const { onPress, router } = this.props;
    if (onPress) {
      onPress(event);
    }

    if (!event.defaultPrevented) {
      event.preventDefault();
      const { to, name, params, hash, query, state, children } = this.props;
      const routeName = name || to;
      let { method = "ANCHOR" } = this.props;
      if (method !== "ANCHOR" && method !== "PUSH" && method !== "REPLACE") {
        method = "ANCHOR";
      }
      let cancelled, finished;
      if (typeof children === "function") {
        cancelled = finished = () => {
          if (!this.removed) {
            this.setState({ navigating: false });
          }
        };
        if (!this.removed) {
          this.setState({ navigating: true });
        }
      }
      router.navigate({
        name,
        params,
        hash,
        query,
        state,
        method,
        cancelled,
        finished
      });
    }
  };

  render(): React.ReactElement<any> {
    const {
      to,
      name,
      params,
      hash,
      query,
      state,
      onPress,
      anchor: Anchor = TouchableHighlight,
      router,
      method,
      forwardedRef,
      children,
      forward,
      ...rest
    } = this.props;
    if (process.env.NODE_ENV !== "production") {
      if (!hasWarnedTo && to !== undefined) {
        hasWarnedTo = true;
        console.warn(`Deprecation warning:
The "to" prop should be replaced with the "name" prop. The "to" prop will be removed in @curi/react-dom v2.

<Link name="Route Name">...</Link>`);
      }

      if (!hasWarnedForward && Object.keys(rest).length > 0) {
        hasWarnedForward = true;
        console.warn(`Deprecation warning:
Passing additional props to a <Link> will no longer be forwarded to the rendered component in v2.

Instead, please use the "forward" prop to pass an object of props to be attached to the component.

<Link to="Route Name" forward={{ className: "test" }}>`);
      }
    }
    
    const routeName = name || to;

    const additionalProps = {
      ...rest,
      ...forward
    };

    return (
      <Anchor
        {...additionalProps}
        onPress={this.pressHandler}
        ref={forwardedRef}
      >
        {typeof children === "function"
          ? (children as NavigatingChildren)(this.state.navigating)
          : children}
      </Anchor>
    );
  }

  componentWillUnmount() {
    this.removed = true;
  }
}

const Link = React.forwardRef((props: LinkProps, ref) => (
  <Curious>
    {({ router }: Emitted) => (
      <BaseLink {...props} router={router} forwardedRef={ref} />
    )}
  </Curious>
));

export default Link;
