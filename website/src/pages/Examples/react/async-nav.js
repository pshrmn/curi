import React from "react";

import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../../components/highlight/Inline";
import { CodeBlock } from "../../../components/layout/Groups";
import { Section } from "../../../components/layout/Sections";
import CodeSandboxDemo from "../../../components/CodeSandboxDemo";
import { Explanation } from "../../../components/layout/Groups";
import OnGithub from "../../../components/example/OnGithub";

const meta = {
  title: "Async Navigation"
};

export default function AsyncNavExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Section title="Explanation" id="explanation">
        <Explanation>
          <p>
            If the <Cmp>Link</Cmp>'s <IJS>children</IJS> prop is a
            render-invoked function, it will be passed a boolean to indicate
            whether or not it is currently navigating. We can modify what the
            function returns to render a loading indicator while waiting for the
            navigation to complete.
          </p>
        </Explanation>

        <CodeBlock lang="jsx">
          {`<Link name="Movie" params={{ id: 'some_movie' }}>
  {navigating => (
    <React.Fragment>
      Some Movie {navigating ? <Spinner /> : null}
    </React.Fragment>
  )}
</Link>`}
        </CodeBlock>
      </Section>

      <Section title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/react/async-nav" />
      </Section>

      <OnGithub path="react/async-nav" />
    </React.Fragment>
  );
}
