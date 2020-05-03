import React from "react";
import { Link } from "@curi/react-dom";

import {
  Page,
  HashSection,
  Paragraph,
  MultiSandbox,
  IJS
} from "../../components/example/common";

let meta = {
  title: "Active"
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

function ActiveLinksExample() {
  return (
    <Page title={meta.title}>
      <HashSection meta={explanationMeta} tag="h2">
        <Paragraph>
          Curi can use the{" "}
          <Link
            name="Package"
            params={{ package: "interactions", version: "v2" }}
            hash="active"
          >
            <IJS>active</IJS>
          </Link>{" "}
          interaction to determine if a route is active. This is useful if an
          application wants to style "active" content.
        </Paragraph>
      </HashSection>

      <HashSection meta={demoMeta} tag="h2">
        <MultiSandbox
          sandboxes={[
            {
              id: "github/pshrmn/curi/tree/master/examples/react/active-links",
              name: "React"
            },
            {
              id: "github/pshrmn/curi/tree/master/examples/vue/active-links",
              name: "Vue"
            },
            {
              id: "github/pshrmn/curi/tree/master/examples/svelte/active-links",
              name: "Svelte"
            }
          ]}
        />
      </HashSection>
    </Page>
  );
}

export { ActiveLinksExample as component, contents };
