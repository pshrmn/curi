import React from "react";
import { Link } from "@curi/react";

import BaseGuide from "./base/BaseGuide";
import { InlineJS as IJS, PrismBlock } from "../../components/PrismBlocks";
import { Section, Subsection } from "../../components/Sections";

export default ({ name }) => (
  <BaseGuide>
    <h1>{name}</h1>

    <p>
      Curi side effects are essentially permament observers (response handlers)
      of your router, but you can specify whether they should be run before or
      after response handlers that were setup using <IJS>router.respond</IJS>.
    </p>

    <p>
      Whenever a new response is generated, all of the side effect functions
      will be called. They will be given two arguments: the new response object
      and an object with navigation information (the navigation action the
      previous response).
    </p>

    <PrismBlock lang="javascript">
      {`function logResponse({ response }) {
  // call your logging API to record the response
}`}
    </PrismBlock>

    <Section title="Adding Side Effects" id="adding">
      <p>
        You add side effect functions to your router by adding a{" "}
        <IJS>sideEffects</IJS> array to the options object (the third agument)
        of <IJS>curi</IJS>. A side effect is an object with an <IJS>fn</IJS>{" "}
        property whose values is a response handler function.
      </p>

      <PrismBlock lang="javascript">
        {`const router = curi(history, routes, {
  sideEffects: [{ fn: logResponse }]
});`}
      </PrismBlock>

      <p>
        Side effects can also have an <IJS>after</IJS> property. By default,
        side effect functions will be called before any response handler
        functions (the ones added with <IJS>router.respond</IJS>). However, you
        might prefer for a side effect to be run after the response handlers. To
        do that, you just need to include <IJS>after: true</IJS> in your side
        effect object. If you do no provide this property, this will default to{" "}
        <IJS>false</IJS>.
      </p>

      <PrismBlock lang="javascript">
        {`const router = curi(history, routes, {
  sideEffects: [{ fn: logResponse, after: true }]
});`}
      </PrismBlock>

      <Subsection title="Official Side Effects" id="official">
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
      </Subsection>
    </Section>

    <Section title="Creating Side Effects" id="creating">
      <p>
        Side effects are just simple functions that receive a response object
        and a navigation object and do something with them. One thing that they
        should not do, however, is to modify the response.
      </p>

      <p>
        Below is a side effect function that sets a modified property on the
        object.
      </p>
      <PrismBlock lang="javascript">
        {`function mySideEffect({ response, navigation }) {
  console.log('Navigating to', response.location);
  console.log('Navigation action:', navigation.action);
}

const router = curi(history, routes, {
  sideEffects: [{ fn: mySideEffect }]
});`}
      </PrismBlock>

      <p>
        You can write a side effect factory if you need to create a more
        customizable side effect.
      </p>

      <PrismBlock lang="javascript">
        {`function AnalyticsLogger(options) {
  // do some setup with the provided options
  const logger = setupMyLogger(options);

  // and return the actual side effect function
  return sideEffect({ response }) {
    logger(response);
  }
}`}
      </PrismBlock>

      <p>
        That really is all there is required to know in order to write your own
        side effects. You may want to review the{" "}
        <Link
          to="Guide"
          params={{ slug: "responses" }}
          hash="response-properties"
        >
          response properties
        </Link>{" "}
        to know which properties you should expect a response to have, but other
        than that they are pretty simple.
      </p>
    </Section>

    <div>
      <h2>Next</h2>
      <p>
        <IJS>curi</IJS>'s options object has three arguments. We have covered
        the first two, so finally we will cover the cache option in the{" "}
        <Link to="Guide" params={{ slug: "response-caching" }}>
          response caching
        </Link>{" "}
        guide.
      </p>
    </div>
  </BaseGuide>
);
