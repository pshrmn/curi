import React from "react";
import { Link } from "@curi/react-dom";

import {
  HashSection,
  Paragraph,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

let propsMeta = {
  title: "Props",
  hash: "asynclink-props"
};
export let meta = {
  title: "AsyncLink",
  hash: "asynclink"
};

export function AsyncLinkAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <Paragraph>
        The <IJS>AsyncLink</IJS> component is used to create an anchor for
        navigating to another route. This is similar to the the{" "}
        <Link hash="link">
          <IJS>Link</IJS>
        </Link>
        , but also takes a <IJS>wrapper</IJS> component for
      </Paragraph>

      <CodeBlock lang="html">
        {`<menu>
  <AsyncLink wrapper={NavSpinner} name='User' params={{ userID: 5 }}>
    Profile
  </AsyncLink>
</menu>

<script>
  import AsyncLink from '@curi/svelte/components/AsyncLink.svelte';
</script>`}
      </CodeBlock>

      <HashSection meta={propsMeta} tag="h3">
        <HashSection
          meta={{ title: "wrapper", hash: "asynclink-wrapper" }}
          tag="h4"
        >
          <Paragraph>
            A wrapper component to be rendered around the anchor. The wrapper
            will receive a <IJS>navigating</IJS> prop that defaults to{" "}
            <IJS>false</IJS>, is set to <IJS>true</IJS> when a user clicks the
            anchor to begin a navigation, and resets to <IJS>false</IJS> when
            the navigation completes.
          </Paragraph>

          <CodeBlock lang="html">
            {`<AsyncLink wrapper={NavSpinner} name="Home">Home</AsyncLink>`}
          </CodeBlock>

          <Paragraph>
            For a demonstration, please check out the{" "}
            <Link name="Example" params={{ slug: "async" }}>
              asynchronous navigation example
            </Link>
            .
          </Paragraph>
        </HashSection>

        <HashSection meta={{ title: "name", hash: "asynclink-name" }} tag="h4">
          <Paragraph>The name of the route to link to.</Paragraph>

          <CodeBlock lang="html">
            {`<AsyncLink name="Home" wrapper={NavSpinner}>Home</AsyncLink>
<!-- <a href="/">Home</a> -->`}
          </CodeBlock>
        </HashSection>

        <HashSection
          meta={{ title: "params", hash: "asynclink-params" }}
          tag="h4"
        >
          <Paragraph>An object of route params for the linked route.</Paragraph>

          <CodeBlock lang="html">
            {`<AsyncLink
  name="User"
  params={{ userID: 5 }}
  wrapper={NavSpinner}
>
  Profile
</AsyncLink>
<!-- <a href="/user/5">Profile</a> -->`}
          </CodeBlock>
        </HashSection>

        <HashSection meta={{ title: "hash", hash: "asynclink-hash" }} tag="h4">
          <Paragraph>The hash for the location to link to.</Paragraph>

          <CodeBlock lang="html">
            {`<AsyncLink
  name="Home"
  hash="test"
  wrapper={NavSpinner}
>Home</AsyncLink>
<!-- <a href="/#test">Home</a> -->`}
          </CodeBlock>
        </HashSection>

        <HashSection
          meta={{ title: "query", hash: "asynclink-query" }}
          tag="h4"
        >
          <Paragraph>The query for the location to link to.</Paragraph>

          <CodeBlock lang="html">
            {`<AsyncLink
  name="Home"
  query="one=1"
  wrapper={NavSpinner}
>Home</AsyncLink>
<!-- <a href="/?one=1">Home</a> -->`}
          </CodeBlock>
        </HashSection>

        <HashSection
          meta={{ title: "state", hash: "asynclink-state" }}
          tag="h4"
        >
          Some (ephemeral) state associated with the location.
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
