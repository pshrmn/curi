import React from "react";

import {
  Page,
  HashSection,
  MultiSandbox
} from "../../components/example/common";

const meta = {
  title: "Focus Management"
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
    <Page title={meta.title}>
      <HashSection meta={explanationMeta} tag="h2">
        <p>
          Focus management after navigation is important for improving the
          accessibility of an application.
        </p>
      </HashSection>

      <HashSection meta={demoMeta} tag="h2">
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
    </Page>
  );
}

export { AccessibilityExample as component, contents };
