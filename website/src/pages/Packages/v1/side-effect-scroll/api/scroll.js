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
    <HashSection meta={meta} tag="h2">
      <CodeBlock>
        {`import { curi } from '@curi/router';
import scroll from '@curi/side-effect-scroll';

const router = curi(history, routes, {
  sideEffects: [scroll()]
});`}
      </CodeBlock>
    </HashSection>
  );
}
