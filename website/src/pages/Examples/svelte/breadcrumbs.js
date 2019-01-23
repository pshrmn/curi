import React from "react";

import {
  Section,
  Explanation,
  IJS,
  CodeSandboxDemo,
  OnGithub
} from "../../../components/example/common";

const meta = {
  title: "Breadcrumbs"
};

export default function BreadcrumbsExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Section title="Explanation" id="explanation">
        <Explanation>
          <p>
            The <IJS>@curi/route-ancestors</IJS> package lets you know what
            routes are the ancestors of another route. Using this, we can build
            breadcrumb links.
          </p>
        </Explanation>
      </Section>

      <Section title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/svelte/breadcrumbs" />
      </Section>

      <OnGithub path="svelte/breadcrumbs" />
    </React.Fragment>
  );
}
