import React from "react";

import { About, APIBlock, IJS } from "../../../../components/package/common";
import { CreateRouterAPI } from "./api/createRouter";
import { PrepareRoutesAPI } from "./api/prepareRoutes";
import { RoutePropertiesAPI } from "./api/route-objects";
import { AnnounceAPI } from "./api/announce";
import { ScrollAPI } from "./api/scroll";
import { TitleAPI } from "./api/title";

export default {
  about: (
    <About>
      <p>
        The <IJS>@curi/router</IJS> package provides functions for creating a
        single-page application's router.
      </p>
    </About>
  ),
  api: (
    <APIBlock>
      <PrepareRoutesAPI />
      <CreateRouterAPI />
      <AnnounceAPI />
      <ScrollAPI />
      <TitleAPI />
      <RoutePropertiesAPI />
    </APIBlock>
  )
};
