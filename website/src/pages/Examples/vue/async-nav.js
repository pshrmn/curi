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
          Use the <Cmp>curi-link</Cmp>'s <IJS>slot</IJS> as scoped-slot so you
          can know whether or not the link is currently navigating.
        </p>

        <CodeBlock lang="jsx">
          {`<curi-link to="Movie" :params="{ id: 'some_movie' }">
  <template slot-scope="{ navigating }">
    Some Movie
    <Spinner v-if="navigating" />
  </template>
</curi-link>`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={demoMeta}>
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/vue/async-nav" />
      </HashSection>

      <OnGithub path="vue/async-nav" />
    </React.Fragment>
  );
}

export { AsyncNavExample as component, contents };
