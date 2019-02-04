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
          The core of a single-page application is with its router. The router
          is responsible for matching locations to its known routes and for
          powering navigating within the application.
        </p>
      </PlainSection>

      <HashSection meta={routerMeta}>
        <p>
          A router is created using a <IJS>history</IJS> object and a{" "}
          <IJS>routes</IJS> array.
        </p>

        <CodeBlock>
          {`import { curi, prepareRoutes } from '@curi/router';

const history = Browser();
const routes = prepareRoutes([...]);
const router = curi(history, routes);`}
        </CodeBlock>

        <p>
          The{" "}
          <Link name="Guide" params={{ slug: "history" }}>
            history
          </Link>{" "}
          object is used to navigate between locations within an application.
          The{" "}
          <Link name="Guide" params={{ slug: "routes" }}>
            routes
          </Link>{" "}
          array describes valid locations in an application.
        </p>
      </HashSection>

      <HashSection meta={navigationMeta}>
        <p>
          There are two types of navigation within a single-page application:
          in-app navigation (e.g. clicking a link) and platform navigation (e.g.
          clicking the back button or typing URL in the address bar and hitting
          enter).
        </p>

        <p>
          A Curi router object has a <IJS>navigate()</IJS> method to let you
          navigate with code. Instead of being given a URL, the function takes
          the <IJS>name</IJS> of the route you want to navigate to and any route{" "}
          <IJS>params</IJS>. There are also a number of{" "}
          <Link
            name="Package"
            params={{ package: "router", version: "v1" }}
            hash="navigate"
          >
            other optional arguments to <IJS>navigate()</IJS>
          </Link>
          .
        </p>

        <CodeBlock>
          {`router.navigate({
  name: "Photo",
  params: { albumID: 1357, photoID: 02468 },
  hash: "comments"
});
// navigates to /photos/1357/02468#comments`}
        </CodeBlock>

        <Note>
          <p>
            Render packages, like{" "}
            <Link
              name="Package"
              params={{ package: "react-dom", version: "v1" }}
            >
              <IJS>@curi/react-dom</IJS>
            </Link>
            , will call <IJS>router.nagivate()</IJS> for you when the user
            clicks a link.
          </p>
        </Note>
      </HashSection>

      <HashSection meta={handlerMeta}>
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
          {`const router = curi(history, routes, {
  sideEffects: [scroll, title]
})`}
        </CodeBlock>

        <p>
          Response handlers registered with <IJS>router.once()</IJS> will only
          be called one time. This is primarily useful for waiting for
          asynchronous actions to finish before the initial render.
        </p>

        <CodeBlock>
          {`const router = cur(history, routes);
router.once(() => {
  // this is not called until the initial response is ready
  // so we can safely render now
});`}
        </CodeBlock>

        <p>
          Observers are passed to the router using <IJS>router.observe()</IJS>.
          Unlike one time functions, these will be called every time there is a
          new response.
        </p>

        <p>
          Render packages, like <IJS>@curi/react-dom</IJS>, use{" "}
          <IJS>router.observe()</IJS> internally in order to re-render when
          there is a new response.
        </p>

        <CodeBlock>
          {`router.observe(({ response }) => {
  console.log('new response!', response);
});`}
        </CodeBlock>

        <p>
          If you have any asynchronous routes (a route with a <IJS>resolve</IJS>{" "}
          function), <IJS>router.once()</IJS> should be used to delay the
          initial render until after the initial response is ready.
        </p>

        <CodeBlock>
          {`// wait for initial response to be ready
router.once(() => {
  // safe to render async routes now
});`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={renderingMeta}>
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
