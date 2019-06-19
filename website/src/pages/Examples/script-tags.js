import React from "react";

import {
  HashSection,
  Cmp,
  OnGithub,
  onGitHubMeta
} from "../../components/example/common";

const meta = {
  title: "Script Tags"
};

const explanationMeta = {
  title: "Explanation",
  hash: "explanation"
};

const contents = [explanationMeta, onGitHubMeta];
function ScriptTagExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection meta={explanationMeta} tag="h2">
        <p>
          This example uses unbundled JavaScript and script tags to serve its
          content. If you want to use <Cmp>script</Cmp> tags in your
          application, Curi does provide builds for that. You can easily use{" "}
          <a href="https://unpkg.com">unpkg</a> to load the scripts, or download
          and serve them yourself.
        </p>
      </HashSection>

      <OnGithub path="misc/script-tags" />
    </React.Fragment>
  );
}

export { ScriptTagExample as component, contents };
