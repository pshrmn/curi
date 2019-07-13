import React from "react";

import {
  Page,
  HashSection,
  MultiSandbox
} from "../../components/example/common";

const meta = {
  title: "Route Transitions"
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
    <Page title={meta.title}>
      <HashSection meta={explanationMeta} tag="h2">
        <p>
          Route transitions can be animated by rendering both the previous and
          new content.
        </p>
      </HashSection>

      <HashSection meta={demoMeta} tag="h2">
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
    </Page>
  );
}

export { TransitionsExample as component, contents };
