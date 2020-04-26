import React from "react";

import Page from "./TwoColumnPage";

let StyledPage = ({ children, ...rest }) => {
  return (
    <Page {...rest} className="md:max-w-full">
      {children}
    </Page>
  );
};

let StyledBase = ({ children, ...rest }) => {
  return (
    <article {...rest} className="md:ml-64 md:pl-8">
      {children}
    </article>
  );
};

// top: 50px;
// bottom: 0px;
let StyledMenuWrapper = ({ children, ...rest }) => {
  return (
    <div
      {...rest}
      className="hidden md:block md:w-64 md:bg-gray-100 md:fixed md:bottom-0 md:overflow-auto md:flex-grow-0 md:flex-shrink-0 md:p-6 md:mr-6 md:order-first"
      style={{ top: "2rem" }}
    >
      {children}
    </div>
  );
};

export default function FancyPage({ base, menu }) {
  return (
    <StyledPage>
      <StyledBase>{base}</StyledBase>
      <StyledMenuWrapper>{menu}</StyledMenuWrapper>
    </StyledPage>
  );
}
