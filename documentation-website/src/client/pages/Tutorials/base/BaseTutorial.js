import React from "react";

import TutorialLinks from "./TutorialLinks";
import Page from "../../../components/Page";
import SideBar from "../../../components/SideBar";
import Content from "../../../components/Content";

// import "../../../scss/tutorial.scss";

export default ({ children }) => (
  <Page type="tutorial">
    <Content>{children || null}</Content>
    <SideBar>
      <h2>Tutorials</h2>
      <TutorialLinks />
    </SideBar>
  </Page>
);
