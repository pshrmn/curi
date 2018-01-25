import React from "react";
import BaseExample from "../base/BaseExample";
import CodeSandboxDemo from "../../components/CodeSandboxDemo";
import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../components/PrismBlocks";
import { Note } from "../../components/Messages";
import { Section } from "../../components/Sections";

export default ({ name }) => (
  <BaseExample>
    <h1>{name}</h1>
    <Section title="Explanation" id="explanation">
      <p>
        A clone of <a href="https://twitch.tv">Twitch</a> without all of the
        "good stuff" (streaming video). This application uses Vue for rendering
        and Curi for routing.
      </p>
    </Section>

    <Section title="Live Demo" id="demo">
      <CodeSandboxDemo id="github/pshrmn/twitch-curi-demo" />
    </Section>

    <Section title="On GitHub" id="source">
      <p>
        If you want to run this code locally, the source code is available on
        GitHub <a href="https://github.com/pshrmn/twitch-curi-demo">here</a>.
      </p>
    </Section>
  </BaseExample>
);
