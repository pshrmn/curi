import React from "react";

import MobileMenu from "./mobile/Menu";
import FullSizeMenu from "./full/Menu";

let Menu = ({ contents }) => {
  return (
    <>
      <FullSizeMenu />
      <MobileMenu contents={contents} />
    </>
  );
};

export default Menu;
