import React from "react";

import TutorialTemplate from "../templates/Tutorial";
import { Explanation } from "../layout/Groups";
import TutorialLinks from "../links/dropdowns/TutorialDropdown";

export default function TutorialBase() {
  return (
    <TutorialTemplate>
      <h1>Curi Tutorials</h1>

      <Explanation>
        <p>A few tutorials to help get you up to speed with Curi.</p>
      </Explanation>

      <TutorialLinks />
    </TutorialTemplate>
  );
}
