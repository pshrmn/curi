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
        {hide => (
          <React.Fragment>
            <h2>Tutorials</h2>
            <TutorialLinks hide={hide} />
          </React.Fragment>
        )}
      </PageLinks>
    </Page>
  );
}
