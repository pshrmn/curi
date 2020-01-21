import React from "react";

import {
  Page,
  HashSection,
  CodeSandboxDemo,
  OnGithub,
  onGitHubMeta
} from "../../components/example/common";

let meta = {
  title: "Spotify Clone"
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

function SpotifyExample() {
  return (
    <Page title={meta.title}>
      <HashSection meta={explanationMeta} tag="h2">
        <p>
          A clone of <a href="https://open.spotify.com">Spotify</a> without all
          of the good stuff (aka being able to listen to music). This
          application uses React DOM for rendering and Curi for routing.
        </p>
      </HashSection>

      <HashSection meta={demoMeta} tag="h2">
        <CodeSandboxDemo
          id="github/pshrmn/spotify-curi-demo"
          title="Curi Spotify clone demo"
        />
      </HashSection>

      <OnGithub
        path="https://github.com/pshrmn/spotify-curi-demo"
        repo={false}
      />
    </Page>
  );
}

export { SpotifyExample as component, contents };
