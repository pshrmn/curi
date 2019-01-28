import React from "react";

import Page from "../layout/Page";
import ExampleLinks from "../links/lists/ExampleDropdown";

export default function ExampleList() {
  return (
    <Page>
      <h1>Curi Examples</h1>

      <p>
        Example projects that you can use for reference while building your own
        application. Most examples have CodeSandbox demos embedded with them.
        Each example includes source code available through the Curi package{" "}
        <a href="https://github.com/pshrmn/curi/tree/master/examples">
          on GitHub
        </a>
        .
      </p>

      <ExampleLinks />
    </Page>
  );
}
