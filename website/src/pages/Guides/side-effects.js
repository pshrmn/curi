import React from "react";
import { Link } from "@curi/react-dom";

import {
  TitledPlainSection,
  HashSection,
  CodeBlock,
  IJS
} from "../../components/guide/common";

let meta = {
  title: "Side Effects"
};

let providedMeta = {
  title: "@curi/side-effects",
  hash: "provided"
};
let addingMeta = {
  title: "Adding Side Effects",
  hash: "adding"
};

let creatingMeta = {
  title: "Creating Side Effects",
  hash: "creating"
};

let contents = [addingMeta, providedMeta, creatingMeta];

function UsingSideEffectsGuide() {
  return (
    <React.Fragment>
      <TitledPlainSection title={meta.title}>
        <p>
          Curi side effects are permanent router response handlers that are run
          after those registered using <IJS>router.observe</IJS> and{" "}
          <IJS>router.once</IJS>.
        </p>

        <p>
          Whenever a new response is generated, all of the side effect functions
          will be called. They will be given an object with the new{" "}
          <IJS>response</IJS> object, a <IJS>navigation</IJS> object with some
          extra routing data (the navigation action the previous response), and
          the <IJS>router</IJS> object.
        </p>

        <CodeBlock>
          {`function logResponse({ response }) {
  // call your logging API to record the response
}`}
        </CodeBlock>
      </TitledPlainSection>

      <HashSection meta={addingMeta} tag="h2">
        <p>
          Side effects are provided to your router with the{" "}
          <IJS>sideEffects</IJS> property of the options object. This is an
          array of observer functions.
        </p>

        <CodeBlock>
          {`let router = createRouter(browser, routes, {
  sideEffects: [logResponse, updateTitle]
});`}
        </CodeBlock>

        <p>
          Side effects are always run after observers registered using{" "}
          <IJS>router.observe</IJS> and <IJS>router.once</IJS>. Because those
          forms of response handler registration are primarily used for
          rendering the application, this means that the side effects will be
          called after the application has re-rendered.
        </p>

        <CodeBlock>
          {`let router = createRouter(browser, routes, {
  sideEffects: [logResponse]
});

let render = () => {
  // render the app
};

router.observe(render);

// whenever there is a response, render will be
// called before logResponse`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={providedMeta} tag="h2">
        <p>
          Curi's <IJS>@curi/router</IJS> package provides three side effects:
        </p>
        <ul>
          <li>
            The{" "}
            <Link
              name="Package"
              params={{ package: "router", version: "v2" }}
              hash="announce"
            >
              <IJS>announce</IJS>
            </Link>{" "}
            side effect announces navigation for screen readers.
          </li>
          <li>
            The{" "}
            <Link
              name="Package"
              params={{ package: "router", version: "v2" }}
              hash="scroll"
            >
              <IJS>scroll</IJS>
            </Link>{" "}
            side effect scrolls to the top of the page after navigation.
          </li>
          <li>
            The{" "}
            <Link
              name="Package"
              params={{ package: "router", version: "v2" }}
              hash="title"
            >
              <IJS>title</IJS>
            </Link>{" "}
            side effect sets the document's title after navigation.
          </li>
        </ul>

        <CodeBlock>
          {`import { announce, scroll, title } from "@curi/router";

let router = createRouter(browser, routes, {
  sideEffect: [
    announce(({ response }) => {
      return \`Navigated to \${response.location.pathname}\`;
    }),
    scroll(),
    title(({ response }) => {
      return \`\${response.meta.title}\`;
    })
  ]
});`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={creatingMeta} tag="h2">
        <p>
          When creating your own side effect, you can write a regular function
          or a side effect "factory".
        </p>

        <CodeBlock>
          {`function mySideEffect({ response, navigation }) {
  console.log('Navigating to', response.location);
  console.log('Navigation action:', navigation.action);
}

let router = createRouter(browser, routes, {
  sideEffects: [mySideEffect]
});`}
        </CodeBlock>

        <p>
          A side effect factory lets create a more customizable side effect.
        </p>

        <CodeBlock>
          {`function AnalyticsLogger(options) {
  // do some setup with the provided options
  let logger = setupMyLogger(options);

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

export { UsingSideEffectsGuide as component, contents };
