import React from "react";

import { About, APIBlock, IJS } from "../../../../components/package/common";
import { CreateRouterAPI } from "./api/createRouter";
import { PrepareRoutesAPI } from "./api/prepareRoutes";
import { RoutePropertiesAPI } from "./api/route-objects";

export default class RouterPkg extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <About>
          <p>
            The <IJS>@curi/router</IJS> package is used to create a router.
          </p>
        </About>
        <APIBlock>
          <PrepareRoutesAPI />
          <CreateRouterAPI />
          <RoutePropertiesAPI />
        </APIBlock>
      </React.Fragment>
    );
  }
}
