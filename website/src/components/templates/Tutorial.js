import React from "react";

import TutorialLinks from "../links/TutorialLinks";
import PageLinks from "../layout/PageLinks";
import Page from "../layout/Page";
import Content from "../layout/Content";

export default function TutorialTemplate({ children }) {
  return (
    <Page type="tutorial">
      <Content>{children}</Content>
      <PageLinks>
        <React.Fragment>
          <h2>Tutorials</h2>
          <TutorialLinks />
        </React.Fragment>
      </PageLinks>
    </Page>
  );
}
