import React from "react";

import FancyPage from "../../components/layout/FancyPage";
import PageMenu from "../../components/layout/PageMenu";

export default function ExamplePage({ response }) {
  const { component: Component, contents } = response.data.content;
  return (
    <FancyPage base={<Component />} menu={<PageMenu contents={contents} />} />
  );
}
