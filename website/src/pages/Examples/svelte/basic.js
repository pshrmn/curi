import React from "react";

import {
  HashSection,
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

      <HashSection title="Explanation" id="explanation">
        <Explanation>
          <p>
            Curi's Svelte implementation relies on the Svelte store to access
            route related data throughout the application.
          </p>
        </Explanation>
      </HashSection>

      <HashSection title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/svelte/basic" />
      </HashSection>

      <OnGithub path="svelte/basic" />
    </React.Fragment>
  );
}
