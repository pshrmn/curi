import React from "react";
import { useRouter } from "@curi/react-dom";

const Modal = ({ children }) => {
  const router = useRouter();
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
