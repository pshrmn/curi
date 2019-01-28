import React from "react";

import Page from "../layout/Page";

export default function ExamplePage({ response }) {
  const Content = response.data.content;
  return (
    <Page>
      <Content />
    </Page>
  );
}
