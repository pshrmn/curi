import React from "react";

import {
  HashSection,
  IJS,
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
          application using the <IJS>curi-focus</IJS> directive.
        </p>
      </HashSection>

      <HashSection title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/vue/accessibility" />
      </HashSection>

      <OnGithub path="vue/accessibility" />
    </React.Fragment>
  );
}
