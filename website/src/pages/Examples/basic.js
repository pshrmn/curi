import React from "react";

import { HashSection, MultiSandbox } from "../../components/example/common";

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

function BasicExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection meta={explanationMeta}>
        <p>
          A basic Curi application that defines routes and uses links to
          navigate between them.
        </p>
      </HashSection>

      <HashSection meta={demoMeta}>
        <MultiSandbox
          sandboxes={[
            {
              id: "github/pshrmn/curi/tree/master/examples/react/basic",
              name: "React"
            },
            {
              id: "github/pshrmn/curi/tree/master/examples/vue/basic",
              name: "Vue"
            },
            {
              id: "github/pshrmn/curi/tree/master/examples/svelte/basic",
              name: "Svelte"
            }
          ]}
        />
      </HashSection>
    </React.Fragment>
  );
}

export { BasicExample as component, contents };
