import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Cmp,
  CodeSandboxDemo,
  OnGithub
} from "../../../components/example/common";

const meta = {
  title: "Async Navigation"
};

export default function AsyncNavExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection title="Explanation" id="explanation">
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

      <HashSection title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/react/async-nav" />
      </HashSection>

      <OnGithub path="react/async-nav" />
    </React.Fragment>
  );
}
