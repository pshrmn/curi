import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Cmp
} from "../../../../../components/package/common";

const propsMeta = {
  title: "Props",
  hash: "props"
};
export const meta = {
  title: "<curi-link>",
  hash: "link",
  children: [propsMeta]
};

export function LinkAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        The <IJS>curi-link</IJS> component will render an anchor (<Cmp>a</Cmp>)
        element.
      </p>

      <HashSection tag="h3" meta={propsMeta}>
        <HashSection tag="h4" meta={{ title: "to", hash: "Link-to" }}>
          <p>
            <IJS>name</IJS> - The name of the route to navigate to.{" "}
            <em>This is required</em>.
          </p>

          <CodeBlock lang="html">
            {`<curi-link name='Home'>Home</curi-link>
<!-- <a href="/">Home</a> -->`}
          </CodeBlock>
        </HashSection>

        <HashSection tag="h4" meta={{ title: "params", hash: "Link-params" }}>
          <p>
            <IJS>params</IJS> - An object containing the key-value params for
            the route. For example, if you are linking to a route with the path{" "}
            <IJS>album/:title</IJS>, the params object should have a{" "}
            <IJS>title</IJS> property.
          </p>

          <CodeBlock lang="html">
            {`<curi-link
  name='Album'
  :params="{ title: 'Coloring Book' }"
  >
  Coloring Book
</curi-link>`}
          </CodeBlock>
        </HashSection>

        <HashSection tag="h4" meta={{ title: "hash", hash: "Link-hash" }}>
          <p>
            <IJS>hash</IJS> - the hash for the location to link to
          </p>

          <CodeBlock lang="html">
            {`<curi-link name="Home" hash="test">Home</curi-link>
<!-- <a href="/#test">Home</a> -->`}
          </CodeBlock>
        </HashSection>

        <HashSection tag="h4" meta={{ title: "query", hash: "Link-query" }}>
          <p>
            <IJS>query</IJS> - the query for the location to link to
          </p>

          <CodeBlock lang="html">
            {`<curi-link name="Home" query="one=1">Home</curi-link>
<!-- <a href="/?one=1">Home</a> -->`}
          </CodeBlock>
        </HashSection>

        <HashSection tag="h4" meta={{ title: "state", hash: "Link-state" }}>
          <IJS>state</IJS> - the state to associated with the location
        </HashSection>

        <HashSection tag="h4" meta={{ title: "slots", hash: "Link-slots" }}>
          <p>
            The <IJS>curi-link</IJS>'s can take either a regular slot or a
            scoped slot.
          </p>
          <p>
            When given a scoped slot, the <IJS>curi-link</IJS> will inject the
            link's navigation state (a <IJS>navigating</IJS> property). The
            navigation state is <IJS>false</IJS> by default, <IJS>true</IJS>{" "}
            when the <IJS>curi-link</IJS> is clicked, and <IJS>false</IJS> when
            the the navigation finishes/is cancelled.
          </p>

          <CodeBlock lang="html">
            {`<!-- a regular slot -->
<curi-link name="Home">
  Home
</curi-link>

<!-- a scoped slot -->
<curi-link name="User" :params="{ id: 1 }">
  <template slot-scope="{ navigating }">
    User 1
    <spinner v-if="navigating" />
  </template>
</curi-ink>`}
          </CodeBlock>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
