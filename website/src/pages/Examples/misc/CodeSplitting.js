import React from "react";
import BaseExample from "../base/BaseExample";
import { Link } from "@curi/react-dom";
import { Section } from "../../../components/Sections";
import { InlineJS as IJS } from "../../../components/PrismBlocks";

export default function CodeSplittingExample({ name }) {
  return (
    <BaseExample>
      <h1>{name}</h1>
      <Section title="Explanation" id="explanation">
        <p>
          Code splitting with Curi routes is done using a <IJS>resolve</IJS>{" "}
          function. The{" "}
          <Link to="Guide" params={{ slug: "code-splitting" }}>
            code splitting
          </Link>{" "}
          guide covers the basic principles for how to do this. This example
          provides you with code that actually implements what is explained
          there.
        </p>
      </Section>

      <Section title="On GitHub" id="source">
        If you want to run this code locally, the source code is available on
        GitHub{" "}
        <a href="https://github.com/pshrmn/curi/tree/master/examples/misc/code-splitting">
          here
        </a>.
      </Section>
    </BaseExample>
  );
}
