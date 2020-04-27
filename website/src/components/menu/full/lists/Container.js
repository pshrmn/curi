import React from "react";

let StyledContainer = ({ children, className = "", ...rest }) => {
  return (
    <div
      {...rest}
      className={`${className} absolute w-screen left-0 text-purple border-0 border-b-2 border-purple`}
    >
      {children}
    </div>
  );
};

let FlexContainer = ({ children, ...rest }) => {
  return (
    <ul
      {...rest}
      className="flex flex-row flex-no-wrap justify-start bg-light-blue list-none m-0 p-0"
    >
      {children}
    </ul>
  );
};

let Container = ({ hidden, children }) => {
  return (
    <StyledContainer className={hidden ? "hidden" : "block"}>
      <FlexContainer>{children}</FlexContainer>
    </StyledContainer>
  );
};

export default Container;
