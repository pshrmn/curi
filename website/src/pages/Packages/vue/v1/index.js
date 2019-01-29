import React from "react";
import { Link } from "@curi/react-dom";

import {
  About,
  APIBlock,
  PageMenu
} from "../../../../components/package/common";
import { CuriPluginAPI, meta as curiPluginMeta } from "./curiPlugin";
import { LinkAPI, meta as linkMeta } from "./link";
import { BlockAPI, meta as blockMeta } from "./block";
import { FocusAPI, meta as focusMeta } from "./focus";

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
    children: [curiPluginMeta, linkMeta, blockMeta, focusMeta]
  }
];

export default class VuePkg extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <PageMenu contents={contents} />
        <About>
          <p>This package enables you to use Curi alongside VueJS.</p>
          <p>
            For more information on using Curi with Vue, please check out the{" "}
            <Link name="Guide" params={{ slug: "vue" }}>
              Vue guide
            </Link>
            .
          </p>
        </About>
        <APIBlock>
          <CuriPluginAPI />
          <LinkAPI />
          <BlockAPI />
          <FocusAPI />
        </APIBlock>
      </React.Fragment>
    );
  }
}
