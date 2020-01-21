import React from "react";

import {
  Page,
  HashSection,
  MultiSandbox,
  IJS
} from "../../components/example/common";

let meta = {
  title: "Asynchronous Routes & Navigation"
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

function AsyncExample() {
  return (
    <Page title={meta.title}>
      <HashSection meta={explanationMeta} tag="h2">
        <p>
          Route's with a <IJS>resolve</IJS> property are asynchronous. When they
          match, a response will not be emitted until the <IJS>resolve</IJS>{" "}
          function's asynchronous actions complete. While waiting, the links can
          render loading notifications.
        </p>
      </HashSection>

      <HashSection meta={demoMeta} tag="h2">
        <MultiSandbox
          sandboxes={[
            {
              id: "github/pshrmn/curi/tree/master/examples/react/async-nav",
              name: "React"
            },
            {
              id: "github/pshrmn/curi/tree/master/examples/vue/async-nav",
              name: "Vue"
            },
            {
              id: "github/pshrmn/curi/tree/master/examples/svelte/async-nav",
              name: "Svelte"
            }
          ]}
        />
      </HashSection>
    </Page>
  );
}

export { AsyncExample as component, contents };
