import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import { CuriConfig, AnyResponse } from '@curi/core';

export interface ActiveProps {
  children: any;
  name: string;
  params?: object;
  partial?: boolean;
  merge: (props: object) => object;
  curi?: CuriConfig;
  response?: AnyResponse;
}

class Active extends React.Component<ActiveProps, {}> {
  static contextTypes = {
    curi: PropTypes.object,
    curiResponse: PropTypes.object
  };

  static defaultProps = {
    partial: false
  };

  componentWillMount() {
    this.verifyActiveAddon();
  }

  verifyActiveAddon() {
    const curi = this.props.curi || this.context.curi;
    invariant(
      curi.addons.active,
      'You are attempting to use the "active" prop, but have not included the "active" ' +
        'addon (curi-addon-active) in your Curi configuration object.'
    );
  }

  render() {
    const curi = this.props.curi || this.context.curi;
    const response = this.props.response || this.context.curiResponse;
    const { merge, partial, name, params, children } = this.props;

    // need to make a copy
    let childProps = { ...children.props };
    const isActive = curi.addons.active(name, response, params, partial);
    if (isActive) {
      childProps = merge(childProps);
    }

    return React.cloneElement(children, { ...childProps });
  }
}

export default Active;
