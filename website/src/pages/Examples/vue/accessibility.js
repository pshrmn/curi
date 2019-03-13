import React from "react";

import {
  HashSection,
  IJS,
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
          application using the <IJS>curi-focus</IJS> directive.
        </p>
      </HashSection>

      <HashSection meta={demoMeta}>
        <CodeSandboxDemo
          id="github/pshrmn/curi/tree/master/examples/vue/accessibility"
          title="Curi Vue accessibility demo"
        />
      </HashSection>

      <OnGithub path="vue/accessibility" />
    </React.Fragment>
  );
}

export { AccessibilityExample as component, contents };
