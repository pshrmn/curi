import React from "react";

import CodeSandboxDemo from "../../../components/CodeSandboxDemo";
import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../../components/highlight/Inline";
import { Note } from "../../../components/Messages";
import { Section } from "../../../components/layout/Sections";
import { Explanation } from "../../../components/layout/Groups";
import OnGithub from "../../../components/example/OnGithub";

const meta = {
  title: "Basics"
};

export default function BasicExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Section title="Explanation" id="explanation">
        <Explanation>
          <p>
            This example uses the <Cmp>Navigating</Cmp> component to render a
            button when there is an active asynchronous navigation. Clicking the
            button will cancel the navigation.
          </p>
        </Explanation>
      </Section>

      <Section title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/svelte/async-nav" />
      </Section>

      <OnGithub path="svelte/async-nav" />
    </React.Fragment>
  );
}
