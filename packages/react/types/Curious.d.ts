/// <reference types="react" />
import React from "react";
import PropTypes from "prop-types";
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
  static contextTypes: {
    curi: PropTypes.Validator<any>;
  };
  render(): React.ReactElement<any>;
}
