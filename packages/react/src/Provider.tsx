import React from 'react';
import PropTypes from 'prop-types';
import { CuriConfig } from '@curi/core';

export interface ProviderProps {
  curi: CuriConfig;
  children: any;
}

export default class CuriProvider extends React.Component<ProviderProps> {
  static propTypes = {
    curi: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
  };

  static childContextTypes = {
    curi: PropTypes.object
  };

  getChildContext() {
    return {
      curi: this.props.curi
    };
  }

  render() {
    return this.props.children;
  }
}
