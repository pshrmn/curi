import React from "react";
import { HashSection } from "../layout/Sections";

let AboutBlock = ({ children }) => {
  return (
    <HashSection meta={{ title: "About", hash: "about" }} tag="h2">
      {children}
    </HashSection>
  );
};

export default AboutBlock;
