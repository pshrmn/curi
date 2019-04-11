import React from "react";
import { Link } from "@curi/react-dom";

import { About, APIBlock, IJS } from "../../../../components/package/common";
import { CreateRouterComponentAPI } from "./api/create_router_component";
import { LinkAPI } from "./api/link";
import { AsyncLinkAPI } from "./api/asynclink";
import { UseResponseAPI } from "./api/useResponse";
import { UseRouterAPI } from "./api/useRouter";
import { UseActiveAPI } from "./api/useActive";
import { UseNavigationFocusAPI } from "./api/useNavigationFocus";
import { UseNavigatingAPI } from "./api/useNavigating";
import { UseLocationAPI } from "./api/useLocation";
import { UseHrefAPI } from "./api/useHref";
import { ResponseConsumerAPI } from "./api/responseconsumer";

function ReactDOMPkg() {
  return (
    <React.Fragment>
      <About>
        <p>
          The <IJS>@curi/react-dom</IJS> package provides a number of React
          components that you can use for rendering your application.
        </p>
        <p>
          For more information on using Curi with React DOM, please check out
          the{" "}
          <Link name="Guide" params={{ slug: "react-dom" }}>
            React DOM guide
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
        <UseNavigationFocusAPI />
        <UseNavigatingAPI />
        <UseLocationAPI />
        <UseHrefAPI />
        <ResponseConsumerAPI />
      </APIBlock>
    </React.Fragment>
  );
}

export default React.memo(ReactDOMPkg);
