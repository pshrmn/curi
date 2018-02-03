import React from "react";
import { Link } from "@curi/react";

import BaseGuide from "./base/BaseGuide";
import {
  PrismBlock,
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../components/PrismBlocks";
import { Note } from "../components/Messages";
import { Section, Subsection } from "../components/Sections";

export default ({ name }) => (
  <BaseGuide>
    <h1>{name}</h1>
    <p>
      Response handlers are functions that are called by the router when a new
      response is emitted.
    </p>

    <Section title="Response Handler Argument" id="argument">
      <p>
        Response handlers are passed an object with three properties:{" "}
        <Link
          to="Package"
          params={{ package: "core" }}
          details={{ hash: "properties" }}
        >
          <IJS>router</IJS>
        </Link>,{" "}
        <Link to="Guide" params={{ slug: "responses" }}>
          <IJS>response</IJS>
        </Link>, and{" "}
        <Link to="Guide" params={{ slug: "navigation-objects" }}>
          <IJS>navigation</IJS>
        </Link>. Which one you will need will vary based on what the response
        handler is doing.
      </p>
      <PrismBlock lang="javascript">
        {`function responseHandler({ router, response, navigation }) {
  // ...
}`}
      </PrismBlock>
    </Section>

    <Section title="Use Cases" id="use-cases">
      <Subsection title="Setup" id="setup">
        <p>
          Curi creates responses asynchronously, which means that when your
          application first renders, the initial response hasn't necessarily
          been created. To deal with this, you can use a response handler to
          perform any setup that needs the initial response to exist.
        </p>
        <PrismBlock lang="jsx">
          {`function setup({ router }) {
  ReactDOM.render((
    <CuriProvider router={router}>
      {({ response }) => <response.body />}
    </CuriProvider>
  ), document.getElementById('root'));
}`}
        </PrismBlock>
        <p>
          A setup function only needs to be called once, so you can call{" "}
          <IJS>router.respond</IJS> without any options.
        </p>
        <PrismBlock lang="javascript">{`router.respond(setup);`}</PrismBlock>
        <Note>
          Setup is the only thing your application should need to write a
          response handler for. Some other use cases will be discussed below,
          but
        </Note>
      </Subsection>
      <Subsection title="A Render Function" id="render-function">
        <p>
          You could manually re-render your application by using a response
          handler that observes the router for every response (by passing the{" "}
          <IJS>{`{ observe: true }`}</IJS> option to <IJS>router.respond</IJS>).
        </p>
        <p>
          If your application is using one of the provided Curi rendering
          packages (<Link to="Package" params={{ package: "react" }}>
            <IJS>@curi/react</IJS>
          </Link>,{" "}
          <Link to="Package" params={{ package: "react-native" }}>
            <IJS>@curi/react-native</IJS>
          </Link>,{" "}
          <Link to="Package" params={{ package: "vue" }}>
            <IJS>@curi/vue</IJS>
          </Link>, and{" "}
          <Link to="Package" params={{ package: "svelte" }}>
            <IJS>@curi/svelte</IJS>
          </Link>) you won't actually have to manually observe the router
          because those packages do that internally for you.
        </p>
        <PrismBlock lang="javascript">
          {`function render({ response }) {
  // render somehow
}

router.respond(render, { observe: true });`}
        </PrismBlock>
      </Subsection>
      <Subsection title="Side Effects" id="side-effects">
        <p>
          Side effects are response handlers that are provided to the router at
          creation instead of by calling <IJS>router.respond</IJS>. These can be
          useful for tasks that are not rendering related as well as for tasks
          that need to be performed after a render has completed.
        </p>
        <p>
          The{" "}
          <Link to="Package" params={{ package: "side-effect-title" }}>
            <IJS>@curi/side-effect-title</IJS>
          </Link>{" "}
          package provides a side effect that will use <IJS>response.title</IJS>{" "}
          to set the page's <IJS>document.title</IJS>.
        </p>
        <p>
          With single-page applications, clicking on links wish hashes won't
          always scroll to the matching element in the page. The{" "}
          <Link to="Package" params={{ package: "side-effect-scroll" }}>
            <IJS>@curi/side-effect-scroll</IJS>
          </Link>{" "}
          package adds this behavior by scrolling the page to the element that
          matches the new response's hash (<IJS>response.location.hash</IJS>)
          after the new response has rendered.
        </p>
        <p>
          If you need to add logging to your application, you could write your
          own response handler to do this. Your response handler can either be
          added as a side effect when the router is constructed or later using{" "}
          <IJS>router.respond</IJS>.
        </p>
        <PrismBlock lang="javascript">
          {`function logger({ response }) {
  loggingAPI.add(response.location);
}

// as a side-effect
const router = curi(history, routes, {
  sideEffects: [{ fn: logger }]
});

// with respond
router.respond(logger, { observe: true });`}
        </PrismBlock>
      </Subsection>
    </Section>

    <div>
      <h2>Next</h2>
      <p>
        Next, we will cover{" "}
        <Link to="Guide" params={{ slug: "responses" }}>
          response objects
        </Link>.
      </p>
    </div>
  </BaseGuide>
);
