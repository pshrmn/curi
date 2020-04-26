import React from "react";

import {
  HashSection,
  Paragraph,
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
      <Paragraph>
        An interaction function to get the ancestors of a route.
      </Paragraph>

      <Paragraph>
        The interaction returns the public route data for each of the route's
        ancestors. The first item in the array is the root-most ancestor, while
        the last item in the array is the route's parent.
      </Paragraph>

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
          <Paragraph>The route to get the ancestors of.</Paragraph>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
