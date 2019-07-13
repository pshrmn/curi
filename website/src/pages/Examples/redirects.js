import React from "react";

import {
  Page,
  HashSection,
  MultiSandbox,
  IJS
} from "../../components/example/common";

const meta = {
  title: "Redirects"
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

function RedirectsExample() {
  return (
    <Page title={meta.title}>
      <HashSection meta={explanationMeta} tag="h2">
        <p>
          When a route matches, it can redirect to another route. This is done
          using the route's <IJS>respond</IJS> function that returns an object
          with a <IJS>redirect</IJS> property.
        </p>
      </HashSection>

      <HashSection meta={demoMeta} tag="h2">
        <MultiSandbox
          sandboxes={[
            {
              id: "github/pshrmn/curi/tree/master/examples/react/redirects",
              name: "React"
            },
            {
              id: "github/pshrmn/curi/tree/master/examples/vue/redirects",
              name: "Vue"
            },
            {
              id: "github/pshrmn/curi/tree/master/examples/svelte/redirects",
              name: "Svelte"
            }
          ]}
        />
      </HashSection>
    </Page>
  );
}

export { RedirectsExample as component, contents };
