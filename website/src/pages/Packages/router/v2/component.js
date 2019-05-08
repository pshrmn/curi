import React from "react";

import { About, APIBlock, IJS } from "../../../../components/package/common";
import { CreateRouterAPI } from "./api/createRouter";
import { PrepareRoutesAPI } from "./api/prepareRoutes";
import { RoutePropertiesAPI } from "./api/route-objects";
import { AnnounceAPI } from "./api/announce";
import { ScrollAPI } from "./api/scroll";
import { TitleAPI } from "./api/title";

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
          <AnnounceAPI />
          <ScrollAPI />
          <TitleAPI />
        </APIBlock>
      </React.Fragment>
    );
  }
}
