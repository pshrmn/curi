import React from "react";

import TutorialComponents from "../pages/Tutorials";

export default function TutorialPage({ response }) {
  const Component = TutorialComponents[response.params.slug];
  if (!Component) {
    return <div>The requested tutorial could not be found.</div>;
  }
  return <Component />;
}
