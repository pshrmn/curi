import React from "react";
import { useResponse } from "@curi/react-dom";

import Menu from "./menu/Menu";

let App = () => {
  let { response } = useResponse();
  let { body: Body } = response;
  let contents;
  if (response.data && response.data.content) {
    contents = response.data.content.contents;
  }
  return (
    <>
      <Menu contents={contents} />
      <main
        tabIndex={-1}
        className="w-screen max-w-full pt-3 px-3 pb-0 mb-10 md:pt-10 md:px-0 md:mb-0"
      >
        <Body response={response} />
      </main>
    </>
  );
};

export default React.memo(App);
