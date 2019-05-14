import React from "react";
import { Link } from "@curi/react-dom";

import {
  HashSection,
  MultiSandbox,
  IJS
} from "../../components/example/common";

const meta = {
  title: "Active"
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

function ActiveLinksExample() {
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
            <IJS>active</IJS>
          </Link>{" "}
          interaction to determine if a route is active. This is useful if an
          application wants to style "active" content.
        </p>
      </HashSection>

      <HashSection meta={demoMeta}>
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
    </React.Fragment>
  );
}

export { ActiveLinksExample as component, contents };
