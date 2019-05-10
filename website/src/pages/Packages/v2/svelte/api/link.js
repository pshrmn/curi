import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

const propsMeta = {
  title: "Props",
  hash: "link-props"
};
export const meta = {
  title: "Link",
  hash: "link"
};

export function LinkAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        The <IJS>Link</IJS> component is used to create an anchor for navigating
        to another route.
      </p>

      <CodeBlock lang="html">
        {`<div>
  <Link name='Home'>Home</Link>
  <Link name='User' params={{ userID: 5 }}>
    Profile
  </Link>
</div>

<script>
  import Link from '@curi/svelte/components/Link.svelte';
</script>`}
      </CodeBlock>

      <HashSection meta={propsMeta} tag="h3">
        <HashSection meta={{ title: "name", hash: "link-name" }} tag="h4">
          <p>The name of the route to link to.</p>

          <CodeBlock lang="html">
            {`<Link name="Home">Home</Link>
<!-- <a href="/">Home</a> -->`}
          </CodeBlock>
        </HashSection>

        <HashSection meta={{ title: "params", hash: "link-params" }} tag="h4">
          <p>An object of route params for the linked route.</p>

          <CodeBlock lang="html">
            {`<Link name="User" params={{ userID: 5 }}>
  Profile
</Link>
<!-- <a href="/user/5">Profile</a> -->`}
          </CodeBlock>
        </HashSection>

        <HashSection meta={{ title: "hash", hash: "link-hash" }} tag="h4">
          <p>The hash for the location to link to.</p>

          <CodeBlock lang="html">
            {`<Link name="Home" hash="test">Home</Link>
<!-- <a href="/#test">Home</a> -->`}
          </CodeBlock>
        </HashSection>

        <HashSection meta={{ title: "query", hash: "link-query" }} tag="h4">
          <p>The query for the location to link to.</p>

          <CodeBlock lang="html">
            {`<Link name="Home" query="one=1">Home</Link>
<!-- <a href="/?one=1">Home</a> -->`}
          </CodeBlock>
        </HashSection>

        <HashSection meta={{ title: "state", hash: "link-state" }} tag="h4">
          Some (ephemeral) state associated with the location.
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
