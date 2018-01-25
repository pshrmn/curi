import React from "react";

import GuideComponents from "../Guides";

export default ({ params, data }) => {
  if (!data) {
    return <div>The requested gudie could not be found.</div>;
  }
  const Component = GuideComponents[params.slug];
  return <Component name={data.name} />;
};
