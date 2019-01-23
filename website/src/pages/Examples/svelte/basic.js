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
            Curi's Svelte implementation relies on the Svelte store to access
            route related data throughout the application.
          </p>
        </Explanation>
      </Section>

      <Section title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/svelte/basic" />
      </Section>

      <OnGithub path="svelte/basic" />
    </React.Fragment>
  );
}
