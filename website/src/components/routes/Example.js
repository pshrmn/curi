import React from "react";

import ExampleTemplate from "../templates/Example";

export default function ExamplePage({ response }) {
  const Content = response.data.content;
  return (
    <ExampleTemplate>
      <h1>{response.data.name}</h1>
      <Content />
    </ExampleTemplate>
  );
}
