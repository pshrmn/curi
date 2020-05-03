import React from "react";

import {
  HashSection,
  Paragraph,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

export let meta = {
  title: "getResponse",
  hash: "getResponse"
};

export function GetResponseAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <Paragraph>
        The <IJS>getResponse</IJS> function is used to read the{" "}
        <IJS>response</IJS> store from Svelte's context. The value will update
        whenever there is a new response.
      </Paragraph>

      <CodeBlock lang="html">
        {`<h1>{$response.name}</h1>

<script>
  import { getResponse } from "@curi/svelte";

  let response = getResponse();
</script>`}
      </CodeBlock>
    </HashSection>
  );
}
