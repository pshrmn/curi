import React from "react";

import Page from "../layout/Page";
import Content from "../layout/Content";

export default function HomeTemplate({ children }) {
  return (
    <Page type="home">
      <Content>{children || null}</Content>
    </Page>
  );
}
