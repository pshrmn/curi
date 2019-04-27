import React from "react";
import { Link } from "@curi/react-dom";

import { About, APIBlock } from "../../../../components/package/common";
import { RouterAPI } from "./api/router";
import { LinkAPI } from "./api/link";
import { AsyncLinkAPI } from "./api/asynclink";
import { NavigatingAPI } from "./api/navigating";
import { GetRouterAPI } from "./api/getRouter";
import { GetResponseAPI } from "./api/getResponse";
import { GetNavigationAPI } from "./api/getNavigation";

function SveltePkg() {
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
        <RouterAPI />
        <LinkAPI />
        <AsyncLinkAPI />
        <NavigatingAPI />
        <GetRouterAPI />
        <GetResponseAPI />
        <GetNavigationAPI />
      </APIBlock>
    </React.Fragment>
  );
}

export default React.memo(SveltePkg);
