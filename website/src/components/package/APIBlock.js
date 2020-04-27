import React from "react";

import { HashSection } from "../layout/Sections";

let APIBlock = ({ children }) => {
  // .section {
  //   padding-left: 10px;
  //   margin-bottom: 5px;
  // }
  return (
    <HashSection meta={{ title: "API", hash: "API" }} tag="h2">
      {children}
    </HashSection>
  );
};

export default APIBlock;
