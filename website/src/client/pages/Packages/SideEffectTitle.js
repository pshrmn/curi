import React from "react";
import { Link } from "@curi/react-dom";

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
              When creating the title side effect, you pass it a function. That
              function will be passed the object emitted by the router (with{" "}
              <IJS>response</IJS>, <IJS>navigation</IJS>, and <IJS>router</IJS>{" "}
              properties). The function returns a string, which the side effect
              will set as the document's <IJS>title</IJS>.
            </p>
          </Explanation>
          <CodeBlock>
            {`import { curi } from '@curi/router';
import titleEffect from '@curi/side-effect-title';

const setTitle = titleEffect(({ response }) => {
  return \`\${response.title} | My Site\`;
});

const router = curi(history, routes, {
  sideEffects: [setTitle]
});`}
          </CodeBlock>
        </SideBySide>
        <SideBySide>
          <Explanation>
            <p>
              While you can use any properties of the <IJS>response</IJS> to
              generate the string, the <IJS>response.title</IJS> property is
              intended to be used with this side effect.
            </p>
          </Explanation>
          <CodeBlock>
            {`{
  name: "About",
  path: "about",
  response() {
    return {
      body: Home,
      title: "About"
    }
  }              
}
// when the About route matches, document.title = "About | My Site"`}
          </CodeBlock>
        </SideBySide>
      </Section>
    </APIBlock>
  </BasePackage>
);
