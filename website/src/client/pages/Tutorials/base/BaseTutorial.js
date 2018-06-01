import React from "react";

import TutorialLinks from "./TutorialLinks";
import Page from "../../../components/Page";
import PageLinks from "../../../components/PageLinks";
import Content from "../../../components/Content";

import "../../../scss/tutorial.scss";

export default ({ children }) => (
  <Page type="tutorial">
    <Content>{children || null}</Content>
    <PageLinks>
      <h2>Tutorials</h2>
      <TutorialLinks />
    </PageLinks>
  </Page>
);
