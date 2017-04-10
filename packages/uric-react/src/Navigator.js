import React, { Component, PropTypes } from 'react';
//import PropTypes from 'prop-types';

class Navigator extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    children: PropTypes.func.isRequired
  }

  static childContextTypes = {
    uric: PropTypes.object
  }

  getChildContext() {
    return {
      uric: this.props.config
    }
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.unsubscribe = this.props.config.subscribe((response) => {
      this.setState(() => ({
        response 
      }));
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    return this.props.children(this.state.response);
  }
}

export default Navigator;
