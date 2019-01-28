import React from "react";

import {
  HashSection,
  Explanation,
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
        <Explanation>
          <p>
            You may want to style a link differently when it is "active" (based
            on the current response object). You can do so using the{" "}
            <IJS>active</IJS> route interaction combined with the{" "}
            <Cmp>curi-link</Cmp> component.
          </p>
        </Explanation>
      </HashSection>

      <HashSection title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/vue/active-links" />
      </HashSection>

      <OnGithub path="vue/active-links" />
    </React.Fragment>
  );
}
