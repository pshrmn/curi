import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

export const meta = {
  title: "getRouter",
  hash: "getRouter"
};

export function GetRouterAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        The <IJS>getRouter</IJS> function is used to read the <IJS>router</IJS>{" "}
        from Svelte's context.
      </p>

      <CodeBlock lang="html">
        {`<h1>{pathname}</h1>

<script>
  import { getRouter } from "@curi/svelte";

  const router = getRouter();

  let pathname = router.route.pathname("Home");
</script>`}
      </CodeBlock>
    </HashSection>
  );
}
