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
        This package adds a side effect to the router that updates the page's
        title as a result of navigation.
      </p>
    }
  >
    <APIBlock>
      <Section tag="h3" title="titleEffect" id="titleEffect">
        <SideBySide>
          <Explanation>
            <p>
              <IJS>@curi/side-effect-title</IJS> exports a function for creating
              a side effect that will update the page's title whenever a new
              response is created.
            </p>
            <p>
              The side effect relies on the response objects having a{" "}
              <IJS>title</IJS> string, which you will have to set yourself using
              your routes' <IJS>response()</IJS> functions. You can learn about
              setting a title in the{" "}
              <Link to="Guide" params={{ slug: "routes" }} hash="response">
                all about routes
              </Link>{" "}
              guide.
            </p>
          </Explanation>
          <CodeBlock>
            {`import curi from '@curi/router';
import titleEffect from '@curi/side-effect-title';

const setTitle = titleEffect({
  suffix: 'My Site',
  delimiter: '|'
});

const router = curi(history, routes, {
  sideEffects: [setTitle]
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
