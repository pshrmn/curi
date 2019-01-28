import React from "react";

import {
  HashSection,
  Explanation,
  CodeBlock,
  IJS,
  Cmp,
  CodeSandboxDemo,
  OnGithub
} from "../../../components/example/common";

const meta = {
  title: "Transitions"
};

export default function TransitionsExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection title="Explanation" id="explanation">
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
      </HashSection>

      <HashSection title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/vue/transitions" />
      </HashSection>

      <OnGithub path="vue/transitions" />
    </React.Fragment>
  );
}
