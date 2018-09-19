import React from "react";

import "../scss/messages.scss";

export const Note = ({ children }) => (
  <div className="note">
    <strong>Note:</strong> {children}
  </div>
);

export const Warning = ({ children }) => (
  <div className="warning">
    <strong>Warning:</strong> {children}
  </div>
);
