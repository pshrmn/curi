import React from "react";
import { Link } from "@curi/react-dom";

import {
  HashSection,
  CodeBlock,
  IJS,
  Note
} from "../../../../../components/package/common";

const historyArgMeta = { title: "history", hash: "history" };
const routesArgMeta = { title: "routes", hash: "routes" };
const optionsArgMeta = { title: "options", hash: "options" };
const argumentsMeta = {
  title: "Arguments",
  hash: "createRouter-arguments",
  children: [historyArgMeta, routesArgMeta, optionsArgMeta]
};

const urlMeta = { title: "url", hash: "url" };
const navigateMeta = { title: "navigate", hash: "navigate" };
const onceMeta = { title: "once", hash: "once" };
const observeMeta = { title: "observe", hash: "observe" };
const cancelMeta = { title: "cancel", hash: "cancel-property" };
const currentMeta = { title: "current", hash: "current-property" };
const routeMeta = { title: "route", hash: "router-route" };
const historyMeta = { title: "history", hash: "history-property" };
const externalMeta = { title: "external", hash: "router-external" };
const propertiesMeta = {
  title: "Router",
  hash: "router",
  children: [
    urlMeta,
    navigateMeta,
    onceMeta,
    observeMeta,
    cancelMeta,
    currentMeta,
    routeMeta,
    historyMeta,
    externalMeta
  ]
};

export const meta = {
  title: "createRouter",
  hash: "createRouter",
  children: [argumentsMeta, propertiesMeta]
};

