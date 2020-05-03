import React from "react";

import {
  Page,
  HashSection,
  Paragraph,
  MultiSandbox
} from "../../components/example/common";

let meta = {
  title: "Navigation Confirmation"
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

function ConfirmationExample() {
  return (
    <Page title={meta.title}>
      <HashSection meta={explanationMeta} tag="h2">
        <Paragraph>
          A Curi application that uses navigation confirmation to verify that
          the user wants to leave the current page.
        </Paragraph>
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
