import React from "react";
import { Link } from "@curi/react";
import ExampleTiles from "../Examples/base/ExampleTiles";

export default () => (
  <div>
    <h1>Curi Examples</h1>
    <p>
      These are some Curi example projects that you can use for reference while
      building your own application. Most of these examples have CodeSandbox
      demos embedded with them, but some do not. Each example includes source
      code available through the Curi package{" "}
      <a href="https://github.com/pshrmn/curi/tree/master/examples">
        on GitHub
      </a>.
    </p>
    <ExampleTiles />
  </div>
);
