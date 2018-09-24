import React from "react";

import TutorialComponents from "../../pages/Tutorials";
import TutorialTemplate from "../templates/Tutorial";

export default function TutorialPage({ response }) {
  const Component = TutorialComponents[response.params.slug];
  return (
    <TutorialTemplate>
      {Component ? (
        <Component />
      ) : (
        <div>The requested tutorial could not be found.</div>
      )}
    </TutorialTemplate>
  );
}
