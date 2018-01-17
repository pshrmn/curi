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

  static contextTypes = {
    curi: PropTypes.shape({
      router: PropTypes.object.isRequired,
      response: PropTypes.object.isRequired,
      action: PropTypes.string
    })
  };

  constructor(props: CuriousProps, context: CuriContext) {
    super(props, context);
    this.state = { response: undefined, action: undefined };
  }

  componentDidMount() {
    if (this.props.responsive) {
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
    // when "responsive", try to use the state, fall back to context
    // if available
    const response = this.props.responsive
      ? this.state.response || (curi && curi.response)
      : curi.response;
    const action = this.props.responsive
      ? this.state.action || (curi && curi.action)
      : curi.action;
    return this.props.render({ router, response, action });
  }
}
