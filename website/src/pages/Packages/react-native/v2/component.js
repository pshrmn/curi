import React from "react";
import { Link } from "@curi/react-dom";

import { About, APIBlock, IJS } from "../../../../components/package/common";
import { CuriProviderAPI } from "./api/curiProvider";
import { LinkAPI } from "./api/link";
import { UseCuriAPI } from "./api/useCuri";
import { UseActiveAPI } from "./api/useActive";
import { UseNavigatingAPI } from "./api/useNavigating";
import { UseBlockAPI } from "./api/useBlock";
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
        <CuriProviderAPI />
        <LinkAPI />
        <UseCuriAPI />
        <UseActiveAPI />
        <UseNavigatingAPI />
        <UseBlockAPI />
        <UseLocationAPI />
        <UseHrefAPI />
        <CuriousAPI />
      </APIBlock>
    </React.Fragment>
  );
}

export default React.memo(ReactNativePkg);