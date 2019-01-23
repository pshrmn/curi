import React from "react";

import TutorialTemplate from "../templates/Tutorial";

export default function TutorialPage({ response }) {
  const Content = response.data.content;
  return (
    <TutorialTemplate>
      <Content />
    </TutorialTemplate>
  );
}
