import React from "react";
import { Link } from "@curi/react-dom";

import {
  PlainSection,
  HashSection,
  CodeBlock,
  Note,
  IJS
} from "../../components/guide/common";

const meta = {
  title: "New Responses"
};

const handlerMeta = {
  title: "Response Handlers",
  hash: "response-handlers"
};

const registeringMeta = {
  title: "Registering Response Handlers",
  hash: "registering"
};

const setupMeta = {
  title: "Setup",
  hash: "setup"
};
const renderingMeta = {
  title: "Rendering",
  hash: "rendering"
};
const sideEffectsMeta = {
  title: "Side Effects",
  hash: "side-effects"
};
const useCaseMeta = {
  title: "Use Cases",
  hash: "use-cases",
  children: [setupMeta, renderingMeta, sideEffectsMeta]
};

const contents = [handlerMeta, registeringMeta, useCaseMeta];

function NewResponsesGuide() {
  return (
    <React.Fragment>
      <PlainSection>
        <h1>{meta.title}</h1>

        <p>
          Curi uses an observer pattern to call registered functions (called
          response handlers) when there is a new response. The primary use care
          for this is to re-render the application whenever there is a new
          response, but other functionalities (like logging) can also be
          performed.
        </p>
      </PlainSection>

      <HashSection meta={handlerMeta} tag="h3">
        <p>
          When response handlers are called, they are passed an object with
          three properties:{" "}
          <Link
            name="Package"
            params={{ package: "router", version: "v2" }}
            hash="properties"
          >
            <IJS>router</IJS>
          </Link>
          ,{" "}
          <Link name="Guide" params={{ slug: "responses" }}>
            <IJS>response</IJS>
          </Link>
          , and{" "}
          <Link name="Guide" params={{ slug: "navigation-objects" }}>
            <IJS>navigation</IJS>
          </Link>
          . Which objects/properties you use depends on what the response
          handler is doing.
        </p>

        <CodeBlock>
          {`function responseHandler({
  router,
  response,
  navigation
}) {
  // ...
}`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={registeringMeta} tag="h3">
        <p>
          There are three ways to attach response handlers to the router:{" "}
          <IJS>router.once</IJS> and <IJS>router.observe</IJS> or as a side
          effect.
        </p>
        <p>
          Response handlers registered with <IJS>router.once</IJS> will only be
          called one time, while those registered with <IJS>router.observe</IJS>{" "}
          and side effects will be called for every new response.
        </p>
        <p>
          When you register a response handler using <IJS>router.observe</IJS>,
          it will return a function that you can use to stop calling the
          response handler for new responses. You should rarely need to do this,
          but it can be useful for memory management if you are adding and
          removing lots of observers.
        </p>

        <CodeBlock>
          {`// fn will only be called one time
router.once(fn);

// obs will be called for every new response
const stop = router.observe(fn);`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={useCaseMeta} tag="h3">
        <p>What should you use response handlers for?</p>
        <HashSection meta={setupMeta} tag="h4">
          <p>
            If any of the routes in an application have <IJS>resolve</IJS>{" "}
            functions, when they match their responses are created
            asynchronously. When the application first renders, if the router
            matches an async route, the response isn't immediately ready to use.
            To deal with this, you can use an observer to render once the
            initial response is ready.
          </p>
          <p>
            A setup function only needs to be called one time, so you can
            register it with <IJS>router.once</IJS>.
          </p>
          <Note>
            <p>
              In most applications, waiting for the initial response is the only
              time you may need to write response handlers yourself.
            </p>
          </Note>

          <CodeBlock lang="jsx">
            {`const Router = createRouterComponent(router);

function setup() {
  ReactDOM.render((
    <Router>
      <App />
    </Router>
  ), document.getElementById('root'));
}

router.once(setup);`}
          </CodeBlock>
        </HashSection>

        <HashSection meta={renderingMeta} tag="h4">
          <p>
            Rendering libraries need to know when there is a new response so
            that they can re-render the application.
          </p>
          <p>
            The Curi rendering packages (
            <Link
              name="Package"
              params={{ package: "react-dom", version: "v2" }}
            >
              <IJS>@curi/react-dom</IJS>
            </Link>
            ,{" "}
            <Link
              name="Package"
              params={{ package: "react-native", version: "v2" }}
            >
              <IJS>@curi/react-native</IJS>
            </Link>
            ,{" "}
            <Link name="Package" params={{ package: "vue", version: "v1" }}>
              <IJS>@curi/vue</IJS>
            </Link>
            , and{" "}
            <Link name="Package" params={{ package: "svelte", version: "v1" }}>
              <IJS>@curi/svelte</IJS>
            </Link>
            ) setup an observer internally so that they can automatically
            re-render.
          </p>
          <p>
            If you are using vanilla JavaScript to render your application or
            you are writing your own framework implementation, you would use{" "}
            <IJS>router.observe</IJS> to re-render new responses.
          </p>

          <CodeBlock>
            {`function observer({ response }) {
  // let the app know there is a new response
}

router.observe(observer);`}
          </CodeBlock>
        </HashSection>

        <HashSection meta={sideEffectsMeta} tag="h4">
          <p>
            Side effects are observers that are provided to the router at
            creation instead of by calling <IJS>router.observe</IJS>. These can
            be useful for tasks that are not rendering related as well as for
            tasks that need to be performed after a render has completed.
          </p>
          <p>
            The{" "}
            <Link
              name="Package"
              params={{ package: "side-effect-title", version: "v2" }}
            >
              <IJS>@curi/side-effect-title</IJS>
            </Link>{" "}
            package provides a side effect that will use{" "}
            <IJS>response.meta.title</IJS> to set the page's{" "}
            <IJS>document.title</IJS>.
          </p>
          <p>
            With single-page applications, clicking on links wish hashes won't
            always scroll to the matching element in the page. The{" "}
            <Link
              name="Package"
              params={{ package: "side-effect-scroll", version: "v2" }}
            >
              <IJS>@curi/side-effect-scroll</IJS>
            </Link>{" "}
            package adds this behavior by scrolling the page to the element that
            matches the new response's hash (<IJS>response.location.hash</IJS>)
            after the new response has rendered.
          </p>
          <p>
            If you need to add logging to your application, you could write your
            own observer to do this. Your observer can either be added as a side
            effect when the router is constructed or later using{" "}
            <IJS>router.observe</IJS>.
          </p>

          <CodeBlock>
            {`function logger({ response }) {
  loggingAPI.add(response.location);
}

// as a side-effect
const router = createRouter(browser, routes, {
  sideEffects: [{ fn: logger }]
});

// as an observer
router.observe(logger);`}
          </CodeBlock>
        </HashSection>
      </HashSection>
    </React.Fragment>
  );
}

export { NewResponsesGuide as component, contents };
