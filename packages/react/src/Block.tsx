import React from 'react';
import PropTypes from 'prop-types';
import { ConfirmationFunction } from '@hickory/root';
import { CuriRouter } from '@curi/core';

export interface BlockProps {
  active?: boolean;
  confirm: ConfirmationFunction;
  curi?: CuriRouter;
}

class Block extends React.Component<BlockProps> {
  static contextTypes = {
    curi: PropTypes.shape({
      router: PropTypes.object
    })
  };

  static defaultProps = {
    active: true
  };

  on() {
    const curi = this.props.curi || this.context.curi.router;
    curi.history.confirmWith(this.props.confirm);
  }

  off() {
    const curi = this.props.curi || this.context.curi.router;
    curi.history.removeConfirmation();
  }

  componentDidMount() {
    if (this.props.active) {
      this.on();
    }
  }

  componentDidUpdate(prevProps: BlockProps) {
    if (
      this.props.active === prevProps.active &&
      this.props.confirm === prevProps.confirm
    ) {
      return;
    }
    this.off();
    if (this.props.active) {
      this.on();
    }
  }

  componentWillUnmount() {
    this.off();
  }

  render(): null {
    return null;
  }
}

export default Block;
