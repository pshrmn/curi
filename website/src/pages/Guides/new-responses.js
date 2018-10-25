import React from "react";
import { Link } from "@curi/react-dom";

import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../components/highlight/Inline";
import { Note } from "../../components/Messages";
import { Section, Subsection } from "../../components/layout/Sections";
import { CodeBlock, Explanation } from "../../components/layout/Groups";

const meta = {
  title: "New Responses"
};

export default function NewResponsesGuide() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Explanation>
        <p>
          The Curi router uses an observer pattern to call registered functions
          (called response handlers) when there is a new response. The main
          function for response handlers is to use the new response to render
          the application, but any other functionality (like logging) can also
          be performed.
        </p>
      </Explanation>

      <Subsection title="Response Handlers" id="response-handlers">
        <Explanation>
          <p>
            When response handlers are called, they are passed an object with
            three properties:{" "}
            <Link to="Package" params={{ package: "router" }} hash="properties">
              <IJS>router</IJS>
            </Link>,{" "}
            <Link
              to="Guide"
              params={{ slug: "routes-and-responses" }}
              hash="responses"
            >
              <IJS>response</IJS>
            </Link>, and{" "}
            <Link to="Guide" params={{ slug: "navigation-objects" }}>
              <IJS>navigation</IJS>
            </Link>. Which objects/properties you use depends on what the
            response handler is doing.
          </p>
        </Explanation>
        <CodeBlock>
          {`function responseHandler({
  router,
  response,
  navigation
}) {
  // ...
}`}
        </CodeBlock>
      </Subsection>

      <Subsection title="Registering Response Handlers" id="registering">
        <Explanation>
          <p>
            There are three ways to attach response handlers to the router:{" "}
            <IJS>router.once()</IJS> and <IJS>router.observe()</IJS> or as a
            side effect.
          </p>
          <p>
            Response handlers registered with <IJS>router.once()</IJS> will only
            be called one time, while those registered with{" "}
            <IJS>router.observe()</IJS> and side effects will be called for
            every new response.
          </p>
          <p>
            When you register a response handler using{" "}
            <IJS>router.observe()</IJS>, it will return a function that you can
            use to stop calling the response handler for new responses. You
            should rarely need to do this, but it can be useful for memory
            management if you are adding and removing lots of observers.
          </p>
        </Explanation>
        <CodeBlock>
          {`// fn will only be called one time
router.once(fn);

// obs will be called for every new response
const stop = router.observe(fn);`}
        </CodeBlock>
      </Subsection>

      <Subsection title="Use Cases" id="use-cases">
        <p>What should you use response handlers for?</p>
        <Subsection title="Setup" id="setup">
          <Explanation>
            <p>
              If any of the routes in an application have <IJS>resolve</IJS>{" "}
              functions, when they match their responses are created
              asynchronously. When the application first renders, if the router
              matches an async route, the response isn't immediately ready to
              use. To deal with this, you can use an observer to render once the
              initial response is ready.
            </p>
            <p>
              A setup function only needs to be called one time, so you can
              register it with <IJS>router.once()</IJS>.
            </p>
            <Note>
              In most applications, waiting for the initial response is the only
              time you may need to write response handlers yourself.
            </Note>
          </Explanation>
          <CodeBlock lang="jsx">
            {`const Router = curiProvider(router);
              
function setup() {
  ReactDOM.render((
    <Router>
      {({ response }) => <response.body />}
    </Router>
  ), document.getElementById('root'));
}

router.once(setup);`}
          </CodeBlock>
        </Subsection>
        <Subsection title="Rendering" id="rendering">
          <Explanation>
            <p>
              Rendering libraries need to know when there is a new response so
              that they can re-render the application.
            </p>
            <p>
              The Curi rendering packages (<Link
                to="Package"
                params={{ package: "react-dom" }}
              >
                <IJS>@curi/react-dom</IJS>
              </Link>,{" "}
              <Link to="Package" params={{ package: "react-native" }}>
                <IJS>@curi/react-native</IJS>
              </Link>,{" "}
              <Link to="Package" params={{ package: "vue" }}>
                <IJS>@curi/vue</IJS>
              </Link>, and{" "}
              <Link to="Package" params={{ package: "svelte" }}>
                <IJS>@curi/svelte</IJS>
              </Link>) setup an observer internally so that they can
              automatically re-render.
            </p>
            <p>
              If you are using vanilla JavaScript to render your application or
              you are writing your own framework implementation, you would use{" "}
              <IJS>router.observe()</IJS> to re-render new responses.
            </p>
          </Explanation>
          <CodeBlock>
            {`function observer({ response }) {
  // let the app know there is a new response
}

router.observe(observer);`}
          </CodeBlock>
        </Subsection>
        <Subsection title="Side Effects" id="side-effects">
          <Explanation>
            <p>
              Side effects are observers that are provided to the router at
              creation instead of by calling <IJS>router.observe()</IJS>. These
              can be useful for tasks that are not rendering related as well as
              for tasks that need to be performed after a render has completed.
            </p>
            <p>
              The{" "}
              <Link to="Package" params={{ package: "side-effect-title" }}>
                <IJS>@curi/side-effect-title</IJS>
              </Link>{" "}
              package provides a side effect that will use{" "}
              <IJS>response.title</IJS> to set the page's{" "}
              <IJS>document.title</IJS>.
            </p>
            <p>
              With single-page applications, clicking on links wish hashes won't
              always scroll to the matching element in the page. The{" "}
              <Link to="Package" params={{ package: "side-effect-scroll" }}>
                <IJS>@curi/side-effect-scroll</IJS>
              </Link>{" "}
              package adds this behavior by scrolling the page to the element
              that matches the new response's hash (<IJS>
                response.location.hash
              </IJS>) after the new response has rendered.
            </p>
            <p>
              If you need to add logging to your application, you could write
              your own observer to do this. Your observer can either be added as
              a side effect when the router is constructed or later using{" "}
              <IJS>router.observe()</IJS>.
            </p>
          </Explanation>
          <CodeBlock>
            {`function logger({ response }) {
  loggingAPI.add(response.location);
}

// as a side-effect
const router = curi(history, routes, {
  sideEffects: [{ fn: logger }]
});

// as an observer
router.observe(logger);`}
          </CodeBlock>
        </Subsection>
      </Subsection>
    </React.Fragment>
  );
}
