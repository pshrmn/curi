import React from "react";
import PropTypes from "prop-types";
import warning from "warning";

import { CuriRenderFn, CuriContext } from "./interface";
import { CuriRouter, Emitted, Response, Navigation } from "@curi/core";

export interface CuriousProps {
  render: CuriRenderFn;
  router?: CuriRouter;
  responsive?: boolean;
}

export interface CuriousState {
  response: Response;
  navigation: Navigation;
}

export default class Curious extends React.Component<
  CuriousProps,
  CuriousState
> {
  stopResponding: () => void;
  isResponsive: boolean;

  static contextTypes = {
    curi: PropTypes.shape({
      router: PropTypes.object.isRequired,
      response: PropTypes.object.isRequired,
      navigation: PropTypes.object.isRequired
    })
  };

  constructor(props: CuriousProps, context: CuriContext) {
    super(props, context);

    this.isResponsive = !!(this.props.responsive || this.props.router);
    if (this.isResponsive) {
      let response: Response;
      let navigation: Navigation;

      if (this.props.router) {
        const initial = this.props.router.current();
        response = initial.response;
        navigation = initial.navigation;
      } else {
        response = this.context.curi.response;
        navigation = this.context.curi.navigation;
      }
      this.state = { response, navigation };
    }
  }

  componentDidMount() {
    if (this.props.responsive || this.props.router) {
      const router = this.props.router || this.context.curi.router;
      this.stopResponding = router.respond(
        ({ response, navigation }: Emitted) => {
          this.setState({ response, navigation });
        },
        { initial: false }
      );
    }
  }

  componentWillReceiveProps(nextProps: CuriousProps) {
    warning(
      nextProps.responsive === this.props.responsive,
      'The "responsive" prop of <Curious> cannot be changed.'
    );
    warning(
      nextProps.router === this.props.router,
      'The "router" prop of <Curious> cannot be changed.'
    );
  }

  componentWillUnmount() {
    /* istanbul ignore else */
    if (this.stopResponding) {
      this.stopResponding();
    }
  }

  render() {
    const { curi } = this.context;
    const router = this.props.router || curi.router;
    const response = this.isResponsive ? this.state.response : curi.response;
    const navigation = this.isResponsive
      ? this.state.navigation
      : curi.navigation;
    return this.props.render({ router, response, navigation });
  }
}
