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
  title: "active()",
  hash: "active",
  children: [argumentsMeta]
};

export function ActiveAPI() {
  return (
    <HashSection meta={meta}>
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
});

const { response } = router.current();

const isActive = router.route.active(
  'Some Route',
  response
);`}
      </CodeBlock>

      <HashSection meta={argumentsMeta} tag="h3">
        <HashSection meta={{ title: "name", hash: "name" }} tag="h4">
          <p>The name of the route to check if it is active.</p>
        </HashSection>

        <HashSection meta={{ title: "response", hash: "response" }} tag="h4">
          <p>The response to check the route against.</p>
        </HashSection>

        <HashSection meta={{ title: "params", hash: "params" }} tag="h4">
          <p>Any route params for the route that is being checked.</p>
        </HashSection>

        <HashSection meta={{ title: "partial", hash: "partial" }} tag="h4">
          <p>
            When <IJS>true</IJS>, ancestor routes can be considered active.
            (default <IJS>false</IJS>).
          </p>
        </HashSection>

        <HashSection
          meta={{ title: "locationCheck", hash: "locationCheck" }}
          tag="h4"
        >
          <p>
            A function that receives a location object and returns a boolean.
          </p>

          <p>
            Route matching determines if the <IJS>pathname</IJS> for the current
            response's location matches the provided route. If you want to
            compare other location segments (<IJS>hash</IJS> or <IJS>query</IJS>
            ), you can use the <IJS>locationCheck</IJS> argument.
          </p>

          <p>This function will only be called when the route matches.</p>

          <CodeBlock>
            {`const isActive = router.route.active(
  'Some Route',
  response,
  null,
  false,
  location => location.hash === "comments"
);`}
          </CodeBlock>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
