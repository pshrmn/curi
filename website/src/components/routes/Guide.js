import React from "react";

import GuideComponents from "../../pages/Guides";
import GuideTemplate from "../templates/Guide";

export default function GuidePage({ response }) {
  if (!response.data) {
    return (
      <GuideTemplate>
        <div>The requested guide could not be found.</div>
      </GuideTemplate>
    );
  }
  const Component = GuideComponents[response.params.slug];
  return (
    <GuideTemplate>
      <h1>{response.data.name}</h1>
      <Component />
    </GuideTemplate>
  );
}
