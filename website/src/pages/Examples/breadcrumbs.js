import React from "react";
import { Link } from "@curi/react-dom";

import {
  HashSection,
  MultiSandbox,
  IJS
} from "../../components/example/common";

const meta = {
  title: "Breadcrumbs with Route Ancestors"
};

const explanationMeta = {
  title: "Explanation",
  hash: "explanation"
};
const demoMeta = {
  title: "Live Demo",
  hash: "demo"
};

const contents = [explanationMeta, demoMeta];

function BreadcrumbsExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection meta={explanationMeta}>
        <p>
          Curi can use the{" "}
          <Link
            name="Package"
            params={{ package: "interactions", version: "v2" }}
            hash="active"
          >
            <IJS>ancestors</IJS>
          </Link>{" "}
          interaction to access its ancestor routes. These, in turn, can be used
          to generate breadcrumb links.
        </p>
      </HashSection>

      <HashSection meta={demoMeta}>
        <MultiSandbox
          sandboxes={[
            {
              id: "github/pshrmn/curi/tree/master/examples/react/breadcrumbs",
              name: "React"
            },
            {
              id: "github/pshrmn/curi/tree/master/examples/vue/breadcrumbs",
              name: "Vue"
            },
            {
              id: "github/pshrmn/curi/tree/master/examples/svelte/breadcrumbs",
              name: "Svelte"
            }
          ]}
        />
      </HashSection>
    </React.Fragment>
  );
}

export { BreadcrumbsExample as component, contents };
