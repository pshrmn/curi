import React from "react";

import Page from "../layout/Page";
import TutorialLinks from "../links/lists/TutorialDropdown";

export default function TutorialBase() {
  return (
    <Page>
      <h1>Curi Tutorials</h1>

      <p>A few tutorials to help get you up to speed with Curi.</p>

      <TutorialLinks />
    </Page>
  );
}
