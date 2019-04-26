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
  title: "<Router>",
  hash: "router",
  children: [propsMeta]
};

export function RouterAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        The <IJS>Router</IJS> component is used to make stores available to
        components throughout the application.
      </p>

      <CodeBlock lang="html">
        {`<Router stores={stores} />

<script>
  import Router from "@curi/svelte/components/Router.svelte";

  export let stores;
</script>`}
      </CodeBlock>

      <HashSection meta={propsMeta} tag="h3">
        <HashSection meta={{ title: "stores", hash: "router-stores" }} tag="h4">
          <p>
            An object with <IJS>router</IJS>, <IJS>response</IJS>, and{" "}
            <IJS>navigation</IJS> stores. This should be the result of calling{" "}
            <IJS>curiStores</IJS>.
          </p>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
