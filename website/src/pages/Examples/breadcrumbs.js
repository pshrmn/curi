import React from "react";
import { Link } from "@curi/react-dom";

import {
  Page,
  HashSection,
  MultiSandbox,
  IJS
} from "../../components/example/common";

let meta = {
  title: "Breadcrumbs with Route Ancestors"
};

let explanationMeta = {
  title: "Explanation",
  hash: "explanation"
};
let demoMeta = {
  title: "Live Demo",
  hash: "demo"
};

let contents = [explanationMeta, demoMeta];

function BreadcrumbsExample() {
  return (
    <Page title={meta.title}>
      <HashSection meta={explanationMeta} tag="h2">
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

      <HashSection meta={demoMeta} tag="h2">
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
    </Page>
  );
}

export { BreadcrumbsExample as component, contents };
