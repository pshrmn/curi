import React from "react";

import TutorialTemplate from "../templates/Tutorial";

import "../../scss/tutorial.scss";

export default function TutorialPage({ response }) {
  const Content = response.data.content;
  return (
    <TutorialTemplate>
      <Content />
    </TutorialTemplate>
  );
}
