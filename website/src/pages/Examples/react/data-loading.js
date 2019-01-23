import React from "react";

import {
  Section,
  Explanation,
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

      <Section title="Explanation" id="explanation">
        <Explanation>
          <p>TBD</p>
        </Explanation>
      </Section>

      <Section title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/react/data-loading" />
      </Section>

      <OnGithub path="react/data-loading" />
    </React.Fragment>
  );
}
