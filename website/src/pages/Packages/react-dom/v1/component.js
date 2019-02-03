import React from "react";
import { Link } from "@curi/react-dom";

import { About, APIBlock, IJS } from "../../../../components/package/common";
import { CuriProviderAPI } from "./api/curiProvider";
import { LinkAPI } from "./api/link";
import { FocusAPI } from "./api/focus";
import { CuriousAPI } from "./api/curious";
import { ActiveAPI } from "./api/active";
import { NavigatingAPI } from "./api/navigating";
import { BlockAPI } from "./api/block";

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
        <FocusAPI />
        <CuriousAPI />
        <ActiveAPI />
        <NavigatingAPI />
        <BlockAPI />
      </APIBlock>
    </React.Fragment>
  );
}

export default React.memo(ReactDOMPkg);
