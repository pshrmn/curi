import React from "react";

import {
  HashSection,
  IJS,
  Cmp,
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
          <IJS>active</IJS> router interaction combined with the <Cmp>Link</Cmp>{" "}
          component.
        </p>
      </HashSection>

      <HashSection meta={demoMeta}>
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/svelte/active-links" />
      </HashSection>

      <OnGithub path="svelte/active-links" />
    </React.Fragment>
  );
}

export { ActiveLinksExample as component, contents };
