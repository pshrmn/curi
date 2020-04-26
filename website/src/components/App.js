import React from "react";
import { useResponse } from "@curi/react-dom";

import Main from "./blocks/Main";
import Menu from "./menu/Menu";

export default function App() {
  let { response } = useResponse();
  let { body: Body } = response;
  let contents;
  if (response.data && response.data.content) {
    contents = response.data.content.contents;
  }
  return (
    <>
      <Menu contents={contents} />
      <Main tabIndex={-1}>
        <Body response={response} />
      </Main>
    </>
  );
}
