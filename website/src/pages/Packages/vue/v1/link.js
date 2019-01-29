import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Cmp
} from "../../../../components/package/common";

export const meta = {
  title: "<curi-link>",
  hash: "link"
};

export function LinkAPI() {
  return (
    <HashSection title={meta.title} id={meta.hash}>
      <p>
        The <Cmp>curi-link</Cmp> component will render an anchor (<Cmp>a</Cmp>)
        element.
      </p>

      <HashSection tag="h4" title="to" id="Link-to">
        <p>
          <IJS>to</IJS> - The name of the route to navigate to.{" "}
          <em>This is required</em>.
        </p>

        <CodeBlock lang="html">
          {`<curi-link to='Home'>Home</curi-link>
<!-- <a href="/">Home</a> -->`}
        </CodeBlock>
      </HashSection>

      <HashSection tag="h4" title="params" id="Link-params">
        <p>
          <IJS>params</IJS> - An object containing the key-value params for the
          route. For example, if you are linking to a route with the path{" "}
          <IJS>album/:title</IJS>, the params object should have a{" "}
          <IJS>title</IJS> property.
        </p>

        <CodeBlock lang="html">
          {`<curi-link
  to='Album'
  :params="{ title: 'Coloring Book' }"
  >
  Coloring Book
</curi-link>`}
        </CodeBlock>
      </HashSection>

      <HashSection tag="h4" title="hash" id="Link-hash">
        <p>
          <IJS>hash</IJS> - the hash for the location to link to
        </p>

        <CodeBlock lang="html">
          {`<curi-link to="Home" hash="test">Home</curi-link>
<!-- <a href="/#test">Home</a> -->`}
        </CodeBlock>
      </HashSection>

      <HashSection tag="h4" title="query" id="Link-query">
        <p>
          <IJS>query</IJS> - the query for the location to link to
        </p>

        <CodeBlock lang="html">
          {`<curi-link to="Home" query="one=1">Home</curi-link>
<!-- <a href="/?one=1">Home</a> -->`}
        </CodeBlock>
      </HashSection>

      <HashSection tag="h4" title="state" id="Link-state">
        <IJS>state</IJS> - the state to associated with the location
      </HashSection>

      <HashSection tag="h4" title="slots" id="Link-slots">
        <p>
          The <Cmp>curi-link</Cmp>'s can take either a regular slot or a scoped
          slot.
        </p>
        <p>
          When given a scoped slot, the <Cmp>curi-link</Cmp> will inject the
          link's navigation state (a <IJS>navigating</IJS> property). The
          navigation state is <IJS>false</IJS> by default, <IJS>true</IJS> when
          the <Cmp>curi-link</Cmp> is clicked, and <IJS>false</IJS> when the the
          navigation finishes/is cancelled.
        </p>

        <CodeBlock lang="html">
          {`<!-- a regular slot -->
<curi-link to="Home">
  Home
</curi-link>

<!-- a scoped slot -->
<curi-link to="User" :params="{ id: 1 }">
  <template slot-scope="{ navigating }">
    User 1
    <spinner v-if="navigating" />
  </template>
</curi-ink>`}
        </CodeBlock>
      </HashSection>
    </HashSection>
  );
}
