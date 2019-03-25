import React from "react";

import {
  HashSection,
  CodeBlock,
  Note,
  IJS
} from "../../../../../components/package/common";

const optsMeta = {
  title: "Options",
  hash: "useLocation-opts"
};
export const meta = {
  title: "useLocation()",
  hash: "useLocation",
  children: [optsMeta]
};

export function UseLocationAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        The <IJS>useLocation</IJS> hook creates a location object.
      </p>

      <CodeBlock lang="jsx">
        {`import { useLocation } from '@curi/react-dom';
        
useLocation({
  name: "Video",
  params: { id: "jaifeo9" } },
  hash: "comments",
  query: "t=15"
});`}
      </CodeBlock>

      <HashSection tag="h3" meta={optsMeta}>
        <HashSection
          tag="h4"
          meta={{ title: "name", hash: "useLocation-name" }}
        >
          <p>
            The name of the route to generate the location's pathname from. If
            this is not provided, the generated location's pathname will be an
            empty string (<IJS>""</IJS>);
          </p>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "params", hash: "useLocation-params" }}
        >
          <p>An object of params for the named route.</p>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "hash", hash: "useLocation-hash" }}
        >
          <p>A hash string for the location.</p>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "query", hash: "useLocation-query" }}
        >
          <p>The location's query value.</p>

          <p>
            By default, this is expected to be a string, but if you configure
            your history object with the{" "}
            <a href="https://github.com/pshrmn/hickory/blob/master/docs/api/browser.md#options">
              <IJS>query</IJS>
            </a>{" "}
            option, this may be something else.
          </p>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "state", hash: "useLocation-state" }}
        >
          <p>
            State data to associate with the location. This must be
            serializable.
          </p>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
