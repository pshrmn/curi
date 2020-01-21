import React from "react";

import { HashSection } from "../layout/Sections";

export let meta = {
  title: "On GitHub",
  hash: "source"
};

export function OnGithub({ path, repo = true }) {
  let href = repo
    ? `https://github.com/pshrmn/curi/tree/master/examples/${path}`
    : path;
  return (
    <HashSection meta={meta} tag="h2">
      <p>
        If you want to run this code locally, the source code is available{" "}
        <a href={href}>on GitHub</a>.
      </p>
    </HashSection>
  );
}
