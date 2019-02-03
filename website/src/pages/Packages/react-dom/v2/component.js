import React from "react";
import { Link } from "@curi/react-dom";

import { About, APIBlock, IJS } from "../../../../components/package/common";
import { CuriProviderAPI } from "./api/curiProvider";
import { LinkAPI } from "./api/link";
import { UseCuriAPI } from "./api/useCuri";
import { UseActiveAPI } from "./api/useActive";
import { UseNavigationFocusAPI } from "./api/useNavigationFocus";
import { UseNavigatingAPI } from "./api/useNavigating";
import { UseBlockAPI } from "./api/useBlock";
import { UseLocationAPI } from "./api/useLocation";
import { UseHrefAPI } from "./api/useHref";
import { CuriousAPI } from "./api/curious";

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
        <CuriProviderAPI />
        <LinkAPI />
        <UseCuriAPI />
        <UseActiveAPI />
        <UseNavigationFocusAPI />
        <UseNavigatingAPI />
        <UseBlockAPI />
        <UseLocationAPI />
        <UseHrefAPI />
        <CuriousAPI />
      </APIBlock>
    </React.Fragment>
  );
}

export default React.memo(ReactDOMPkg);