export function CreateRouterAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        The <IJS>createRouter</IJS> function is used to create a router.
      </p>

      <CodeBlock>
        {`import { createRouter } from "@curi/router";

const router = createRouter(browser, routes, options);`}
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
            {`import { browser } from "@hickory/browser";

const router = createRouter(browser, routes);`}
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
            {`const routes = prepareRoutes({
  routes: [
    { name: "Home", path: "" },
    { name: "About", path: "about" }
  ]
});

const router = createRouter(browser, routes);`}
          </CodeBlock>
        </HashSection>

        <HashSection tag="h5" meta={optionsArgMeta}>
          <p>
            An optional object with additional properties that can be passed to
            the router.
          </p>

          <HashSection
            tag="h6"
            meta={{
              title: <IJS>sideEffects</IJS>,
              hash: "options-sideEffects"
            }}
          >
            <p>
              An array of{" "}
              <Link name="Guide" params={{ slug: "side-effects" }}>
                side effect
              </Link>{" "}
              objects.
            </p>

            <CodeBlock>
              {`import scroll from "@curi/side-effect-scroll";

const router = createRouter(browser, routes, {
  sideEffects: [scroll()]
});`}
            </CodeBlock>
          </HashSection>

          <HashSection
            tag="h6"
            meta={{ title: <IJS>external</IJS>, hash: "options-external" }}
          >
            <p>
              Values that should be accessible to a route's <IJS>resolve</IJS>{" "}
              function <IJS>respond</IJS> functions.
            </p>
            <p>
              Using <IJS>external</IJS> allows you to access APIs, data, etc.
              without having to import it in the module where the routes are
              defined.
            </p>

            <CodeBlock>
              {`const client = new ApolloClient();
const router = createRouter(browser, routes, {
  external: { client, greeting: "Hi!" }
});`}
            </CodeBlock>
            <CodeBlock>
              {`const routes = prepareRoutes({
  routes: [
    {
      name: "User",
      path: "user/:id",
      resolve(match, external) {
        // use the external object to make a query
        return external.client.query();
      }
    }
  ]
});`}
            </CodeBlock>
          </HashSection>

          <HashSection
            tag="h6"
            meta={{
              title: <IJS>invisibleRedirects</IJS>,
              hash: "options-invisibleRedirects"
            }}
          >
            <p>
              When a response object has a <IJS>redirect</IJS> property, Curi
              will automatically navigate to the location specified by the
              property.
            </p>

            <p>
              If the <IJS>invisibleRedirects</IJS> property is <IJS>false</IJS>{" "}
              (the default), Curi will emit the redirect response (any observers
              will be called with the response).
            </p>

            <p>
              If <IJS>invisibleRedirects</IJS> is set to <IJS>true</IJS>, Curi
              will skip emitting the redirect; this effectively makes the
              redirect invisible to the application.
            </p>

            <p>
              <IJS>invisibleRedirects</IJS> should always be <IJS>false</IJS>{" "}
              for server-side rendering, otherwise the application will render
              content for the incorrect location.
            </p>

            <CodeBlock>
              {`const routes = prepareRoutes({
  routes: [
    {
      name: "Old",
      path: "old/:id",
      respond({ params }) {
        // setup a redirect to the "New" route
        return {
          redirect: {
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
  ]
});

const router = createRouter(browser, routes, {
  invisibleRedirects: false
});
// navigating to "/old/2" will automatically redirect
// to "/new/2" without emitting a response for the Old route`}
            </CodeBlock>
          </HashSection>
        </HashSection>
      </HashSection>

      <HashSection tag="h4" meta={propertiesMeta}>
        <p>
          The router has a number of properties for you to use when rendering
          your application.
        </p>

        <HashSection tag="h5" meta={urlMeta}>
          <p>
            The <IJS>url</IJS> method is used to generate a URL string.
          </p>

          <CodeBlock>
            {`router.url({
  name: "User",
  params: { id: 1 },
  hash: "other"
});`}
          </CodeBlock>

          <HashSection tag="h6" meta={{ title: "Arguments", hash: "url-args" }}>
            <p>
              <IJS>url</IJS> takes a single argument, an object with details
              about the location to navigate to and how to navigate.
            </p>

            <HashSection tag="h6" meta={{ title: "name", hash: "url-name" }}>
              <p>The name of a route.</p>
            </HashSection>

            <HashSection
              tag="h6"
              meta={{ title: "params", hash: "url-params" }}
            >
              <p>
                An object of any route params for the named route (and any of
                its ancestors that require params).
              </p>
            </HashSection>

            <HashSection tag="h6" meta={{ title: "hash", hash: "url-hash" }}>
              <p>The hash string of a location.</p>
            </HashSection>

            <HashSection tag="h6" meta={{ title: "query", hash: "url-query" }}>
              <p>The query value of a location.</p>
            </HashSection>
          </HashSection>
        </HashSection>

        <HashSection tag="h5" meta={navigateMeta}>
          <p>
            The <IJS>navigate</IJS> method is used to navigate programmatically.
            It takes an object with the details of where and how to navigate.
          </p>

          <CodeBlock>
            {`router.navigate({ url: "/photos/123/456" });
// navigates to "/photos/123/456"
// using default "anchor" method`}
          </CodeBlock>

          <HashSection
            tag="h6"
            meta={{ title: "Arguments", hash: "navigate-args" }}
          >
            <p>
              <IJS>navigate</IJS> takes a single argument, an object with
              details about the location to navigate to and how to navigate.
            </p>

            <HashSection tag="h6" meta={{ title: "url", hash: "navigate-url" }}>
              <p>The URL string of the location to navigate to.</p>
            </HashSection>

            <HashSection
              tag="h6"
              meta={{ title: "state", hash: "navigate-state" }}
            >
              <p>Any serializable state to attach to the location.</p>
            </HashSection>

            <HashSection
              tag="h6"
              meta={{ title: "method", hash: "navigate-method" }}
            >
              <p>
                How to navigate. <IJS>"push"</IJS> appends the new location
                after the current one. <IJS>"replace"</IJS> replaces the current
                location. <IJS>"anchor"</IJS> is the default method and acts
                like clicking a link. This behavior is a mix of{" "}
                <IJS>"push"</IJS> and <IJS>"replace"</IJS> where the current
                location is replaced if the new location has the exact same URL.
              </p>
            </HashSection>

            <HashSection
              tag="h6"
              meta={{
                title: "finished & cancelled",
                hash: "navigate-finished-cancelled"
              }}
            >
              <p>
                <IJS>finished</IJS> is a function to call once the navigation
                has finished.
              </p>

              <p>
                <IJS>cancelled</IJS> is a function to call if the navigation is
                superseded by another navigation.
              </p>

              <p>
                These properties should only be provided when navigating to
                asynchronous routes. Synchronous routes navigate immediately, so
                there is no waiting time for the navigation.
              </p>
            </HashSection>
          </HashSection>
        </HashSection>

        <HashSection tag="h5" meta={onceMeta}>
          <p>Register a response handler that will only be called one time.</p>

          <p>
            When a matched route is async (it has a <IJS>resolve</IJS>{" "}
            function), a response will not be created until the function has
            resolved. <IJS>once</IJS> is useful for delaying an application's
            initial render.
          </p>

          <CodeBlock>
            {`router.once(({ response }) => {
  // render the application based on the response
});`}
          </CodeBlock>

          <HashSection
            tag="h6"
            meta={{ title: "Arguments", hash: "once-args" }}
          >
            <HashSection
              tag="h6"
              meta={{
                title: "Response Handler",
                hash: "once-response-handler"
              }}
            >
              <p>
                A function that will be called once the router has generated a
                response. If the router has already generated a response, the
                function will be called immediately with the existing response.
                Otherwise, the function will be called once a new response is
                generated.
              </p>

              <p>
                The function will be passed an object with three properties: the{" "}
                <IJS>response</IJS>, a <IJS>navigation</IJS> object, and the{" "}
                <IJS>router</IJS>.
              </p>
            </HashSection>

            <HashSection
              tag="h6"
              meta={{ title: "Options", hash: "once-options" }}
            >
              <HashSection
                tag="h6"
                meta={{ title: "initial", hash: "once-options-initial" }}
              >
                <p>
                  When <IJS>true</IJS> (the default), the response handler will
                  be called immediately if there is an existing response. When{" "}
                  <IJS>false</IJS>, the response handler will not be called
                  until a new response is generated.
                </p>

                <CodeBlock>
                  {`router.once(responseHandler, {
  initial: false
});`}
                </CodeBlock>
              </HashSection>
            </HashSection>
          </HashSection>
        </HashSection>

        <HashSection tag="h5" meta={observeMeta}>
          <p>
            Register a response handler that will be called every time a
            response is generated.
          </p>

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

          <p>
            <IJS>observe</IJS> returns a function, which can be called to stop
            observing.
          </p>

          <CodeBlock>
            {`const stopObserving = router.observe(fn);
// the router will call the response handler for all responses

stopObserving();
// the router no longer calls the response handler`}
          </CodeBlock>

          <HashSection
            tag="h6"
            meta={{ title: "Arguments", hash: "observe-args" }}
          >
            <HashSection
              tag="h6"
              meta={{
                title: "Response Handler",
                hash: "observe-response-handler"
              }}
            >
              <p>
                A function that will be called whenever a new response is
                generated. If a response already exists when the function is
                called, the response handler will be called immediately with the
                existing response.
              </p>
            </HashSection>

            <HashSection
              tag="h6"
              meta={{ title: "Options", hash: "observe-options" }}
            >
              <HashSection
                tag="h6"
                meta={{ title: "initial", hash: "observe-options-initial" }}
              >
                <p>
                  When <IJS>true</IJS> (the default), the response handler will
                  be called immediately if there is an existing response. When{" "}
                  <IJS>false</IJS>, the response handler will not be called
                  until a new response is generated.
                </p>

                <CodeBlock>
                  {`router.observe(responseHandler, {
  initial: false
});`}
                </CodeBlock>
              </HashSection>
            </HashSection>
          </HashSection>
        </HashSection>

        <HashSection tag="h5" meta={cancelMeta}>
          <p>
            With navigating to an asynchronous route, there is a time between
            when a navigation begins and when the route's asynchronous actions
            have finished, during which a user may decide to cancel the
            navigation.
          </p>

          <p>
            In a multi-page application, the browser updates the refresh button
            to a stop button. There is no equivalent functionality for
            single-page applications, so Curi provides a <IJS>cancel</IJS>{" "}
            function to roughly imitate the behavior.
          </p>

          <p>
            <IJS>cancel</IJS> takes an observer function that will be called
            when navigation starts and when the navigation is finished. When the
            navigation starts, the observer function will be called with a
            function to cancel the navigation. When the navigation finishes, the
            function will be called with <IJS>undefined</IJS>.
          </p>

          <p>
            Calling <IJS>cancel</IJS> returns a function to stop observing.
          </p>

          <CodeBlock>
            {`const stopCancelling = router.cancel(fn);
// fn will be called for async navigation

stopCancelling();
// fn will no longer be called`}
          </CodeBlock>

          <HashSection
            tag="h6"
            meta={{ title: "Arguments", hash: "cancel-args" }}
          >
            <HashSection
              tag="h6"
              meta={{ title: "Cancel Handler", hash: "cancel-handler" }}
            >
              <p>
                A function that will be called when an asynchronous navigation
                begins and ends.
              </p>

              <p>
                When the navigation begins, the function will be passed a
                function that can be called to cancel the navigation.
              </p>

              <p>
                When the navigation ends, the function will be passed{" "}
                <IJS>undefined</IJS>.
              </p>

              <CodeBlock>
                {`router.cancel(fn => {
  if (fn === undefined) {
    // the navigation has finished/been cancelled
  } else {
    // calling fn will cancel the navigation
  }
});`}
              </CodeBlock>

              <p>
                Calling the cancel handler after the navigation has ended does
                nothing.
              </p>
            </HashSection>
          </HashSection>
        </HashSection>

        <HashSection tag="h5" meta={currentMeta}>
          <p>
            The <IJS>current</IJS> method returns the current{" "}
            <IJS>response</IJS> and <IJS>navigation</IJS> objects.
          </p>

          <Note>
            <p>
              If you call <IJS>current</IJS> before the initial response has
              been generated, the <IJS>response</IJS> and <IJS>navigation</IJS>{" "}
              properties will be <IJS>null</IJS>.
            </p>
          </Note>

          <CodeBlock>
            {`const router = createRouter(browser, routes);
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
            The <IJS>route</IJS> method is used to get the public data about a
            route. This is useful in conjuction with{" "}
            <Link name="Guide" params={{ slug: "route-interactions" }}>
              route interactions
            </Link>
            .
          </p>
        </HashSection>

        <HashSection tag="h5" meta={historyMeta}>
          <p>The route's history object.</p>
        </HashSection>

        <HashSection tag="h5" meta={externalMeta}>
          <p>
            The <IJS>external</IJS> value that was passed through{" "}
            <Link hash="options-external">
              <IJS>createRouter</IJS>'s options
            </Link>
            .
          </p>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
