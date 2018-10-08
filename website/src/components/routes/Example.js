import React from "react";

import ExampleTemplate from "../templates/Example";

export default function ExamplePage({ response }) {
  const Content = response.data.content;
  return (
    <ExampleTemplate>
      <Content />
    </ExampleTemplate>
  );
}
