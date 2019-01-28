import React from "react";

import Page from "../layout/Page";

export default function GuidePage({ response }) {
  const Content = response.data.content;
  return (
    <Page>
      <Content />
    </Page>
  );
}
