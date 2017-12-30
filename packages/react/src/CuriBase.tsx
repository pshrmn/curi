import React from 'react';
import PropTypes from 'prop-types';
import { CuriRouter, Response } from '@curi/core';
import { CuriContext } from './interface';
import { Action } from '@hickory/root';

export interface CuriBaseProps {
  router: CuriRouter;
  render: (
    r: Response,
    action: string,
    c?: CuriRouter
  ) => React.ReactElement<any>;
  response: Response;
  action?: Action;
}

class CuriBase extends React.Component<CuriBaseProps> {
  static childContextTypes = {
    curi: PropTypes.shape({
      router: PropTypes.object,
      response: PropTypes.object,
      action: PropTypes.string
    })
  };

  static defaultProps = {
    action: 'POP'
  };

  getChildContext(): CuriContext {
    return {
      curi: {
        router: this.props.router,
        response: this.props.response,
        action: this.props.action
      }
    };
  }

  render(): React.ReactElement<any> {
    return this.props.render(
      this.props.response,
      this.props.action,
      this.props.router
    );
  }
}

export default CuriBase;
