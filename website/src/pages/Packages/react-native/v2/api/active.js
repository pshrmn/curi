import React from "react";
import { Link } from "@curi/react-dom";

import {
  HashSection,
  CodeBlock,
  IJS,
  Cmp,
  Note
} from "../../../../../components/package/common";

const propsMeta = {
  title: "Props",
  hash: "Active-props"
};
export const meta = {
  title: "<Active>",
  hash: "Active",
  children: [propsMeta]
};

export function ActiveAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        The <Cmp>Active</Cmp> component is a wrapper around the{" "}
        <Link hash="useActive">
          <IJS>useActive</IJS>
        </Link>{" "}
        hook.
      </p>

      <CodeBlock lang="jsx">
        {`import { Active } from '@curi/react-native';

function ActiveChecker({
  name,
  params,
  partial
}) {
  return (
    <Active name={name} params={params} partial={partial}>
      {active => active ? "active" : "not active"}
    </Active>
  );
}

<ActiveChecker name="Home" />`}
      </CodeBlock>

      <HashSection tag="h3" meta={propsMeta}>
        <HashSection tag="h4" meta={{ title: "name", hash: "Active-name" }}>
          <p>
            See{" "}
            <Link hash="useActive-name">
              <IJS>useActive</IJS> <IJS>name</IJS>
            </Link>
          </p>
        </HashSection>

        <HashSection tag="h4" meta={{ title: "params", hash: "Active-params" }}>
          <p>
            See{" "}
            <Link hash="useActive-params">
              <IJS>useActive</IJS> <IJS>params</IJS>
            </Link>
          </p>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "children", hash: "Active-children" }}
        >
          <p>
            A render-invoked function whose first argument is whether the route
            (determined using the <IJS>name</IJS> and <IJS>params</IJS>) is
            active.
          </p>

          <p>
            The second argument passed to the render-invoked function is the
            current <IJS>response</IJS>. <Cmp>Active</Cmp> only checks if the
            route is active (i.e. matches the current location's{" "}
            <IJS>pathname</IJS>). If you want to check if a <IJS>query</IJS> or{" "}
            <IJS>hash</IJS> match the current location, you should do this
            yourself inside of the render-invoked function. You can compare the{" "}
            <IJS>query</IJS>/<IJS>hash</IJS> against the response's{" "}
            <IJS>location</IJS>.
          </p>

          <CodeBlock lang="jsx">
            {`<Active name="Home">
  {(active, response) => {
    const activeHash = response.hash === "ahoy"
    // ...
  }}
</Active>`}
          </CodeBlock>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "partial", hash: "Active-partial" }}
        >
          <p>
            See{" "}
            <Link hash="useActive-partial">
              <IJS>useActive</IJS> <IJS>partial</IJS>
            </Link>
          </p>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
