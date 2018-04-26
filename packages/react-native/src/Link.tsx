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
}

export interface LinkState {
  location: PartialLocation;
}

class BaseLink extends React.Component<BaseLinkProps, LinkState> {
  pressHandler = (event: GestureResponderEvent) => {
    const { onPress, router } = this.props;
    let { method = "ANCHOR" } = this.props;
    if (onPress) {
      onPress(event);
    }

    if (!event.defaultPrevented) {
      event.preventDefault();
      if (method !== "ANCHOR" && method !== "PUSH" && method !== "REPLACE") {
        method = "ANCHOR";
      }
      router.history.navigate(this.state.location, method);
    }
  };

  setLocation(props: BaseLinkProps) {
    const { router, response, to, params, hash, query, state } = props;
    const pathname = to
      ? router.route.pathname(to, params)
      : response.location.pathname;
    const location = {
      hash,
      query,
      state,
      pathname
    };
    this.setState({ location });
  }

  componentWillMount() {
    this.setLocation(this.props);
  }

  componentWillReceiveProps(nextProps: BaseLinkProps) {
    this.setLocation(nextProps);
  }

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
      ...rest
    } = this.props;

    return <Anchor {...rest} onPress={this.pressHandler} />;
  }
}

const Link = (props: LinkProps) => (
  <Curious>
    {({ router, response }: Emitted) => (
      <BaseLink {...props} router={router} response={response} />
    )}
  </Curious>
);

export default Link;
