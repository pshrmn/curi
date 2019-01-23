import React from "react";

import CodeSandboxDemo from "../../../components/CodeSandboxDemo";
import { InlineJS as IJS } from "../../../components/highlight/Inline";
import { Section } from "../../../components/layout/Sections";
import { Explanation } from "../../../components/layout/Groups";
import OnGithub from "../../../components/example/OnGithub";

const meta = {
  title: "Accessibility"
};

export default function AccessibilityExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Section title="Explanation" id="explanation">
        <Explanation>
          <p>
            This example demonstrates how to increase the accessibility of an
            application using the <IJS>curi-focus</IJS> directive.
          </p>
        </Explanation>
      </Section>

      <Section title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/vue/accessibility" />
      </Section>

      <OnGithub path="vue/accessibility" />
    </React.Fragment>
  );
}
