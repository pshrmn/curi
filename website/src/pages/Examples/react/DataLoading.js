import React from "react";

import { Section } from "../../../components/layout/Sections";
import CodeSandboxDemo from "../../../components/CodeSandboxDemo";

export default function DataLoadingExample() {
  return (
    <React.Fragment>
      <Section title="Explanation" id="explanation">
        <p>TBD</p>
      </Section>

      <Section title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/react/data-loading" />
      </Section>

      <Section title="On GitHub" id="source">
        If you want to run this code locally, the source code is available on
        GitHub{" "}
        <a href="https://github.com/pshrmn/curi/tree/master/examples/react/data-loading">
          here
        </a>.
      </Section>
    </React.Fragment>
  );
}
