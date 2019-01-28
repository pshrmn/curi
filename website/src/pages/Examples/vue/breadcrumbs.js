import React from "react";

import {
  HashSection,
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

      <HashSection title="Explanation" id="explanation">
        <p>
          The <IJS>@curi/route-ancestors</IJS> package lets you know what routes
          are the ancestors of another route. Using this, we can build
          breadcrumb links.
        </p>
      </HashSection>

      <HashSection title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/vue/breadcrumbs" />
      </HashSection>

      <OnGithub path="vue/breadcrumbs" />
    </React.Fragment>
  );
}
