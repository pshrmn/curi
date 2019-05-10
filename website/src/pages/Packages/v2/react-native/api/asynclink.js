import React from "react";
import { Link } from "@curi/react-dom";

import {
  HashSection,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

const propsMeta = {
  title: "Props",
  hash: "AsyncLink-props"
};
export const meta = {
  title: "AsyncLink",
  hash: "AsyncLink"
};

export function AsyncLinkAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        An <IJS>AsyncLink</IJS> is similar to a{" "}
        <Link hash="Link">
          <IJS>Link</IJS>
        </Link>
        , but uses a render-invoked function as its <IJS>children</IJS>{" "}
        component.
      </p>

      <CodeBlock lang="jsx">
        {`import { AsyncLink } from '@curi/react-dom';

<AsyncLink name='User' params={{ id: 16 }}>
  {navigating => {
    return navigating
      ? <Text>Navigating to User 16</Text>
      : <Text>Go to User 16</Text>
  }}
</AsyncLink>

<TouchableHighlight>
  <Text>Go to User 16</Text>
</TouchableHighlight>
// press button
<TouchableHighlight>
  <Text>Navigating to User 16</Text>
</TouchableHighlight>`}
      </CodeBlock>

      <HashSection tag="h3" meta={propsMeta}>
        <HashSection tag="h4" meta={{ title: "name", hash: "AsyncLink-name" }}>
          <p>
            See <Link hash="Link-name">Link name</Link>
          </p>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "params", hash: "AsyncLink-params" }}
        >
          <p>
            See <Link hash="Link-params">Link params</Link>
          </p>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{
            title: "hash, query & state",
            hash: "AsyncLink-hash-query-state"
          }}
        >
          <p>
            See{" "}
            <Link hash="Link-hash-query-state">Link hash, query & state</Link>
          </p>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "children", hash: "AsyncLink-children" }}
        >
          <p>
            A render-invoked <IJS>children</IJS> function that is called with
            the <IJS>AsyncLink</IJS>'s navigation state. The navigation state is{" "}
            <IJS>false</IJS> to start, <IJS>true</IJS> when the{" "}
            <IJS>AsyncLink</IJS> is clicked, and <IJS>false</IJS> when the the
            navigation finishes/is cancelled.
          </p>

          <CodeBlock lang="jsx">
            {`<AsyncLink name="User" params={{ id: 1 }}>
  {navigating => (
    <React.Fragment>
      <Text>User 1</Text>
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
          <p>
            See <Link hash="Link-anchor">Link anchor</Link>
          </p>
        </HashSection>

        <HashSection tag="h4" meta={{ title: "rest", hash: "AsyncLink-rest" }}>
          <p>
            See <Link hash="Link-rest">Link rest</Link>
          </p>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
