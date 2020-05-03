import React from "react";

import {
  HashSection,
  Paragraph,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

let optsMeta = {
  title: "Options",
  hash: "useURL-opts"
};
export let meta = {
  title: "useURL",
  hash: "useURL"
};

export function UseURLAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <Paragraph>
        The <IJS>useURL</IJS> hook creates a URL string.
      </Paragraph>

      <CodeBlock lang="jsx">
        {`import { useURL } from '@curi/react-dom';

let href = useURL({
  name: "Video",
  params: { id: "jaifeo9" } },
  hash: "comments",
  query: "t=15"
});
// href = "/video/jaifeo9?t=15#comments"`}
      </CodeBlock>

      <HashSection tag="h3" meta={optsMeta}>
        <HashSection tag="h4" meta={{ title: "name", hash: "useURL-name" }}>
          <Paragraph>
            The name of the route to generate the location's pathname from. If
            this is not provided, the generated location's pathname will be an
            empty string (<IJS>""</IJS>);
          </Paragraph>
        </HashSection>

        <HashSection tag="h4" meta={{ title: "params", hash: "useURL-params" }}>
          <Paragraph>An object of params for the named route.</Paragraph>
        </HashSection>

        <HashSection tag="h4" meta={{ title: "hash", hash: "useURL-hash" }}>
          <Paragraph>A hash string for the location.</Paragraph>
        </HashSection>

        <HashSection tag="h4" meta={{ title: "query", hash: "useURL-query" }}>
          <Paragraph>The location's query value.</Paragraph>

          <Paragraph>
            By default, this is expected to be a string, but if you configure
            your history object with the{" "}
            <a href="https://github.com/pshrmn/hickory/blob/master/docs/api/browser.md#options">
              <IJS>query</IJS>
            </a>{" "}
            option, this may be something else.
          </Paragraph>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
