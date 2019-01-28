import React from "react";

import {
  HashSection,
  CodeSandboxDemo,
  OnGithub
} from "../../../components/example/common";

const meta = {
  title: "Data Loading"
};

export default function DataLoadingExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection title="Explanation" id="explanation">
        <p>TBD</p>
      </HashSection>

      <HashSection title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/react/data-loading" />
      </HashSection>

      <OnGithub path="react/data-loading" />
    </React.Fragment>
  );
}
