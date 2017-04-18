import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Block extends Component {

  static propTypes = {
    when: PropTypes.bool,
    message: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]).isRequired
  }

  static contextTypes = {
    curi: PropTypes.object.isRequired
  }

  static defaultProps = {
    when: true
  }

  on() {
    this.unblock = this.context.curi.history.block(this.props.message);
  }

  off() {
    if (this.unblock) {
      this.unblock();
      this.unblock = null;
    }
  }

  componentDidMount() {
    if (this.props.when) {
      this.on();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.when === prevProps.when && this.props.message === prevProps.message) {
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
