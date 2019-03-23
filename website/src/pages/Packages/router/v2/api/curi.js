import React from "react";
import { Link } from "@curi/react-dom";

import {
  HashSection,
  CodeBlock,
  IJS,
  Note,
  ScrollableTable
} from "../../../../../components/package/common";

const historyArgMeta = { title: "history", hash: "history" };
const routesArgMeta = { title: "routes", hash: "routes" };
const optionsArgMeta = { title: "options", hash: "options" };
const argumentsMeta = {
  title: "Arguments",
  hash: "arguments",
  children: [historyArgMeta, routesArgMeta, optionsArgMeta]
};

const navigateMeta = { title: "navigate(details)", hash: "navigate" };
const onceMeta = { title: "once(fn, options)", hash: "once" };
const observeMeta = { title: "observe(fn, options)", hash: "observe" };
const cancelMeta = { title: "cancel(fn)", hash: "cancel-property" };
const currentMeta = { title: "current()", hash: "current-property" };
const routeMeta = { title: "route", hash: "router-route" };
const refreshMeta = { title: "refresh()", hash: "refresh-property" };
const historyMeta = { title: "history", hash: "history-property" };
const externalMeta = { title: "external", hash: "router-external" };
const propertiesMeta = {
  title: "Router",
  hash: "router",
  children: [
    navigateMeta,
    onceMeta,
    observeMeta,
    cancelMeta,
    currentMeta,
    routeMeta,
    refreshMeta,
    historyMeta,
    externalMeta
  ]
};

export const meta = {
  title: "create_router()",
  hash: "curi",
  children: [argumentsMeta, propertiesMeta]
};

