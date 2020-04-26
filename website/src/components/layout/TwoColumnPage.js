import React from "react";

let StyledPage = ({ children, className = "", ...rest }) => {
  return (
    <div
      {...rest}
      className={`relative md:flex md:flex-row md:flex-no-wrap ${className}`}
    >
      {children}
    </div>
  );
};

export default StyledPage;
