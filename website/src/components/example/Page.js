import React from "react";

let ExamplePage = ({ title, children }) => {
  return (
    <>
      <h1 tabIndex={-1} className="outline-none">
        {title}
      </h1>
      {children}
    </>
  );
};

export default ExamplePage;
