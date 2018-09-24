import React from "react";

import ExampleLinks from "../links/ExampleLinks";
import Page from "../layout/Page";
import PageLinks from "../layout/PageLinks";
import Content from "../layout/Content";

export default function ExampleTemplate({ children }) {
  return (
    <Page type="example">
      <Content>{children || null}</Content>
      <PageLinks>
        {hide => (
          <React.Fragment>
            <h2>Examples</h2>
            <ExampleLinks hide={hide} />
          </React.Fragment>
        )}
      </PageLinks>
    </Page>
  );
}
