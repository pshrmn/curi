import React from "react";

import CodeSandboxDemo from "../../../components/CodeSandboxDemo";
import { Section } from "../../../components/layout/Sections";
import { Explanation } from "../../../components/layout/Groups";
import OnGithub from "../../../components/example/OnGithub";

const meta = {
  title: "Basics"
};

export default function BasicExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Section title="Explanation" id="explanation">
        <Explanation>
          <p>
            While Vue does have an official router, this project shows how you
            could use Curi as the router for a Vue project instead.
          </p>
        </Explanation>
      </Section>

      <Section title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/vue/basic" />
      </Section>

      <OnGithub path="vue/basic" />
    </React.Fragment>
  );
}
