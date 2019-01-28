import React from "react";

import {
  HashSection,
  Cmp,
  CodeSandboxDemo,
  OnGithub
} from "../../../components/example/common";

const meta = {
  title: "Active Links"
};

export default function ActiveLinksExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection title="Explanation" id="explanation">
        <p>
          You may want to style a link differently when it is "active" (based on
          the current response). You can do so using the <Cmp>Active</Cmp> and{" "}
          <Cmp>Link</Cmp> components.
        </p>
      </HashSection>

      <HashSection title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/react/active-links" />
      </HashSection>

      <OnGithub path="react/active-links" />
    </React.Fragment>
  );
}
