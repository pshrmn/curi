import React from "react";

import {
  Page,
  HashSection,
  Paragraph,
  Cmp,
  OnGithub,
  onGitHubMeta
} from "../../components/example/common";

let meta = {
  title: "Script Tags"
};

let explanationMeta = {
  title: "Explanation",
  hash: "explanation"
};

let contents = [explanationMeta, onGitHubMeta];
function ScriptTagExample() {
  return (
    <Page title={meta.title}>
      <HashSection meta={explanationMeta} tag="h2">
        <Paragraph>
          This example uses unbundled JavaScript and script tags to serve its
          content. If you want to use <Cmp>script</Cmp> tags in your
          application, Curi does provide builds for that. You can easily use{" "}
          <a href="https://unpkg.com">unpkg</a> to load the scripts, or download
          and serve them yourself.
        </Paragraph>
      </HashSection>

      <OnGithub path="misc/script-tags" />
    </Page>
  );
}

export { ScriptTagExample as component, contents };
