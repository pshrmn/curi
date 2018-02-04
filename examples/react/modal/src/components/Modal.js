import React from "react";
import { Curious } from "@curi/react";

const Modal = ({ children }) => (
  <Curious>
    {({ router }) => (
      <div className="modal">
        {children}
        <button
          type="button"
          onClick={e => {
            e.preventDefault();
            router.history.go(-1);
          }}
        >
          Close
        </button>
      </div>
    )}
  </Curious>
);

export default Modal;
