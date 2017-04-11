import React, { Component, PropTypes } from 'react';
//import PropTypes from 'prop-types';

class Navigator extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    children: PropTypes.func.isRequired,
    response: PropTypes.object
  }

  static childContextTypes = {
    curi: PropTypes.object
  }

  getChildContext() {
    return {
      curi: this.props.config
    }
  }

  state = {
    response: undefined
  }

  componentWillMount() {
    if (this.props.response) {
      this.setState(() => ({
        response: this.props.response
      }))
    } else {
      this.unsubscribe = this.props.config.subscribe((response) => {
        this.setState(() => ({
          response 
        }));
      });
    }
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
