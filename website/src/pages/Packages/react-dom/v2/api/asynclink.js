import React from "react";
import { Link } from "@curi/react-dom";

import {
  HashSection,
  CodeBlock,
  IJS,
  Cmp,
  Note,
  Warning
} from "../../../../../components/package/common";

const propsMeta = {
  title: "Props",
  hash: "AsyncLink-props"
};
export const meta = {
  title: "<AsyncLink>",
  hash: "AsyncLink",
  children: [propsMeta]
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
        component. The function will be called with one argument, a boolean
        indicating whether or not the link is actively navigating (i.e. when{" "}
        <IJS>true</IJS>, the user has clicked the link and Curi is currently
        running async code for the navigation).
      </p>

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
          meta={{ title: "children", hash: "Link-children" }}
        >
          <p>
            A render-invoked <IJS>children</IJS> function will be called with
            the <IJS>AsyncLink</IJS>'s navigation state. The navigation state is{" "}
            <IJS>false</IJS> to start, <IJS>true</IJS> when the{" "}
            <IJS>AsyncLink</IJS> is clicked, and <IJS>false</IJS> when the the
            navigation finishes/is cancelled.
          </p>

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
          <p>
            See <Link hash="Link-anchor">Link anchor</Link>
          </p>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "forward", hash: "AsyncLink-forward" }}
        >
          <p>
            See <Link hash="Link-forward">Link forward</Link>
          </p>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
