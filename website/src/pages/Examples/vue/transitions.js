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
          You can easily animate transitions between locations with Vue using
          the
          <Cmp>transition</Cmp> component.
        </p>
        <p>
          If you will be transitioning between the same route (i.e. using
          params), you will need to attach a <IJS>key</IJS> to the{" "}
          <Cmp>component</Cmp>.
        </p>
        <CodeBlock lang="html">
          {`<transition>
    <component
      :is="$curi.response.body"
      :key="$curi.response.location.key"
    />
  </transition>`}
        </CodeBlock>
      </Section>

      <Section title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/vue/transitions" />
      </Section>

      <Section title="On GitHub" id="source">
        If you want to run this code locally, the source code is available on
        GitHub{" "}
        <a href="https://github.com/pshrmn/curi/tree/master/examples/vue/transitions">
          here
        </a>.
      </Section>
    </React.Fragment>
  );
}
