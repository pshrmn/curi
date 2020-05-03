import React from "react";

import {
  Page,
  HashSection,
  Paragraph,
  MultiSandbox,
  IJS
} from "../../components/example/common";

let meta = {
  title: "Redirects"
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

function RedirectsExample() {
  return (
    <Page title={meta.title}>
      <HashSection meta={explanationMeta} tag="h2">
        <Paragraph>
          When a route matches, it can redirect to another route. This is done
          using the route's <IJS>respond</IJS> function that returns an object
          with a <IJS>redirect</IJS> property.
        </Paragraph>
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
