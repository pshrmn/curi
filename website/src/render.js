import React from "react";
import { Focus } from "@curi/react-dom";

import GlobalCSS from "./components/layout/GlobalCSS";
import Main from "./components/blocks/Main";
import Menu from "./components/blocks/Menu";

export default function render({ response }) {
  let { body: Body } = response;
  return (
    <React.Fragment>
      <GlobalCSS />
      <Menu />
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
