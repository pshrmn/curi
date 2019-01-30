import React from "react";

import FancyPage from "../layout/FancyPage";
import PageMenu from "../layout/PageMenu";

export default function ExamplePage({ response }) {
  const { component: Component, contents } = response.data.content;
  return (
    <FancyPage base={<Component />} menu={<PageMenu contents={contents} />} />
  );
}
