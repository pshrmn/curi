import React from "react";

import {
  Page,
  HashSection,
  Paragraph,
  MultiSandbox,
  IJS
} from "../../components/example/common";

let meta = {
  title: "Multi-body Responses"
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

function MultiBodyExample() {
  return (
    <Page title={meta.title}>
      <HashSection meta={explanationMeta} tag="h2">
        <Paragraph>
          A response's <IJS>body</IJS> can contain multiple components for
          advanced layouts.
        </Paragraph>
      </HashSection>

      <HashSection meta={demoMeta} tag="h2">
        <MultiSandbox
          sandboxes={[
            {
              id: "github/pshrmn/curi/tree/master/examples/react/multi-body",
              name: "React"
            }
          ]}
        />
      </HashSection>
    </Page>
  );
}

export { MultiBodyExample as component, contents };
