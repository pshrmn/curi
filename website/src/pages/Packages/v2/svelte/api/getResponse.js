import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

export const meta = {
  title: "getResponse",
  hash: "getResponse"
};

export function GetResponseAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <p>
        The <IJS>getResponse</IJS> function is used to read the{" "}
        <IJS>response</IJS> store from Svelte's context. The value will update
        whenever there is a new response.
      </p>

      <CodeBlock lang="html">
        {`<h1>{$response.name}</h1>

<script>
  import { getResponse } from "@curi/svelte";

  const response = getResponse();
</script>`}
      </CodeBlock>
    </HashSection>
  );
}
