import React from "react";
import PropTypes from "prop-types";
import {
  CuriRouter,
  ResponseHandlerProps,
  Response,
  Navigation
} from "@curi/core";
import { CuriContext } from "./interface";

export type CuriRenderFn = (
  props: ResponseHandlerProps
) => React.ReactElement<any>;

export interface CuriBaseProps {
  router: CuriRouter;
  render: CuriRenderFn;
  response: Response;
  navigation: Navigation;
}

class CuriBase extends React.Component<CuriBaseProps> {
  static childContextTypes = {
    curi: PropTypes.shape({
      router: PropTypes.object,
      response: PropTypes.object,
      navigation: PropTypes.object
    })
  };

  getChildContext(): CuriContext {
    return {
      curi: {
        router: this.props.router,
        response: this.props.response,
        navigation: this.props.navigation
      }
    };
  }

  render(): React.ReactElement<any> {
    const { response, navigation, router } = this.props;
    return this.props.render({ response, navigation, router });
  }
}

export default CuriBase;
