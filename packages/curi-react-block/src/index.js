import React from 'react';
import PropTypes from 'prop-types';

class Block extends React.Component {
  static propTypes = {
    when: PropTypes.bool,
    confirm: PropTypes.func.isRequired
  };

  static contextTypes = {
    curi: PropTypes.object.isRequired
  };

  static defaultProps = {
    when: true
  };

  on() {
    this.context.curi.history.confirmWith(this.props.confirm);
  }

  off() {
    this.context.curi.history.removeConfirmation();
  }

  componentDidMount() {
    if (this.props.when) {
      this.on();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.when === prevProps.when &&
      this.props.confirm === prevProps.confirm
    ) {
      return;
    }
    this.off();
    if (this.props.when) {
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
