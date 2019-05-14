import React from "react";
import { Link } from "@curi/react-dom";

import {
  HashSection,
  MultiSandbox,
  IJS
} from "../../components/example/common";

const meta = {
  title: "Basics"
};

const explanationMeta = {
  title: "Explanation",
  hash: "explanation"
};
const demoMeta = {
  title: "Live Demo",
  hash: "demo"
};

const contents = [explanationMeta, demoMeta];

function TransitionsExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection meta={explanationMeta}>
        <p>
          Route transitions can be animated by rendering both the previous and
          new content.
        </p>
      </HashSection>

      <HashSection meta={demoMeta}>
        <MultiSandbox
          sandboxes={[
            {
              id: "github/pshrmn/curi/tree/master/examples/react/transitions",
              name: "React"
            },
            {
              id: "github/pshrmn/curi/tree/master/examples/vue/transitions",
              name: "Vue"
            }
          ]}
        />
      </HashSection>
    </React.Fragment>
  );
}

export { TransitionsExample as component, contents };
