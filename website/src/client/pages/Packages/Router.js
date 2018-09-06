import React from "react";
import { Link } from "@curi/react-dom";

import BasePackage from "./base/BasePackage";
import APIBlock from "./base/APIBlock";
import { InlineJS as IJS } from "../../components/PrismBlocks";
import { Section, Subsection } from "../../components/Sections";
import {
  SideBySide,
  CodeBlock,
  Explanation
} from "../../components/SideBySide";
import { Note, Warning } from "../../components/Messages";

export default ({ name, version, globalName }) => (
  <BasePackage
    name={name}
    version={version}
    globalName={globalName}
    about={
      <p>
        The <IJS>@curi/router</IJS> package is used to create a router.
      </p>
    }
  >
    <APIBlock>
      <Section title="curi" id="curi">
        <SideBySide>
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
                    params={{ slug: "creating-a-router" }}
                    hash="history-object"
                  >
                    Creating a Router guide
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
                    {`import scroll from "@curi/side-effect-scroll";

const router = curi(history, routes, {
  sideEffects: [scroll()]
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
          <Subsection tag="h5" title="once(fn, options)" id="once">
            <SideBySide>
              <Explanation>
                <p>
                  The <IJS>once()</IJS> method takes a response handler
                  function. If a response already exists, the function will be
                  called immediately. Otherwise, the function will be called
                  once a new response is created. The{" "}
                  <IJS>{`\{ initial: false \}`}</IJS> option can be used to
                  prevent an immediate call even if a response already exists.
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
            </SideBySide>
            <Subsection tag="h6" title="options" id="once-options">
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
                  {`router.once(responseHandler, {
  initial: false
});`}
                </CodeBlock>
              </SideBySide>
            </Subsection>
          </Subsection>
          <Subsection tag="h5" title="observe(fn, options)" id="observe">
            <SideBySide>
              <Explanation>
                <p>
                  The <IJS>observe()</IJS> method takes a response handler
                  function. The response handler will be called every time a new
                  response is emitted (and it a response already exists, the
                  function will be called immediately). The{" "}
                  <IJS>{`\{ initial: false \}`}</IJS> option can be used to
                  prevent an immediate call even if a response already exists.
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
            </SideBySide>
            <Subsection tag="h6" title="options" id="observe-options">
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
                  {`router.observe(responseHandler, {
  initial: false
});`}
                </CodeBlock>
              </SideBySide>
              <SideBySide>
                <Explanation>
                  <p>
                    <IJS>observe()</IJS> returns a function to stop calling the
                    response handler function for new responses.
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

router.once(({ response, navigation }) => {
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

          <Subsection tag="h5" title="refresh()" id="refresh-property">
            <SideBySide>
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
                {`const oldRoutes = [...];
const newRoutes = [...];

const router = curi(history, oldRoutes);
// generates responses using old routes

router.refresh(newRoutes);
// generates responses using new routes`}
              </CodeBlock>
            </SideBySide>
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
      <Section title="once" id="once">
        <SideBySide>
          <Explanation>
            <p>
              <IJS>once</IJS> takes a function as its argument and returns a new
              function. The first time the returned function is called, it will
              call the function passed to <IJS>once()</IJS>. Every call after
              that will re-use the result from the first call.
            </p>
            <p>
              The <IJS>once()</IJS> function is useful for any async route{" "}
              <IJS>resolve</IJS> functions that only need to be called once.
            </p>
            <Note>
              This will not work for functions whose result depends on variables
              that will change for a route (i.e. loading data based on route
              params).
            </Note>
          </Explanation>
          <CodeBlock>
            {`import { once } from "@curi/router";
            
const routes = [
  {
    name: "Menu",
    path: "menu",
    resolve: {
      // this function will be called every time the user
      // navigates to the "Menu" route
      nonCached: () => api.getItems(),
      // this function is only called the first time the
      // user navigates to the "Menu" route
      cached: once(() => api.getItems)
    }
  }
];`}
          </CodeBlock>
        </SideBySide>
      </Section>
      <Section title="pathname" id="pathname">
        <SideBySide>
          <Explanation>
            <p>
              Curi automatically includes a <IJS>pathname</IJS> route
              interaction for you to generate URL pathnames for routes. If you
              need to access this same ability outside of a router, you can
              import the <IJS>pathname</IJS> route interaction.
            </p>
          </Explanation>
          <CodeBlock>
            {`import { pathname } from "@curi/router";

const pathnameGenerator = pathname();
// register routes
pathnameGenerator.register({ name: "Yo", path: "yo/:name" });
// generate pathname
const path = pathnameGenerator.get("Yo", { name: "joey" })
// path = "/yo/joey"`}
          </CodeBlock>
        </SideBySide>
      </Section>
      <Section title="Route properties" id="route-properties">
        <Subsection title="route.name" id="name">
          <SideBySide>
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
          </SideBySide>
        </Subsection>

        <Subsection title="route.path" id="path">
          <SideBySide>
            <Explanation>
              <p>
                A string pattern describing what the route matches. Whenever the
                router receives a new location, it will loop through the known
                route paths to determine which one matches the new location's{" "}
                <IJS>pathname</IJS> the best.
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
                <IJS>path-to-regexp</IJS> supports arrays and RegExps, but Curi
                only supports string paths. This is because Curi uses{" "}
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
          </SideBySide>
        </Subsection>

        <Subsection title="route.resolve" id="resolve">
          <SideBySide>
            <Explanation>
              <p>
                The <IJS>resolve</IJS> object groups async functions that will
                be called when the route matches.
              </p>
              <p>
                A route with any <IJS>resolve</IJS> functions is asynchronous,
                while one with no <IJS>resolve</IJS> functions is synchronous.
                You can read more about this is the{" "}
                <Link to="Guide" params={{ slug: "sync-or-async" }}>
                  sync or async
                </Link>{" "}
                guide.
              </p>
              <p>
                <IJS>resolve</IJS> functions are called every time that a route
                matches the current location.
              </p>
              <p>
                <IJS>resolve</IJS> functions will be passed an object with the
                matched route properties: <IJS>name</IJS>, <IJS>params</IJS>,{" "}
                <IJS>partials</IJS>, and <IJS>location</IJS>.
              </p>
              <Note>
                You should not perform side effects (e.g. passing the loaded
                data to a Redux store) in <IJS>resolve</IJS> functions because
                it is possible that navigating to the route might be cancelled.
                If you must perform side effects for a route, you should do so
                in <IJS>response()</IJS>.
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
          </SideBySide>
        </Subsection>
        <Subsection title="route.response()" id="response">
          <SideBySide>
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
          </SideBySide>
          <ol>
            <li>
              <SideBySide>
                <Explanation>
                  <p>
                    <IJS>body</IJS> - This is usually what you will render.
                  </p>
                </Explanation>
                <CodeBlock>
                  {`import Home from "./components/Home";
const routes = [
  {
    name: "Home",
    path: "",
    response() {
      return { body: Home };
    }
  },
  // ...
];
// response = { body: Home, ... }`}
                </CodeBlock>
              </SideBySide>
            </li>
            <li>
              <SideBySide>
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
              </SideBySide>
            </li>
            <li>
              <SideBySide>
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
              </SideBySide>
            </li>
            <li>
              <SideBySide>
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
              </SideBySide>
            </li>
            <li>
              <SideBySide>
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
              </SideBySide>
            </li>
            <li>
              <SideBySide>
                <Explanation>
                  <p>
                    <IJS>redirectTo</IJS> - An object with the <IJS>name</IJS>{" "}
                    of the route to redirect to, <IJS>params</IJS> (if
                    required), and optional <IJS>hash</IJS>, <IJS>query</IJS>,
                    and <IJS>state</IJS> properties.
                  </p>
                  <p>
                    The other values are copied directly, but{" "}
                    <IJS>redirectTo</IJS> will be turned into a location object
                    using the object's <IJS>name</IJS> (and <IJS>params</IJS> if
                    required).
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
              </SideBySide>
            </li>
          </ol>
          <SideBySide>
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
          </SideBySide>
          <ul>
            <Subsection tag="li" title="match" id="response-match">
              <SideBySide>
                <Explanation>
                  <p>
                    An object with the matched route properties of a response.
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
                        <td>the name of the matched route</td>
                      </tr>
                      <tr>
                        <td>params</td>
                        <td>route parameters parsed from the location</td>
                      </tr>
                      <tr>
                        <td>partials</td>
                        <td>
                          the names of any ancestor routes of the matched route
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
                  </table>
                </Explanation>
              </SideBySide>
            </Subsection>
            <Subsection tag="li" title="resolved" id="response-resolved">
              <SideBySide>
                <Explanation>
                  <p>
                    <IJS>resolved</IJS> is an object with the values resolved by
                    the <IJS>resolve</IJS> functions.
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
              </SideBySide>
            </Subsection>
            <Subsection tag="li" title="error" id="response-error">
              <SideBySide>
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
              </SideBySide>
            </Subsection>
          </ul>
        </Subsection>

        <Subsection title="children" id="children">
          <SideBySide>
            <Explanation>
              <p>
                An optional array of route objects for creating nested routes.
                Any child routes will be matched relative to their parent
                route's <IJS>path</IJS>. This means that if a parent route's{" "}
                <IJS>path</IJS> string is <IJS>'one'</IJS> and a child route's{" "}
                <IJS>path</IJS> string is <IJS>'two'</IJS>, the child will match
                when the pathname is <IJS>'one/two'</IJS>.
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
          </SideBySide>
        </Subsection>

        <Subsection title="params" id="params">
          <SideBySide>
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
                that takes a string (the value from the <IJS>pathname</IJS>) and
                returns a new value (transformed using the function you
                provide).
              </p>
            </Explanation>
            <CodeBlock>
              {`const routes = [
  {
    name: 'Number',
    path: 'number/:num',
    params: {
      num: n => parseInt(n, 10)
    }
  }
]
// when the user visits /number/1,
// response.params will be { num: 1 }
// instead of { num: "1" }`}
            </CodeBlock>
          </SideBySide>
        </Subsection>

        <Subsection title="pathOptions" id="pathOptions">
          <SideBySide>
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
                <strong>always</strong> have the <IJS>end</IJS> path option set
                to false.
              </Note>
            </Explanation>
          </SideBySide>
        </Subsection>

        <Subsection title="extra" id="extra">
          <SideBySide>
            <Explanation>
              <p>
                If you have any additional properties that you want attached to
                a route, use the <IJS>extra</IJS> property. You will be able to
                use <IJS>route.extra</IJS> in any custom route interactions.
              </p>
            </Explanation>
            <CodeBlock>
              {`const routes = [
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
];`}
            </CodeBlock>
          </SideBySide>
        </Subsection>
      </Section>
    </APIBlock>
  </BasePackage>
);
