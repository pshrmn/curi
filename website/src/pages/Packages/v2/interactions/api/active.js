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
  title: "active",
  hash: "active"
};

export function ActiveAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        An interaction function that uses a response object to determine if a
        route is "active".
      </p>

      <p>
        The interaction requires two arguments, the first being the route data
        and the second being a response object.
      </p>

      <CodeBlock>
        {`import { active } from "@curi/router";

const routes = prepareRoutes([
  {
    name: "User",
    path: "u/:id",
  }
]);

const route = router.route("User");
const isActive = active(route, response, { id: "1" });`}
      </CodeBlock>

      <HashSection meta={argumentsMeta} tag="h3">
        <HashSection
          tag="h4"
          meta={{ title: "route", hash: "active-arguments-route" }}
        >
          <p>The route to determine if it is active.</p>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "response", hash: "active-arguments-response" }}
        >
          <p>A response object emitted by the router.</p>

          <CodeBlock>
            {`const { response } = router.current();
active(route, response);`}
          </CodeBlock>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "options", hash: "active-arguments-options" }}
        >
          <p>An object with additional options</p>

          <CodeBlock>{`active(route, response, options);`}</CodeBlock>

          <HashSection
            tag="h4"
            meta={{ title: "params", hash: "active-arguments-params" }}
          >
            <p>
              If the route requires params, these are the params that should be
              compared against the response's params.
            </p>
          </HashSection>

          <HashSection
            tag="h4"
            meta={{ title: "partial", hash: "active-arguments-partial" }}
          >
            <p>
              When true (defaults to false), a route that is an ancestor of the
              response's route can be considered active if its params match the
              response's params.
            </p>
          </HashSection>

          <HashSection
            tag="h4"
            meta={{ title: "components", hash: "active-arguments-components" }}
          >
            <p>
              A function to compare the other location components (
              <IJS>hash</IJS> and <IJS>query</IJS>) against the response's
              location.
            </p>
          </HashSection>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
