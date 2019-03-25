import React from "react";

import {
  HashSection,
  CodeBlock
} from "../../../../../components/package/common";

export const meta = {
  title: "scrollEffect()",
  hash: "scrollEffect"
};

export function ScrollAPI() {
  return (
    <HashSection meta={meta}>
      <CodeBlock>
        {`import { create_router } from "@curi/router";
import scroll from '@curi/side-effect-scroll';

const router = create_router(browser, routes, {
  side_effects: [scroll()]
});`}
      </CodeBlock>
    </HashSection>
  );
}
