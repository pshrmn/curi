import React from "react";

const NOTE_CLASSNAMES = "py-2 px-1 my-1 mx-0 border-gray-300";

export let Note = ({ children }) => {
  // .inline-code {
  //   background: ${color.white} !important;
  // }
  return (
    <aside className={`${NOTE_CLASSNAMES} bg-gray-200`}>
      <strong>Note:</strong> {children}
    </aside>
  );
};

export let Warning = ({ children }) => {
  // .inline-code {
  //   background: ${color.orange} !important;
  // }
  return (
    <aside
      className={`${NOTE_CLASSNAMES} bg-light-orange border-bright-orange`}
    >
      <strong>Warning:</strong> {children}
    </aside>
  );
};
