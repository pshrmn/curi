import React from "react";

import {
  About,
  APIBlock,
  IJS,
  PageMenu
} from "../../../../components/package/common";
import { AncestorsAPI, meta as ancestorsMeta } from "./ancestors";

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
    children: [ancestorsMeta]
  }
];

export default class RouteAncestorsPkg extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <PageMenu contents={contents} />
        <About>
          <p>
            The <IJS>@curi/route-ancestors</IJS> route interaction returns the
            names of ancestor routes, which can be useful for generating
            breadcrumb links.
          </p>
        </About>
        <APIBlock>
          <AncestorsAPI />
        </APIBlock>
      </React.Fragment>
    );
  }
}
