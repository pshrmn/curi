import React from "react";
import { Link } from "@curi/react-dom";

import { About, APIBlock, IJS } from "../../../../components/package/common";
import { CuriAPI } from "./curi";
import { PrepareRoutesAPI } from "./prepareRoutes";
import { RoutePropertiesAPI } from "./route-properties";

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
          <CuriAPI />
          <PrepareRoutesAPI />
          <RoutePropertiesAPI />
        </APIBlock>
      </React.Fragment>
    );
  }
}
