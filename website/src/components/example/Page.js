import React from "react";

let ExamplePage = ({ title, children }) => {
  return (
    <React.Fragment>
      <h1 tabIndex={-1} className="outline-none">
        {title}
      </h1>
      {children}
    </React.Fragment>
  );
};

export default ExamplePage;
