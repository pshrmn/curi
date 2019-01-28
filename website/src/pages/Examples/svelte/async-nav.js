import React from "react";

import {
  HashSection,
  Cmp,
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
        <p>
          This example uses the <Cmp>Navigating</Cmp> component to render a
          button when there is an active asynchronous navigation. Clicking the
          button will cancel the navigation.
        </p>
      </HashSection>

      <HashSection title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/svelte/async-nav" />
      </HashSection>

      <OnGithub path="svelte/async-nav" />
    </React.Fragment>
  );
}
