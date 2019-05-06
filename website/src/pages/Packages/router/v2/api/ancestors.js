import React from "react";

import {
  HashSection,
  CodeBlock
} from "../../../../../components/package/common";

const argumentsMeta = {
  title: "Arguments",
  hash: "arguments"
};
export const meta = {
  title: "ancestors",
  hash: "ancestors"
};

export function AncestorsAPI() {
  return (
    <HashSection meta={meta}>
      <p>An interaction function to get the ancestors of a route.</p>

      <p>
        The interaction returns the name of an ancestor route a given level "up"
        from the route. If no level is provided, then it will return an array of
        the names of all ancestor routes (from most ancient to parent).
      </p>

      <CodeBlock>
        {`import { ancestors } from "@curi/router";

const routes = prepareRoutes({
  routes: [
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
  ]
});

const route = router.route("Child");
const parent = ancestors(route, 1); // "Parent"`}
      </CodeBlock>

      <HashSection meta={argumentsMeta} tag="h3">
        <HashSection
          tag="h4"
          meta={{ title: "route", hash: "ancestor-arguments-route" }}
        >
          <p>The route to get the ancestors of.</p>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "level", hash: "ancestor-arguments-level" }}
        >
          <p>
            A number of levels "up" to get the ancestor name of. If this
            argument is not provided, the interaction will return an array of
            all ancestor routes names (from most ancient to parent).
          </p>
        </HashSection>

        <CodeBlock>
          {`const childRoute = router.route("Child");
const parent = ancestors(childRoute, 1);
// parent === 'Parent'
con
const ancestors = ancestors(childRoute);
// ancestors === ['Grandparent', 'Parent']`}
        </CodeBlock>
      </HashSection>
    </HashSection>
  );
}
