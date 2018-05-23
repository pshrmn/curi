import React from "react";
import BaseExample from "../base/BaseExample";
import {
  PrismBlock,
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../../components/PrismBlocks";
import { Section } from "../../../components/Sections";
import CodeSandboxDemo from "../../../components/CodeSandboxDemo";

export default ({ name }) => (
  <BaseExample>
    <h1>{name}</h1>
    <Section title="Explanation" id="explanation">
      <p>
        Use the <Cmp>Link</Cmp>'s <IJS>children</IJS> as a render-invoked prop
        that knows whether or not the <Cmp>Link</Cmp> is currently navigating.
      </p>

      <PrismBlock lang="javascript">
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
      </PrismBlock>
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
  </BaseExample>
);
