import React from 'react';
import PropTypes from 'prop-types';
import { ConfirmationFunction } from '@hickory/root';

export interface BlockProps {
  active?: boolean;
  confirm: ConfirmationFunction;
}

class Block extends React.Component<BlockProps> {
  static contextTypes = {
    curi: PropTypes.object.isRequired
  };

  static defaultProps = {
    active: true
  };

  on() {
    this.context.curi.history.confirmWith(this.props.confirm);
  }

  off() {
    this.context.curi.history.removeConfirmation();
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
