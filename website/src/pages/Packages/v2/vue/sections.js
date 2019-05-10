import React from "react";
import { Link } from "@curi/react-dom";

import { About, APIBlock } from "../../../../components/package/common";
import { CuriPluginAPI } from "./api/curiPlugin";
import { LinkAPI } from "./api/link";
import { FocusAPI } from "./api/focus";

export default {
  about: (
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
  ),
  api: (
    <APIBlock>
      <CuriPluginAPI />
      <LinkAPI />
      <FocusAPI />
    </APIBlock>
  )
};
