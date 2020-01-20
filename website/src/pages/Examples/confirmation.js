import React from "react";

import {
  Page,
  HashSection,
  MultiSandbox
} from "../../components/example/common";

const meta = {
  title: "Navigation Confirmation"
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

function ConfirmationExample() {
  return (
    <Page title={meta.title}>
      <HashSection meta={explanationMeta} tag="h2">
        <p>
          A Curi application that uses navigation confirmation to verify that
          the user wants to leave the current page.
        </p>
      </HashSection>

      <HashSection meta={demoMeta} tag="h2">
        <MultiSandbox
          sandboxes={[
            {
              id: "github/pshrmn/curi/tree/master/examples/react/confirmation",
              name: "React"
            }
          ]}
        />
      </HashSection>
    </Page>
  );
}

export { ConfirmationExample as component, contents };
