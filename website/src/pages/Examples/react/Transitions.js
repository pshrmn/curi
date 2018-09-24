import React from "react";

import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../../components/highlight/Inline";
import { CodeBlock } from "../../../components/layout/Groups";
import { Section } from "../../../components/layout/Sections";
import CodeSandboxDemo from "../../../components/CodeSandboxDemo";

export default function TransitionsExample() {
  return (
    <React.Fragment>
      <Section title="Explanation" id="explanation">
        <p>
          This example uses <IJS>react-transition-group</IJS> (v1) to animate
          navigation transitions, but it should be relatively straightforward to
          adapt this for other animation packages (e.g. react-motion).
        </p>

        <p>
          All that this does is to render a <Cmp>CSSTransitionGroup</Cmp> around
          the response's body. The only other thing that you need to do is to
          set a key on the rendered component, which is necessary for{" "}
          <Cmp>CSSTransitionGroup</Cmp> to know which of its children are
          entering/leaving/staying.
        </p>

        <CodeBlock lang="jsx">
          {`function render({ response }) {
    return (
      <CSSTransitionGroup>
        <response.body key={response.location.pathname} />
      </CSSTransitionGroup>
    );
  }`}
        </CodeBlock>
      </Section>

      <Section title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/react/transitions" />
      </Section>

      <Section title="On GitHub" id="source">
        If you want to run this code locally, the source code is available on
        GitHub{" "}
        <a href="https://github.com/pshrmn/curi/tree/master/examples/react/transitions">
          here
        </a>.
      </Section>
    </React.Fragment>
  );
}
