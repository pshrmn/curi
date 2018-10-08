import React from "react";

import { Section } from "../../../components/layout/Sections";
import CodeSandboxDemo from "../../../components/CodeSandboxDemo";
import { InlineJS as IJS } from "../../../components/highlight/Inline";

const meta = {
  title: "Breadcrumbs"
};

export default function BreadcrumbsExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Section title="Explanation" id="explanation">
        <p>
          You can easily generate breadcrumb navigation links for the current
          route using the <IJS>@curi/route-ancestors</IJS> package, which
          provides the names of the ancestors of the current route. Using these
          names you can render a Link for each one (passing the parameters if
          necessary).
        </p>
      </Section>

      <Section title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/react/breadcrumbs" />
      </Section>

      <Section title="On GitHub" id="source">
        If you want to run this code locally, the source code is available on
        GitHub{" "}
        <a href="https://github.com/pshrmn/curi/tree/master/examples/react/breadcrumbs">
          here
        </a>.
      </Section>
    </React.Fragment>
  );
}
