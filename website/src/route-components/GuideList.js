import React from "react";
import { Link } from "@curi/react-dom";

import GuideLinks from "../pages/Guides/base/GuideLinks";
import { Note } from "../components/Messages";
import { InlineJS as IJS } from "../components/PrismBlocks";
import Page from "../components/Page";
import PageLinks from "../components/PageLinks";
import Content from "../components/Content";
import { SideBySide, Explanation } from "../components/SideBySide";

const PackageList = ({
  name,
  version,
  globalName,
  children,
  about,
  unpkg = true
}) => (
  <Page type="package">
    <Content>
      <h1>Curi Guides</h1>
      <SideBySide>
        <Explanation>
          <p>
            There are a number of guides to help you make the most of Curi in
            your application.
          </p>
          <p>
            The "basic" guides are designed to give you a solid understanding of
            how to use Curi and how it works.
          </p>
          <p>
            The "rendering" guides give an overview of how to use Curi with the
            currently supported renderers.
          </p>
          <p>
            The "advanced" guides will help you take advantage of more Curi
            features to get the most out of Curi.
          </p>
          <p>
            The "migration" guides are helpful for transitioning to Curi from
            other single-page application routers.
          </p>
        </Explanation>
      </SideBySide>
    </Content>
    <PageLinks>
      <h2>Guides</h2>
      <GuideLinks />
    </PageLinks>
  </Page>
);

export default PackageList;
