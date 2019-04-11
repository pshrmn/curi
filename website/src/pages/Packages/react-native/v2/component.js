import React from "react";
import { Link } from "@curi/react-dom";

import { About, APIBlock, IJS } from "../../../../components/package/common";
import { CreateRouterComponentAPI } from "./api/createRouterComponent";
import { LinkAPI } from "./api/link";
import { AsyncLinkAPI } from "./api/asynclink";
import { UseResponseAPI } from "./api/useResponse";
import { UseRouterAPI } from "./api/useRouter";
import { UseActiveAPI } from "./api/useActive";
import { UseNavigatingAPI } from "./api/useNavigating";
import { UseLocationAPI } from "./api/useLocation";
import { UseHrefAPI } from "./api/useHref";
import { ResponseConsumerAPI } from "./api/responseconsumer";

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
        <UseResponseAPI />
        <UseRouterAPI />
        <UseActiveAPI />
        <UseNavigatingAPI />
        <UseLocationAPI />
        <UseHrefAPI />
        <ResponseConsumerAPI />
      </APIBlock>
    </React.Fragment>
  );
}

export default React.memo(ReactNativePkg);
