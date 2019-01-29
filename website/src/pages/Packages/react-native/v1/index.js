import React from "react";
import { Link } from "@curi/react-dom";

import {
  About,
  APIBlock,
  IJS,
  PageMenu
} from "../../../../components/package/common";
import { CuriProviderAPI, meta as curiProviderMeta } from "./curiProvider";
import { LinkAPI, meta as LinkMeta } from "./link";
import { CuriousAPI, meta as CuriousMeta } from "./curious";
import { ActiveAPI, meta as ActiveMeta } from "./active";
import { NavigatingAPI, meta as NavigatingMeta } from "./navigating";
import { BlockAPI, meta as BlockMeta } from "./block";

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
    children: [
      curiProviderMeta,
      LinkMeta,
      CuriousMeta,
      ActiveMeta,
      NavigatingMeta,
      BlockMeta
    ]
  }
];

export default class ReactNativePkg extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <PageMenu contents={contents} />
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
