import React from "react";
import Media from "react-media";

import { screen } from "../../constants/styles";
import MobileMenu from "./MobileMenu";
import Header from "./Header";

export default function Menu() {
  return (
    <Media query={`(min-width: ${screen.medium})`}>
      {large => {
        return large ? <Header /> : <MobileMenu />;
      }}
    </Media>
  );
}
