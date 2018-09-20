import React from "react";
import BaseExample from "../base/BaseExample";
import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../../components/PrismBlocks";
import { Section } from "../../../components/Sections";
import CodeSandboxDemo from "../../../components/CodeSandboxDemo";

export default function ActiveLinksExample({ name }) {
  return (
    <BaseExample>
      <h1>{name}</h1>
      <Section title="Explanation" id="explanation">
        <p>
          You may want to style a link differently when it is "active" (based on
          the current response object). You can do so using the active prop of{" "}
          <Cmp>Link</Cmp>.
        </p>

        <p>
          The active prop must be an object with a <IJS>merge</IJS> function as
          one of its properties. The merge function is responsible for updating
          the props that will be passed to the anchor (<Cmp>a</Cmp>).
        </p>

        <p>
          You can also pass a <IJS>partial</IJS> property to the active object.
          partial should be a boolean, and when it is true (the Link's{" "}
          <IJS>to</IJS> property is in the response's partials array) it can be
          "active" if its params match the response's params.
        </p>
      </Section>

      <Section title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/vue/active-links" />
      </Section>

      <Section title="On GitHub" id="source">
        If you want to run this code locally, the source code is available on
        GitHub{" "}
        <a href="https://github.com/pshrmn/curi/tree/master/examples/vue/active-links">
          here
        </a>.
      </Section>
    </BaseExample>
  );
}
