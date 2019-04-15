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
  hash: "ancestors",
  children: [argumentsMeta]
};

export function AncestorsAPI() {
  return (
    <HashSection meta={meta}>
      <p>A function to create the ancestors route interaction.</p>

      <p>
        The interaction returns the name of an ancestor route a given level "up"
        from the route. If no level is provided, then it will return an array of
        the names of all ancestor routes (from most ancient to parent).
      </p>

      <CodeBlock>
        {`import { prepareRoutes, createRouter } from "@curi/router";
import ancestors from '@curi/route-ancestors';

const routes = prepareRoutes({
  routes: [
    {
      name: 'Grandparent', path: 'g',
      children: [
        {
          name: 'Parent', path: 'p',
          children: [
            { name: 'Child', path: 'c' }
          ]
        }
      ]
    }
  ],
  interactions: [ancestors()]
});

const router = createRouter(history,routes);`}
      </CodeBlock>

      <HashSection meta={argumentsMeta} tag="h3">
        <HashSection tag="h4" meta={{ title: "name", hash: "arguments-name" }}>
          <p>The name of the route to get the ancestors of.</p>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "level", hash: "arguments-level" }}
        >
          <p>
            A number of levels "up" to get the ancestor name of. If this
            argument is not provided, the interaction will return an array of
            all ancestor routes names (from most ancient to parent).
          </p>
        </HashSection>

        <CodeBlock>
          {`const parent = router.route.ancestors('Child', 1);
// parent === 'Parent'
const ancestors = router.route.ancestors('Child');
// ancestors === ['Grandparent', 'Parent']`}
        </CodeBlock>
      </HashSection>
    </HashSection>
  );
}
