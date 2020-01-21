import React from "react";
import { Link } from "@curi/react-dom";

import {
  HashSection,
  CodeBlock,
  IJS,
  Note
} from "../../../../../components/package/common";

let argumentsMeta = {
  title: "Arguments",
  hash: "arguments"
};
export let meta = {
  title: "prefetch",
  hash: "prefetch"
};

export function PrefetchAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <p>
        A function that will call a route's <IJS>resolve</IJS> method.
      </p>

      <CodeBlock>
        {`
import { prefetch } from '@curi/router';

let route = router.route("Async Route");
prefetch(route).then(...);`}
      </CodeBlock>

      <HashSection meta={argumentsMeta} tag="h3">
        <HashSection
          tag="h4"
          meta={{ title: "route", hash: "prefetch-arguments-route" }}
        >
          <p>The route to prefetch.</p>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "optional", hash: "prefetch-arguments-optional" }}
        >
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
            {`let router = createRouter(browser, routes, {
  external
});

prefetch(route, {
  match: { params: {...} },
  external: router.external
});`}
          </CodeBlock>

          <HashSection
            tag="h5"
            meta={{ title: "match", hash: "prefetch-arguments-match" }}
          >
            <p>
              An object of "match" properties for the <IJS>resolve</IJS>{" "}
              function. The possible properties are <IJS>name</IJS>,{" "}
              <IJS>params</IJS>, <IJS>location</IJS>, and <IJS>partials</IJS>.
            </p>
          </HashSection>

          <HashSection
            tag="h5"
            meta={{ title: "external", hash: "prefetch-arguments-external" }}
          >
            <p>
              Any external values passed to the <IJS>resolve</IJS> function.
            </p>

            <p>
              To access the <IJS>external</IJS> values set on the router when it
              was created, you can use <IJS>router.external</IJS>.
            </p>

            <CodeBlock>
              {`let router = createRouter(browser, routes, {
  external: {...}
});

prefetch(
  route,
  { external: router.external }
);`}
            </CodeBlock>
          </HashSection>
        </HashSection>

        <Note>
          <p>
            This route interaction will only register routes that have a{" "}
            <IJS>resolve</IJS> function. If you try calling this for any routes
            without a <IJS>resolve</IJS> function, <IJS>prefetch</IJS> will
            resolve an object with an <IJS>error</IJS> property and a{" "}
            <IJS>null</IJS> <IJS>resolved</IJS> property.
          </p>
        </Note>
      </HashSection>
    </HashSection>
  );
}
