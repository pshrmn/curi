import React from 'react';
import PropTypes from 'prop-types';
import { CuriConfig, Response } from '@curi/core';
import { CuriContext } from './interface';
import { Action } from '@hickory/root';

export interface NavigatorProps {
  config: CuriConfig;
  render: (
    r: Response,
    action: string,
    c?: CuriConfig
  ) => React.ReactElement<any>;
  response: Response;
  action: Action;
}

class Navigator extends React.Component<NavigatorProps> {
  static childContextTypes = {
    curi: PropTypes.shape({
      config: PropTypes.object,
      response: PropTypes.object,
      action: PropTypes.string
    })
  };

  getChildContext(): CuriContext {
    return {
      curi: {
        config: this.props.config,
        response: this.props.response,
        action: this.props.action
      }
    };
  }

  render(): React.ReactElement<any> {
    return this.props.render(
      this.props.response,
      this.props.action,
      this.props.config
    );
  }
}

export default Navigator;
