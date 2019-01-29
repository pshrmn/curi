import React from "react";

import { About, APIBlock, IJS } from "../../../../components/package/common";
import { OnceAPI } from "./api/once";
import { PreferDefaultAPI } from "./api/preferDefault";

export default class RouteActivePkg extends React.PureComponent {
  render() {
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
}
