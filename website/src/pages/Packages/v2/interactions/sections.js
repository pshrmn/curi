import React from "react";

import {
  About,
  Paragraph,
  APIBlock,
  IJS
} from "../../../../components/package/common";
import { PathnameAPI } from "./api/pathname";
import { ActiveAPI } from "./api/active";
import { AncestorsAPI } from "./api/ancestors";
import { PrefetchAPI } from "./api/prefetch";

export default {
  about: (
    <About>
      <Paragraph>
        The <IJS>@curi/interactions</IJS> package provides a number of functions
        for interacting with Curi routes.
      </Paragraph>
    </About>
  ),
  api: (
    <APIBlock>
      <PathnameAPI />
      <ActiveAPI />
      <AncestorsAPI />
      <PrefetchAPI />
    </APIBlock>
  )
};
