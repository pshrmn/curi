import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

export const meta = {
  title: "prepareRoutes",
  hash: "prepareRoutes"
};

export function PrepareRoutesAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        The <IJS>prepareRoutes</IJS> function is used to build the routes for
        Curi. Routes must be prepared before they are passed to{" "}
        <IJS>createRouter</IJS>.
      </p>

      <p>
        This will pre-compile paths for location matching and pathname building,
        which is particularly useful for server rendering.
      </p>

      <CodeBlock>
        {`import { prepareRoutes } from '@curi/router';

const routes = prepareRoutes([
  { name: "Home", path: "" },
  // ...
  { name: "Not Found", path: "(.*)" }
]);

const router = createRouter(browser, routes);`}
      </CodeBlock>
    </HashSection>
  );
}
