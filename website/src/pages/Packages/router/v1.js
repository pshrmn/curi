import React from "react";
import { Link } from "@curi/react-dom";

import APIBlock from "../../../components/package/APIBlock";
import About from "../../../components/package/About";
import { InlineJS as IJS } from "../../../components/highlight/Inline";
import { Section } from "../../../components/layout/Sections";
import { CodeBlock, Explanation } from "../../../components/layout/Groups";
import { Note, Warning } from "../../../components/Messages";
import ScrollableTable from "../../../components/layout/ScrollableTable";

export default class RouterPkg extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <About>
          <Explanation>
            <p>
              The <IJS>@curi/router</IJS> package is used to create a router.
            </p>
          </Explanation>
        </About>
        <APIBlock>
          <Section title="curi" id="curi">
            <Explanation>
              <p>
                The <IJS>curi</IJS> export is a function to create a router. It
                has two required arguments: a <IJS>history</IJS> object and a{" "}
                <IJS>routes</IJS> array, and an optional third argument: an{" "}
                <IJS>options</IJS> object.
              </p>
            </Explanation>
            <CodeBlock>
              {`import { curi } from '@curi/router';

const router = curi(history, routes, options);`}
            </CodeBlock>

            <Section tag="h4" title="Arguments" id="arguments">
              <Section tag="h5" title="history" id="history">
                <Explanation>
                  <p>
                    A <a href="https://github.com/pshrmn/hickory">Hickory</a>{" "}
                    history object that will power navigation within the
                    application. The{" "}
                    <Link
                      name="Guide"
                      params={{ slug: "getting-started" }}
                      hash="history-object"
                    >
                      getting started guide
                    </Link>{" "}
                    provides more information on how to choose which history
                    type is right for an application.
                  </p>
                </Explanation>
                <CodeBlock lang="jsx">
                  {`import Browser from "@hickory/browser";

const history = Browser();
const router = curi(history, routes);`}
                </CodeBlock>
              </Section>

              <Section tag="h5" title="routes" id="routes">
                <Explanation>
                  <p>
                    An array of prepared{" "}
                    <Link name="Guide" params={{ slug: "routes" }}>
                      route
                    </Link>{" "}
                    objects describing all valid routes in the application.
                  </p>
                </Explanation>
                <CodeBlock lang="jsx">
                  {`const routes = prepareRoutes([
  { name: "Home", path: "" },
  { name: "About", path: "about" }
]);

const router = curi(history, routes);`}
                </CodeBlock>
              </Section>

              <Section tag="h5" title="options" id="options">
                <p>
                  An optional object with additional properties that can be
                  passed to the router.
                </p>
                <ul>
                  <li>
                    <Explanation>
                      <p>
                        <IJS>route</IJS> - An array of{" "}
                        <Link
                          name="Guide"
                          params={{ slug: "route-interactions" }}
                        >
                          route interactions
                        </Link>. These are functions for interacting with routes
                        based on their <IJS>name</IJS>.
                      </p>
                      <p>
                        The <IJS>pathname</IJS> interaction is included by
                        default; any other interactions are provided through
                        this array.
                      </p>
                    </Explanation>
                    <CodeBlock>
                      {`import active from "@curi/route-active";
import ancestors from "@curi/route-ancestors";

const routes = prepareRoutes([{ name: "Home", path: "" }]);

const router = curi(history, routes, {
  route: [active(), ancestors()]
});`}
                    </CodeBlock>

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
                  </li>
                  <li>
                    <Explanation>
                      <p>
                        <IJS>sideEffects</IJS> - An array of{" "}
                        <Link name="Guide" params={{ slug: "side-effects" }}>
                          side effect
                        </Link>{" "}
                        objects.
                      </p>
                      <ScrollableTable>
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
                              An observer that will be called whenever a
                              response is generated.
                            </td>
                          </tr>
                          <tr>
                            <td>after</td>
                            <td>
                              (default <IJS>false</IJS>) controls whether the
                              side effect is called before or after non-side
                              effect observers.
                            </td>
                          </tr>
                        </tbody>
                      </ScrollableTable>
                    </Explanation>
                    <CodeBlock>
                      {`import scroll from "@curi/side-effect-scroll";

const router = curi(history, routes, {
  sideEffects: [scroll()]
});`}
                    </CodeBlock>
                  </li>
                  <li>
                    <Explanation>
                      <p>
                        <IJS>external</IJS> - Values that should be accessible
                        to a route's <IJS>resolve</IJS> functions and{" "}
                        <IJS>response()</IJS> function.
                      </p>
                      <p>
                        Using <IJS>external</IJS> allows you to access APIs,
                        data, etc. without having to be able to import it in the
                        module where the routes are defined.
                      </p>
                    </Explanation>
                    <CodeBlock>
                      {`const client = new ApolloClient();
const router = curi(history, routes, {
  external: { client, greeting: "Hi!" }
});`}
                    </CodeBlock>
                    <CodeBlock>
                      {`const routes = prepareRoutes([
  {
    name: "User",
    path: "user/:id",
    resolve: {
      data(match, external) {
        // use the external object to make a query
        return external.client.query()
      }
    }
  }
]);`}
                    </CodeBlock>
                  </li>
                  <li>
                    <Explanation>
                      <p>
                        <IJS>emitRedirects</IJS> - When <IJS>false</IJS>{" "}
                        (default is <IJS>true</IJS>), response objects with the{" "}
                        <IJS>redirectTo</IJS> property{" "}
                        <strong>will not be emitted</strong> to observers. This
                        can be useful for avoiding an extra render, but should
                        not be used on the server.
                      </p>
                    </Explanation>
                    <CodeBlock>
                      {`const routes = prepareRoutes([
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
]);

const router = curi(history, routes, {
  emitRedirects: false                 
});
// navigating to "/old/2" will automatically redirect
// to "/new/2" without emitting a response`}
                    </CodeBlock>
                  </li>
                  <li>
                    <Explanation>
                      <p>
                        <IJS>automaticRedirects</IJS> - When the initially
                        matched route is synchronous and redirects, the router's
                        automatic redirect will occur before any response
                        handlers (registered with <IJS>once()</IJS> or{" "}
                        <IJS>observe()</IJS>) are called. This means that they
                        will be called with the response for the location that
                        was redirected to instead of the initial location. This
                        is fine on the client side, but causes issues with
                        server side rendering. When{" "}
                        <IJS>automaticRedirects</IJS> is <IJS>false</IJS>, the
                        automatic redirect will not happen.{" "}
                        <strong>
                          Using <IJS>automaticRedirects = false</IJS> is
                          recommend for server side rendering.
                        </strong>
                      </p>
                    </Explanation>
                    <CodeBlock>
                      {`const routes = prepareRoutes([
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
]);
const history = InMemory({ locations: ["old/1" ]});
const router = curi(history, routes, {
  automaticRedirects: false                 
});
router.once(({ response }) => {
  // response = { name: "Old", ... }
});`}
                    </CodeBlock>
                  </li>
                  <li>
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
                  </li>
                </ul>
              </Section>
            </Section>

            <Section tag="h4" title="Router Properties" id="properties">
              <p>
                The router has a number of properties for you to use when
                rendering your application.
              </p>
              <Section tag="h5" title="navigate(details)" id="navigate">
                <Explanation>
                  <p>
                    The <IJS>navigate()</IJS> method is used to navigate
                    programmatically. It takes a <IJS>details</IJS> object with
                    the details of where you want to navigate to as well as the{" "}
                    <IJS>method</IJS> of navigation.
                  </p>
                  <ScrollableTable>
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
                        <td>
                          Any serializable state to attach to the location.
                        </td>
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
                      <tr>
                        <td>finished</td>
                        <td>
                          A function to call once the navigation has finished.
                        </td>
                      </tr>
                      <tr>
                        <td>cancelled</td>
                        <td>
                          A function to call if the navigation is superseded by
                          another navigation.
                        </td>
                      </tr>
                    </tbody>
                  </ScrollableTable>
                </Explanation>
                <CodeBlock>
                  {`const routes = prepareRoutes([
  {
    name: "Album",
    path: "photos/:albumID",
    children: [
      { name: "Photo", path: ":photoID" }
    ]
  },
  // ...
]);
const router = curi(history, routes);

router.navigate({
  name: "Photo",
  params: { albumID: 123, photoID: 456 }
});
// navigates to "/photos/123/456"
// using default "ANCHOR" method`}
                </CodeBlock>
              </Section>
              <Section tag="h5" title="once(fn, options)" id="once">
                <Explanation>
                  <p>
                    The <IJS>once()</IJS> method takes a response handler
                    function. If a response already exists, the function will be
                    called immediately. Otherwise, the function will be called
                    once a new response is created. The{" "}
                    <IJS>{`\{ initial: false \}`}</IJS> option can be used to
                    prevent an immediate call even if a response already exists.
                  </p>
                  <ScrollableTable>
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
                  </ScrollableTable>

                  <p>
                    When a matched route is async (it has <IJS>resolve</IJS>{" "}
                    functions), a response will not be created until the async
                    function(s) have resolved.
                  </p>
                </Explanation>
                <CodeBlock>
                  {`router.once(({ response }) => {
  // render the application based on the response
});`}
                </CodeBlock>

                <Section tag="h6" title="options" id="once-options">
                  <Explanation>
                    <div style={{ overflowX: "scroll" }}>
                      <ScrollableTable>
                        <thead>
                          <tr>
                            <th>option</th>
                            <th>default</th>
                            <th>description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>initial</td>
                            <td>true</td>
                            <td>
                              When true, the function will be called immediately
                              if a response exists. When false, the response
                              function will not be called until the next
                              response is emitted.
                            </td>
                          </tr>
                        </tbody>
                      </ScrollableTable>
                    </div>
                  </Explanation>
                  <CodeBlock>
                    {`router.once(responseHandler, {
  initial: false
});`}
                  </CodeBlock>
                </Section>
              </Section>
              <Section tag="h5" title="observe(fn, options)" id="observe">
                <Explanation>
                  <p>
                    The <IJS>observe()</IJS> method takes a response handler
                    function. The response handler will be called every time a
                    new response is emitted (and it a response already exists,
                    the function will be called immediately). The{" "}
                    <IJS>{`\{ initial: false \}`}</IJS> option can be used to
                    prevent an immediate call even if a response already exists.
                  </p>
                  <ScrollableTable>
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
                  </ScrollableTable>

                  <p>
                    When a matched route is async (it has <IJS>resolve</IJS>{" "}
                    functions), a response will not be created until the async
                    function(s) have resolved.
                  </p>
                </Explanation>
                <CodeBlock>
                  {`router.observe(({ response }) => {
  // render the application based on the response
});`}
                </CodeBlock>

                <Section tag="h6" title="options" id="observe-options">
                  <Explanation>
                    <div style={{ overflowX: "scroll" }}>
                      <ScrollableTable>
                        <thead>
                          <tr>
                            <th>option</th>
                            <th>default</th>
                            <th>description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>initial</td>
                            <td>true</td>
                            <td>
                              When true, the function will be called immediately
                              if a response exists. When false, the response
                              function will not be called until the next
                              response is emitted.
                            </td>
                          </tr>
                        </tbody>
                      </ScrollableTable>
                    </div>
                  </Explanation>
                  <CodeBlock>
                    {`router.observe(responseHandler, {
  initial: false
});`}
                  </CodeBlock>

                  <Explanation>
                    <p>
                      <IJS>observe()</IJS> returns a function to stop calling
                      the response handler function for new responses.
                    </p>
                  </Explanation>
                  <CodeBlock>
                    {`const stopObserving = router.observe(
  () => {...}
);
// the router will now call the observer for all responses

stopObserving();
// the router no longer calls the observer`}
                  </CodeBlock>
                </Section>
              </Section>

              <Section tag="h5" title="cancel(fn)" id="cancel-property">
                <Explanation>
                  <p>
                    With asynchronous routes, after a user begins navigation,
                    but before the route's asynchronous actions have finished,
                    the user does not have a good way to cancel the navigation.
                    They can either refresh the page (causing a full reload) or
                    click a link with the same URL as the current location, but
                    neither of these are intuitive or ideal.
                  </p>
                  <p>
                    <IJS>cancel()</IJS> takes an observer function that will be
                    called when navigation starts and when the navigation is
                    finished. When the navigation starts, the observer function
                    will be given a function to cancel the navigation. When the
                    navigation finishes, the function will be called with{" "}
                    <IJS>undefined</IJS>.
                  </p>
                  <p>
                    Calling <IJS>cancel()</IJS> returns a function to stop
                    observing.
                  </p>
                </Explanation>
                <CodeBlock>
                  {`const stopCancelling = router.cancel(fn => {
  if (fn === undefined) {
    // the navigation has finished/been cancelled
  } else {
    // calling fn will cancel the navigation
  }
});`}
                </CodeBlock>
              </Section>

              <Section tag="h5" title="current()" id="current-property">
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

