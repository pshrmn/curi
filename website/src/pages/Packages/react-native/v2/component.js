import React from "react";
import { Link } from "@curi/react-dom";

import { About, APIBlock, IJS } from "../../../../components/package/common";
import { CreateRouterComponentAPI } from "./api/create_router_component";
import { LinkAPI } from "./api/link";
import { AsyncLinkAPI } from "./api/asynclink";
import { UseRouterAPI } from "./api/useRouter";
import { UseResponseAPI } from "./api/useResponse";
import { UseActiveAPI } from "./api/useActive";
import { UseNavigatingAPI } from "./api/useNavigating";
import { UseLocationAPI } from "./api/useLocation";
import { UseHrefAPI } from "./api/useHref";
import { CuriousAPI } from "./api/curious";

function ReactNativePkg() {
  return (
    <React.Fragment>
      <About>
        <p>
          The <IJS>@curi/react-native</IJS> package provides components to use
          Curi routing in a React Native application.
        </p>
        <p>
          For more information on using Curi with React Native, please check out
          the{" "}
          <Link name="Guide" params={{ slug: "react-native" }}>
            React Native guide
          </Link>
          .
        </p>
      </About>
      <APIBlock>
        <CreateRouterComponentAPI />
        <LinkAPI />
        <AsyncLinkAPI />
        <UseRouterAPI />
        <UseResponseAPI />
        <UseActiveAPI />
        <UseNavigatingAPI />
        <UseLocationAPI />
        <UseHrefAPI />
        <CuriousAPI />
      </APIBlock>
    </React.Fragment>
  );
}

export default React.memo(ReactNativePkg);
