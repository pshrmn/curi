import React from "react";

import {
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
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection meta={explanationMeta}>
        <p>
          When a route matches, it can redirect to another route. This is done
          using the route's <IJS>respond</IJS> function that returns an object
          with a <IJS>redirect</IJS> property.
        </p>
      </HashSection>

      <HashSection meta={demoMeta}>
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
    </React.Fragment>
  );
}

export { RedirectsExample as component, contents };
