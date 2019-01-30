import React from "react";

import {
  HashSection,
  CodeSandboxDemo,
  OnGithub,
  onGitHubMeta
} from "../../../components/example/common";

const meta = {
  title: "Data Loading"
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
function DataLoadingExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection meta={explanationMeta}>
        <p>TBD</p>
      </HashSection>

      <HashSection meta={demoMeta}>
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/react/data-loading" />
      </HashSection>

      <OnGithub path="react/data-loading" />
    </React.Fragment>
  );
}

export { DataLoadingExample as component, contents };
