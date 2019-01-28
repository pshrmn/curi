import React from "react";

import {
  HashSection,
  IJS,
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
          the current response object). You can do so using the{" "}
          <IJS>active</IJS> router interaction combined with the <Cmp>Link</Cmp>{" "}
          component.
        </p>
      </HashSection>

      <HashSection title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/svelte/active-links" />
      </HashSection>

      <OnGithub path="svelte/active-links" />
    </React.Fragment>
  );
}
