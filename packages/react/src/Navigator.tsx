import React from 'react';
import PropTypes from 'prop-types';
import { CuriConfig, AnyResponse } from '@curi/core';
import { CuriContext } from './interface';

export interface NavigatorProps {
  config: CuriConfig;
  render: (r: AnyResponse, c?: CuriConfig) => React.ReactElement<any>;
  response?: AnyResponse;
}

export interface NavigatorState {
  response: AnyResponse;
}

class Navigator extends React.Component<NavigatorProps, NavigatorState> {
  unsubscribe: () => void;

  static childContextTypes = {
    curi: PropTypes.object,
    curiResponse: PropTypes.object
  };

  state: NavigatorState = {
    response: undefined
  };

  getChildContext(): CuriContext {
    return {
      curi: this.props.config,
      curiResponse: this.state.response
    };
  }

  setResponse = (response: AnyResponse) => {
    this.setState({ response });
  };

  componentWillMount() {
    if (this.props.response) {
      this.setResponse(this.props.response);
    } else {
      this.unsubscribe = this.props.config.subscribe(this.setResponse);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render(): React.ReactElement<any> {
    return this.props.render(this.state.response, this.props.config);
  }
}

export default Navigator;
