import React from "react";
import { useCuri } from "@curi/react-dom";

import Modal from "./Modal";

/*
 * The <Display> uses response.location to determine if the response
 * should be rendered as a modal. If it should, it will use navigation.previous
 * to render the background.
 */
const Display = ({ render }) => {
  const { response, navigation } = useCuri();
  const { body: Body, location } = response;

  // check if location.state.modal is set
  // and if there is a previous response
  const isModal = !!(
    location.state &&
    location.state.modal &&
    navigation.previous
  );

  if (isModal) {
    const { body: PrevBody } = navigation.previous;
    return (
      <div>
        <PrevBody response={navigation.previous} />
        <Modal>
          <Body response={response} />
        </Modal>
      </div>
    );
  }

  return (
    <div>
      <Body response={response} />
    </div>
  );
};

export default Display;
