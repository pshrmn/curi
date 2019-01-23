import React from "react";

import { InlineComponent as Cmp } from "../../../components/highlight/Inline";
import { Section } from "../../../components/layout/Sections";
import CodeSandboxDemo from "../../../components/CodeSandboxDemo";
import { Explanation } from "../../../components/layout/Groups";
import OnGithub from "../../../components/example/OnGithub";

const meta = {
  title: "Active Links"
};

export default function ActiveLinksExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Section title="Explanation" id="explanation">
        <Explanation>
          <p>
            You may want to style a link differently when it is "active" (based
            on the current response). You can do so using the <Cmp>Active</Cmp>{" "}
            and <Cmp>Link</Cmp> components.
          </p>
        </Explanation>
      </Section>

      <Section title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/react/active-links" />
      </Section>

      <OnGithub path="react/active-links" />
    </React.Fragment>
  );
}
