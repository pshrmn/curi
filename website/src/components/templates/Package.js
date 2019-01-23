import React from "react";

import Page from "../layout/Page";
import Content from "../layout/Content";

export default function PackageTemplate({ children }) {
  return (
    <Page>
      <Content>{children}</Content>
    </Page>
  );
}
