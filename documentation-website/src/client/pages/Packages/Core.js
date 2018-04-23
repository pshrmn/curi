import React from "react";
import { Link } from "@curi/react";

import BasePackage from "./base/BasePackage";
import APIBlock from "./base/APIBlock";
import { InlineJS as IJS, PrismBlock } from "../../components/PrismBlocks";
import { Section, Subsection } from "../../components/Sections";
import { Note } from "../../components/Messages";

export default ({ name, version, globalName }) => (
  <BasePackage
    name={name}
    version={version}
    globalName={globalName}
    about={
      <p>
        The <IJS>@curi/core</IJS> package is used to create a router.
      </p>
    }
  >
    <APIBlock>
      <Section tag="h3" title="constructor" id="constructor">
        <p>
          The Curi package's default export is a function to create a router. It
          has two required arguments: a <IJS>history</IJS> object and a{" "}
          <IJS>routes</IJS> array, and an optional third argument: an{" "}
          <IJS>options</IJS> object.
        </p>

        <PrismBlock lang="javascript">
          {`import curi from '@curi/core';

const router = curi(history, routes, options);`}
        </PrismBlock>

        <Section tag="h4" title="Arguments" id="arguments">
          <Subsection tag="h5" title="history" id="history">
            <p>
              A <a href="https://github.com/pshrmn/hickory">Hickory</a> history
              object. The{" "}
              <Link
                to="Guide"
                params={{ slug: "getting-started" }}
                hash="history-object"
              >
                Getting Started guide
              </Link>{" "}
              provides more information on how to choose which history type is
              right for an application.
            </p>
            <PrismBlock lang="jsx">
              {`import Browser from "@hickory/browser";

const history = Browser();
const router = curi(history, routes);`}
            </PrismBlock>
          </Subsection>

          <Subsection tag="h5" title="routes" id="routes">
            <p>
              An array of{" "}
              <Link to="Guide" params={{ slug: "routes" }}>
                route
              </Link>{" "}
              objects
            </p>
            <PrismBlock lang="jsx">
              {`const routes = [
  { name: "Home", path: "" },
  { name: "About", path: "about }
];

const router = curi(history, routes);`}
            </PrismBlock>
          </Subsection>

          <Subsection tag="h5" title="options" id="options">
            <p>
              An optional object with additional properties that can be passed
              to the router.
            </p>
            <ul>
              <li>
                <p>
                  <IJS>route</IJS> - An array of{" "}
                  <Link to="Guide" params={{ slug: "route-interactions" }}>
                    route interactions
                  </Link>. These are functions for interacting with routes based
                  on their <IJS>name</IJS>.
                </p>
                <p>
                  The <IJS>pathname</IJS> interaction is included by default;
                  any other interactions are provided through this array.
                </p>
                <PrismBlock lang="javascript">
                  {`import active from "@curi/route-active";
import ancestors from "@curi/route-ancestors";

const routes = [{ name: "Home", path: "" }];

const router = curi(history, routes, {
  route: [active(), ancestors()]
});`}
                </PrismBlock>
                <p>
                  Route interactions are called via the router's{" "}
                  <IJS>route</IJS> object.
                </p>
                <PrismBlock lang="javascript">
                  {`router.route.active("Home"); // returns true when location.pathname = "/"
router.route.pathname("Home"); // returns "/"`}
                </PrismBlock>
              </li>
              <li>
                <p>
                  <IJS>sideEffects</IJS> - An array of{" "}
                  <Link to="Guide" params={{ slug: "side-effects" }}>
                    side effect
                  </Link>{" "}
                  objects.
                </p>
                <PrismBlock lang="javascript">
                  {`import createScrollSideEffect from "@curi/side-effect-scroll";

const scroll = createScrollSideEffect();
const router = curi(history, routes, {
  sideEffects: [{ fn: scroll, after: true }]
});`}
                </PrismBlock>
                <ul>
                  <li>
                    <IJS>fn</IJS> is a function (response handler) that will be
                    called whenever a response is generated.
                  </li>
                  <li>
                    <IJS>after</IJS> (default <IJS>false</IJS>) controls whether
                    the response handler is called before or after regular*
                    response handlers.
                  </li>
                </ul>
                <p>
                  * A "regular" response handler is one added using{" "}
                  <Link hash="respond">
                    <IJS>router.respond()</IJS>
                  </Link>.
                </p>
              </li>
              <li>
                <p>
                  <IJS>emitRedirects</IJS> - When <IJS>false</IJS> (default is{" "}
                  <IJS>true</IJS>), response objects with the{" "}
                  <IJS>redirectTo</IJS> property{" "}
                  <strong>will not be emitted</strong> to response handlers (but
                  they will still trigger automatic redirects). This can be
                  useful for avoiding an extra render, but should not be used on
                  the server.
                </p>
                <PrismBlock lang="javascript">
                  {`const routes = [
  {
    name: "Old",
    path: "old/:id",
    response({ params }) {
      // setup a redirect to the "New" route
      return {
        redirectTo: {
          name: "New",
          params
        }
      };
    }
  },
  {
    name: "New",
    path: "new/:id"
  }
];

const router = curi(history, routes, {
  emitRedirects: false                 
});
// navigating to "/old/2" will automatically redirect
// to "/new/2" without rendering a response`}
                </PrismBlock>
              </li>
              <li>
                <p>
                  <IJS>cache</IJS> - A{" "}
                  <Link to="Guide" params={{ slug: "response-caching" }}>
                    cache
                  </Link>{" "}
                  object with get/set properties to enable re-using responses
                  when navigating to an already-visited location.
                </p>
                <p>
                  Some data layers, like{" "}
                  <a href="https://www.apollographql.com/">Apollo</a> have their
                  own cache, which makes this unnecessary.
                </p>
              </li>
              <li>
                <p>
                  <IJS>pathnameOptions</IJS> - Curi uses{" "}
                  <a href="https://github.com/pillarjs/path-to-regexp">
                    <IJS>path-to-regexp</IJS>
                  </a>{" "}
                  to handle route matching and pathname generation.{" "}
                  <IJS>path-to-regexp</IJS> can take a custom{" "}
                  <a href="https://github.com/pillarjs/path-to-regexp#compile-reverse-path-to-regexp">
                    <IJS>encode</IJS>
                  </a>{" "}
                  function for creating pathnames, which you can specify with
                  this options.
                </p>
                <p>
                  <strong>You most likely will never need to use this.</strong>
                </p>
                <PrismBlock lang="javascript">
                  {`const router = curi(history, routes, {
  pathOptions: {
    encode: (value, token) => { /* ... */ }
  }
});`}
                </PrismBlock>
              </li>
            </ul>
          </Subsection>
        </Section>

        <Section tag="h4" title="Router Properties" id="properties">
          <p>
            The router has a number of properties for you to use when rendering
            your application.
          </p>

          <Subsection tag="h5" title="respond(fn, options)" id="respond">
            <p>
              The <IJS>respond()</IJS> method takes a function and whenever a
              new response is made, it will call that function. The function
              will be passed on object with three properties:
            </p>
            <ol>
              <li>
                <IJS>response</IJS> - is the generated response object.
              </li>
              <li>
                <IJS>navigation</IJS> - contains additional information about
                the navigation that doesn't make sense to include in the
                response.
              </li>
              <li>
                <IJS>router</IJS> - is the Curi router.
              </li>
            </ol>
            <PrismBlock lang="javascript">
              {`router.respond(({ response }) => {
  // render the application based on the response
});`}
            </PrismBlock>
            <p>
              When the router is async (at least one roue has an{" "}
              <IJS>on.initial()</IJS> or <IJS>on.every()</IJS> function), the
              router will not call the response handler functions until any
              async functions have resolved.
            </p>
            <Subsection tag="h6" title="options" id="respond-options">
              <PrismBlock lang="javascript">
                {`{ observe: true } // default false
// When true, the response handler will be called for all future
// responses that are emitted by the router (until it stops observing)
// When false, the response handler will only be called one time.

{ initial: false } // default true
// When true, the response handler will be called immediately if a
// response exists.
// When false, the response handler will not be called
// until the next response is emitted.`}
              </PrismBlock>
            </Subsection>
            <p>
              <IJS>respond()</IJS> returns a function to stop calling the
              response handler.
            </p>
            <PrismBlock lang="javascript">
              {`const stopObserving = router.respond(() => {...});
// the router will call the response handler for all responses

stopObserving();
// the router no longer calls the response handler`}
            </PrismBlock>
          </Subsection>

          <Subsection tag="h5" title="current()" id="current-property">
            <p>
              The <IJS>router.current()</IJS> method returns the current{" "}
              <IJS>response</IJS> and <IJS>navigation</IJS> objects.
            </p>
            <Note>
              If you call <IJS>router.current()</IJS> before the initial
              response has been emitted, the <IJS>response</IJS> and{" "}
              <IJS>navigation</IJS> properties will be <IJS>null</IJS>.
            </Note>
            <PrismBlock lang="javascript">
              {`const router = curi(history, routes);
const tooSoon = router.current();
// tooSoon.response === null
// tooSoon.navigation === null

router.respond(({ response, navigation }) => {
  const justRight = router.current();
  // justRight.response === response
  // justRight.navigation === navigation
});`}
            </PrismBlock>
          </Subsection>

          <Subsection tag="h5" title="route" id="router-route">
            <p>
              The router's{" "}
              <Link to="Guide" params={{ slug: "route-interactions" }}>
                route interactions
              </Link>{" "}
              are accessed through the <IJS>route</IJS> property. This allows
              you to interact with routes based on their names.
            </p>
            <Subsection tag="h6" title="pathname" id="pathname-interaction">
              <p>
                Curi includes one built-in interaction, <IJS>pathname</IJS>,
                which generates location pathnames using the name of a route and
                an optional object containing any necessary params.
              </p>
              <PrismBlock lang="javascript">
                {`const routes = [{ name: 'User', path: 'user/:id' }];
const router = curi(history, routes);
const userPathname = router.route.pathname('User', { id: '12345' });
// userPathname === '/user/12345'`}
              </PrismBlock>
            </Subsection>
          </Subsection>

          <Subsection tag="h5" title="history" id="history-property">
            <p>
              The route's history object. This allows you to just pass the
              router throughout your project instead of both that and the
              history object.
            </p>
          </Subsection>
        </Section>
      </Section>
    </APIBlock>
  </BasePackage>
);
