import React from "react";
import { Link } from "@curi/react";

import BasePackage from "./base/BasePackage";
import APIBlock from "./base/APIBlock";
import { InlineJS as IJS } from "../../components/PrismBlocks";
import { Section } from "../../components/Sections";
import {
  SideBySide,
  CodeBlock,
  Explanation
} from "../../components/SideBySide";

export default ({ name, version, globalName }) => (
  <BasePackage
    name={name}
    version={version}
    globalName={globalName}
    about={
      <div>
        <p>
          When Curi is running in a browser, it relies on the{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/History_API">
            History API
          </a>{" "}
          to change locations, but this does not trigger scrolling to the top of
          the page when you navigate. This package provides a side effect
          function that will scroll to the top of the page whenever those
          functions are used for navigation.
        </p>
        <p>
          Other types of navigation, such as clicking the browser's back and
          forward buttons, will rely on the browser to correctly restore the
          scroll position.
        </p>
      </div>
    }
  >
    <APIBlock>
      <Section tag="h3" title="scrollEffect" id="scrollEffect">
        <SideBySide>
          <CodeBlock>
            {`import curi from '@curi/core';
import scroll from '@curi/side-effect-scroll';

const router = curi(history, routes, {
  sideEffects: [scroll()]
});`}
          </CodeBlock>
        </SideBySide>
      </Section>
    </APIBlock>
  </BasePackage>
);
