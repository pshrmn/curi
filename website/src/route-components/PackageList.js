import React from "react";
import { Link } from "@curi/react-dom";

import PackageLinks from "../pages/Packages/base/PackageLinks";
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
      <h1>Curi Packages</h1>
      <SideBySide>
        <Explanation>
          <p>
            Curi is split into a number of different packages that you can pick
            and choose from in order to only use what you need. You will always
            need the{" "}
            <Link to="Package" params={{ package: "router" }}>
              router
            </Link>{" "}
            package, but no other package is necessary.
          </p>
          <Note>
            All of the Curi packages are scoped under <IJS>@curi</IJS>. For
            example, to install the <IJS>router</IJS> package, you would call{" "}
            <IJS>npm install @curi/router</IJS>.
          </Note>
        </Explanation>
      </SideBySide>
    </Content>
    <PageLinks>
      <h2>Packages</h2>
      <PackageLinks />
    </PageLinks>
  </Page>
);

export default PackageList;
