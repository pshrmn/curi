import React from "react";

import {
  Page,
  HashSection,
  Paragraph,
  CodeSandboxDemo,
  OnGithub,
  onGitHubMeta
} from "../../components/example/common";

let meta = {
  title: "Twitch Clone"
};

let explanationMeta = {
  title: "Explanation",
  hash: "explanation"
};
let demoMeta = {
  title: "Live Demo",
  hash: "demo"
};

let contents = [explanationMeta, demoMeta, onGitHubMeta];

function TwitchExample() {
  return (
    <Page title={meta.title}>
      <HashSection meta={explanationMeta} tag="h2">
        <Paragraph>
          A clone of <a href="https://twitch.tv">Twitch</a> without all of the
          "good stuff" (streaming video). This application uses Vue for
          rendering and Curi for routing.
        </Paragraph>
      </HashSection>

      <HashSection meta={demoMeta} tag="h2">
        <CodeSandboxDemo
          id="github/pshrmn/twitch-curi-demo"
          title="Curi Twitch clone demo"
        />
      </HashSection>

      <OnGithub
        path="https://github.com/pshrmn/twitch-curi-demo"
        repo={false}
      />
    </Page>
  );
}

export { TwitchExample as component, contents };
