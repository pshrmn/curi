import React from "react";

import ExampleComponents from "../Examples";

export default ({ params, data }) => {
  if (!data) {
    return <div>The requested example could not be found.</div>;
  }
  const Component = ExampleComponents[params.category][params.slug];
  return <Component name={data.name} />;
};
