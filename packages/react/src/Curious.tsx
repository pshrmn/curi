import React from "react";
import PropTypes from "prop-types";

import { CuriContext } from "./interface";
import { CuriRouter, Response } from "@curi/core";
import { Action } from "@hickory/root";

export interface CuriousProps {
  render(p: CuriousRenderProps): React.ReactElement<any>;
}

export interface CuriousRenderProps {
  router: CuriRouter;
  response: Response;
  action: Action;
}

export default class Curious extends React.Component<CuriousProps, {}> {
  static contextTypes = {
    curi: PropTypes.shape({
      router: PropTypes.object.isRequired,
      response: PropTypes.object.isRequired,
      action: PropTypes.string
    }).isRequired
  };

  render() {
    const { router, response, action } = this.context.curi;
    return this.props.render({ router, response, action });
  }
}
