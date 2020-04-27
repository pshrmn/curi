import React from "react";

let Outline = ({ children }) => {
  // .inline-code {
  //   background: ${color.blue} !important;
  // }
  return (
    <aside className="border border-border-blue p-2 my-1 mx-0 bg-light-blue">
      <p className="m-0">
        <strong>We will be doing the following:</strong>
      </p>
      <ul className="list-inside list-disc ml-5">{children}</ul>
    </aside>
  );
};

export default Outline;
