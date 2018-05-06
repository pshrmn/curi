import React from "react";
import { Link } from "@curi/react";

import BaseGuide from "./base/BaseGuide";
import { InlineJS as IJS, PrismBlock } from "../../components/PrismBlocks";
import { Section, Subsection } from "../../components/Sections";
import {
  SideBySide,
  CodeBlock,
  Explanation
} from "../../components/SideBySide";

export default ({ name }) => (
  <BaseGuide>
    <h1>{name}</h1>
    <SideBySide>
      <Explanation>
        <p>
          Curi side effects are permament observers of your router, but you can
          specify whether they should be run before or after observers that were
          setup using <IJS>router.respond()</IJS>.
        </p>

        <p>
          Whenever a new response is generated, all of the side effect functions
          will be called. They will be given two arguments: the new response
          object and an object with navigation information (the navigation
          action the previous response).
        </p>
      </Explanation>
      <CodeBlock>
        {`function logResponse({ response }) {
  // call your logging API to record the response
}`}
      </CodeBlock>
    </SideBySide>

    <Section title="Adding Side Effects" id="adding">
      <SideBySide>
        <Explanation>
          <p>
            Side effects are provided to your router with the{" "}
            <IJS>sideEffects</IJS> property of the options object. This is an
            array of objects with an <IJS>effect</IJS> observer function.
          </p>
        </Explanation>
        <CodeBlock>
          {`const router = curi(history, routes, {
  sideEffects: [{ effect: logResponse }]
});`}
        </CodeBlock>
      </SideBySide>

      <SideBySide>
        <Explanation>
          <p>
            Side effects can also have an <IJS>after</IJS> property. By default,
            side effect functions will be called before any regular observer
            functions (the ones added with <IJS>router.respond()</IJS>). Some
            side effects make more sense to run after those observers,
            especially if they rely on the application's content to be updated.
            To do that, you need to include <IJS>after: true</IJS> in your side
            effect object. If you do no provide this property, this will default
            to <IJS>false</IJS>.
          </p>
        </Explanation>
        <CodeBlock>
          {`const router = curi(history, routes, {
  sideEffects: [{ effect: logResponse, after: true }]
});`}
        </CodeBlock>
      </SideBySide>

      <Subsection title="Official Side Effects" id="official">
        <SideBySide>
          <Explanation>
            <p>Curi has two "official" side effect packages:</p>
            <ul>
              <li>
                <Link to="Package" params={{ package: "side-effect-title" }}>
                  @curi/side-effect-title
                </Link>
              </li>
              <li>
                <Link to="Package" params={{ package: "side-effect-scroll" }}>
                  @curi/side-effect-scroll
                </Link>
              </li>
            </ul>
          </Explanation>
          <CodeBlock>
            {`import titleEffect from "@curi/side-effect-title";
import scrollEffect from "@curi/side-effect-scroll";

const router = curi(history, routes, {
  sideEffect: [
    { effect: titleEffect() },
    { effect: scrollEffect(), after: true }
  ]
});`}
          </CodeBlock>
        </SideBySide>
      </Subsection>
    </Section>

    <Section title="Creating Side Effects" id="creating">
      <SideBySide>
        <Explanation>
          <p>
            Side effects are functions that receive a response object and a
            navigation object and do something with them.
          </p>
        </Explanation>
        <CodeBlock>
          {`function mySideEffect({ response, navigation }) {
  console.log('Navigating to', response.location);
  console.log('Navigation action:', navigation.action);
}

const router = curi(history, routes, {
  sideEffects: [{ effect: mySideEffect }]
});`}
        </CodeBlock>
      </SideBySide>
      <SideBySide>
        <Explanation>
          <p>
            You can write a side effect factory if you need to create a more
            customizable side effect.
          </p>
        </Explanation>
        <CodeBlock>
          {`function AnalyticsLogger(options) {
  // do some setup with the provided options
  const logger = setupMyLogger(options);

  // and return the actual side effect function
  return sideEffect({ response }) {
    logger(response);
  }
}`}
        </CodeBlock>
      </SideBySide>

      <SideBySide>
        <Explanation>
          <p>
            That really is all there is required to know in order to write your
            own side effects. You may want to review the{" "}
            <Link
              to="Guide"
              params={{ slug: "responses" }}
              hash="response-properties"
            >
              response properties
            </Link>{" "}
            to know which properties you should expect a response to have, but
            other than that they are pretty simple.
          </p>
        </Explanation>
      </SideBySide>
    </Section>

    <div>
      <h2>Next</h2>
      <p>
        Next we will take a closer look at how to add{" "}
        <Link to="Guide" params={{ slug: "code-splitting" }}>
          code splitting
        </Link>{" "}
        to routes.
      </p>
    </div>
  </BaseGuide>
);
