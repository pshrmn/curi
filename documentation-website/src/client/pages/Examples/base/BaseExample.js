import React from "react";

import ExampleLinks from "./ExampleLinks";
import Page from "../../../components/Page";
import SideBar from "../../../components/SideBar";
import Content from "../../../components/Content";

export default ({ children }) => (
  <Page type="example">
    <Content>{children || null}</Content>
    <SideBar>
      <h2>Examples</h2>
      <ExampleLinks />
    </SideBar>
  </Page>
);
