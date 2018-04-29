import React from "react";

import GuideLinks from "./GuideLinks";
import Page from "../../../components/Page";
import SideBar from "../../../components/SideBar";
import Content from "../../../components/Content";

export default ({ children }) => (
  <Page type="guide">
    <Content>{children || null}</Content>
    <SideBar>
      <h2>Guides</h2>
      <GuideLinks />
    </SideBar>
  </Page>
);
