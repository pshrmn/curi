import React from "react";

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
