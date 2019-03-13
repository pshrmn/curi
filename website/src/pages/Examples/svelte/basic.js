import React from "react";

import {
  HashSection,
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

function BasicExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection meta={explanationMeta}>
        <p>
          Curi's Svelte implementation relies on the Svelte store to access
          route related data throughout the application.
        </p>
      </HashSection>

      <HashSection meta={demoMeta}>
        <CodeSandboxDemo
          id="github/pshrmn/curi/tree/master/examples/svelte/basic"
          title="Curi Svelte basic demo"
        />
      </HashSection>

      <OnGithub path="svelte/basic" />
    </React.Fragment>
  );
}

export { BasicExample as component, contents };
