import React from "react";

import {
  About,
  APIBlock,
  PageMenu
} from "../../../../components/package/common";
import { TitleAPI, meta as titleMeta } from "./title";

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
    children: [titleMeta]
  }
];

export default class SideEffectTitlePkg extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <PageMenu contents={contents} />
        <About>
          <p>
            This package adds a side effect to the router that updates the
            page's title as a result of navigation.
          </p>
        </About>
        <APIBlock>
          <TitleAPI />
        </APIBlock>
      </React.Fragment>
    );
  }
}
