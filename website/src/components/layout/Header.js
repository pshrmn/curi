import React from "react";
import Nav from "./Nav";

import "../../scss/header.scss";

export default React.memo(function Header() {
  return (
    <header>
      <Nav />
    </header>
  );
});
