import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Cmp,
  CodeSandboxDemo,
  OnGithub,
  onGitHubMeta
} from "../../../components/example/common";

const meta = {
  title: "Async Navigation"
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

function AsyncNavExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection meta={explanationMeta}>
        <p>
          If the <Cmp>Link</Cmp>'s <IJS>children</IJS> prop is a render-invoked
          function, it will be passed a boolean to indicate whether or not it is
          currently navigating. We can modify what the function returns to
          render a loading indicator while waiting for the navigation to
          complete.
        </p>

        <CodeBlock lang="jsx">
          {`<Link name="Movie" params={{ id: 'some_movie' }}>
  {navigating => (
    <React.Fragment>
      Some Movie {navigating ? <Spinner /> : null}
    </React.Fragment>
  )}
</Link>`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={demoMeta}>
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/react/async-nav" />
      </HashSection>

      <OnGithub path="react/async-nav" />
    </React.Fragment>
  );
}

export { AsyncNavExample as component, contents };
