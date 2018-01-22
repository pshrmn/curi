import React from "react";
import PropTypes from "prop-types";
import warning from "warning";

import { CuriContext } from "./interface";
import { CuriRouter, Response } from "@curi/core";
import { Action } from "@hickory/root";

export interface CuriousProps {
  render(p: CuriousRenderProps): React.ReactElement<any>;
  router?: CuriRouter;
  responsive?: boolean;
}

export interface CuriousRenderProps {
  router: CuriRouter;
  response: Response;
  action: Action;
}

export interface CuriousState {
  response: Response;
  action: Action;
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
      action: PropTypes.string
    })
  };

  constructor(props: CuriousProps, context: CuriContext) {
    super(props, context);

    this.isResponsive = !!(this.props.responsive || this.props.router);
    if (this.isResponsive) {
      let response: Response;
      let action: Action;

      if (this.props.router) {
        const initial = this.props.router.current();
        response = initial.response;
        action = initial.action;
      } else {
        response = this.context.curi.response;
        action = this.context.curi.action;
      }
      this.state = { response, action };
    }
  }

  componentDidMount() {
    if (this.props.responsive || this.props.router) {
      const router = this.props.router || this.context.curi.router;
      this.stopResponding = router.respond(
        (response: Response, action: Action) => {
          this.setState({ response, action });
        }
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
    const action = this.isResponsive ? this.state.action : curi.action;
    return this.props.render({ router, response, action });
  }
}
