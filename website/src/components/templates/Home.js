import React from "react";

import Page from "../layout/Page";
import Content from "../layout/Content";

export default function HomeTemplate({ children }) {
  return (
    <Page>
      <Content>{children || null}</Content>
    </Page>
  );
}