router.once(({ response, navigation }) => {
  const perfect = router.current();
  // perfect.response === response
  // perfect.navigation === navigation
});`}
                </CodeBlock>
              </Section>

              <Section tag="h5" title="route" id="router-route">
                <Explanation>
                  <p>
                    The router's{" "}
                    <Link name="Guide" params={{ slug: "route-interactions" }}>
                      route interactions
                    </Link>{" "}
                    are accessed through the <IJS>route</IJS> property. These
                    are used to interact with routes using their names.
                  </p>
                </Explanation>

                <Section tag="h6" title="pathname" id="pathname-interaction">
                  <Explanation>
                    <p>
                      Curi includes one built-in interaction,{" "}
                      <IJS>pathname</IJS>, which generates location pathnames
                      using the name of a route and an optional object
                      containing any necessary params.
                    </p>
                  </Explanation>
                  <CodeBlock>
                    {`const routes = prepareRoutes([
  { name: 'User', path: 'user/:id' }
]);
const router = curi(history, routes);
const userPathname = router.route.pathname(
  'User',
  { id: '12345' }
);
// userPathname === '/user/12345'`}
                  </CodeBlock>
                </Section>
              </Section>

              <Section tag="h5" title="refresh()" id="refresh-property">
                <Explanation>
                  <p>
                    The <IJS>refresh()</IJS> function takes an array of new
                    routes, which will replace the existing routes. The router
                    will emit a new response based on the current location.
                  </p>
                  <p>
                    The function can be called without any arguments and it will
                    emit a response using the existing routes.
                  </p>
                </Explanation>
                <CodeBlock>
                  {`const oldRoutes = prepareRoutes([...]);
const newRoutes = prepareRoutes([...]);

const router = curi(history, oldRoutes);
// generates responses using old routes

router.refresh(newRoutes);
// generates responses using new routes`}
                </CodeBlock>
              </Section>

              <Section tag="h5" title="history" id="history-property">
                <Explanation>
                  <p>
                    The route's history object, in case you need to interact
                    directly with that.
                  </p>
                </Explanation>
              </Section>
            </Section>
          </Section>

          <Section title="prepareRoutes" id="prepareRoutes">
            <Explanation>
              <p>
                The <IJS>prepareRoutes()</IJS> export is used to build the
                routes for Curi. This will pre-compile paths for location
                matching and pathname building, which is particularly useful for
                server rendering.
              </p>
            </Explanation>
            <CodeBlock>
              {`import { prepareRoutes } from '@curi/router';

const routes = prepareRoutes([
  { name: "Home", path: "" },
  // ...
  { name: "Not Found", path: "(.*)" }
]);`}
            </CodeBlock>
            <Explanation>
              <Warning>
                Passing a non-prepared routes array to <IJS>curi()</IJS> is
                still supported, but deprecated and will be removed in the next
                major version.
              </Warning>
            </Explanation>
          </Section>

          <Section title="Route properties" id="route-properties">
            <Section title="route.name" id="name" tag="h3">
              <Explanation>
                <p>A string, this must be unique for every route.</p>
              </Explanation>
              <CodeBlock>
                {`[
  { name: 'Home' },
  { name: 'Album' },
  { name: 'Not Found' }
];`}
              </CodeBlock>
            </Section>

            <Section title="route.path" id="path" tag="h3">
              <Explanation>
                <p>
                  A string pattern describing what the route matches. Whenever
                  the router receives a new location, it will loop through the
                  known route paths to determine which one matches the new
                  location's <IJS>pathname</IJS> the best.
                </p>
                <p>
                  Curi uses
                  <a href="https://github.com/pillarjs/path-to-regexp#parameters">
                    <IJS>path-to-regexp</IJS>
                  </a>{" "}
                  for paths, which enables routes to have
                  <a href="https://github.com/pillarjs/path-to-regexp#parameters">
                    path parameters
                  </a>. When a route with parameters matches a location, the
                  parameters will be be parsed from the location's{" "}
                  <IJS>pathname</IJS>.
                </p>
                <p>
                  <IJS>path</IJS> strings should <strong>not</strong> have a
                  leading slash.
                </p>
                <Warning>
                  <IJS>path-to-regexp</IJS> supports arrays and RegExps, but
                  Curi only supports string paths. This is because Curi uses{" "}
                  <IJS>path-to-regexp</IJS> to generate pathnames from a route's
                  name, which it can only do from strings paths.
                </Warning>
              </Explanation>
              <CodeBlock>
                {`[
  { name: 'Home', path: '' },
  // when the pathname is a/yo, albumID = "yo"
  { name: 'Album', path: 'a/:albumID' },
  // the path (.*) matches every pathname
  { name: 'Not Found', path: '(.*)' }
];

// don't include a leading forward slash
// { name: 'Home', path: '/' }`}
              </CodeBlock>
            </Section>

            <Section title="route.resolve" id="resolve" tag="h3">
              <Explanation>
                <p>
                  The <IJS>resolve</IJS> object groups async functions that will
                  be called when the route matches.
                </p>
                <p>
                  A route with any <IJS>resolve</IJS> functions is asynchronous,
                  while one with no <IJS>resolve</IJS> functions is synchronous.
                  You can read more about this is the{" "}
                  <Link name="Guide" params={{ slug: "sync-or-async" }}>
                    sync or async
                  </Link>{" "}
                  guide.
                </p>
                <p>
                  <IJS>resolve</IJS> functions are called every time that a
                  route matches the current location.
                </p>
                <p>
                  <IJS>resolve</IJS> functions will be passed an object with the
                  matched route properties: <IJS>name</IJS>, <IJS>params</IJS>,{" "}
                  <IJS>partials</IJS>, and <IJS>location</IJS>.
                </p>
                <Note>
                  You should not perform side effects (e.g. passing the loaded
                  data to a Redux store) in <IJS>resolve</IJS> functions because
                  it is possible that navigating to the route might be
                  cancelled. If you must perform side effects for a route, you
                  should do so in <IJS>response()</IJS>.
                </Note>
              </Explanation>
              <CodeBlock>
                {`const about = {
  name: 'About',
  path: 'about',
  resolve: {
    body: () => import('./components/About'),
    data: () => fetch('/api/about')
  }
};`}
              </CodeBlock>
            </Section>
            <Section title="route.response()" id="response">
              <Explanation>
                <p>
                  A function for modifying the response object. This returns an
                  object whose properties will be merged with the matched route
                  properties to create the "final" response.
                </p>
                <p>
                  Only valid properties will be merged onto the response;
                  everything else will be ignored. The valid properties are:
                </p>
              </Explanation>

              <ol>
                <li>
                  <Explanation>
                    <p>
                      <IJS>body</IJS> - This is usually what you will render.
                    </p>
                  </Explanation>
                  <CodeBlock>
                    {`import Home from "./components/Home";
const routes = prepareRoutes([
  {
    name: "Home",
    path: "",
    response() {
      return { body: Home };
    }
  },
  // ...
]);
// response = { body: Home, ... }`}
                  </CodeBlock>
                </li>
                <li>
                  <Explanation>
                    <p>
                      <IJS>status</IJS> - A number. This is useful for redirects
                      or locations caught by your catch-all route while using
                      server-side rendering. The default status value is{" "}
                      <IJS>200</IJS>.
                    </p>
                  </Explanation>
                  <CodeBlock>
                    {`{
  response(){
    return {
      status: 301,
      redirectTo: {...}
    };
  }
}
// response = { status: 301, ... }`}
                  </CodeBlock>
                </li>
                <li>
                  <Explanation>
                    <p>
                      <IJS>error</IJS> - If an error occurs with the route's{" "}
                      <IJS>resolve</IJS> methods, you might want to attach an
                      error message to the response.
                    </p>
                  </Explanation>
                  <CodeBlock>
                    {`{
  resolve: {
    test: () => Promise.reject("woops!")
  },
  response({ error }) {
    return { error };
  }
}
// response = { error: "woops!", ... }`}
                  </CodeBlock>
                </li>
                <li>
                  <Explanation>
                    <p>
                      <IJS>data</IJS> - Anything you want it to be.
                    </p>
                  </Explanation>
                  <CodeBlock>
                    {`{
  response() {
    return { data: Math.random() };
  }
}
// response = { data: 0.8651606708109429, ... }`}
                  </CodeBlock>
                </li>
                <li>
                  <Explanation>
                    <p>
                      <IJS>title</IJS> - This can be used with{" "}
                      <IJS>@curi/side-effect-title</IJS> to update the page's{" "}
                      <IJS>document.title</IJS>.
                    </p>
                  </Explanation>
                  <CodeBlock>
                    {`{
  response({ params }) {
    return { title: \`User \${params.id}\` };
  }
}
// when visting /user/2
// response = { title: "User 2", ... }`}
                  </CodeBlock>
                </li>
                <li>
                  <Explanation>
                    <p>
                      <IJS>redirectTo</IJS> - An object with the <IJS>name</IJS>{" "}
                      of the route to redirect to, <IJS>params</IJS> (if
                      required), and optional <IJS>hash</IJS>, <IJS>query</IJS>,
                      and <IJS>state</IJS> properties.
                    </p>
                    <p>
                      The other values are copied directly, but{" "}
                      <IJS>redirectTo</IJS> will be turned into a location
                      object using the object's <IJS>name</IJS> (and{" "}
                      <IJS>params</IJS> if required).
                    </p>
                  </Explanation>
                  <CodeBlock>
                    {`[
  {
    name: "Old Photo",
    path: "photo/:id",
    response({ params }) {
      return {
        redirectTo: { name: "Photo", params }
      };
    }
  },
  {
    name: "New Photo",
    path: "p/:id"
  }
]
// when the user navigates to /photo/1:
// response = { redirectTo: { pathname: "/p/1", ... } }`}
                  </CodeBlock>
                </li>
              </ol>

              <Explanation>
                <p>
                  This function is passed an object with a number of properties
                  that can be useful for modifying the response.
                </p>
              </Explanation>
              <CodeBlock>
                {`{
  response: ({ match, resolved }) => {
    // ...
  }
}`}
              </CodeBlock>

              <ul>
                <Section
                  wrapper="li"
                  title="match"
                  id="response-match"
                  tag="h3"
                >
                  <Explanation>
                    <p>
                      An object with the matched route properties of a response.
                    </p>
                    <ScrollableTable>
                      <thead>
                        <tr>
                          <th>property</th>
                          <th>description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>name</td>
                          <td>the name of the matched route</td>
                        </tr>
                        <tr>
                          <td>params</td>
                          <td>route parameters parsed from the location</td>
                        </tr>
                        <tr>
                          <td>partials</td>
                          <td>
                            the names of any ancestor routes of the matched
                            route
                          </td>
                        </tr>
                        <tr>
                          <td>location</td>
                          <td>the location that was used to match the route</td>
                        </tr>
                        <tr>
                          <td>key</td>
                          <td>
                            the location's <IJS>key</IJS>, which is a unique
                            identifier
                          </td>
                        </tr>
                      </tbody>
                    </ScrollableTable>
                  </Explanation>
                </Section>

                <Section
                  wrapper="li"
                  title="resolved"
                  id="response-resolved"
                  tag="h3"
                >
                  <Explanation>
                    <p>
                      <IJS>resolved</IJS> is an object with the values resolved
                      by the <IJS>resolve</IJS> functions.
                    </p>
                    <p>
                      If a route isn't async, <IJS>resolved</IJS> will be{" "}
                      <IJS>null</IJS>.
                    </p>
                  </Explanation>
                  <CodeBlock>
                    {`// attach resolved data to the response
const user = {
  name: 'User',
  path: ':id',
  resolve: {
    data: ({ params, location }) => (
      fetch(\`/api/users/$\{params.id\}\`)
        .then(resp => JSON.parse(resp))
    ),
  },
  response: ({ resolved }) => {
    return {
      data: resolved.data
    };
  }
}`}
                  </CodeBlock>
                </Section>

                <Section
                  wrapper="li"
                  title="error"
                  id="response-error"
                  tag="h3"
                >
                  <Explanation>
                    <p>
                      <IJS>error</IJS> is an error thrown by one of the route's{" "}
                      <IJS>resolve</IJS> functions.
                    </p>
                  </Explanation>
                  <CodeBlock>
                    {`// check if any of a route's resolve functions threw
const user = {
  name: 'User',
  path: ':id',
  resolve: {
    data: ({ params, location }) => (
      fetch(\`/api/users/$\{params.id\}\`)
        .then(resp => JSON.parse(resp))
    ),
  },
  response: ({ error, resolved }) => {
    if (error) {
      return { error };
    }
    return {
      data: resolved.data
    };
  }
}`}
                  </CodeBlock>
                </Section>
              </ul>
            </Section>

            <Section title="children" id="children" tag="h3">
              <Explanation>
                <p>
                  An optional array of route objects for creating nested routes.
                  Any child routes will be matched relative to their parent
                  route's <IJS>path</IJS>. This means that if a parent route's{" "}
                  <IJS>path</IJS> string is <IJS>'one'</IJS> and a child route's{" "}
                  <IJS>path</IJS> string is <IJS>'two'</IJS>, the child will
                  match when the pathname is <IJS>'one/two'</IJS>.
                </p>
              </Explanation>
              <CodeBlock>
                {`// '/a/Coloring+Book/All+Night' will be matched
// by the "Song" route, with the params
// { album: 'Coloring+Book', title: 'All+Night' }
{
  name: 'Album',
  path: 'a/:album',
  children: [
    {
      name: 'Song',
      path: ':title'
    }
  ]
}`}
              </CodeBlock>
            </Section>

            <Section title="params" id="params" tag="h3">
              <Explanation>
                <p>
                  When <IJS>path-to-regexp</IJS> matches your paths, all
                  parameters are extracted as strings. If you prefer for some
                  route params to be other types, you can provide functions to
                  transform params using the <IJS>route.params</IJS> object.
                </p>
                <p>
                  Properties of the <IJS>route.params</IJS> object are the names
                  of params to be parsed. The paired value should be a function
                  that takes a string (the value from the <IJS>pathname</IJS>)
                  and returns a new value (transformed using the function you
                  provide).
                </p>
              </Explanation>
              <CodeBlock>
                {`const routes = prepareRoutes([
  {
    name: 'Number',
    path: 'number/:num',
    params: {
      num: n => parseInt(n, 10)
    }
  }
]);

// when the user visits /number/1,
// response.params will be { num: 1 }
// instead of { num: "1" }`}
              </CodeBlock>
            </Section>

            <Section title="pathOptions" id="pathOptions" tag="h3">
              <Explanation>
                <p>
                  If you need to provide different path options than{" "}
                  <a href="https://github.com/pillarjs/path-to-regexp#usage">
                    the defaults
                  </a>{" "}
                  used by <IJS>path-to-regexp</IJS>, you can provide them with a{" "}
                  <IJS>pathOptions</IJS> object.
                </p>
                <Note>
                  If a route has a children array property, it will{" "}
                  <strong>always</strong> have the <IJS>end</IJS> path option
                  set to false.
                </Note>
              </Explanation>
            </Section>

            <Section title="extra" id="extra" tag="h3">
              <Explanation>
                <p>
                  If you have any additional properties that you want attached
                  to a route, use the <IJS>extra</IJS> property. You will be
                  able to use <IJS>route.extra</IJS> in any custom route
                  interactions.
                </p>
              </Explanation>
              <CodeBlock>
                {`const routes = prepareRoutes([
  {
    name: 'A Route',
    path: 'a-route',
    extra: {
      transition: 'fade'
    }
  },
  {
    name: 'B Route',
    path: 'b-route',
    extra: {
      enter: 'slide-right'
    }
  }
]);`}
              </CodeBlock>
            </Section>
          </Section>
        </APIBlock>
      </React.Fragment>
    );
  }
}
