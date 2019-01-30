import React from "react";

import { About, APIBlock, IJS } from "../../../../components/package/common";
import { ActiveAPI } from "./api/active";

export default class RouteActivePkg extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
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
