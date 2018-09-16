import React from "react";
import BaseExample from "../base/BaseExample";
import {
  PrismBlock,
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../../components/PrismBlocks";
import { Section } from "../../../components/Sections";
import CodeSandboxDemo from "../../../components/CodeSandboxDemo";

export default function DataLoadingExample({ name }) {
  return (
    <BaseExample>
      <h1>{name}</h1>
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
    </BaseExample>
  );
}
