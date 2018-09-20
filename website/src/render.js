import React from "react";
import { Focus } from "@curi/react-dom";
import Header from "./components/Header";

import "./scss/index.scss";
import "./scss/main.scss";

export default function render({ response }) {
  let { body: Body } = response;
  return (
    <React.Fragment>
      <Header />
      <Focus>
        {ref => (
          <main ref={ref} tabIndex={-1} style={{ outline: "none" }}>
            <Body response={response} />
          </main>
        )}
      </Focus>
    </React.Fragment>
  );
}
