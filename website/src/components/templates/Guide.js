import React from "react";

import GuideLinks from "../links/GuideLinks";
import Page from "../layout/Page";
import PageLinks from "../layout/PageLinks";
import Content from "../layout/Content";

export default function GuideTemplate({ children }) {
  return (
    <Page type="guide">
      <Content>{children || null}</Content>
      <PageLinks>
        <React.Fragment>
          <h2>Guides</h2>
          <GuideLinks />
        </React.Fragment>
      </PageLinks>
    </Page>
  );
}
