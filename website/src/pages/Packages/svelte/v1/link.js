import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Cmp
} from "../../../../components/package/common";

export const LinkAPIMeta = {
  title: <Cmp>Link</Cmp>,
  hash: "link"
};

export function LinkAPI() {
  return (
    <HashSection title={LinkAPIMeta.title} id={LinkAPIMeta.hash}>
      <p>
        The <Cmp>Link</Cmp> component is used to create an anchor for navigating
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
  import Link from '@curi/svelte/components/Link.html';
  export default {
    components: { Link }
  }
</script>`}
      </CodeBlock>

      <HashSection title="Props" id="link-props" tag="h3">
        <HashSection title="name" id="link-name" tag="h4">
          <p>The name of the route to link to.</p>

          <CodeBlock lang="html">
            {`<Link name="Home">Home</Link>
<!-- <a href="/">Home</a> -->`}
          </CodeBlock>
        </HashSection>

        <HashSection title="params" id="link-params" tag="h4">
          <p>An object of route params for the linked route.</p>

          <CodeBlock lang="html">
            {`<Link name="User" params={{ userID: 5 }}>
  Profile
</Link>
<!-- <a href="/user/5">Profile</a> -->`}
          </CodeBlock>
        </HashSection>

        <HashSection title="hash" id="link-hash" tag="h4">
          <p>The hash for the location to link to.</p>

          <CodeBlock lang="html">
            {`<Link name="Home" hash="test">Home</Link>
<!-- <a href="/#test">Home</a> -->`}
          </CodeBlock>
        </HashSection>

        <HashSection title="query" id="link-query" tag="h4">
          <p>The query for the location to link to.</p>

          <CodeBlock lang="html">
            {`<Link name="Home" query="one=1">Home</Link>
<!-- <a href="/?one=1">Home</a> -->`}
          </CodeBlock>
        </HashSection>

        <HashSection title="state" id="link-state" tag="h4">
          Some (ephemeral) state associated with the location.
        </HashSection>
      </HashSection>

      <HashSection tag="h3" title={<Cmp>Navigating</Cmp>} id="navigating">
        <p>
          The <Cmp>Navigating</Cmp> component is used to cancel an active
          asynchronous navigation.
        </p>
        <p>
          A component is passed to <Cmp>Navigating</Cmp>. When there is an
          active asynchronous navigation, the component will be given a{" "}
          <IJS>cancel</IJS> function. When there is not an active asynchronous
          navigation, <IJS>cancel</IJS> will be <IJS>undefined</IJS>.
        </p>

        <CodeBlock lang="html">
          {`<Navigating component={Cancel} />

<script>
  import Navigating from "@curi/svelte/components/Navigating.html";
  import Cancel from "./Cancel";

  export default {
    components: { Navigating },
    data() {
      return { Cancel };
    }
  }
</script>`}
        </CodeBlock>

        <HashSection title="Props" id="navigating-props" tag="h3">
          <HashSection title="component" id="navigating-component" tag="h4">
            <p>
              A component that receives a <IJS>cancel</IJS> function when there
              is an active asynchronous navigation.
            </p>

            <CodeBlock lang="html">
              {`{#if typeof cancel === "function"}
  <button on:click="cancelHandler(event, cancel)">
    Cancel Navigation
  </button>
{/if}

<script>
  export default {
    methods: {
      cancelHandler(event, cancel) {
        event.preventDefault();
        cancel();
      }
    }
  };
</script>`}
            </CodeBlock>
          </HashSection>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
