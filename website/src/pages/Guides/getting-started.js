import React from "react";
import { Link } from "@curi/react-dom";

import {
  TitledPlainSection,
  HashSection,
  Paragraph,
  CodeBlock,
  Note,
  IJS
} from "../../components/guide/common";

let meta = {
  title: "Getting Started"
};

let routerMeta = {
  title: "The Router",
  hash: "router-object"
};
let urlsMeta = {
  title: "URLs",
  hash: "urls"
};
let navigationMeta = {
  title: "Navigation",
  hash: "navigation"
};
let handlerMeta = {
  title: "Response Handlers",
  hash: "response-handlers"
};
let renderingMeta = {
  title: "Rendering",
  hash: "rendering"
};

let contents = [routerMeta, navigationMeta, handlerMeta, renderingMeta];

function GettingStartedGuide() {
  return (
    <React.Fragment>
      <TitledPlainSection title={meta.title}>
        <Paragraph>
          The core of a single-page application is its router. The router is
          responsible for matching locations to its known routes and for
          powering navigation within the application.
        </Paragraph>
      </TitledPlainSection>

      <HashSection meta={routerMeta} tag="h2">
        <Paragraph>
          A router is created using a{" "}
          <Link name="Guide" params={{ slug: "history" }}>
            <IJS>history</IJS> function
          </Link>{" "}
          and a{" "}
          <Link name="Guide" params={{ slug: "routes" }}>
            <IJS>routes</IJS> array.
          </Link>
        </Paragraph>

        <CodeBlock>
          {`import { createRouter, prepareRoutes } from '@curi/router';
import { browser } from "@hickory/browser";

let routes = prepareRoutes([...]);
let router = createRouter(browser, routes);`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={urlsMeta} tag="h2">
        <Paragraph>
          Locations are represented using URLs. URLs are a combination of a{" "}
          <IJS>pathname</IJS> string, a <IJS>query</IJS>, and a <IJS>hash</IJS>.
        </Paragraph>

        <Paragraph>
          The router provides a <IJS>url</IJS> method for automatically
          generating a URL. The method takes the name of the route and the
          route's params to generate the URL's <IJS>pathname</IJS>.
          Additionally, <IJS>query</IJS> and <IJS>hash</IJS> values can be
          provided.
        </Paragraph>

        <CodeBlock>
          {`let routes = prepareRoutes([
  { name: "Home", path: "" },
  { name: "Contact", path: "contact/:method" }
]);
let router = createRouter(browser, routes);

let homeURL = router.url({ name: "Home" });
// "/"

let phoneURL = router.url({
  name: "Contact",
  params: { method: "phone" }
});
// "/contact/phone"

let queryURL = router.url({
  name: "Home",
  query: "value=7"
});
// "/?value=7"`}
        </CodeBlock>

        <Paragraph>
          By default, a <IJS>query</IJS> is a string, but you can also configure
          your history to use a query library.
        </Paragraph>

        <CodeBlock>
          {`import { parse, stringify } from "qs";
let router = createRouter(browser, routes, {
  history: {
    query: { parse, stringify }
  }
});

let queryURL = router.url({
  name: "Home",
  query: { value: "6" }
});
// "/?value=6"`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={navigationMeta} tag="h2">
        <Paragraph>
          There are two types of navigation within a single-page application:
          in-app navigation (e.g. clicking a link) and platform navigation (e.g.
          clicking the back button or typing a URL in the address bar and
          hitting enter).
        </Paragraph>

        <Paragraph>
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
        </Paragraph>

        <CodeBlock>
          {`router.navigate({
  url: "/photo/1357/02468#comments"
});`}
        </CodeBlock>

        <Note>
          <Paragraph>
            Render packages, like{" "}
            <Link
              name="Package"
              params={{ package: "react-dom", version: "v2" }}
            >
              <IJS>@curi/react-dom</IJS>
            </Link>
            , will call <IJS>router.navigate</IJS> for you when the user clicks
            a link.
          </Paragraph>
        </Note>
      </HashSection>

      <HashSection meta={handlerMeta} tag="h2">
        <Paragraph>
          When Curi matches a location to a route, it creates a "response"
          object. Respons objects provide information about the route that
          matched.
        </Paragraph>

        <Paragraph>
          Response handlers are functions that will be called when there is a
          new response. There are three types of response handlers: side
          effects, one time functions, and observers.
        </Paragraph>

        <Paragraph>
          Side effects are passed to the router when you are creating it. These
          are best suited for non-rendering tasks. You can read more about them
          in the{" "}
          <Link name="Guide" params={{ slug: "side-effects" }}>
            side effects guide
          </Link>
          .
        </Paragraph>

        <CodeBlock>
          {`let router = createRouter(browser, routes, {
  sideEffects: [scroll(), title(...)]
})`}
        </CodeBlock>

        <Paragraph>
          Response handlers registered with <IJS>router.once</IJS> will only be
          called one time. This is primarily useful for waiting for asynchronous
          actions to finish before the initial render.
        </Paragraph>

        <CodeBlock>
          {`let router = createRouter(browser, routes);
// wait for the initial route's async action to complete
router.once(() => {
  // this is not called until the initial response is ready
  // so we can safely render in here
});`}
        </CodeBlock>

        <Paragraph>
          Observers are passed to the router using <IJS>router.observe</IJS>.
          Unlike one time functions, these will be called every time there is a
          new response.
        </Paragraph>

        <Paragraph>
          Render packages, like <IJS>@curi/react-dom</IJS>, use{" "}
          <IJS>router.observe</IJS> internally in order to re-render when there
          is a new response.
        </Paragraph>

        <CodeBlock>
          {`router.observe(({ response }) => {
  console.log('new response!', response);
});`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={renderingMeta} tag="h2">
        <Paragraph>
          Curi adapts its API to work with different UI libraries. You can check
          out the respective guides for the officially supported libraries to
          see how to use them.
        </Paragraph>

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
