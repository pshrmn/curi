import React from "react";
import { Link } from "@curi/react-dom";

import {
  HashSection,
  CodeBlock,
  IJS,
  Note
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
        option, which will add a <IJS>prefetch()</IJS> function to the router's
        route interactions.
      </p>

      <CodeBlock>
        {`import { create_router } from "@curi/router";
import prefetch from '@curi/route-prefetch';

const router = create_router(browser, routes, {
  route: [prefetch()]
});

router.route.prefetch("Some Route");`}
      </CodeBlock>

      <HashSection meta={argumentsMeta} tag="h3">
        <HashSection tag="h4" meta={{ title: "name", hash: "name" }}>
          <p>The name of the route to prefetch.</p>
        </HashSection>

        <HashSection tag="h4" meta={{ title: "optional", hash: "optional" }}>
          <p>
            A route's resolve function is called with two arguments: the{" "}
            <IJS>match</IJS> object for the matched route and an{" "}
            <Link
              name="Package"
              params={{ package: "router", version: "v2" }}
              hash="router-external"
            >
              <IJS>external</IJS>
            </Link>
            value. You can provide filler values for these with the{" "}
            <IJS>optional</IJS> object argument.
          </p>

          <CodeBlock>
            {`const router = create_router(browser, routes, {
  external
});

router.route.prefetch("Some Route", {
  match: { params: {...} },
  external: router.external
});`}
          </CodeBlock>

          <HashSection tag="h5" meta={{ title: "match", hash: "match" }}>
            <p>
              An object of "match" properties for the <IJS>resolve</IJS>{" "}
              function. The possible properties are <IJS>name</IJS>,{" "}
              <IJS>params</IJS>, <IJS>location</IJS>, and <IJS>partials</IJS>.
            </p>
          </HashSection>

          <HashSection tag="h5" meta={{ title: "external", hash: "external" }}>
            <p>
              Any external values passed to the <IJS>resolve</IJS> function.
            </p>

            <p>
              To access the <IJS>external</IJS> values set on the router when it
              was created, you can use <IJS>router.external</IJS>.
            </p>

            <CodeBlock>
              {`const router = create_router(browser, routes, {
  external: {...}
});

router.route.prefetch(
  "Some Route",
  { external: router.external }
);`}
            </CodeBlock>
          </HashSection>
        </HashSection>

        <Note>
          <p>
            This route interaction will only register routes that have a{" "}
            <IJS>resolve</IJS> function. If you try calling this for any routes
            without a <IJS>resolve</IJS> function, <IJS>prefetch()</IJS> will
            resolve an object with an <IJS>error</IJS> property and a{" "}
            <IJS>null</IJS> <IJS>resolved</IJS> property.
          </p>
        </Note>
      </HashSection>
    </HashSection>
  );
}
