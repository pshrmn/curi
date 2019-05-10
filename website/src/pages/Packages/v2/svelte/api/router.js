import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

const propsMeta = {
  title: "Props",
  hash: "router-props"
};
export const meta = {
  title: "Router",
  hash: "router"
};

export function RouterAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        The <IJS>Router</IJS> component is used to make router related data
        available to components throughout the application.
      </p>

      <CodeBlock lang="html">
        {`<Router {router}>
  <Content />
</Router>

<script>
  import Router from "@curi/svelte/components/Router.svelte";

  export let router;
</script>`}
      </CodeBlock>

      <HashSection meta={propsMeta} tag="h3">
        <HashSection meta={{ title: "router", hash: "router-router" }} tag="h4">
          <p>A Curi router.</p>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
