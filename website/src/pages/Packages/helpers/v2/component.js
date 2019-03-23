import React from "react";

import { About, APIBlock, IJS } from "../../../../components/package/common";
import { OnceAPI } from "./api/once";
import { PreferDefaultAPI } from "./api/prefer_default";

function RouteActivePkg() {
  return (
    <React.Fragment>
      <About>
        <p>
          The <IJS>@curi/helpers</IJS> package provides functions that may be
          useful in a Curi application.
        </p>
      </About>

      <APIBlock>
        <OnceAPI />
        <PreferDefaultAPI />
      </APIBlock>
    </React.Fragment>
  );
}

export default React.memo(RouteActivePkg);
