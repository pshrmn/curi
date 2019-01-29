import React from "react";
import { Link } from "@curi/react-dom";

import { About, APIBlock } from "../../../../components/package/common";
import { CuriPluginAPI } from "./curiPlugin";
import { LinkAPI } from "./link";
import { BlockAPI } from "./block";
import { FocusAPI } from "./focus";

export default class VuePkg extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
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
