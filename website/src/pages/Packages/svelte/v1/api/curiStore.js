import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

export const meta = {
  title: "curiStore",
  hash: "curiStore"
};

export function CuriStoreAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        <IJS>@curi/svelte</IJS> components rely on being able to access router
        related values (<IJS>router</IJS>, <IJS>response</IJS>, and{" "}
        <IJS>navigation</IJS>) from a Svelte store. While you can set this up
        manually, the <IJS>curiStore</IJS> will handle this for you.
      </p>
      <p>
        This will setup an observer to automatically update the store when new
        responses are emitted by the router.
      </p>

      <CodeBlock>
        {`import { curiStore } from '@curi/svelte';

const router = createRouter(history, routes);
const store = curiStore(router);`}
      </CodeBlock>

      <p>
        If you already have a store, you can pass it to <IJS>curiStore</IJS> and
        the Curi values will be added to it.
      </p>

      <CodeBlock>
        {`import { curiStore } from '@curi/svelte';
import { Store } from 'svelte/store';

const router = createRouter(history, routes);
const store = new Store({...});
curiStore(router, store);`}
      </CodeBlock>
    </HashSection>
  );
}
