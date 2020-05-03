import React from "react";

import {
  HashSection,
  Paragraph,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

let propsMeta = {
  title: "Props",
  hash: "router-props"
};
export let meta = {
  title: "Router",
  hash: "router"
};

export function RouterAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <Paragraph>
        The <IJS>Router</IJS> component is used to make router related data
        available to components throughout the application.
      </Paragraph>

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
          <Paragraph>A Curi router.</Paragraph>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