export function CuriAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        The <IJS>create_router</IJS> function is used to create a router. It has
        two required arguments: a <IJS>history</IJS> object and a{" "}
        <IJS>routes</IJS> array, and an optional third argument: an{" "}
        <IJS>options</IJS> object.
      </p>

      <CodeBlock>
        {`import { create_router } from "@curi/router";

const router = create_router(Browser, routes, options);`}
      </CodeBlock>

      <HashSection tag="h4" meta={argumentsMeta}>
        <HashSection tag="h5" meta={historyArgMeta}>
          <p>
            A <a href="https://github.com/pshrmn/hickory">Hickory</a> history
            function. The{" "}
            <Link name="Guide" params={{ slug: "history" }}>
              history guide
            </Link>{" "}
            provides more information on how to choose which history type is
            right for an application.
          </p>

          <CodeBlock lang="jsx">
            {`import { Browser } from "@hickory/browser";

const router = create_router(Browser, routes);`}
          </CodeBlock>
        </HashSection>

        <HashSection tag="h5" meta={routesArgMeta}>
          <p>
            An array of prepared{" "}
            <Link name="Guide" params={{ slug: "routes" }}>
              route
            </Link>{" "}
            objects describing all valid routes in the application.
          </p>

          <CodeBlock lang="jsx">
            {`const routes = prepare_routes([
  { name: "Home", path: "" },
  { name: "About", path: "about" }
]);

const router = create_router(Browser, routes);`}
          </CodeBlock>
        </HashSection>

        <HashSection tag="h5" meta={optionsArgMeta}>
          <p>
            An optional object with additional properties that can be passed to
            the router.
          </p>

          <HashSection
            tag="h6"
            meta={{ title: <IJS>route</IJS>, hash: "options-route" }}
          >
            <p>
              An array of{" "}
              <Link name="Guide" params={{ slug: "route-interactions" }}>
                route interactions
              </Link>
              . These are functions for interacting with routes based on their{" "}
              <IJS>name</IJS>.
            </p>
            <p>
              The <IJS>pathname</IJS> interaction is included by default; any
              other interactions are provided through this array.
            </p>

            <CodeBlock>
              {`import active from "@curi/route-active";
import ancestors from "@curi/route-ancestors";

const routes = prepare_routes([{ name: "Home", path: "" }]);

const router = create_router(Browser, routes, {
  route: [active(), ancestors()]
});`}
            </CodeBlock>

            <p>
              Route interactions are called via the router's <IJS>route</IJS>{" "}
              object.
            </p>

            <CodeBlock>
              {`router.route.active("Home");
// returns true when location.pathname = "/"

router.route.pathname("Home");
// returns "/"`}
            </CodeBlock>
          </HashSection>

          <HashSection
            tag="h6"
            meta={{
              title: <IJS>side_effects</IJS>,
              hash: "options-side_effects"
            }}
          >
            <p>
              An array of{" "}
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
                    An observer that will be called whenever a response is
                    generated.
                  </td>
                </tr>
                <tr>
                  <td>after</td>
                  <td>
                    (default <IJS>false</IJS>) controls whether the side effect
                    is called before or after non-side effect observers.
                  </td>
                </tr>
              </tbody>
            </ScrollableTable>

            <CodeBlock>
              {`import scroll from "@curi/side-effect-scroll";

const router = create_router(Browser, routes, {
  side_effects: [scroll()]
});`}
            </CodeBlock>
          </HashSection>

          <HashSection
            tag="h6"
            meta={{ title: <IJS>external</IJS>, hash: "options-external" }}
          >
            <p>
              Values that should be accessible to a route's <IJS>resolve</IJS>{" "}
              function <IJS>response</IJS> functions.
            </p>
            <p>
              Using <IJS>external</IJS> allows you to access APIs, data, etc.
              without having to be able to import it in the module where the
              routes are defined.
            </p>

            <CodeBlock>
              {`const client = new ApolloClient();
const router = create_router(Browser, routes, {
  external: { client, greeting: "Hi!" }
});`}
            </CodeBlock>
            <CodeBlock>
              {`const routes = prepare_routes([
  {
    name: "User",
    path: "user/:id",
    resolve(match, external) {
      // use the external object to make a query
      return external.client.query();
    }
  }
]);`}
            </CodeBlock>
          </HashSection>

          <HashSection
            tag="h6"
            meta={{
              title: <IJS>emitRedirects</IJS>,
              hash: "options-emitRedirects"
            }}
          >
            <p>
              When <IJS>false</IJS> (default is <IJS>true</IJS>), response
              objects with the <IJS>redirectTo</IJS> property{" "}
              <strong>will not be emitted</strong> to observers. This can be
              useful for avoiding an extra render, but should not be used on the
              server.
            </p>

            <CodeBlock>
              {`const routes = prepare_routes([
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

const router = create_router(Browser, routes, {
  emitRedirects: false                 
});
// navigating to "/old/2" will automatically redirect
// to "/new/2" without emitting a response`}
            </CodeBlock>
          </HashSection>

          <HashSection
            tag="h6"
            meta={{
              title: <IJS>pathnameOptions</IJS>,
              hash: "options-pathnameOptions"
            }}
          >
            <p>
              Curi uses{" "}
              <a href="https://github.com/pillarjs/path-to-regexp">
                <IJS>path-to-regexp</IJS>
              </a>{" "}
              to handle route matching and pathname generation.{" "}
              <IJS>path-to-regexp</IJS> can take a custom{" "}
              <a href="https://github.com/pillarjs/path-to-regexp#compile-reverse-path-to-regexp">
                <IJS>encode</IJS>
              </a>{" "}
              function for creating pathnames, which you can specify with this
              options.
            </p>

            <CodeBlock>
              {`const router = create_router(Browser, routes, {
  pathOptions: {
    encode: (value, token) => { /* ... */ }
  }
});`}
            </CodeBlock>
          </HashSection>
        </HashSection>
      </HashSection>

      <HashSection tag="h4" meta={propertiesMeta}>
        <p>
          The router has a number of properties for you to use when rendering
          your application.
        </p>

        <HashSection tag="h5" meta={navigateMeta}>
          <p>
            The <IJS>navigate()</IJS> method is used to navigate
            programmatically. It takes a <IJS>details</IJS> object with the
            details of where you want to navigate to as well as the{" "}
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
                  An object of any route params for the named route (and any of
                  its ancestors that require params).
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
                  How to navigate. <IJS>"push"</IJS> appends the new location
                  after the current one. <IJS>"replace"</IJS> replaces the
                  current location. <IJS>"anchor"</IJS> is the default method
                  and acts like clicking a link. This behavior is a mix of{" "}
                  <IJS>"push"</IJS> and <IJS>"replace"</IJS> where the current
                  location is replaced if the new location has the exact same
                  URL.
                </td>
              </tr>
              <tr>
                <td>finished</td>
                <td>A function to call once the navigation has finished.</td>
              </tr>
              <tr>
                <td>cancelled</td>
                <td>
                  A function to call if the navigation is superseded by another
                  navigation.
                </td>
              </tr>
            </tbody>
          </ScrollableTable>

          <CodeBlock>
            {`const routes = prepare_routes([
  {
    name: "Album",
    path: "photos/:albumID",
    children: [
      { name: "Photo", path: ":photoID" }
    ]
  },
  // ...
]);
const router = create_router(Browser, routes);

router.navigate({
  name: "Photo",
  params: { albumID: 123, photoID: 456 }
});
// navigates to "/photos/123/456"
// using default "anchor" method`}
          </CodeBlock>
        </HashSection>

        <HashSection tag="h5" meta={onceMeta}>
          <p>
            The <IJS>once()</IJS> method takes a response handler function. If a
            response already exists, the function will be called immediately.
            Otherwise, the function will be called once a new response is
            created. The <IJS>{`\{ initial: false \}`}</IJS> option can be used
            to prevent an immediate call even if a response already exists.
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
                  The navigation's <IJS>action</IJS> (<IJS>push</IJS>,{" "}
                  <IJS>replace</IJS>, or <IJS>pop</IJS>) and the{" "}
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
            When a matched route is async (it has a <IJS>resolve</IJS>{" "}
            function), a response will not be created until the function has
            resolved.
          </p>

          <CodeBlock>
            {`router.once(({ response }) => {
  // render the application based on the response
});`}
          </CodeBlock>

          <HashSection
            tag="h6"
            meta={{ title: "options", hash: "once-options" }}
          >
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
                      When true, the function will be called immediately if a
                      response exists. When false, the response function will
                      not be called until the next response is emitted.
                    </td>
                  </tr>
                </tbody>
              </ScrollableTable>
            </div>

            <CodeBlock>
              {`router.once(responseHandler, {
  initial: false
});`}
            </CodeBlock>
          </HashSection>
        </HashSection>

        <HashSection tag="h5" meta={observeMeta}>
          <p>
            The <IJS>observe()</IJS> method takes a response handler function.
            The response handler will be called every time a new response is
            emitted (and it a response already exists, the function will be
            called immediately). The <IJS>{`\{ initial: false \}`}</IJS> option
            can be used to prevent an immediate call even if a response already
            exists.
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
                  The navigation's <IJS>action</IJS> (<IJS>push</IJS>,{" "}
                  <IJS>replace</IJS>, or <IJS>pop</IJS>) and the{" "}
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
            When a matched route is async (it has a <IJS>resolve</IJS>{" "}
            function), a response will not be created until the function has
            resolved.
          </p>

          <CodeBlock>
            {`router.observe(({ response }) => {
  // render the application based on the response
});`}
          </CodeBlock>

          <HashSection
            tag="h6"
            meta={{ title: "options", hash: "observe-options" }}
          >
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
                      When true, the function will be called immediately if a
                      response exists. When false, the response function will
                      not be called until the next response is emitted.
                    </td>
                  </tr>
                </tbody>
              </ScrollableTable>
            </div>

            <CodeBlock>
              {`router.observe(responseHandler, {
  initial: false
});`}
            </CodeBlock>

            <p>
              <IJS>observe()</IJS> returns a function to stop calling the
              response handler function for new responses.
            </p>

            <CodeBlock>
              {`const stopObserving = router.observe(
  () => {...}
);
// the router will now call the observer for all responses

stopObserving();
// the router no longer calls the observer`}
            </CodeBlock>
          </HashSection>
        </HashSection>

        <HashSection tag="h5" meta={cancelMeta}>
          <p>
            With asynchronous routes, after a user begins navigation, but before
            the route's asynchronous actions have finished, the user does not
            have a good way to cancel the navigation. They can either refresh
            the page (causing a full reload) or click a link with the same URL
            as the current location, but neither of these are intuitive or
            ideal.
          </p>
          <p>
            <IJS>cancel()</IJS> takes an observer function that will be called
            when navigation starts and when the navigation is finished. When the
            navigation starts, the observer function will be given a function to
            cancel the navigation. When the navigation finishes, the function
            will be called with <IJS>undefined</IJS>.
          </p>
          <p>
            Calling <IJS>cancel()</IJS> returns a function to stop observing.
          </p>

          <CodeBlock>
            {`const stopCancelling = router.cancel(fn => {
  if (fn === undefined) {
    // the navigation has finished/been cancelled
  } else {
    // calling fn will cancel the navigation
  }
});`}
          </CodeBlock>
        </HashSection>

        <HashSection tag="h5" meta={currentMeta}>
          <p>
            The <IJS>router.current()</IJS> method returns the current{" "}
            <IJS>response</IJS> and <IJS>navigation</IJS> objects.
          </p>
          <Note>
            <p>
              If you call <IJS>router.current()</IJS> before the initial
              response has been emitted, the <IJS>response</IJS> and{" "}
              <IJS>navigation</IJS> properties will be <IJS>null</IJS>.
            </p>
          </Note>

          <CodeBlock>
            {`const router = create_router(Browser, routes);
const tooSoon = router.current();
// tooSoon.response === null
// tooSoon.navigation === null

router.once(({ response, navigation }) => {
  const perfect = router.current();
  // perfect.response === response
  // perfect.navigation === navigation
});`}
          </CodeBlock>
        </HashSection>

        <HashSection tag="h5" meta={routeMeta}>
          <p>
            The router's{" "}
            <Link name="Guide" params={{ slug: "route-interactions" }}>
              route interactions
            </Link>{" "}
            are accessed through the <IJS>route</IJS> property. These are used
            to interact with routes using their names.
          </p>

          <HashSection
            tag="h6"
            meta={{ title: "pathname", hash: "pathname-interaction" }}
          >
            <p>
              Curi includes one built-in interaction, <IJS>pathname</IJS>, which
              generates location pathnames using the name of a route and an
              optional object containing any necessary params.
            </p>

            <CodeBlock>
              {`const routes = prepare_routes([
  { name: 'User', path: 'user/:id' }
]);
const router = create_router(Browser, routes);
const userPathname = router.route.pathname(
  'User',
  { id: '12345' }
);
// userPathname === '/user/12345'`}
            </CodeBlock>
          </HashSection>
        </HashSection>

        <HashSection tag="h5" meta={refreshMeta}>
          <p>
            The <IJS>refresh()</IJS> function takes an array of new routes,
            which will replace the existing routes. The router will emit a new
            response based on the current location.
          </p>
          <p>
            The function can be called without any arguments and it will emit a
            response using the existing routes.
          </p>

          <CodeBlock>
            {`const oldRoutes = prepare_routes([...]);
const newRoutes = prepare_routes([...]);

const router = create_router(Browser, oldRoutes);
// generates responses using old routes

router.refresh(newRoutes);
// generates responses using new routes`}
          </CodeBlock>
        </HashSection>

        <HashSection tag="h5" meta={historyMeta}>
          <p>
            The route's history object, in case you need to interact directly
            with that.
          </p>
        </HashSection>

        <HashSection tag="h5" meta={externalMeta}>
          <p>
            The <IJS>external</IJS> value that was passed through{" "}
            <Link hash="options-external">
              <IJS>create_router</IJS>'s options
            </Link>
            .
          </p>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
