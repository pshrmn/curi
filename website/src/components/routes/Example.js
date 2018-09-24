import React from "react";

import ExampleComponents from "../../pages/Examples";
import ExampleTemplate from "../templates/Example";

export default function ExamplePage({ response }) {
  if (!response.data) {
    return (
      <ExampleTemplate>
        <div>The requested example could not be found.</div>
      </ExampleTemplate>
    );
  }
  const { category, slug } = response.params;
  const Component = ExampleComponents[category][slug];
  return (
    <ExampleTemplate>
      <h1>{response.data.name}</h1>
      <Component />
    </ExampleTemplate>
  );
}
