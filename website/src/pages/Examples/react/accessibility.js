import React from "react";

import {
  HashSection,
  Cmp,
  CodeSandboxDemo,
  OnGithub
} from "../../../components/example/common";

const meta = {
  title: "Accessibility"
};

export default function AccessibilityExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection title="Explanation" id="explanation">
        <p>
          This example demonstrates how to increase the accessibility of an
          application using the <Cmp>Focus</Cmp> component to handle focus
          management.
        </p>
      </HashSection>

      <HashSection title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/react/accessibility" />
      </HashSection>

      <OnGithub path="react/accessibility" />
    </React.Fragment>
  );
}
