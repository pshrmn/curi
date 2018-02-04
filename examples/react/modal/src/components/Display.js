import React from "react";
import PropTypes from "prop-types";

import Modal from "./Modal";

/*
 * The <Display> uses response.location to determine if the response
 * should be rendered as a modal. If it should, it will use navigation.previous
 * to render the background.
 */
const Display = ({ response, navigation, render }) => {
  const { location } = response;
  // check if location.state.modal is set
  // and if there is a previous response
  const isModal = !!(
    location.state &&
    location.state.modal &&
    navigation.previous
  );
  return (
    <div>
      {render(isModal ? navigation.previous : response)}
      {isModal && <Modal>{render(response)}</Modal>}
    </div>
  );
};

Display.propTypes = {
  response: PropTypes.shape({
    location: PropTypes.object.isRequired
  }).isRequired,
  navigation: PropTypes.shape({
    action: PropTypes.string,
    previous: PropTypes.object
  }).isRequired
};

export default Display;
