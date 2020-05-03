import React from "react";

import {
  HashSection,
  Paragraph,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

export let meta = {
  title: "getRouter",
  hash: "getRouter"
};

export function GetRouterAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <Paragraph>
        The <IJS>getRouter</IJS> function is used to read the <IJS>router</IJS>{" "}
        from Svelte's context.
      </Paragraph>

      <CodeBlock lang="html">
        {`<h1>{pathname}</h1>

<script>
  import { getRouter } from "@curi/svelte";

  let router = getRouter();

  let homeRoute = router.route("Home");
</script>`}
      </CodeBlock>
    </HashSection>
  );
}
