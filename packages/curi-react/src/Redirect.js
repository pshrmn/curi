import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Redirect extends Component {

  static propTypes = {
    to: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]).isRequired
  }

  static contextTypes = {
    curi: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.context.curi.history.replace(this.props.to)
  }

  render() {
    return null;
  }
}

export default Redirect;
