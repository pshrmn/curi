import React from "react";

import {
  Page,
  HashSection,
  Paragraph,
  MultiSandbox
} from "../../components/example/common";

let meta = {
  title: "Route Transitions"
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

function TransitionsExample() {
  return (
    <Page title={meta.title}>
      <HashSection meta={explanationMeta} tag="h2">
        <Paragraph>
          Route transitions can be animated by rendering both the previous and
          new content.
        </Paragraph>
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
