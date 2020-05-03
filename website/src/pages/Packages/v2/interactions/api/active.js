import React from "react";

import {
  HashSection,
  Paragraph,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

let argumentsMeta = {
  title: "Arguments",
  hash: "arguments"
};
export let meta = {
  title: "active",
  hash: "active"
};

export function ActiveAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <Paragraph>
        An interaction function that uses a response object to determine if a
        route is "active".
      </Paragraph>

      <Paragraph>
        The interaction requires two arguments, the first being the route data
        and the second being a response object.
      </Paragraph>

      <CodeBlock>
        {`import { active } from "@curi/interactions";

let routes = prepareRoutes([
  {
    name: "User",
    path: "u/:id",
  }
]);

let route = router.route("User");
let isActive = active(route, response, { id: "1" });`}
      </CodeBlock>

      <HashSection meta={argumentsMeta} tag="h3">
        <HashSection
          tag="h4"
          meta={{ title: "route", hash: "active-arguments-route" }}
        >
          <Paragraph>The route to determine if it is active.</Paragraph>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "response", hash: "active-arguments-response" }}
        >
          <Paragraph>A response object emitted by the router.</Paragraph>

          <CodeBlock>
            {`let { response } = router.current();
active(route, response);`}
          </CodeBlock>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "options", hash: "active-arguments-options" }}
        >
          <Paragraph>An object with additional options</Paragraph>

          <CodeBlock>{`active(route, response, options);`}</CodeBlock>

          <HashSection
            tag="h4"
            meta={{ title: "params", hash: "active-arguments-params" }}
          >
            <Paragraph>
              If the route requires params, these are the params that should be
              compared against the response's params.
            </Paragraph>
          </HashSection>

          <HashSection
            tag="h4"
            meta={{ title: "partial", hash: "active-arguments-partial" }}
          >
            <Paragraph>
              When true (defaults to false), a route that is an ancestor of the
              response's route can be considered active if its params match the
              response's params.
            </Paragraph>
          </HashSection>

          <HashSection
            tag="h4"
            meta={{ title: "components", hash: "active-arguments-components" }}
          >
            <Paragraph>
              A function to compare the other location components (
              <IJS>hash</IJS> and <IJS>query</IJS>) against the response's
              location.
            </Paragraph>
          </HashSection>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
