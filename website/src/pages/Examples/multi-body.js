import React from "react";

import {
  Page,
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
    <Page title={meta.title}>
      <HashSection meta={explanationMeta} tag="h2">
        <p>
          A response's <IJS>body</IJS> can contain multiple components for
          advanced layouts.
        </p>
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
