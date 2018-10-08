import React from "react";

import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../../components/highlight/Inline";
import { CodeBlock } from "../../../components/layout/Groups";
import { Section } from "../../../components/layout/Sections";
import CodeSandboxDemo from "../../../components/CodeSandboxDemo";

const meta = {
  title: "Async Navigation"
};

export default function AsyncNavExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Section title="Explanation" id="explanation">
        <p>
          Use the <Cmp>Link</Cmp>'s <IJS>children</IJS> as a render-invoked
          function that knows whether or not the <Cmp>Link</Cmp> is currently
          navigating.
        </p>

        <CodeBlock lang="jsx">
          {`<Link to="Movie" params={{ id: 'some_movie' }}>
    {navigating => (
      <React.Fragment>
        Some Movie
        {navigating
          ? <Spinner />
          : null
        }
      </React.Fragment>
    )}
  </Link>`}
        </CodeBlock>
      </Section>

      <Section title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/react/async-nav" />
      </Section>

      <Section title="On GitHub" id="source">
        If you want to run this code locally, the source code is available on
        GitHub{" "}
        <a href="https://github.com/pshrmn/curi/tree/master/examples/react/async-nav">
          here
        </a>.
      </Section>
    </React.Fragment>
  );
}
