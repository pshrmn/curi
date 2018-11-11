import React from "react";

export default function Outline({ children }) {
  return (
    <div className="tutorial-outline">
      <p>
        <strong>We will be doing the following:</strong>
      </p>
      {children}
    </div>
  );
}
