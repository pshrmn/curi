import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  ScrollableTable
} from "../../../../../components/package/common";

const argumentsMeta = {
  title: "Arguments",
  hash: "arguments"
};
export const meta = {
  title: "ancestors()",
  hash: "ancestors",
  children: [argumentsMeta]
};

export function AncestorsAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        A function to create the ancestors route interaction. When you create
        your router, the result is passed to the router using the `route`
        option, which will add an <IJS>ancestors()</IJS> function to the
        router's route interactions.
      </p>
      <p>
        The interaction returns the name of an ancestor route a given level "up"
        from the route. If no level is provided, then it will return an array of
        the names of all ancestor routes (from most ancient to parent).
      </p>

      <CodeBlock>
        {`import { createRouter } from "@curi/router";
import ancestors from '@curi/route-ancestors';

const routes = prepareRoutes([
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
]);

const router = createRouter(history,routes, {
  route: [ancestors()]
});`}
      </CodeBlock>

      <HashSection meta={argumentsMeta} tag="h3">
        <ScrollableTable>
          <thead>
            <tr>
              <th>argument</th>
              <th>description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>name</td>
              <td>the name of the route to get ancestors of</td>
            </tr>
            <tr>
              <td>level</td>
              <td>
                a number of levels "up" to get the ancestor name of. If this
                argument is not provided, the interaction will return an array
                of all ancestor routes names (from most ancient to parent).
              </td>
            </tr>
          </tbody>
        </ScrollableTable>

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
