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
  title: "pathname",
  hash: "pathname"
};

export function PathnameAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <Paragraph>
        An interaction function to generate a pathname string for a route.
      </Paragraph>

      <Paragraph>
        If the route requires an params, they should be provided as the second
        argument to the function call.
      </Paragraph>

      <CodeBlock>
        {`import { pathname } from "@curi/interactions";

let routes = prepareRoutes([
  {
    name: "Home",
    path: ""
  },
  {
    name: "User",
    path: "u/:id",
  }
]);

let route = router.route("Home");
let parent = pathname(route); // "/"`}
      </CodeBlock>

      <HashSection meta={argumentsMeta} tag="h3">
        <HashSection
          tag="h4"
          meta={{ title: "route", hash: "pathname-arguments-route" }}
        >
          <Paragraph>The route to generate a pathname string for.</Paragraph>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "params", hash: "pathname-arguments-params" }}
        >
          <Paragraph>
            An object of params used to generate the pathname. If the route
            and/or any of its ancestor routes require params, then this argument
            must be provided.
          </Paragraph>
        </HashSection>

        <CodeBlock>
          {`let route = router.route("User");
let parent = pathname(route, { id: "1" }); // "/u/1"`}
        </CodeBlock>
      </HashSection>
    </HashSection>
  );
}
