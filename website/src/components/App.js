import React from "react";
import { useResponse } from "@curi/react-dom";

import GlobalCSS from "./layout/GlobalCSS";
import Main from "./blocks/Main";
import Menu from "./menu/Menu";

export default function App() {
  const { response } = useResponse();
  const { body: Body } = response;
  let contents;
  if (response.data && response.data.content) {
    contents = response.data.content.contents;
  }
  return (
    <React.Fragment>
      <GlobalCSS />
      <Menu contents={contents} />
      <Main tabIndex={-1} style={{ outline: "none" }}>
        <Body response={response} />
      </Main>
    </React.Fragment>
  );
}
