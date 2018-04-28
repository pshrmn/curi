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
      <p>
        This package allows you to set <IJS>title</IJS> properties on your
        routes and will automatically set the page's title whenever the location
        changes.
      </p>
    }
  >
    <APIBlock>
      <Section tag="h3" title="titleEffect" id="titleEffect">
        <SideBySide>
          <Explanation>
            <p>
              In order for this to work, your routes'{" "}
              <IJS>route.response()</IJS> functions need to return an object
              with a <IJS>title</IJS> string. You can learn about setting a
              title in the{" "}
              <Link to="Guide" params={{ slug: "routes" }} hash="response">
                all about routes
              </Link>{" "}
              guide.
            </p>
          </Explanation>
          <CodeBlock>
            {`import curi from '@curi/core';
import titleEffect from '@curi/side-effect-title';

const setTitle = titleEffect({
  suffix: 'My Site',
  delimiter: '|'
});

const router = curi(history, routes, {
  sideEffects: [{ effect: setTitle }]
});`}
          </CodeBlock>
        </SideBySide>
        <SideBySide>
          <Explanation>
            <p>
              You can provide a prefix and/or a suffix string that will be
              included before/after the title.
            </p>
          </Explanation>
          <CodeBlock>
            {`const prefixedTitle = titleEffect({ prefix: 'Before'});
// response.title = 'Middle'
// document.title = 'Before Middle';

const suffixedTitle = titleEffect({ suffix: 'After'});
// response.title = 'Middle'
// document.title = 'Middle After';`}
          </CodeBlock>
        </SideBySide>
        <SideBySide>
          <Explanation>
            <p>
              A <IJS>delimiter</IJS> can be specified for joining the{" "}
              <IJS>prefix</IJS> and <IJS>suffix</IJS> to the title string.
              Spaces will be placed between the prefix, title, and suffix
              strings and the delimiters.
            </p>
          </Explanation>
          <CodeBlock>
            {`const prefixedTitle = titleEffect({
  prefix: 'Before',
  suffix: 'After',
  delimiter: '&'
});
// response.title = 'Middle'
// document.title = 'Before & Middle & After';`}
          </CodeBlock>
        </SideBySide>
      </Section>
    </APIBlock>
  </BasePackage>
);
