import React from "react";

let StyledPage = ({ children, ...rest }) => {
  return (
    <div {...rest} className="relative md:pt-4 md:pr-0 md:pb-0 md:pl-4">
      {children}
    </div>
  );
};

export default StyledPage;
