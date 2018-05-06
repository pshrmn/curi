import React from "react";
import BaseExample from "../base/BaseExample";
import CodeSandboxDemo from "../../../components/CodeSandboxDemo";
import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../../components/PrismBlocks";
import { Note } from "../../../components/Messages";
import { Section } from "../../../components/Sections";

export default ({ name }) => (
  <BaseExample>
    <h1>{name}</h1>
    <Section title="Explanation" id="explanation">
      <p>
        While Vue does have an official router, this project shows how you could
        use Curi as the router for a Vue project instead. It uses{" "}
        <Cmp>curi-link</Cmp> component provided by the the <IJS>@curi/vue</IJS>{" "}
        package.
      </p>
    </Section>

    <Section title="Live Demo" id="demo">
      <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/vue/basic" />
    </Section>

    <Section title="On GitHub" id="source">
      <p>
        If you want to run this code locally, the source code is available on
        GitHub{" "}
        <a href="https://github.com/pshrmn/curi/tree/master/examples/vue/basic">
          here
        </a>.
      </p>
    </Section>
  </BaseExample>
);
