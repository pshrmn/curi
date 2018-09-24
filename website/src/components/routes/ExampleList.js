import React from "react";
import { Link } from "@curi/react-dom";

import ExampleTemplate from "../templates/Example";
import { Explanation } from "../layout/Groups";
import { Note } from "../Messages";
import { InlineJS as IJS } from "../highlight/Inline";

const ExampleList = () => (
  <ExampleTemplate>
    <h1>Curi Examples</h1>

    <Explanation>
      <p>
        Example projects that you can use for reference while building your own
        application. Most examples have CodeSandbox demos embedded with them.
        Each example includes source code available through the Curi package{" "}
        <a href="https://github.com/pshrmn/curi/tree/master/examples">
          on GitHub
        </a>.
      </p>
    </Explanation>
  </ExampleTemplate>
);

export default ExampleList;
