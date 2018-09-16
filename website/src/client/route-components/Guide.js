import React from "react";

import GuideComponents from "../pages/Guides";

export default function GuidePage({ response }) {
  if (!response.data) {
    return <div>The requested guide could not be found.</div>;
  }
  const Component = GuideComponents[response.params.slug];
  return <Component name={response.data.name} />;
}
