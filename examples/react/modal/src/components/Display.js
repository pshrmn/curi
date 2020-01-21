import React from "react";
import { useResponse } from "@curi/react-dom";

import Modal from "./Modal";

/*
 * The <Display> uses response.location to determine if the response
 * should be rendered as a modal. If it should, it will use navigation.previous
 * to render the background.
 */
let Display = () => {
  let { response, navigation } = useResponse();
  let { body: Body, location } = response;

  // check if location.state.modal is set
  // and if there is a previous response
  let isModal = !!(
    location.state &&
    location.state.modal &&
    navigation.previous
  );

  if (isModal) {
    let { body: PrevBody } = navigation.previous;
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
