import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Block extends React.Component {

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

  componentWillReceiveProps(nextProps) {
  }

  componentDidUpdate() {
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
