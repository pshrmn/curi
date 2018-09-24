import React from "react";

export default function Outline({ children }) {
  return (
    <div className="tutorial-outline">
      <p>In this tutorial, we will be doing the following:</p>
      {children}
    </div>
  );
}
