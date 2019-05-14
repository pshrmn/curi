import React from "react";

import {
  HashSection,
  MultiSandbox,
  IJS
} from "../../components/example/common";

const meta = {
  title: "Multi-body Responses"
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

function MultiBodyExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection meta={explanationMeta}>
        <p>
          A response's <IJS>body</IJS> can contain multiple components for
          advanced layouts.
        </p>
      </HashSection>

      <HashSection meta={demoMeta}>
        <MultiSandbox
          sandboxes={[
            {
              id: "github/pshrmn/curi/tree/master/examples/react/multi-body",
              name: "React"
            }
          ]}
        />
      </HashSection>
    </React.Fragment>
  );
}

export { MultiBodyExample as component, contents };
