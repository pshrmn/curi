import React from "react";

import {
  Page,
  HashSection,
  CodeSandboxDemo,
  OnGithub,
  onGitHubMeta
} from "../../components/example/common";

const meta = {
  title: "Twitch Clone"
};

const explanationMeta = {
  title: "Explanation",
  hash: "explanation"
};
const demoMeta = {
  title: "Live Demo",
  hash: "demo"
};

const contents = [explanationMeta, demoMeta, onGitHubMeta];

function TwitchExample() {
  return (
    <Page title={meta.title}>
      <HashSection meta={explanationMeta} tag="h2">
        <p>
          A clone of <a href="https://twitch.tv">Twitch</a> without all of the
          "good stuff" (streaming video). This application uses Vue for
          rendering and Curi for routing.
        </p>
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
