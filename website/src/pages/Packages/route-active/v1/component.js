import React from "react";

import {
  About,
  APIBlock,
  IJS,
  Note
} from "../../../../components/package/common";
import { ActiveAPI } from "./api/active";

function RouteActivePkg() {
  return (
    <React.Fragment>
      <About>
        <p>
          The <IJS>@curi/route-active</IJS> package determines whether a route
          is "active" by comparing it to the current response. This can be
          restricted to complete matches or allow partial matches so that
          locations that represent an ancestor of the current location are also
          considered "active".
        </p>

        <Note>
          <p>
            <IJS>@curi/router</IJS> v2 automatically includes the active
            interaction, making this package unnecessary.
          </p>
        </Note>
      </About>

      <APIBlock>
        <ActiveAPI />
      </APIBlock>
    </React.Fragment>
  );
}

export default React.memo(RouteActivePkg);
