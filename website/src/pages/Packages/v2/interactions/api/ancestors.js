import React from "react";

import {
  HashSection,
  CodeBlock
} from "../../../../../components/package/common";

let argumentsMeta = {
  title: "Arguments",
  hash: "arguments"
};
export let meta = {
  title: "ancestors",
  hash: "ancestors"
};

export function AncestorsAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <p>An interaction function to get the ancestors of a route.</p>

      <p>
        The interaction returns the public route data for each of the route's
        ancestors. The first item in the array is the root-most ancestor, while
        the last item in the array is the route's parent.
      </p>

      <CodeBlock>
        {`import { ancestors } from "@curi/interactions";

let routes = prepareRoutes([
  {
    name: "Grandparent", path: "g",
    children: [
      {
        name: "Parent", path: "p",
        children: [
          { name: "Child", path: "c" }
        ]
      }
    ]
  }
]);

let route = router.route("Child");
let family = ancestors(route);
// [
//   { meta: { name: "Grandparent", ... }, ... },
//   { meta: { name: "Parent", ... }, ... },
// ]`}
      </CodeBlock>

      <HashSection meta={argumentsMeta} tag="h3">
        <HashSection
          tag="h4"
          meta={{ title: "route", hash: "ancestor-arguments-route" }}
        >
          <p>The route to get the ancestors of.</p>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
