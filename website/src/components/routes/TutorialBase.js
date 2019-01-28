import React from "react";

import TutorialTemplate from "../templates/Tutorial";
import TutorialLinks from "../links/lists/TutorialDropdown";

export default function TutorialBase() {
  return (
    <TutorialTemplate>
      <h1>Curi Tutorials</h1>

      <p>A few tutorials to help get you up to speed with Curi.</p>

      <TutorialLinks />
    </TutorialTemplate>
  );
}
