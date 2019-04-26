import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

export const meta = {
  title: "curiStores",
  hash: "curiStores"
};

export function CuriStoresAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        Create Svelte stores so that components can access <IJS>router</IJS>,{" "}
        <IJS>response</IJS>, and <IJS>navigation</IJS> data.
      </p>

      <CodeBlock>
        {`import { curiStores } from '@curi/svelte';

const router = createRouter(history, routes);
const stores = curiStores(router);`}
      </CodeBlock>
    </HashSection>
  );
}
