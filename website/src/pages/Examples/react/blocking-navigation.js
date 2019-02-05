import React from "react";

import {
  HashSection,
  IJS,
  CodeSandboxDemo,
  OnGithub,
  onGitHubMeta
} from "../../../components/example/common";

const meta = {
  title: "Blocking Navigation"
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

function BlockingNavigationExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection meta={explanationMeta}>
        <p>
          Sometimes, you don't want the user to leave the page. Ideally, this is
          when leaving the page would cause content to be lost, like a
          half-filled form, and not becacuse you're running a spam site.
        </p>
        <p>
          The <IJS>useBlock</IJS> hook will trigger a user confirmation that
          requires user input before navigation will occur.
        </p>
      </HashSection>

      <HashSection meta={demoMeta}>
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/react/blocking-navigation" />
      </HashSection>

      <OnGithub path="react/blocking-navigation" />
    </React.Fragment>
  );
}

export { BlockingNavigationExample as component, contents };
