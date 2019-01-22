import React from "react";

import ExampleLinks from "../links/ExampleLinks";
import Page from "../layout/Page";
import PageLinks from "../layout/PageLinks";
import Content from "../layout/Content";

export default function ExampleTemplate({ children }) {
  return (
    <Page>
      <Content>{children || null}</Content>
      <PageLinks>
        <React.Fragment>
          <h2>Examples</h2>
          <ExampleLinks />
        </React.Fragment>
      </PageLinks>
    </Page>
  );
}
