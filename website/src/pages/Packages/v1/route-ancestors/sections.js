import React from "react";

import { About, APIBlock, IJS } from "../../../../components/package/common";
import { AncestorsAPI } from "./api/ancestors";

export default {
  about: (
    <About>
      <p>
        The <IJS>@curi/route-ancestors</IJS> route interaction returns the names
        of ancestor routes, which can be useful for generating breadcrumb links.
      </p>
    </About>
  ),
  api: (
    <APIBlock>
      <AncestorsAPI />
    </APIBlock>
  )
};
