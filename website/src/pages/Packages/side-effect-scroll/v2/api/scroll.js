import React from "react";

import {
  HashSection,
  CodeBlock
} from "../../../../../components/package/common";

export const meta = {
  title: "scrollEffect",
  hash: "scrollEffect"
};

export function ScrollAPI() {
  return (
    <HashSection meta={meta}>
      <CodeBlock>
        {`import { createRouter } from "@curi/router";
import scrollEffect from '@curi/side-effect-scroll';

const router = createRouter(browser, routes, {
  sideEffects: [scrollEffect()]
});`}
      </CodeBlock>
    </HashSection>
  );
}
