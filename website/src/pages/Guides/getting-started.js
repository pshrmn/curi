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
  title: "Getting Started"
};

const routerMeta = {
  title: "The Router",
  hash: "router-object"
};
const urlsMeta = {
  title: "URLs",
  hash: "urls"
};
const navigationMeta = {
  title: "Navigation",
  hash: "navigation"
};
const handlerMeta = {
  title: "Response Handlers",
  hash: "response-handlers"
};
const renderingMeta = {
  title: "Rendering",
  hash: "rendering"
};

const contents = [routerMeta, navigationMeta, handlerMeta, renderingMeta];

function GettingStartedGuide() {
  return (
    <React.Fragment>
      <PlainSection>
        <h1>{meta.title}</h1>

        <p>
          The core of a single-page application is its router. The router is
          responsible for matching locations to its known routes and for
          powering navigation within the application.
        </p>
      </PlainSection>

      <HashSection meta={routerMeta} tag="h2">
        <p>
          A router is created using a{" "}
          <Link name="Guide" params={{ slug: "history" }}>
            <IJS>history</IJS> function
          </Link>{" "}
          and a{" "}
          <Link name="Guide" params={{ slug: "routes" }}>
            <IJS>routes</IJS> array.
          </Link>
        </p>

        <CodeBlock>
          {`import { createRouter, prepareRoutes } from '@curi/router';
import { browser } from "@hickory/browser";

const routes = prepareRoutes([...]);
const router = createRouter(browser, routes);`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={urlsMeta} tag="h2">
        <p>
          Locations are represented using URLs. URLs are a combination of a{" "}
          <IJS>pathname</IJS> string, a <IJS>query</IJS>, and a <IJS>hash</IJS>.
        </p>

        <p>
          The router provides a <IJS>url</IJS> method for automatically
          generating a URL. The method takes the name of the route and the
          route's params to generate the URL's <IJS>pathname</IJS>.
          Additionally, <IJS>query</IJS> and <IJS>hash</IJS> values can be
          provided.
        </p>

        <CodeBlock>
          {`const routes = prepareRoutes([
  { name: "Home", path: "" },
  { name: "Contact", path: "contact/:method" }
]);
const router = createRouter(browser, routes);

const homeURL = router.url({ name: "Home" });
// "/"

const phoneURL = router.url({
  name: "Contact",
  params: { method: "phone" }
});
// "/contact/phone"

const queryURL = router.url({
  name: "Home",
  query: "value=7"
});
// "/?value=7"`}
        </CodeBlock>

        <p>
          By default, a <IJS>query</IJS> is a string, but you can also configure
          your history to use a query library.
        </p>

        <CodeBlock>
          {`import { parse, stringify } from "qs";
const router = createRouter(browser, routes, {
  history: {
    query: { parse, stringify }
  }
});

const queryURL = router.url({
  name: "Home",
  query: { value: "6" }
});
// "/?value=6"`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={navigationMeta} tag="h2">
        <p>
          There are two types of navigation within a single-page application:
          in-app navigation (e.g. clicking a link) and platform navigation (e.g.
          clicking the back button or typing a URL in the address bar and
          hitting enter).
        </p>

        <p>
          A Curi router object has a <IJS>navigate</IJS> method to let you
          navigate with code. The function takes an object with a <IJS>url</IJS>{" "}
          property of the URL to navigate to; this pairs well with the router's{" "}
          <IJS>url</IJS> method described above. There are also a number of{" "}
          <Link
            name="Package"
            params={{ package: "router", version: "v2" }}
            hash="navigate"
          >
            other optional arguments to <IJS>navigate</IJS>
          </Link>
          .
        </p>

        <CodeBlock>
          {`router.navigate({
  url: "/photo/1357/02468#comments"
});`}
        </CodeBlock>

        <Note>
          <p>
            Render packages, like{" "}
            <Link
              name="Package"
              params={{ package: "react-dom", version: "v2" }}
            >
              <IJS>@curi/react-dom</IJS>
            </Link>
            , will call <IJS>router.nagivate</IJS> for you when the user clicks
            a link.
          </p>
        </Note>
      </HashSection>

      <HashSection meta={handlerMeta} tag="h2">
        <p>
          When Curi matches a location to a route, it creates a "response"
          object. Respons objects provide information about the route that
          matched.
        </p>

        <p>
          Response handlers are functions that will be called when there is a
          new response. There are three types of response handlers: side
          effects, one time functions, and observers.
        </p>

        <p>
          Side effects are passed to the router when you are creating it. These
          are best suited for non-rendering tasks. You can read more about them
          in the{" "}
          <Link name="Guide" params={{ slug: "side-effects" }}>
            side effects guide
          </Link>
          .
        </p>

        <CodeBlock>
          {`const router = createRouter(browser, routes, {
  sideEffects: [scroll(), title(...)]
})`}
        </CodeBlock>

        <p>
          Response handlers registered with <IJS>router.once</IJS> will only be
          called one time. This is primarily useful for waiting for asynchronous
          actions to finish before the initial render.
        </p>

        <CodeBlock>
          {`const router = createRouter(browser, routes);
// wait for the initial route's async action to complete
router.once(() => {
  // this is not called until the initial response is ready
  // so we can safely render in here
});`}
        </CodeBlock>

        <p>
          Observers are passed to the router using <IJS>router.observe</IJS>.
          Unlike one time functions, these will be called every time there is a
          new response.
        </p>

        <p>
          Render packages, like <IJS>@curi/react-dom</IJS>, use{" "}
          <IJS>router.observe</IJS> internally in order to re-render when there
          is a new response.
        </p>

        <CodeBlock>
          {`router.observe(({ response }) => {
  console.log('new response!', response);
});`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={renderingMeta} tag="h2">
        <p>
          Curi adapts its API to work with different UI libraries. You can check
          out the respective guides for the officially supported libraries to
          see how to use them.
        </p>

        <ul>
          <li>
            <Link name="Guide" params={{ slug: "react-dom" }}>
              React DOM
            </Link>
          </li>
          <li>
            <Link name="Guide" params={{ slug: "react-native" }}>
              React Native
            </Link>
          </li>
          <li>
            <Link name="Guide" params={{ slug: "svelte" }}>
              Svelte
            </Link>
          </li>
          <li>
            <Link name="Guide" params={{ slug: "vue" }}>
              Vue
            </Link>
          </li>
        </ul>
      </HashSection>
    </React.Fragment>
  );
}

export { GettingStartedGuide as component, contents };
