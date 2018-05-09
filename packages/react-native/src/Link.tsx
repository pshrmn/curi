import React from "react";
import invariant from "invariant";
import { TouchableHighlight } from "react-native";
import { Curious } from "@curi/react";

import { GestureResponderEvent } from "react-native";
import { Emitted, CuriRouter, Response } from "@curi/core";
import {
  HickoryLocation,
  PartialLocation,
  LocationDetails,
  NavType
} from "@hickory/root";

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
}

export interface BaseLinkProps extends LinkProps {
  router: CuriRouter;
  response: Response;
  forwardedRef: React.Ref<any> | undefined;
}

class BaseLink extends React.Component<BaseLinkProps> {
  pressHandler = (event: GestureResponderEvent) => {
    const { onPress, router } = this.props;
    if (onPress) {
      onPress(event);
    }

    if (!event.defaultPrevented) {
      event.preventDefault();
      const { to: name, params, hash, query, state } = this.props;
      let { method = "ANCHOR" } = this.props;
      if (method !== "ANCHOR" && method !== "PUSH" && method !== "REPLACE") {
        method = "ANCHOR";
      }
      router.navigate({
        name,
        params,
        hash,
        query,
        state,
        method
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
      ...rest
    } = this.props;

    return <Anchor {...rest} onPress={this.pressHandler} ref={forwardedRef} />;
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
