import React from "react";

import { About, APIBlock, IJS } from "../../../../components/package/common";
import { CuriAPI } from "./api/curi";
import { PrepareRoutesAPI } from "./api/prepareRoutes";
import { RoutePropertiesAPI } from "./api/route-objects";

export default {
  about: (
    <About>
      <p>
        The <IJS>@curi/router</IJS> package is used to create a router.
      </p>
    </About>
  ),
  api: (
    <APIBlock>
      <CuriAPI />
      <PrepareRoutesAPI />
      <RoutePropertiesAPI />
    </APIBlock>
  )
};
