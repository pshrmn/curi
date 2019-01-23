import React from "react";

import MobileMenu from "./MobileMenu";
import Header from "./Header";

export default function Menu() {
  return (
    <React.Fragment>
      <Header />
      <MobileMenu />
    </React.Fragment>
  );
}
