import React from "react";
import { Link } from "@curi/react-dom";

import {
  Page,
  HashSection,
  IJS,
  OnGithub,
  onGitHubMeta
} from "../../components/example/common";

let meta = {
  title: "Code Splitting"
};

let explanationMeta = {
  title: "Explanation",
  hash: "explanation"
};

let contents = [explanationMeta, onGitHubMeta];

function CodeSplittingExample() {
  return (
    <Page title={meta.title}>
      <HashSection meta={explanationMeta} tag="h2">
        <p>
          Code splitting with Curi routes is done using a <IJS>resolve</IJS>{" "}
          function. The{" "}
          <Link name="Guide" params={{ slug: "code-splitting" }}>
            code splitting
          </Link>{" "}
          guide covers the basic principles for how to do this. This example
          provides you with code that actually implements what is explained
          there.
        </p>
      </HashSection>

      <OnGithub path="misc/code-splitting" />
    </Page>
  );
}

export { CodeSplittingExample as component, contents };
