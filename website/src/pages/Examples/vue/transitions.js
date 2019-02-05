import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  CodeSandboxDemo,
  OnGithub,
  onGitHubMeta
} from "../../../components/example/common";

const meta = {
  title: "Transitions"
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

function TransitionsExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection meta={explanationMeta}>
        <p>
          Route transitions can be performed using Vue's <IJS>transition</IJS>{" "}
          component.
        </p>

        <p>
          Transitions generally need a key to identify when to perform a
          transition. The location's <IJS>pathname</IJS> is generally ideal for
          this.
        </p>

        <CodeBlock lang="html">
          {`<transition>
  <component
    :is="$curi.response.body"
    :key="$curi.response.location.pathname"
  />
</transition>`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={demoMeta}>
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/vue/transitions" />
      </HashSection>

      <OnGithub path="vue/transitions" />
    </React.Fragment>
  );
}

export { TransitionsExample as component, contents };
