import React from "react";

import MobileMenu from "./mobile/Menu";
import FullSizeMenu from "./full/Menu";

export default function Menu({ contents }) {
  return (
    <React.Fragment>
      <FullSizeMenu />
      <MobileMenu contents={contents} />
    </React.Fragment>
  );
}
