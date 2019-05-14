import React from "react";
import { Link } from "@curi/react-dom";

import {
  HashSection,
  IJS,
  OnGithub,
  onGitHubMeta
} from "../../components/example/common";

const meta = {
  title: "Code Splitting"
};

const explanationMeta = {
  title: "Explanation",
  hash: "explanation"
};

const contents = [explanationMeta, onGitHubMeta];

function CodeSplittingExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection meta={explanationMeta}>
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
    </React.Fragment>
  );
}

export { CodeSplittingExample as component, contents };
