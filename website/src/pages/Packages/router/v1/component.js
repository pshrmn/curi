import React from "react";

import { About, APIBlock, IJS } from "../../../../components/package/common";
import { CuriAPI } from "./api/curi";
import { PrepareRoutesAPI } from "./api/prepareRoutes";
import { RoutePropertiesAPI } from "./api/route-objects";

function RouterPkg() {
  return (
    <React.Fragment>
      <About>
        <p>
          The <IJS>@curi/router</IJS> package is used to create a router.
        </p>
      </About>
      <APIBlock>
        <CuriAPI />
        <PrepareRoutesAPI />
        <RoutePropertiesAPI />
      </APIBlock>
    </React.Fragment>
  );
}

export default React.memo(RouterPkg);
