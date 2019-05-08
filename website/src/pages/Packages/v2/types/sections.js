import React from "react";

import { About, CodeBlock } from "../../../../components/package/common";

export default {
  about: (
    <About>
      <p>
        This package is for TypeScript users. It provides the common Curi types
        used by the various packages.
      </p>
      <CodeBlock>
        {`import { createRouter } from "@curi/router";

import { CuriRouter } from "@curi/types";

const router: CuriRouter = createRouter(browser, routes);`}
      </CodeBlock>
    </About>
  ),
  api: null
};
