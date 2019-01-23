import React from "react";

import MobileMenu from "./MobileMenu";
import FullSizeMenu from "./FullSizeMenu";

export default function Menu() {
  return (
    <React.Fragment>
      <FullSizeMenu />
      <MobileMenu />
    </React.Fragment>
  );
}
