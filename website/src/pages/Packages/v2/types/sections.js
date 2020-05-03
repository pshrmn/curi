import React from "react";

import {
  About,
  Paragraph,
  CodeBlock
} from "../../../../components/package/common";

export default {
  about: (
    <About>
      <Paragraph>
        This package is for TypeScript users. It provides the common Curi types
        used by the various packages.
      </Paragraph>
      <CodeBlock>
        {`import { createRouter } from "@curi/router";

import { CuriRouter } from "@curi/types";

let router: CuriRouter = createRouter(browser, routes);`}
      </CodeBlock>
    </About>
  ),
  api: null
};
