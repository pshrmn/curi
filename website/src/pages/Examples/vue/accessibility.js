import React from "react";

import CodeSandboxDemo from "../../../components/CodeSandboxDemo";
import { InlineJS as IJS } from "../../../components/highlight/Inline";
import { Note } from "../../../components/Messages";
import { Section } from "../../../components/layout/Sections";

const meta = {
  title: "Accessibility"
};

export default function AccessibilityExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Section title="Explanation" id="explanation">
        <p>
          This example demonstrates how to increase the accessibility of an
          application using the <IJS>curi-focus</IJS> directive.
        </p>
      </Section>

      <Section title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/vue/accessibility" />
      </Section>

      <Section title="On GitHub" id="source">
        <p>
          If you want to run this code locally, the source code is available on
          GitHub{" "}
          <a href="https://github.com/pshrmn/curi/tree/master/examples/vue/accessibility">
            here
          </a>.
        </p>
      </Section>
    </React.Fragment>
  );
}
