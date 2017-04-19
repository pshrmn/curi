import React from 'react';
import PropTypes from 'prop-types';
import Nav from './components/Nav';

const Modal = (props) => (
  <div className='modal'>
    {props.children}
  </div>
);

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
    const { response } = this.props;
    const { location } = response;
    const isModal = !!(location.state && location.state.modal && this.previousChildren);
    return (
      <div>
        { isModal ? this.previousChildren : this.props.children }
        { isModal && <Modal>{this.props.children}</Modal>}
      </div>
    );
  }
}

function render(response) {
  const { location, params, body:Body } = response;
  console.log('with', response);
  return (
    <div>
      <Nav />
      <Cacher response={response}>
        <Body params={params} />
      </Cacher>
    </div>
  );
}

export default render;
