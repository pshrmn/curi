import React from "react";

import {
  About,
  Paragraph,
  APIBlock,
  IJS
} from "../../../../components/package/common";
import { StaticFilesAPI } from "./api/staticFiles";
import { PathnamesAPI } from "./api/pathnames";

export default {
  about: (
    <About>
      <Paragraph>
        The <IJS>@curi/static</IJS> package is for creating static assets for
        your server. Its exported functions should be used in a build script,
        not the source of an application.
      </Paragraph>
    </About>
  ),
  api: (
    <APIBlock>
      <StaticFilesAPI />
      <PathnamesAPI />
    </APIBlock>
  )
};
