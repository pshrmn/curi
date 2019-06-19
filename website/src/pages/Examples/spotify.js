import React from "react";

import {
  HashSection,
  CodeSandboxDemo,
  OnGithub,
  onGitHubMeta
} from "../../components/example/common";

const meta = {
  title: "Spotify Clone"
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

function SpotifyExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

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
    </React.Fragment>
  );
}

export { SpotifyExample as component, contents };
