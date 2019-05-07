import React from "react";

import { About, APIBlock, IJS } from "../../../../components/package/common";
import { PathnameAPI } from "./api/pathname";
import { ActiveAPI } from "./api/active";
import { AncestorsAPI } from "./api/ancestors";
import { PrefetchAPI } from "./api/prefetch";

function InteractionsPkg() {
  return (
    <React.Fragment>
      <About>
        <p>
          The <IJS>@curi/interactions</IJS> package provides a number of
          functions for interacting with Curi routes.
        </p>
      </About>
      <APIBlock>
        <PathnameAPI />
        <ActiveAPI />
        <AncestorsAPI />
        <PrefetchAPI />
      </APIBlock>
    </React.Fragment>
  );
}

export default React.memo(InteractionsPkg);
