import React from "react";

import {
  About,
  APIBlock,
  IJS,
  PageMenu
} from "../../../../components/package/common";
import { OnceAPI, meta as onceMeta } from "./once";
import { PreferDefaultAPI, meta as preferDefaultMeta } from "./preferDefault";

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
    children: [onceMeta, preferDefaultMeta]
  }
];

export default class RouteActivePkg extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <PageMenu contents={contents} />
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
