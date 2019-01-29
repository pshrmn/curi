import React from "react";
import { Link } from "@curi/react-dom";

import { About, APIBlock, IJS } from "../../../../components/package/common";
import { CuriProviderAPI } from "./curiProvider";
import { LinkAPI } from "./link";
import { CuriousAPI } from "./curious";
import { ActiveAPI } from "./active";
import { NavigatingAPI } from "./navigating";
import { BlockAPI } from "./block";

export default class ReactNativePkg extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <About>
          <p>
            The <IJS>@curi/react-native</IJS> package provides components to use
            Curi routing in a React Native application.
          </p>
          <p>
            For more information on using Curi with React Native, please check
            out the{" "}
            <Link name="Guide" params={{ slug: "react-native" }}>
              React Native guide
            </Link>
            .
          </p>
        </About>
        <APIBlock>
          <CuriProviderAPI />
          <LinkAPI />
          <CuriousAPI />
          <ActiveAPI />
          <NavigatingAPI />
          <BlockAPI />
        </APIBlock>
      </React.Fragment>
    );
  }
}
