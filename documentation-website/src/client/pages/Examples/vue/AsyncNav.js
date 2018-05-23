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
        Use the <Cmp>curi-link</Cmp>'s <IJS>slot</IJS> as scoped-slot so you can
        know whether or not the link is currently navigating.
      </p>

      <PrismBlock lang="jsx">
        {`<curi-link to="Movie" :params="{ id: 'some_movie' }">
  <template slot-scope="{ navigating }">
    Some Movie
    <Spinner v-if="navigating" />
  </template>
</curi-link>`}
      </PrismBlock>
    </Section>

    <Section title="Live Demo" id="demo">
      <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/vue/async-nav" />
    </Section>

    <Section title="On GitHub" id="source">
      If you want to run this code locally, the source code is available on
      GitHub{" "}
      <a href="https://github.com/pshrmn/curi/tree/master/examples/vue/async-nav">
        here
      </a>.
    </Section>
  </BaseExample>
);
