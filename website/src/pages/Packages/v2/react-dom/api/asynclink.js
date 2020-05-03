import React from "react";
import { Link } from "@curi/react-dom";

import {
  HashSection,
  Paragraph,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

let propsMeta = {
  title: "Props",
  hash: "AsyncLink-props"
};
export let meta = {
  title: "AsyncLink",
  hash: "AsyncLink"
};

export function AsyncLinkAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <Paragraph>
        An <IJS>AsyncLink</IJS> is similar to a{" "}
        <Link hash="Link">
          <IJS>Link</IJS>
        </Link>
        , but uses a render-invoked function as its <IJS>children</IJS>{" "}
        component.
      </Paragraph>

      <CodeBlock lang="jsx">
        {`import { AsyncLink } from '@curi/react-dom';

<AsyncLink name='User' params={{ id: 16 }}>
  {navigating => {
    return navigating
      ? "Navigating to User 16"
      : "Go to User 16"
  }}
</AsyncLink>

<a href='/user/16'>Go to User 16</a>
// click link
<a href='/user/16'>Navigating to User 16</a>
// navigating finishes
<a href='/user/16'>Go to User 16</a>`}
      </CodeBlock>

      <HashSection tag="h3" meta={propsMeta}>
        <HashSection tag="h4" meta={{ title: "name", hash: "AsyncLink-name" }}>
          <Paragraph>
            See <Link hash="Link-name">Link name</Link>
          </Paragraph>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "params", hash: "AsyncLink-params" }}
        >
          <Paragraph>
            See <Link hash="Link-params">Link params</Link>
          </Paragraph>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{
            title: "hash, query & state",
            hash: "AsyncLink-hash-query-state"
          }}
        >
          <Paragraph>
            See{" "}
            <Link hash="Link-hash-query-state">Link hash, query & state</Link>
          </Paragraph>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "children", hash: "AsyncLink-children" }}
        >
          <Paragraph>
            A render-invoked <IJS>children</IJS> function that is called with
            the <IJS>AsyncLink</IJS>'s navigation state. The navigation state is{" "}
            <IJS>false</IJS> to start, <IJS>true</IJS> when the{" "}
            <IJS>AsyncLink</IJS> is clicked, and <IJS>false</IJS> when the the
            navigation finishes/is cancelled.
          </Paragraph>

          <CodeBlock lang="jsx">
            {`<AsyncLink name="User" params={{ id: 1 }}>
  {navigating => (
    <React.Fragment>
      User 1
      {navigating ? <Spinner /> : null}
    </React.Fragment>
  )}
</AsyncLink>`}
          </CodeBlock>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "anchor", hash: "AsyncLink-anchor" }}
        >
          <Paragraph>
            See <Link hash="Link-anchor">Link anchor</Link>
          </Paragraph>
        </HashSection>

        <HashSection tag="h4" meta={{ title: "rest", hash: "AsyncLink-rest" }}>
          <Paragraph>
            See <Link hash="Link-rest">Link rest</Link>
          </Paragraph>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
