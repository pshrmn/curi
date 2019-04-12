import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Note,
  ScrollableTable
} from "../../../../../components/package/common";

const argumentsMeta = {
  title: "Arguments",
  hash: "arguments"
};
export const meta = {
  title: "prefetch()",
  hash: "prefetch",
  children: [argumentsMeta]
};

export function PrefetchAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        A function to create the prefetch route interaction. When you create
        your router, the result is passed to the router using the `route`
        option, which will add a <IJS>prefetch</IJS> function to the router's
        route interactions.
      </p>

      <CodeBlock>
        {`import { curi } from '@curi/router';
import prefetch from '@curi/route-prefetch';

const router = curi(history, routes, {
  route: [prefetch()]
});

router.route.prefetch("Some Route");`}
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
              <td>The name of the route to prefetch.</td>
            </tr>
            <tr>
              <td>resolve</td>
              <td>
                Route props that are used by the <IJS>resolve</IJS> functions.
              </td>
            </tr>
            <tr>
              <td>which</td>
              <td>
                An array whose values are the names of the <IJS>resolve</IJS>{" "}
                functions that should be called. If this array is not provided,
                all available functions will be called.
              </td>
            </tr>
          </tbody>
        </ScrollableTable>
        <Note>
          <p>
            This route interaction will only register routes that have{" "}
            <IJS>resolve</IJS> functions. If you try calling this for any routes
            with neither of those, <IJS>prefetch</IJS> will resolve an object
            with an <IJS>error</IJS> property.
          </p>
        </Note>

        <CodeBlock>
          {`
{
  name: "User",
  path: "u/:id",
  resolve: {
    one: () => {...},
    two: () => {...}
  }
}

// call a route's resolve.one() and resolve.two() functions
router.route.prefetch(
  'User',
  { params: { id: 2 }}
)

// only call the route's resolve.one() function
router.route.prefetch(
  'User',
  { params: { id: 3 }},
  ['one']
);`}
        </CodeBlock>
      </HashSection>
    </HashSection>
  );
}
