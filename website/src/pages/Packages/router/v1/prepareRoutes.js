import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Warning
} from "../../../../components/package/common";

export const meta = {
  title: "prepareRoutes()",
  hash: "prepareRoutes"
};

export function PrepareRoutesAPI() {
  return (
    <HashSection title={meta.title} id={meta.hash}>
      <p>
        The <IJS>prepareRoutes()</IJS> export is used to build the routes for
        Curi. This will pre-compile paths for location matching and pathname
        building, which is particularly useful for server rendering.
      </p>

      <CodeBlock>
        {`import { prepareRoutes } from '@curi/router';

const routes = prepareRoutes([
  { name: "Home", path: "" },
  // ...
  { name: "Not Found", path: "(.*)" }
]);`}
      </CodeBlock>

      <Warning>
        Passing a non-prepared routes array to <IJS>curi()</IJS> is still
        supported, but deprecated and will be removed in the next major version.
      </Warning>
    </HashSection>
  );
}
