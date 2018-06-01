import React from "react";

import GuideComponents from "../pages/Guides";

export default ({ params, data }) => {
  if (!data) {
    return <div>The requested guide could not be found.</div>;
  }
  const Component = GuideComponents[params.slug];
  return <Component name={data.name} />;
};
