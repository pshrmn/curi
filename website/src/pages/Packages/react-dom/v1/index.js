import React from "react";
import { Link } from "@curi/react-dom";

import { About, APIBlock, IJS } from "../../../../components/package/common";
import { CuriProviderAPI } from "./curiProvider";
import { LinkAPI } from "./link";
import { FocusAPI } from "./focus";
import { CuriousAPI } from "./curious";
import { ActiveAPI } from "./active";
import { NavigatingAPI } from "./navigating";
import { BlockAPI } from "./block";

export default class ReactPkg extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <About>
          <p>
            The <IJS>@curi/react-dom</IJS> package provides a number of React
            components that you can use for rendering your application.
          </p>
          <p>
            For more information on using Curi with React DOM, please check out
            the{" "}
            <Link name="Guide" params={{ slug: "react-dom" }}>
              React DOM guide
            </Link>
            .
          </p>
        </About>
        <APIBlock>
          <CuriProviderAPI />
          <LinkAPI />
          <FocusAPI />
          <CuriousAPI />
          <ActiveAPI />
          <NavigatingAPI />
          <BlockAPI />
        </APIBlock>
      </React.Fragment>
    );
  }
}
