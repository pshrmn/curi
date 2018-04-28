import React from "react";
import { Link } from "@curi/react";

import { InlineJS as IJS } from "../components/PrismBlocks";
import { Note, Warning } from "../components/Messages";
import { Section } from "../components/Sections";
import TutorialTiles from "../pages/Tutorials/base/TutorialTiles";
import Content from "../components/Content";

export default () => (
  <div className="tutorial">
    <Content>
      <h1>Curi Tutorials</h1>
      <TutorialTiles />
    </Content>
  </div>
);
