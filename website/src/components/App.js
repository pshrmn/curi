import React from "react";
import { useCuri, useNavigationFocus } from "@curi/react-dom";

import GlobalCSS from "./layout/GlobalCSS";
import Main from "./blocks/Main";
import Menu from "./menu/Menu";

export default function App() {
  const { response } = useCuri();
  const { body: Body } = response;

  const ref = React.createRef();
  useNavigationFocus(ref, {
    preventScroll: true
  });

  let contents;
  if (response.data && response.data.content) {
    contents = response.data.content.contents;
  }
  return (
    <React.Fragment>
      <GlobalCSS />
      <Menu contents={contents} />
      <Main ref={ref} tabIndex={-1} style={{ outline: "none" }}>
        <Body response={response} />
      </Main>
    </React.Fragment>
  );
}
