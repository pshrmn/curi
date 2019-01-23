import React from "react";

import {
  Section,
  Explanation,
  CodeSandboxDemo,
  OnGithub
} from "../../../components/example/common";

const meta = {
  title: "Basics"
};

export default function BasicExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Section title="Explanation" id="explanation">
        <Explanation>
          <p>
            This example demonstrates the basics of a Curi + React application.
          </p>
        </Explanation>
      </Section>

      <Section title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/react/basic" />
      </Section>

      <OnGithub path="react/basic" />
    </React.Fragment>
  );
}
