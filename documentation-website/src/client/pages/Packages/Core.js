import React from "react";
import { Link } from "@curi/react";

import BasePackage from "./base/BasePackage";
import APIBlock from "./base/APIBlock";
import { InlineJS as IJS } from "../../components/PrismBlocks";
import { Section, Subsection } from "../../components/Sections";
import {
  SideBySide,
  CodeBlock,
  Explanation
} from "../../components/SideBySide";
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
        <SideBySide>
          <Explanation>
            <p>
              The Curi package's default export is a function to create a
              router. It has two required arguments: a <IJS>history</IJS> object
              and a <IJS>routes</IJS> array, and an optional third argument: an{" "}
              <IJS>options</IJS> object.
            </p>
          </Explanation>
          <CodeBlock>
            {`import curi from '@curi/core';

const router = curi(history, routes, options);`}
          </CodeBlock>
        </SideBySide>

        <Section tag="h4" title="Arguments" id="arguments">
          <Subsection tag="h5" title="history" id="history">
            <SideBySide>
              <Explanation>
                <p>
                  A <a href="https://github.com/pshrmn/hickory">Hickory</a>{" "}
                  history object that will power navigation within the
                  application. The{" "}
                  <Link
                    to="Guide"
                    params={{ slug: "getting-started" }}
                    hash="history-object"
                  >
                    Getting Started guide
                  </Link>{" "}
                  provides more information on how to choose which history type
                  is right for an application.
                </p>
              </Explanation>
              <CodeBlock lang="jsx">
                {`import Browser from "@hickory/browser";

const history = Browser();
const router = curi(history, routes);`}
              </CodeBlock>
            </SideBySide>
          </Subsection>

          <Subsection tag="h5" title="routes" id="routes">
            <SideBySide>
              <Explanation>
                <p>
                  An array of{" "}
                  <Link to="Guide" params={{ slug: "routes" }}>
                    route
                  </Link>{" "}
                  objects for all valid routes in the application.
                </p>
              </Explanation>
              <CodeBlock lang="jsx">
                {`const routes = [
  { name: "Home", path: "" },
  { name: "About", path: "about" }
];

const router = curi(history, routes);`}
              </CodeBlock>
            </SideBySide>
          </Subsection>

          <Subsection tag="h5" title="options" id="options">
            <p>
              An optional object with additional properties that can be passed
              to the router.
            </p>
            <ul>
              <li>
                <SideBySide>
                  <Explanation>
                    <p>
                      <IJS>route</IJS> - An array of{" "}
                      <Link to="Guide" params={{ slug: "route-interactions" }}>
                        route interactions
                      </Link>. These are functions for interacting with routes
                      based on their <IJS>name</IJS>.
                    </p>
                    <p>
                      The <IJS>pathname</IJS> interaction is included by
                      default; any other interactions are provided through this
                      array.
                    </p>
                  </Explanation>
                  <CodeBlock>
                    {`import active from "@curi/route-active";
import ancestors from "@curi/route-ancestors";

const routes = [{ name: "Home", path: "" }];

const router = curi(history, routes, {
  route: [active(), ancestors()]
});`}
                  </CodeBlock>
                </SideBySide>
                <SideBySide>
                  <Explanation>
                    <p>
                      Route interactions are called via the router's{" "}
                      <IJS>route</IJS> object.
                    </p>
                  </Explanation>
                  <CodeBlock>
                    {`router.route.active("Home");
// returns true when location.pathname = "/"

router.route.pathname("Home");
// returns "/"`}
                  </CodeBlock>
                </SideBySide>
              </li>
              <li>
                <SideBySide>
                  <Explanation>
                    <p>
                      <IJS>sideEffects</IJS> - An array of{" "}
                      <Link to="Guide" params={{ slug: "side-effects" }}>
                        side effect
                      </Link>{" "}
                      objects.
                    </p>
                    <table>
                      <thead>
                        <tr>
                          <th>property</th>
                          <th>description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>effect</td>
                          <td>
                            An observer that will be called whenever a response
                            is generated.
                          </td>
                        </tr>
                        <tr>
                          <td>after</td>
                          <td>
                            (default <IJS>false</IJS>) controls whether the side
                            effect is called before or after non-side effect
                            observers.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Explanation>
                  <CodeBlock>
                    {`import scrollEffect from "@curi/side-effect-scroll";

const scroll = scrollEffect();
const router = curi(history, routes, {
  sideEffects: [{ effect: scroll, after: true }]
});`}
                  </CodeBlock>
                </SideBySide>
              </li>
              <li>
                <SideBySide>
                  <Explanation>
                    <p>
                      <IJS>emitRedirects</IJS> - When <IJS>false</IJS> (default
                      is <IJS>true</IJS>), response objects with the{" "}
                      <IJS>redirectTo</IJS> property{" "}
                      <strong>will not be emitted</strong> to observers. This
                      can be useful for avoiding an extra render, but should not
                      be used on the server.
                    </p>
                  </Explanation>
                  <CodeBlock>
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
// to "/new/2" without emitting a response`}
                  </CodeBlock>
                </SideBySide>
              </li>
              <li>
                <SideBySide>
                  <Explanation>
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
                      function for creating pathnames, which you can specify
                      with this options.{" "}
                      <strong>
                        You most likely will never need to use this.
                      </strong>
                    </p>
                  </Explanation>
                  <CodeBlock>
                    {`const router = curi(history, routes, {
  pathOptions: {
    encode: (value, token) => { /* ... */ }
  }
});`}
                  </CodeBlock>
                </SideBySide>
              </li>
            </ul>
          </Subsection>
        </Section>

        <Section tag="h4" title="Router Properties" id="properties">
          <p>
            The router has a number of properties for you to use when rendering
            your application.
          </p>
          <Subsection tag="h5" title="navigate(details)" id="navigate">
            <SideBySide>
              <Explanation>
                <p>
                  The <IJS>navigate()</IJS> method is used to navigate
                  programmatically. It takes a <IJS>details</IJS> object with
                  the details of where you want to navigate to as well as the{" "}
                  <IJS>method</IJS> of navigation.
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>property</th>
                      <th>description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>name</td>
                      <td>The name of the route to navigate to</td>
                    </tr>
                    <tr>
                      <td>params</td>
                      <td>
                        An object of any route params for the named route (and
                        any of its ancestors that require params).
                      </td>
                    </tr>
                    <tr>
                      <td>hash</td>
                      <td>The hash string of the location to navigate to.</td>
                    </tr>
                    <tr>
                      <td>query</td>
                      <td>The query value of the location to navigate to.</td>
                    </tr>
                    <tr>
                      <td>state</td>
                      <td>Any serializable state to attach to the location.</td>
                    </tr>
                    <tr>
                      <td>method</td>
                      <td>
                        How to navigate. <IJS>"PUSH"</IJS> appends the new
                        location after the current one. <IJS>"REPLACE"</IJS>{" "}
                        replaces the current location. <IJS>"ANCHOR"</IJS> is
                        the default method and acts like clicking a link. This
                        behavior is a mix of <IJS>"PUSH"</IJS> and{" "}
                        <IJS>"REPLACE"</IJS> where the current location is
                        replaced if the new location has the exact same URL.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Explanation>
              <CodeBlock>
                {`const routes = [
  {
    name: "Album",
    path: "photos/:albumID",
    children: [
      { name: "Photo", path: ":photoID" }
    ]
  },
  // ...
];
const router = curi(history, routes);

router.navigate({
  name: "Photo",
  params: { albumID: 123, photoID: 456 }
});
// navigates to "/photos/123/456"
// using default "ANCHOR" method`}
              </CodeBlock>
            </SideBySide>
          </Subsection>
          <Subsection tag="h5" title="respond(fn, options)" id="respond">
            <SideBySide>
              <Explanation>
                <p>
                  The <IJS>respond()</IJS> method takes an observer function.
                  Whenever a new response is made, the router will call that
                  function. The function will be passed on object with three
                  properties:
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>property</th>
                      <th>description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>response</td>
                      <td>The generated response object.</td>
                    </tr>
                    <tr>
                      <td>navigation</td>
                      <td>
                        The navigation's <IJS>action</IJS> (<IJS>PUSH</IJS>,{" "}
                        <IJS>REPLACE</IJS>, or <IJS>POP</IJS>) and the{" "}
                        <IJS>previous</IJS> response object.
                      </td>
                    </tr>
                    <tr>
                      <td>router</td>
                      <td>The Curi router</td>
                    </tr>
                  </tbody>
                </table>

                <p>
                  When a matched route is async (it has an{" "}
                  <IJS>on.initial()</IJS> or <IJS>on.every()</IJS> function),
                  the router will not call the observer functions until the{" "}
                  <IJS>on</IJS> function(s) have resolved.
                </p>
              </Explanation>
              <CodeBlock>
                {`router.respond(({ response }) => {
  // render the application based on the response
});`}
              </CodeBlock>
            </SideBySide>
            <Subsection tag="h6" title="options" id="respond-options">
              <SideBySide>
                <Explanation>
                  <table>
                    <thead>
                      <tr>
                        <th>option</th>
                        <th>default</th>
                        <th>description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>observe</td>
                        <td>false</td>
                        <td>
                          When true, the function will be called for all future
                          responses that are emitted by the router (until it
                          stops observing) When false, the function will only be
                          called one time.
                        </td>
                      </tr>
                      <tr>
                        <td>initial</td>
                        <td>true</td>
                        <td>
                          When true, the function will be called immediately if
                          a response exists. When false, the response function
                          will not be called until the next response is emitted.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Explanation>
                <CodeBlock>
                  {`router.respond(responseHandler, {
                    observe: true
                  });`}
                </CodeBlock>
              </SideBySide>
              <SideBySide>
                <Explanation>
                  <p>
                    <IJS>respond()</IJS> returns a function to stop calling the
                    observer function. This function is only returned when{" "}
                    <IJS>router.respond()</IJS> is given the{" "}
                    <IJS>observe: true</IJS> option.
                  </p>
                </Explanation>
                <CodeBlock>
                  {`const stopObserving = router.respond(
  () => {...},
  { observe: true }
);
// the router will now call the observer for all responses

stopObserving();
// the router no longer calls the observer`}
                </CodeBlock>
              </SideBySide>
            </Subsection>
          </Subsection>

          <Subsection tag="h5" title="current()" id="current-property">
            <SideBySide>
              <Explanation>
                <p>
                  The <IJS>router.current()</IJS> method returns the current{" "}
                  <IJS>response</IJS> and <IJS>navigation</IJS> objects.
                </p>
                <Note>
                  If you call <IJS>router.current()</IJS> before the initial
                  response has been emitted, the <IJS>response</IJS> and{" "}
                  <IJS>navigation</IJS> properties will be <IJS>null</IJS>.
                </Note>
              </Explanation>
              <CodeBlock>
                {`const router = curi(history, routes);
const tooSoon = router.current();
// tooSoon.response === null
// tooSoon.navigation === null

router.respond(({ response, navigation }) => {
  const perfect = router.current();
  // perfect.response === response
  // perfect.navigation === navigation
});`}
              </CodeBlock>
            </SideBySide>
          </Subsection>

          <Subsection tag="h5" title="route" id="router-route">
            <SideBySide>
              <Explanation>
                <p>
                  The router's{" "}
                  <Link to="Guide" params={{ slug: "route-interactions" }}>
                    route interactions
                  </Link>{" "}
                  are accessed through the <IJS>route</IJS> property. These are
                  used to interact with routes using their names.
                </p>
              </Explanation>
            </SideBySide>
            <Subsection tag="h6" title="pathname" id="pathname-interaction">
              <SideBySide>
                <Explanation>
                  <p>
                    Curi includes one built-in interaction, <IJS>pathname</IJS>,
                    which generates location pathnames using the name of a route
                    and an optional object containing any necessary params.
                  </p>
                </Explanation>
                <CodeBlock>
                  {`const routes = [
  { name: 'User', path: 'user/:id' }
];
const router = curi(history, routes);
const userPathname = router.route.pathname(
  'User',
  { id: '12345' }
);
// userPathname === '/user/12345'`}
                </CodeBlock>
              </SideBySide>
            </Subsection>
          </Subsection>

          <Subsection tag="h5" title="history" id="history-property">
            <SideBySide>
              <Explanation>
                <p>
                  The route's history object, in case you need to interact
                  directly with that.
                </p>
              </Explanation>
            </SideBySide>
          </Subsection>
        </Section>
      </Section>
    </APIBlock>
  </BasePackage>
);
