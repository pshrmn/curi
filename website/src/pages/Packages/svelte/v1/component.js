import React from "react";
import { Link } from "@curi/react-dom";

import { About, APIBlock } from "../../../../components/package/common";
import { CuriStoreAPI } from "./curiStore";
import { LinkAPI } from "./link";

export default class SveltePkg extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <About>
          <p>This package enables you to use Curi alongside Svelte.</p>
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
