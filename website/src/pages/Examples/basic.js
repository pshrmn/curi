import React from "react";

import {
  Page,
  HashSection,
  MultiSandbox
} from "../../components/example/common";

let meta = {
  title: "Basics"
};

let explanationMeta = {
  title: "Explanation",
  hash: "explanation"
};
let demoMeta = {
  title: "Live Demo",
  hash: "demo"
};

let contents = [explanationMeta, demoMeta];

function BasicExample() {
  return (
    <Page title={meta.title}>
      <HashSection meta={explanationMeta} tag="h2">
        <p>
          A basic Curi application that defines routes and uses links to
          navigate between them.
        </p>
      </HashSection>

      <HashSection meta={demoMeta} tag="h2">
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
    </Page>
  );
}

export { BasicExample as component, contents };
