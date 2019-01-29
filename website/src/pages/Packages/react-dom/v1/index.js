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
import { FocusAPI, meta as FocusMeta } from "./focus";
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
      FocusMeta,
      CuriousMeta,
      ActiveMeta,
      NavigatingMeta,
      BlockMeta
    ]
  }
];

export default class ReactPkg extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <PageMenu contents={contents} />
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
