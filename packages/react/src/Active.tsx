import React from 'react';
import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import { CuriConfig, Response } from '@curi/core';

export interface ActiveProps {
  children: ReactElement<any>;
  name: string;
  params?: object;
  partial?: boolean;
  merge: (props: object) => object;
  curi?: CuriConfig;
  response?: Response;
}

class Active extends React.Component<ActiveProps, {}> {
  static contextTypes = {
    curi: PropTypes.shape({
      config: PropTypes.object,
      response: PropTypes.object
    })
  };

  componentWillMount() {
    this.verifyActiveAddon();
  }

  verifyActiveAddon() {
    const curi = this.props.curi || this.context.curi.config;
    invariant(
      curi.addons.active,
      'You are attempting to use the "active" prop, but have not included the "active" ' +
        'addon (curi-addon-active) in your Curi configuration object.'
    );
  }

  render() {
    const curi = this.props.curi || this.context.curi.config;
    const response = this.props.response || this.context.curi.response;
    const { merge, partial = false, name, params, children } = this.props;
    return curi.addons.active(name, response, params, partial)
      ? React.cloneElement(children, merge({ ...children.props }))
      : children;
  }
}

export default Active;
