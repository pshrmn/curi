import React from "react";
import { Link } from "@curi/react-dom";

import { HashSection, IJS, OnGithub } from "../../../components/example/common";

const meta = {
  title: "Code Splitting"
};

export default function CodeSplittingExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection title="Explanation" id="explanation">
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
