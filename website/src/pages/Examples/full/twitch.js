import React from "react";

import {
  HashSection,
  CodeSandboxDemo
} from "../../../components/example/common";

const meta = {
  title: "Twitch Clone"
};

export default function TwitchExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection title="Explanation" id="explanation">
        <p>
          A clone of <a href="https://twitch.tv">Twitch</a> without all of the
          "good stuff" (streaming video). This application uses Vue for
          rendering and Curi for routing.
        </p>
      </HashSection>

      <HashSection title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/twitch-curi-demo" />
      </HashSection>

      <HashSection title="On GitHub" id="source">
        <p>
          If you want to run this code locally, the source code is available on
          GitHub <a href="https://github.com/pshrmn/twitch-curi-demo">here</a>.
        </p>
      </HashSection>
    </React.Fragment>
  );
}
