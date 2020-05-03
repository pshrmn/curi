import React from "react";

import TwoColumnPage from "../../components/layout/TwoColumnPage";
import PageMenu from "../../components/layout/PageMenu";

export default function TutorialPage({ response }) {
  let { component: Component, contents } = response.data.content;
  return (
    <TwoColumnPage
      base={<Component />}
      menu={<PageMenu contents={contents} />}
    />
  );
}
