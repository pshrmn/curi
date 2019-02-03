import React from "react";
import { useCuri } from "@curi/react-dom";

const Modal = ({ children }) => {
  const { router } = useCuri();
  return (
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
  );
};

export default Modal;
