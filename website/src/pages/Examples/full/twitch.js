import React from "react";

import CodeSandboxDemo from "../../../components/CodeSandboxDemo";
import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../../components/highlight/Inline";
import { Note } from "../../../components/Messages";
import { Section } from "../../../components/layout/Sections";

export const slug = "twitch";

export default function TwitchExample() {
  return (
    <React.Fragment>
      <Section title="Explanation" id="explanation">
        <p>
          A clone of <a href="https://twitch.tv">Twitch</a> without all of the
          "good stuff" (streaming video). This application uses Vue for
          rendering and Curi for routing.
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
    </React.Fragment>
  );
}
