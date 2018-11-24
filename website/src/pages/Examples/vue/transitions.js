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
  title: "Transitions"
};

export default function TransitionsExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Section title="Explanation" id="explanation">
        <Explanation>
          <p>
            Route transitions can be performed using Vue's <Cmp>transition</Cmp>{" "}
            component.
          </p>
          <p>
            Transitions generally need a key to identify when to perform a
            transition. The location's <IJS>pathname</IJS> is generally ideal
            for this.
          </p>
        </Explanation>

        <CodeBlock lang="html">
          {`<transition>
  <component
    :is="$curi.response.body"
    :key="$curi.response.location.pathname"
  />
</transition>`}
        </CodeBlock>
      </Section>

      <Section title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/vue/transitions" />
      </Section>

      <OnGithub path="vue/transitions" />
    </React.Fragment>
  );
}
