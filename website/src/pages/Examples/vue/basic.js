import React from "react";

import {
  HashSection,
  Explanation,
  CodeSandboxDemo,
  OnGithub
} from "../../../components/example/common";

const meta = {
  title: "Basics"
};

export default function BasicExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection title="Explanation" id="explanation">
        <Explanation>
          <p>
            While Vue does have an official router, this project shows how you
            could use Curi as the router for a Vue project instead.
          </p>
        </Explanation>
      </HashSection>

      <HashSection title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/vue/basic" />
      </HashSection>

      <OnGithub path="vue/basic" />
    </React.Fragment>
  );
}
