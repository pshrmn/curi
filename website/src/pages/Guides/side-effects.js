import React from "react";
import { Link } from "@curi/react-dom";

import { HashSection, CodeBlock, IJS } from "../../components/guide/common";

const meta = {
  title: "Side Effects"
};

export default function UsingSideEffectsGuide() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <p>
        Curi side effects are permanent router response handlers that are run
        after those registered using <IJS>router.observe()</IJS> and{" "}
        <IJS>router.once()</IJS>.
      </p>

      <p>
        Whenever a new response is generated, all of the side effect functions
        will be called. They will be given an object with the new{" "}
        <IJS>response</IJS>, object, a <IJS>navigation</IJS> object with some
        extra routing data (the navigation action the previous response), and
        the <IJS>router</IJS> object.
      </p>

      <CodeBlock>
        {`function logResponse({ response }) {
  // call your logging API to record the response
}`}
      </CodeBlock>

      <HashSection title="Adding Side Effects" id="adding">
        <p>
          Side effects are provided to your router with the{" "}
          <IJS>sideEffects</IJS> property of the options object. This is an
          array of observer functions.
        </p>

        <CodeBlock>
          {`const router = curi(history, routes, {
  sideEffects: [logResponse, updateTitle]
});`}
        </CodeBlock>

        <p>
          Side effects are always run after observers registered using{" "}
          <IJS>router.observe()</IJS> and <IJS>router.once()</IJS>. Because
          those forms of response handler registration are primarily used for
          rendering the application, this means that the side effects will be
          called after the application has re-rendered.
        </p>

        <CodeBlock>
          {`const router = curi(history, routes, {
  sideEffects: [logResponse]
});

const render = () => {
  // render the app
};

router.observe(render);

// whenever there is a response, render will be
// called before logResponse`}
        </CodeBlock>

        <HashSection title="Official Side Effects" id="official" tag="h3">
          <p>Curi has two "official" side effect packages:</p>
          <ul>
            <li>
              <Link
                name="Package"
                params={{ package: "side-effect-title", version: "v1" }}
              >
                @curi/side-effect-title
              </Link>
            </li>
            <li>
              <Link
                name="Package"
                params={{ package: "side-effect-scroll", version: "v1" }}
              >
                @curi/side-effect-scroll
              </Link>
            </li>
          </ul>

          <CodeBlock>
            {`import titleEffect from "@curi/side-effect-title";
import scrollEffect from "@curi/side-effect-scroll";

const router = curi(history, routes, {
  sideEffect: [titleEffect(), scrollEffect()]
});`}
          </CodeBlock>
        </HashSection>
      </HashSection>

      <HashSection title="Creating Side Effects" id="creating">
        <p>
          When creating your own side effect, you can write a regular function
          or a side effect "factory".
        </p>

        <CodeBlock>
          {`function mySideEffect({ response, navigation }) {
  console.log('Navigating to', response.location);
  console.log('Navigation action:', navigation.action);
}

const router = curi(history, routes, {
  sideEffects: [mySideEffect]
});`}
        </CodeBlock>

        <p>
          A side effect factory lets create a more customizable side effect.
        </p>

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

        <p>
          You may want to review the{" "}
          <Link
            name="Guide"
            params={{ slug: "responses" }}
            hash="response-properties"
          >
            response properties
          </Link>{" "}
          to know which properties you should expect a response to have.
        </p>
      </HashSection>
    </React.Fragment>
  );
}
