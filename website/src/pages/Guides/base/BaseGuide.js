import React from "react";

import GuideLinks from "./GuideLinks";
import Page from "../../../components/Page";
import PageLinks from "../../../components/PageLinks";
import Content from "../../../components/Content";

export default function BaseGuide({ children }) {
  return (
    <Page type="guide">
      <Content>{children || null}</Content>
      <PageLinks>
        <h2>Guides</h2>
        <GuideLinks />
      </PageLinks>
    </Page>
  );
}
