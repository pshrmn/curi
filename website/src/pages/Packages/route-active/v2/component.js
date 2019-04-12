import React from "react";

import { About, APIBlock, IJS } from "../../../../components/package/common";
import { ActiveAPI } from "./api/active";

function RouteActivePkg() {
  return (
    <React.Fragment>
      <About>
        <p>
          The <IJS>@curi/route-active</IJS> package determines whether a route
          is "active" by comparing it to the current response. This can be
          restricted to complete matches or allow partial matches so that
          ancestor routes of the current location can also considered "active".
        </p>
      </About>

      <APIBlock>
        <ActiveAPI />
      </APIBlock>
    </React.Fragment>
  );
}

export default React.memo(RouteActivePkg);
