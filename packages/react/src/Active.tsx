import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';

export interface ActiveProps {
  children: any;
  name: string;
  params?: object;
  partial?: boolean;
  merge: (props: object) => object;
}

class Active extends React.Component<ActiveProps, {}> {
  static contextTypes = {
    curi: PropTypes.object.isRequired,
    curiResponse: PropTypes.object
  };

  static defaultProps = {
    partial: false
  };

  componentWillMount() {
    this.verifyActiveAddon();
  }

  verifyActiveAddon() {
    invariant(
      this.context.curi.addons.active,
      'You are attempting to use the "active" prop, but have not included the "active" ' +
        'addon (curi-addon-active) in your Curi configuration object.'
    );
  }

  render() {
    const { curi, curiResponse } = this.context;
    const { merge, partial, name, params, children } = this.props;

    // need to make a copy
    let childProps = { ...children.props };
    const isActive = curi.addons.active(name, curiResponse, params, partial);
    if (isActive) {
      childProps = merge(childProps);
    }

    return React.cloneElement(children, { ...childProps });
  }
}

export default Active;
