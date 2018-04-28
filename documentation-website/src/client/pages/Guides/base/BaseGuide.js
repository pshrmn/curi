import React from "react";

import GuideLinks from "./GuideLinks";
import SideBar from "../../../components/SideBar";
import Content from "../../../components/Content";

export default ({ children }) => (
  <div className="guide">
    <Content>{children || null}</Content>
    <SideBar>
      <h2>Guides</h2>
      <GuideLinks />
    </SideBar>
  </div>
);
