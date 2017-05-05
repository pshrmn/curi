import React from 'react';
import PropTypes from 'prop-types';
import Nav from './components/Nav';

const Modal = (props) => (
  <div className='modal'>
    {props.children}
    <button
      type='button'
      onClick={(e) => {
        e.preventDefault();
        props.history.goBack();
      }}
    >
      Close
    </button>
  </div>
);

/*
 * The <Cacher> is responsible for storing its props.children
 * value as this.previousChildren when thee location changes.
 * This allows you to continue rendering the previous children
 * element(s).
 */
class Cacher extends React.Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    response: PropTypes.shape({
      location: PropTypes.object.isRequired
    }).isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { response:newResponse } = nextProps;
    const { response:currentResponse } = this.props;
    const { location:newLocation } = newResponse;
    const { location:currentLocation } = currentResponse;
    if (newLocation !== currentLocation && newLocation.state && newLocation.state.modal) {
      this.previousChildren = this.props.children;
    }
  }

  render() {
    const { response, history } = this.props;
    const { location } = response;
    const isModal = !!(location.state && location.state.modal && this.previousChildren);
    return (
      <div>
        { isModal ? this.previousChildren : this.props.children }
        { isModal && <Modal history={history}>{this.props.children}</Modal>}
      </div>
    );
  }
}

function render(response, config) {
  const { location, params, body:Body } = response;
  return (
    <div>
      <Nav />
      <Cacher response={response} history={config.history}>
        <Body params={params} location={location} />
      </Cacher>
    </div>
  );
}

export default render;
