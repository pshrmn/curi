import React from "react";
import { Link } from "@curi/react-dom";

import {
  About,
  Paragraph,
  APIBlock
} from "../../../../components/package/common";
import { CuriPluginAPI } from "./api/curiPlugin";
import { LinkAPI } from "./api/link";
import { FocusAPI } from "./api/focus";

export default {
  about: (
    <About>
      <Paragraph>
        This package enables you to use Curi alongside VueJS.
      </Paragraph>
      <Paragraph>
        For more information on using Curi with Vue, please check out the{" "}
        <Link name="Guide" params={{ slug: "vue" }}>
          Vue guide
        </Link>
        .
      </Paragraph>
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
