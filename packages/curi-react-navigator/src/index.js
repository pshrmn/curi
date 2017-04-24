import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Navigator extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    children: PropTypes.func.isRequired,
    response: PropTypes.object
  };

  static childContextTypes = {
    curi: PropTypes.object
  };

  getChildContext() {
    return {
      curi: this.props.config
    };
  }

  state = {
    response: undefined
  };

  setResponse = response => {
    this.setState({ response });
  };

  componentWillMount() {
    if (this.props.response) {
      this.setResponse(this.props.response);
    } else {
      this.unsubscribe = this.props.config.subscribe(this.setResponse);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    return this.props.children(this.state.response, this.props.config);
  }
}

export default Navigator;
