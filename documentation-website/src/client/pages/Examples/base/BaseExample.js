import React from "react";

import ExampleLinks from "./ExampleLinks";
import SideBar from "../../../components/SideBar";
import Content from "../../../components/Content";

export default ({ children }) => (
  <div className="example">
    <Content>{children || null}</Content>
    <SideBar>
      <h2>Examples</h2>
      <ExampleLinks />
    </SideBar>
  </div>
);
