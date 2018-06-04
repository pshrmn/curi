import React from "react";

import ExampleComponents from "../pages/Examples";

export default ({ response }) => {
  if (!response.data) {
    return <div>The requested example could not be found.</div>;
  }
  const { category, slug } = response.params;
  const Component = ExampleComponents[category][slug];
  return <Component name={response.data.name} />;
};
