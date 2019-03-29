import React from "react";

import { About, APIBlock } from "../../../../components/package/common";
import { TitleAPI } from "./api/title";

function SideEffectTitlePkg() {
  return (
    <React.Fragment>
      <About>
        <p>
          This package adds a side effect to the router that updates the page's
          title as a result of navigation.
        </p>
      </About>
      <APIBlock>
        <TitleAPI />
      </APIBlock>
    </React.Fragment>
  );
}

export default React.memo(SideEffectTitlePkg);
