import React from "react";

import ExampleTemplate from "../templates/Example";
import { Explanation } from "../layout/Groups";
import ExampleLinks from "../links/lists/ExampleDropdown";

export default function ExampleList() {
  return (
    <ExampleTemplate>
      <h1>Curi Examples</h1>

      <Explanation>
        <p>
          Example projects that you can use for reference while building your
          own application. Most examples have CodeSandbox demos embedded with
          them. Each example includes source code available through the Curi
          package{" "}
          <a href="https://github.com/pshrmn/curi/tree/master/examples">
            on GitHub
          </a>.
        </p>
      </Explanation>

      <ExampleLinks />
    </ExampleTemplate>
  );
}
