import React from "react";

import ExampleLinks from "./ExampleLinks";
import Page from "../../../components/Page";
import PageLinks from "../../../components/PageLinks";
import Content from "../../../components/Content";

export default ({ children }) => (
  <Page type="example">
    <Content>{children || null}</Content>
    <PageLinks>
      <h2>Examples</h2>
      <ExampleLinks />
    </PageLinks>
  </Page>
);
