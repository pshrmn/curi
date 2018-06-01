import React from "react";
import { Link } from "@curi/react";

import ExampleLinks from "../pages/Examples/base/ExampleLinks";
import { Note } from "../components/Messages";
import { InlineJS as IJS } from "../components/PrismBlocks";
import Page from "../components/Page";
import PageLinks from "../components/PageLinks";
import Content from "../components/Content";
import { SideBySide, Explanation } from "../components/SideBySide";

const ExampleList = ({
  name,
  version,
  globalName,
  children,
  about,
  unpkg = true
}) => (
  <Page type="tutorial">
    <Content>
      <h1>Curi Examples</h1>
      <SideBySide>
        <Explanation>
          <p>
            Example projects that you can use for reference while building your
            own application. Most examples have CodeSandbox demos embedded with
            them. Each example includes source code available through the Curi
            package{" "}
            <a href="https://github.com/pshrmn/curi/tree/master/examples">
              on GitHub
            </a>.
          </p>
        </Explanation>
      </SideBySide>
    </Content>
    <PageLinks>
      <h2>Examples</h2>
      <ExampleLinks />
    </PageLinks>
  </Page>
);

export default ExampleList;
