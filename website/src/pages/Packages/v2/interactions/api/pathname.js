import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

const argumentsMeta = {
  title: "Arguments",
  hash: "arguments"
};
export const meta = {
  title: "pathname",
  hash: "pathname"
};

export function PathnameAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <p>An interaction function to generate a pathname string for a route.</p>

      <p>
        If the route requires an params, they should be provided as the second
        argument to the function call.
      </p>

      <CodeBlock>
        {`import { pathname } from "@curi/router";

const routes = prepareRoutes([
  {
    name: "Home",
    path: ""
  },
  {
    name: "User",
    path: "u/:id",
  }
]);

const route = router.route("Home");
const parent = pathname(route); // "/"`}
      </CodeBlock>

      <HashSection meta={argumentsMeta} tag="h3">
        <HashSection
          tag="h4"
          meta={{ title: "route", hash: "pathname-arguments-route" }}
        >
          <p>The route to generate a pathname string for.</p>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "params", hash: "pathname-arguments-params" }}
        >
          <p>
            An object of params used to generate the pathname. If the route
            and/or any of its ancestor routes require params, then this argument
            must be provided.
          </p>
        </HashSection>

        <CodeBlock>
          {`const route = router.route("User");
const parent = pathname(route, { id: "1" }); // "/u/1"`}
        </CodeBlock>
      </HashSection>
    </HashSection>
  );
}
