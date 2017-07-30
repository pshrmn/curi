import React from 'react';
import PropTypes from 'prop-types';

class Navigator extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    render: PropTypes.func.isRequired,
    response: PropTypes.object
  };

  static childContextTypes = {
    curi: PropTypes.object,
    curiResponse: PropTypes.object
  };

  state = {
    response: undefined
  };

  getChildContext() {
    return {
      curi: this.props.config,
      curiResponse: this.state.response
    };
  }

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
    return this.props.render(this.state.response, this.props.config);
  }
}

export default Navigator;
