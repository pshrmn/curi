import React from "react";

import {
  HashSection,
  IJS,
  CodeSandboxDemo,
  OnGithub,
  onGitHubMeta
} from "../../../components/example/common";

const meta = {
  title: "Active Links"
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

function ActiveLinksExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection meta={explanationMeta}>
        <p>
          You may want to style a link differently when it is "active" (based on
          the current response object). You can do so using the{" "}
          <IJS>active</IJS> route interaction combined with the{" "}
          <IJS>curi-link</IJS> component.
        </p>
      </HashSection>

      <HashSection meta={demoMeta}>
        <CodeSandboxDemo
          id="github/pshrmn/curi/tree/master/examples/vue/active-links"
          title="Curi Vue active link demo"
        />
      </HashSection>

      <OnGithub path="vue/active-links" />
    </React.Fragment>
  );
}

export { ActiveLinksExample as component, contents };
