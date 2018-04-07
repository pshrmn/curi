import React from "react";
import { Link } from "@curi/react";

import { InlineJS as IJS } from "../components/PrismBlocks";
import { Note, Warning } from "../components/Messages";
import { Section } from "../components/Sections";
import TutorialLinks from "../Tutorials/base/TutorialLinks";

export default () => (
  <div className="tutorial">
    <div className="content">
      <h1>Curi Tutorials</h1>
      <TutorialLinks />
    </div>
  </div>
);
