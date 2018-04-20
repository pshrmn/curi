import React from "react";
import invariant from "invariant";
import { TouchableHighlight } from "react-native";
import { Curious } from "@curi/react";

import { GestureResponderEvent } from "react-native";
import { Emitted, CuriRouter, Response } from "@curi/core";
import {
  HickoryLocation,
  PartialLocation,
  LocationDetails
} from "@hickory/root";

export interface ActiveLink {
  merge(props: object): object;
  partial?: boolean;
  extra?(l: HickoryLocation, d: object): boolean;
}

export type LinkMethod = "navigate" | "push" | "replace";

export interface LinkProps {
  to?: string;
  params?: object;
  details?: LocationDetails;
  onPress?: (e: GestureResponderEvent) => void;
  active?: ActiveLink;
  anchor?: React.ReactType;
  target?: string;
  style?: any;
  method?: LinkMethod;
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
    const { onPress, router, method = "navigate" } = this.props;
    if (onPress) {
      onPress(event);
    }

    if (!event.defaultPrevented) {
      event.preventDefault();
      let fn = router.history.navigate;
      if (method === "push") {
        fn = router.history.push;
      } else if (method === "replace") {
        fn = router.history.replace;
      }
      fn(this.state.location);
    }
  };

  setLocation(props: BaseLinkProps) {
    const { router, response, to, params, details } = props;
    const pathname = to
      ? router.route.pathname(to, params)
      : response.location.pathname;
    const location = {
      ...details,
      pathname
    };
    this.setState({ location });
  }

  componentWillMount() {
    this.setLocation(this.props);
    if (this.props.active) {
      this.verifyActiveInteraction();
    }
  }

  componentWillReceiveProps(nextProps: BaseLinkProps) {
    this.setLocation(nextProps);
    if (nextProps.active) {
      this.verifyActiveInteraction();
    }
  }

  verifyActiveInteraction() {
    invariant(
      this.props.router.route.active,
      'You are attempting to use the "active" prop, but have not included the "active" ' +
        "route interaction (@curi/route-active) in your Curi router."
    );
  }

  render(): React.ReactElement<any> {
    const {
      to,
      params,
      details,
      onPress,
      active,
      anchor: Anchor = TouchableHighlight,
      router,
      response,
      method,
      ...rest
    } = this.props;

    let anchorProps = rest;
    if (active) {
      const { partial, merge, extra } = active;
      const isActive =
        router.route.active(to, response, params, partial) &&
        (extra ? extra(response.location, details) : true);
      if (isActive) {
        anchorProps = merge(anchorProps);
      }
    }

    return <Anchor {...anchorProps} onPress={this.pressHandler} />;
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
