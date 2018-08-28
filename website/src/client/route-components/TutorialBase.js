import React from "react";
import { Link } from "@curi/react-dom";

import TutorialLinks from "../pages/Tutorials/base/TutorialLinks";
import Page from "../components/Page";
import PageLinks from "../components/PageLinks";
import Content from "../components/Content";

const TutorialBase = ({
  name,
  version,
  globalName,
  children,
  about,
  unpkg = true
}) => (
  <Page type="tutorial">
    <Content>
      <h1>Curi Tutorials</h1>
      <p>A few tutorials to help get you up to speed with Curi.</p>
    </Content>
    <PageLinks>
      <h2>Tutorials</h2>
      <TutorialLinks />
    </PageLinks>
  </Page>
);

export default TutorialBase;
