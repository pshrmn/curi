import React from "react";
import { Link } from "@curi/react-dom";

import {
  About,
  APIBlock,
  PageMenu
} from "../../../../components/package/common";
import { CuriStoreAPI, meta as curiStoreMeta } from "./curiStore";
import { LinkAPI, meta as LinkMeta } from "./link";

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
    children: [curiStoreMeta, LinkMeta]
  }
];

export default class SveltePkg extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <PageMenu contents={contents} />
        <About>
          <p>
            This package enables you to use Curi alongside Svelte.{" "}
            <strong>This package relies on the Svelte store.</strong>
          </p>
          <p>
            For more information on using Curi with Svelte, please check out the{" "}
            <Link name="Guide" params={{ slug: "svelte" }}>
              Svelte guide
            </Link>
            .
          </p>
        </About>
        <APIBlock>
          <CuriStoreAPI />
          <LinkAPI />
        </APIBlock>
      </React.Fragment>
    );
  }
}
