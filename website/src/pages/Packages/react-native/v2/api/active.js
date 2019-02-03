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
            A render-invoked function that is passed a boolean, true when it is
            active and false when it is not.
          </p>
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

        <HashSection
          tag="h4"
          meta={{ title: "checkLocation", hash: "Active-checkLocation" }}
        >
          <p>
            See{" "}
            <Link hash="useActive-checkLocation">
              <IJS>useActive</IJS> <IJS>checkLocation</IJS>
            </Link>
          </p>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
