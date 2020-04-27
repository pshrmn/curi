import React from "react";

import MobileMenu from "./mobile/Menu";
import FullSizeMenu from "./full/Menu";

let Menu = ({ contents }) => {
  return (
    <React.Fragment>
      <FullSizeMenu />
      <MobileMenu contents={contents} />
    </React.Fragment>
  );
};

export default Menu;
