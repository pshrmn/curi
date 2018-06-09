import React from "react";
import { TouchableHighlight } from "react-native";
import { Curious } from "@curi/react";

import { GestureResponderEvent } from "react-native";
import { Emitted, CuriRouter, Response } from "@curi/router";
import {
  HickoryLocation,
  PartialLocation,
  LocationDetails,
  NavType
} from "@hickory/root";

export type NavigatingChildren = (navigating: boolean) => React.ReactNode;

export interface LinkProps {
  to?: string;
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
}

export interface BaseLinkProps extends LinkProps {
  router: CuriRouter;
  response: Response;
  forwardedRef: React.Ref<any> | undefined;
}

export interface LinkState {
  navigating: boolean;
}

class BaseLink extends React.PureComponent<BaseLinkProps, LinkState> {
  state = {
    navigating: false
  };

  pressHandler = (event: GestureResponderEvent) => {
    const { onPress, router } = this.props;
    if (onPress) {
      onPress(event);
    }

    if (!event.defaultPrevented) {
      event.preventDefault();
      const { to: name, params, hash, query, state, children } = this.props;
      let { method = "ANCHOR" } = this.props;
      if (method !== "ANCHOR" && method !== "PUSH" && method !== "REPLACE") {
        method = "ANCHOR";
      }
      let cancelled, finished;
      if (typeof children === "function") {
        cancelled = finished = () => {
          this.setState({ navigating: false });
        };
        this.setState({ navigating: true });
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
      params,
      hash,
      query,
      state,
      onPress,
      anchor: Anchor = TouchableHighlight,
      router,
      response,
      method,
      forwardedRef,
      children,
      ...rest
    } = this.props;

    return (
      <Anchor {...rest} onPress={this.pressHandler} ref={forwardedRef}>
        {typeof children === "function"
          ? children(this.state.navigating)
          : children}
      </Anchor>
    );
  }
}

const Link = React.forwardRef((props: LinkProps, ref) => (
  <Curious>
    {({ router, response }: Emitted) => (
      <BaseLink
        {...props}
        router={router}
        response={response}
        forwardedRef={ref}
      />
    )}
  </Curious>
));

export default Link;
