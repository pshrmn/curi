import React from "react";

import { HashSection } from "../layout/Sections";

export default function OnGithub({ path }) {
  return (
    <HashSection title="On GitHub" id="source">
      <p>
        If you want to run this code locally, the source code is available on
        GitHub{" "}
        <a href={`https://github.com/pshrmn/curi/tree/master/examples/${path}`}>
          here
        </a>
        .
      </p>
    </HashSection>
  );
}
