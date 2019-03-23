import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Warning
} from "../../../../../components/package/common";

export const meta = {
  title: "prepare_routes()",
  hash: "prepare_routes"
};

export function PrepareRoutesAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        The <IJS>prepare_routes()</IJS> export is used to build the routes for
        Curi. This will pre-compile paths for location matching and pathname
        building, which is particularly useful for server rendering.
      </p>

      <CodeBlock>
        {`import { prepare_routes } from '@curi/router';

const routes = prepare_routes([
  { name: "Home", path: "" },
  // ...
  { name: "Not Found", path: "(.*)" }
]);`}
      </CodeBlock>
    </HashSection>
  );
}
