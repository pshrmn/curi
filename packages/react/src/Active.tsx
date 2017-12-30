import React from 'react';
import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import { CuriRouter, Response } from '@curi/core';
import { HickoryLocation } from '@hickory/root';

export interface ActiveProps {
  children: ReactElement<any>;
  name: string;
  params?: object;
  partial?: boolean;
  merge(props: object): object;
  extra?(l: HickoryLocation, d: object): boolean;
  details?: object;
  curi?: CuriRouter;
  response?: Response;
}

class Active extends React.Component<ActiveProps, {}> {
  static contextTypes = {
    curi: PropTypes.shape({
      router: PropTypes.object,
      response: PropTypes.object
    })
  };

  componentWillMount() {
    this.verifyActiveAddon();
  }

  verifyActiveAddon() {
    const curi = this.props.curi || this.context.curi.router;
    invariant(
      curi.addons.active,
      'You are attempting to use the "active" prop, but have not included the "active" ' +
        'addon (curi-addon-active) in your Curi router.'
    );
  }

  render() {
    const curi = this.props.curi || this.context.curi.router;
    const response = this.props.response || this.context.curi.response;
    const {
      extra,
      merge,
      partial = false,
      name,
      params,
      details,
      children
    } = this.props;
    return curi.addons.active(name, response, params, partial) &&
      (extra ? extra(response.location, details) : true)
      ? React.cloneElement(children, merge({ ...children.props }))
      : children;
  }
}

export default Active;
