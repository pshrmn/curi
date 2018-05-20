import React from "react";
import { Link } from "@curi/react";

import TutorialLinks from "../pages/Tutorials/base/TutorialLinks";
import Page from "../components/Page";
import PageLinks from "../components/PageLinks";
import Content from "../components/Content";
import { SideBySide, Explanation } from "../components/SideBySide";

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
      <SideBySide>
        <Explanation>
          <p>
            Right now there are two tutorials, one for React and one for Vue.
            These cover the basics of what you should know to use Curi. More
            advanced tutorial will be coming soon.
          </p>
        </Explanation>
      </SideBySide>
    </Content>
    <PageLinks>
      <h2>Tutorials</h2>
      <TutorialLinks />
    </PageLinks>
  </Page>
);

export default TutorialBase;
