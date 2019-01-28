import React from "react";

import {
  HashSection,
  Explanation,
  Cmp,
  CodeSandboxDemo,
  OnGithub
} from "../../../components/example/common";

const meta = {
  title: "Blocking Navigation"
};

export default function BlockingNavigationExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection title="Explanation" id="explanation">
        <Explanation>
          <p>
            Sometimes, you don't want the user to leave the page. Ideally, this
            is when leaving the page would cause content to be lost, like a
            half-filled form, and not becacuse you're running a spam site.
          </p>
          <p>
            The <Cmp>curi-block</Cmp> component will display a user confirmation
            that requires user input before navigation will occur.
          </p>
        </Explanation>
      </HashSection>

      <HashSection title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/vue/blocking-navigation" />
      </HashSection>

      <OnGithub path="vue/blocking-navigation" />
    </React.Fragment>
  );
}
