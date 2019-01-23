import React from "react";

import Page from "../layout/Page";
import Content from "../layout/Content";

export default function TutorialTemplate({ children }) {
  return (
    <Page>
      <Content>{children}</Content>
    </Page>
  );
}
