import React from "react";

import GuideTemplate from "../templates/Guide";

export default function GuidePage({ response }) {
  const Content = response.data.content;
  return (
    <GuideTemplate>
      <h1>{response.data.name}</h1>
      <Content />
    </GuideTemplate>
  );
}
