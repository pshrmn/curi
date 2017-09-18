import React from 'react';
import PropTypes from 'prop-types';

class Block extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    confirm: PropTypes.func.isRequired
  };

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

  componentDidUpdate(prevProps) {
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

  render() {
    return null;
  }
}

export default Block;
