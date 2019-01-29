import React from "react";

import {
  About,
  APIBlock,
  IJS,
  PageMenu
} from "../../../../components/package/common";
import { CuriAPI, meta as curiMeta } from "./curi";
import { PrepareRoutesAPI, meta as prepareRoutesMeta } from "./prepareRoutes";
import {
  RoutePropertiesAPI,
  meta as RoutePropertiesMeta
} from "./route-properties";

const contents = [
  {
    title: "Installation",
    hash: "installation"
  },
  {
    title: "About",
    hash: "about"
  },
  {
    title: "API",
    hash: "API",
    children: [curiMeta, prepareRoutesMeta, RoutePropertiesMeta]
  }
];

export default class RouterPkg extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <PageMenu contents={contents} />
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
