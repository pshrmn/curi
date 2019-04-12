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
  hash: "active",
  children: [argumentsMeta]
};

export function ActiveAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        A function to create the active route interaction. The interaction is
        passed as part of the <IJS>options.route</IJS> array passed to a{" "}
        <IJS>createRouter</IJS> call.
      </p>

      <p>
        The interaction returns a boolean: <IJS>true</IJS> when a route is
        "active" (it matches the response's <IJS>location</IJS>) and{" "}
        <IJS>false</IJS> when it does not.
      </p>

      <CodeBlock>
        {`import { createRouter } from "@curi/router";
import active from '@curi/route-active';

const router = createRouter(browser, routes, {
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
          <p>The name of the route to check.</p>
        </HashSection>

        <HashSection meta={{ title: "response", hash: "response" }} tag="h4">
          <p>The response to check the route against.</p>
        </HashSection>

        <HashSection meta={{ title: "config", hash: "config" }} tag="h4">
          <p>
            An optional argument with additional properties can be passed as the
            third argument.
          </p>

          <CodeBlock>
            {`const isActive = router.route.active(
  'Some Route',
  response,
  {
    params: { id: 1 },
    partial: false,
    components: location => location.hash === "comments"
  }
);`}
          </CodeBlock>
          <HashSection meta={{ title: "params", hash: "params" }} tag="h5">
            <p>Any route params for the route that is being checked.</p>
          </HashSection>

          <HashSection meta={{ title: "partial", hash: "partial" }} tag="h5">
            <p>
              When <IJS>true</IJS>, ancestor routes can be considered active.
              (default <IJS>false</IJS>).
            </p>
          </HashSection>

          <HashSection
            meta={{ title: "components", hash: "components" }}
            tag="h5"
          >
            <p>
              A function that receives a location object and returns a boolean.
              The default active check only compares the <IJS>pathname</IJS>{" "}
              component of the location. This can be useful for checking the
              other components (<IJS>hash</IJS> and <IJS>query</IJS>).
            </p>

            <p>
              This function will only be called when the provided{" "}
              <IJS>name</IJS> and <IJS>params</IJS> match.
            </p>
          </HashSection>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
