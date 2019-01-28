import React from "react";
import { Link } from "@curi/react-dom";

import {
  HashSection,
  CodeBlock,
  Note,
  IJS
} from "../../components/guide/common";

const meta = {
  title: "Getting Started"
};

export default function GettingStartedGuide() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection title="The Router" id="router-object">
        <p>
          The router is the controller of the single-page application. A router
          is created using a <IJS>history</IJS> object and a <IJS>routes</IJS>{" "}
          array.
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

      <HashSection title="Navigation" id="navigation">
        <p>
          Navigation within a single-page application can either be caused by
          in-app navigation (e.g. clicking a link) or platform navigation (e.g.
          clicking the back button or typing URL in the address bar and hitting
          enter).
        </p>

        <p>
          The router has a <IJS>navigate()</IJS> method to let you navigate with
          code. The function takes the <IJS>name</IJS> of the route you want to
          navigate to and any route <IJS>params</IJS>. The navigation{" "}
          <IJS>method</IJS> controls how the history changes locations, with the
          default behavior acting like clicking a link.
        </p>

        <CodeBlock>
          {`router.navigate({
  name: "Photo",
  params: { albumID: 1357, photoID: 02468 },
  hash: "comments"
});
// /photos/1357/02468#comments

router.navigate({
  name: "Login",
  state: { next: location.pathname },
  // replace the current location with the Login location
  // "REPLACE" is ideal for redirects
  method: "REPLACE"
});`}
        </CodeBlock>

        <Note>
          <p>
            Render interfaces, like{" "}
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

      <HashSection title="Response Handlers" id="response-handlers">
        <p>
          When Curi matches a location to a route, it creates a "response"
          object, which provides information about the route that matched.
        </p>

        <p>
          Response handlers are functions that will be called when there is a
          new response. There are three types of response handlers: observers,
          one time functions, and side effects.
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
          "One time" response handlers, registered with <IJS>router.once()</IJS>
          , will only be called one time. If a response already exists, then the
          response handler will be called immediately (unless configured not
          to). Otherwise, the one time response handler will be called after the
          next response is emitted.
        </p>

        <p>
          The primary use case for one time functions is to wait for the initial
          response to be generated before rendering.
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
          Unlike one time functions, these will be called for every response
          emitted by the router (until you tell the router to stop calling it).
          You most likely will not need to call this yourself because the
          renderer implementations setup observers for you.
        </p>

        <CodeBlock>
          {`const stop = router.observe(({ response }) => {
  console.log('new response!', response);
});
// ...
stop();
// no longer observing`}
        </CodeBlock>

        <p>
          If you have any asynchronous routes (routes with <IJS>resolve</IJS>{" "}
          functions), <IJS>router.once()</IJS> should be used to delay the
          initial render until after the initial response is ready.
        </p>

        <CodeBlock>
          {`// wait for initial response to be ready
router.once(() => {
  // safe to render async routes now
});`}
        </CodeBlock>
      </HashSection>

      <HashSection title="Rendering" id="rendering">
        <p>
          How Curi integrates with UI libraries depends on which one you are
          using. The way that Curi interfaces with each of them varies, but they
          all use observers to be notified when there is a new response.
        </p>

        <p>
          For the UI libraries that Curi natively supports, you can check out
          their respective guides to see how to use them.
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
