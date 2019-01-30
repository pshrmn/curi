import React from "react";

import {
  HashSection,
  Cmp,
  CodeSandboxDemo,
  OnGithub,
  onGitHubMeta
} from "../../../components/example/common";

const meta = {
  title: "Accessibility"
};

const explanationMeta = {
  title: "Explanation",
  hash: "explanation"
};
const demoMeta = {
  title: "Live Demo",
  hash: "demo"
};

const contents = [explanationMeta, demoMeta, onGitHubMeta];

function AccessibilityExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection meta={explanationMeta}>
        <p>
          This example demonstrates how to increase the accessibility of an
          application using the <Cmp>Focus</Cmp> component to handle focus
          management.
        </p>
      </HashSection>

      <HashSection meta={demoMeta}>
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/react/accessibility" />
      </HashSection>

      <OnGithub path="react/accessibility" />
    </React.Fragment>
  );
}

export { AccessibilityExample as component, contents };
