import React from "react";

import {
  About,
  APIBlock,
  IJS,
  PageMenu
} from "../../../../components/package/common";
import { StaticFilesAPI, meta as staticFilesMeta } from "./staticFiles";
import { PathnamesAPI, meta as pathnamesMeta } from "./pathnames";

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
    children: [staticFilesMeta, pathnamesMeta]
  }
];

export default class StaticPackage extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <PageMenu contents={contents} />
        <About>
          <p>
            The <IJS>@curi/static</IJS> package is for creating static assets
            for your server. Its exported functions should be used in a build
            script, not the source of an application.
          </p>
        </About>
        <APIBlock>
          <StaticFilesAPI />
          <PathnamesAPI />
        </APIBlock>
      </React.Fragment>
    );
  }
}
