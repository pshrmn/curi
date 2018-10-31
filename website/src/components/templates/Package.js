import React from "react";

import PackageLinks from "../links/PackageLinks";
import Page from "../layout/Page";
import PageLinks from "../layout/PageLinks";
import Content from "../layout/Content";

export default function PackageTemplate({ children }) {
  return (
    <Page type="package">
      <Content>{children}</Content>
      <PageLinks>
        <React.Fragment>
          <h2>Packages</h2>
          <PackageLinks />
        </React.Fragment>
      </PageLinks>
    </Page>
  );
}
