import React from "react";

import {
  About,
  APIBlock,
  IJS,
  PageMenu
} from "../../../../components/package/common";
import { ActiveAPI, meta as activeMeta } from "./active";

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
    children: [activeMeta]
  }
];

export default class RouteActivePkg extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <PageMenu contents={contents} />
        <About>
          <p>
            The <IJS>@curi/route-active</IJS> package determines whether a route
            is "active" by comparing it to the current response. This can be
            restricted to complete matches or allow partial matches so that
            locations that represent an ancestor of the current location are
            also considered "active".
          </p>
        </About>

        <APIBlock>
          <ActiveAPI />
        </APIBlock>
      </React.Fragment>
    );
  }
}
