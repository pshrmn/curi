import React from "react";
import { Focus } from "@curi/react-dom";

import GlobalCSS from "./components/layout/GlobalCSS";
import Main from "./components/blocks/Main";
import Menu from "./components/menu/Menu";

export default function render({ response }) {
  const { body: Body } = response;
  let contents;
  if (response.data && response.data.content) {
    contents = response.data.content.contents;
  }
  return (
    <React.Fragment>
      <GlobalCSS />
      <Menu contents={contents} />
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
