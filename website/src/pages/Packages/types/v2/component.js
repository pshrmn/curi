import React from "react";

import { About, CodeBlock } from "../../../../components/package/common";

function TypesPkg() {
  return (
    <React.Fragment>
      <About>
        <p>
          This package is for TypeScript users. It provides the common Curi
          types used by the various packages.
        </p>
        <CodeBlock>
          {`import { createRouter } from "@curi/router";

import { CuriRouter } from "@curi/types";

const router: CuriRouter = createRouter(browser, routes);`}
        </CodeBlock>
      </About>
    </React.Fragment>
  );
}

export default React.memo(TypesPkg);
