import React from "react";

import { HashSection, CodeBlock } from "../../../../components/package/common";

export const ScrollAPIMeta = {
  title: "scrollEffect",
  hash: "scrollEffect"
};

export function ScrollAPI() {
  return (
    <HashSection title={ScrollAPIMeta.title} id={ScrollAPIMeta.hash}>
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
