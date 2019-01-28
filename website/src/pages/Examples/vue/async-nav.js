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

      <HashSection title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/vue/async-nav" />
      </HashSection>

      <OnGithub path="vue/async-nav" />
    </React.Fragment>
  );
}
