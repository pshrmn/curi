import React from "react";
import { Link } from "@curi/react-dom";

import {
  HashSection,
  CodeBlock,
  Cmp,
  ScrollableTable,
  IJS
} from "../../../../../components/package/common";

const propsMeta = {
  title: "Props",
  hash: "Block-props"
};
export const meta = {
  title: "<Block>",
  hash: "Block",
  children: [propsMeta]
};

export function BlockAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        The <Cmp>Block</Cmp> component is a wrapper around the{" "}
        <Link hash="useBlock">
          <IJS>useBlock</IJS>
        </Link>{" "}
        hook.
      </p>

      <CodeBlock lang="jsx">
        {`import { Block } from '@curi/react-dom';

<Block active={true} confirm={confirm} />`}
      </CodeBlock>

      <HashSection tag="h3" meta={propsMeta}>
        <HashSection tag="h4" meta={{ title: "active", hash: "Block-active" }}>
          <p>
            See{" "}
            <Link hash="useBlock-active">
              <IJS>useBlock</IJS> <IJS>active</IJS>
            </Link>
          </p>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "confirm", hash: "Block-confirm" }}
        >
          <p>
            See{" "}
            <Link hash="useBlock-fn">
              <IJS>useBlock</IJS> <IJS>fn</IJS>
            </Link>
          </p>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
