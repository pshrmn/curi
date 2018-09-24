import React from "react";
import { Link } from "@curi/react-dom";

import TutorialTemplate from "../templates/Tutorial";

const TutorialBase = ({
  name,
  version,
  globalName,
  children,
  about,
  unpkg = true
}) => (
  <TutorialTemplate>
    <h1>Curi Tutorials</h1>
    <p>A few tutorials to help get you up to speed with Curi.</p>
  </TutorialTemplate>
);

export default TutorialBase;
