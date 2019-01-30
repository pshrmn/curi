import React from "react";

import {
  HashSection,
  Cmp,
  CodeSandboxDemo,
  OnGithub,
  onGitHubMeta
} from "../../../components/example/common";

const meta = {
  title: "Basics"
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

function AsyncExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection meta={explanationMeta}>
        <p>
          This example uses the <Cmp>Navigating</Cmp> component to render a
          button when there is an active asynchronous navigation. Clicking the
          button will cancel the navigation.
        </p>
      </HashSection>

      <HashSection meta={demoMeta}>
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/svelte/async-nav" />
      </HashSection>

      <OnGithub path="svelte/async-nav" />
    </React.Fragment>
  );
}

export { AsyncExample as component, contents };
