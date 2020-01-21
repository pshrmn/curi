import React from "react";
import { useRouter } from "@curi/react-dom";

let Modal = ({ children }) => {
  let router = useRouter();
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
