import React from "react";
import { Link } from "@curi/react-dom";

import { About, APIBlock } from "../../../../components/package/common";
import { CuriPluginAPI } from "./api/curiPlugin";
import { LinkAPI } from "./api/link";
import { BlockAPI } from "./api/block";
import { FocusAPI } from "./api/focus";

function VuePkg() {
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

export default React.memo(VuePkg);
