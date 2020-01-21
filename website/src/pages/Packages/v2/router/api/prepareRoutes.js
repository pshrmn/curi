import React from "react";
import { Link } from "@curi/react-dom";

import {
  HashSection,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

let routesArgMeta = { title: "routes", hash: "options-routes" };

let argumentsMeta = {
  title: "Arguments",
  hash: "prepareRoutes-arguments",
  children: [routesArgMeta]
};

export let meta = {
  title: "prepareRoutes",
  hash: "prepareRoutes"
};

export function PrepareRoutesAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <p>
        The <IJS>prepareRoutes</IJS> function takes an application's routes and
        route interactions and returns an object. The returned object will be
        passed to <IJS>createRouter</IJS>.
      </p>

      <CodeBlock>
        {`import { prepareRoutes } from '@curi/router';

let routes = prepareRoutes([
  { name: "Home", path: "" },
  // ...
  { name: "Not Found", path: "(.*)" }
]);`}
      </CodeBlock>

      <p>
        <IJS>prepareRoutes</IJS> creates a reusable routing object, which means
        that it can be reused on the server instead of recompiling it for every
        request.
      </p>

      <HashSection tag="h3" meta={argumentsMeta}>
        <HashSection tag="h4" meta={routesArgMeta}>
          An array of <Link hash="route-objects">route objects</Link>.
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
