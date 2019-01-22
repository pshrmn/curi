import React from "react";
import { Focus } from "@curi/react-dom";

import GlobalCSS from "./components/layout/GlobalCSS";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";

export default function render({ response }) {
  let { body: Body } = response;
  return (
    <React.Fragment>
      <GlobalCSS />
      <Header />
      <Focus preventScroll={true}>
        {ref => (
          <Main ref={ref} tabIndex={-1} style={{ outline: "none" }}>
            <Body response={response} />
          </Main>
        )}
      </Focus>
    </React.Fragment>
  );
}
