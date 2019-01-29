import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  ScrollableTable
} from "../../../../components/package/common";

export const meta = {
  title: "active",
  hash: "active"
};

export function ActiveAPI() {
  return (
    <HashSection title={meta.title} id={meta.hash}>
      <p>
        A function to create the active route interaction. When you create your
        router, the result is passed to the router using the `route` option,
        which will add an <IJS>active()</IJS> function to the router's route
        interactions.
      </p>

      <p>
        The interaction returns a boolean: <IJS>true</IJS> when a route is
        "active" (it matches the response's <IJS>location</IJS>) and{" "}
        <IJS>false</IJS> when it does not.
      </p>

      <CodeBlock>
        {`import { curi } from '@curi/router';
import active from '@curi/route-active';

const router = curi(history, routes, {
  route: [active()]
});`}
      </CodeBlock>

      <HashSection title="Arguments" id="arguments" tag="h3">
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
              <td>the name of the route to check if it is active</td>
            </tr>
            <tr>
              <td>response</td>
              <td>the response to check the route against.</td>
            </tr>
            <tr>
              <td>params</td>
              <td>any route params for the route that is being checked</td>
            </tr>
            <tr>
              <td>partial</td>
              <td>
                when <IJS>true</IJS>, ancestor routes can be considered active.
                (default <IJS>false</IJS>)
              </td>
            </tr>
          </tbody>
        </ScrollableTable>

        <CodeBlock>
          {`const isActive = router.route.active(
  'Some Route',
  response,
  { id: 10 },
  false
);`}
        </CodeBlock>
      </HashSection>
    </HashSection>
  );
}
