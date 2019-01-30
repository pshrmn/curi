import React from "react";

import {
  HashSection,
  IJS,
  CodeSandboxDemo,
  OnGithub,
  onGitHubMeta
} from "../../../components/example/common";

const meta = {
  title: "Breadcrumbs"
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

function BreadcrumbsExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection meta={explanationMeta}>
        <p>
          The <IJS>@curi/route-ancestors</IJS> package lets you know what routes
          are the ancestors of another route. Using this, we can build
          breadcrumb links.
        </p>
      </HashSection>

      <HashSection meta={demoMeta}>
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/svelte/breadcrumbs" />
      </HashSection>

      <OnGithub path="svelte/breadcrumbs" />
    </React.Fragment>
  );
}

export { BreadcrumbsExample as component, contents };
