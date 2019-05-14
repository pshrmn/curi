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

function AccessibilityExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection meta={explanationMeta}>
        <p>
          Focus management after navigation is important for improving the
          accessibility of an application.
        </p>
      </HashSection>

      <HashSection meta={demoMeta}>
        <MultiSandbox
          sandboxes={[
            {
              id: "github/pshrmn/curi/tree/master/examples/react/accessibility",
              name: "React"
            },
            {
              id: "github/pshrmn/curi/tree/master/examples/vue/accessibility",
              name: "Vue"
            }
          ]}
        />
      </HashSection>
    </React.Fragment>
  );
}

export { AccessibilityExample as component, contents };
