import React from "react";
import { Link } from "@curi/react-dom";

import {
  HashSection,
  Paragraph,
  CodeBlock,
  IJS,
  Note
} from "../../../../../components/package/common";

let historyArgMeta = { title: "history", hash: "history" };
let routesArgMeta = { title: "routes", hash: "routes" };
let optionsArgMeta = { title: "options", hash: "options" };
let argumentsMeta = {
  title: "Arguments",
  hash: "createRouter-arguments",
  children: [historyArgMeta, routesArgMeta, optionsArgMeta]
};

let urlMeta = { title: "url", hash: "url" };
let navigateMeta = { title: "navigate", hash: "navigate" };
let onceMeta = { title: "once", hash: "once" };
let observeMeta = { title: "observe", hash: "observe" };
let cancelMeta = { title: "cancel", hash: "cancel-property" };
let currentMeta = { title: "current", hash: "current-property" };
let routeMeta = { title: "route", hash: "router-route" };
let historyMeta = { title: "history", hash: "history-property" };
let externalMeta = { title: "external", hash: "router-external" };
let propertiesMeta = {
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

export let meta = {
  title: "createRouter",
  hash: "createRouter"
};

export function CreateRouterAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <Paragraph>
        The <IJS>createRouter</IJS> function is used to create a router.
      </Paragraph>

      <CodeBlock>
        {`import { createRouter } from "@curi/router";

let router = createRouter(browser, routes, options);`}
      </CodeBlock>

      <HashSection tag="h3" meta={argumentsMeta}>
        <HashSection tag="h4" meta={historyArgMeta}>
          <Paragraph>
            A <a href="https://github.com/pshrmn/hickory">Hickory</a> history
            function. The{" "}
            <Link name="Guide" params={{ slug: "history" }}>
              history guide
            </Link>{" "}
            provides more information on how to choose which history type is
            right for an application.
          </Paragraph>

          <CodeBlock lang="jsx">
            {`import { browser } from "@hickory/browser";

let router = createRouter(browser, routes);`}
          </CodeBlock>
        </HashSection>

        <HashSection tag="h4" meta={routesArgMeta}>
          <Paragraph>
            An array of prepared{" "}
            <Link name="Guide" params={{ slug: "routes" }}>
              route
            </Link>{" "}
            objects describing all valid routes in the application.
          </Paragraph>

          <CodeBlock lang="jsx">
            {`let routes = prepareRoutes([
  { name: "Home", path: "" },
  { name: "About", path: "about" }
]);

let router = createRouter(browser, routes);`}
          </CodeBlock>
        </HashSection>

        <HashSection tag="h4" meta={optionsArgMeta}>
          <Paragraph>
            An optional object with additional properties that can be passed to
            the router.
          </Paragraph>

          <HashSection
            tag="h5"
            meta={{
              title: <IJS>sideEffects</IJS>,
              hash: "options-sideEffects"
            }}
          >
            <Paragraph>
              An array of{" "}
              <Link name="Guide" params={{ slug: "side-effects" }}>
                side effect
              </Link>{" "}
              objects.
            </Paragraph>

            <CodeBlock>
              {`import { createRouter, scroll } from "@curi/router";

let router = createRouter(browser, routes, {
  sideEffects: [scroll()]
});`}
            </CodeBlock>
          </HashSection>

          <HashSection
            tag="h5"
            meta={{ title: <IJS>external</IJS>, hash: "options-external" }}
          >
            <Paragraph>
              Values that should be accessible to a route's <IJS>resolve</IJS>{" "}
              function <IJS>respond</IJS> functions.
            </Paragraph>
            <Paragraph>
              Using <IJS>external</IJS> allows you to access APIs, data, etc.
              without having to import it in the module where the routes are
              defined.
            </Paragraph>

            <CodeBlock>
              {`let client = new ApolloClient();
let router = createRouter(browser, routes, {
  external: { client, greeting: "Hi!" }
});`}
            </CodeBlock>
            <CodeBlock>
              {`let routes = prepareRoutes([
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
            tag="h5"
            meta={{
              title: <IJS>invisibleRedirects</IJS>,
              hash: "options-invisibleRedirects"
            }}
          >
            <Paragraph>
              When a response object has a <IJS>redirect</IJS> property, Curi
              will automatically navigate to the location specified by the
              property.
            </Paragraph>

            <Paragraph>
              If the <IJS>invisibleRedirects</IJS> property is <IJS>false</IJS>{" "}
              (the default), Curi will emit the redirect response (any observers
              will be called with the response).
            </Paragraph>

            <Paragraph>
              If <IJS>invisibleRedirects</IJS> is set to <IJS>true</IJS>, Curi
              will skip emitting the redirect; this effectively makes the
              redirect invisible to the application.
            </Paragraph>

            <Paragraph>
              <IJS>invisibleRedirects</IJS> should always be <IJS>false</IJS>{" "}
              for server-side rendering, otherwise the application will render
              content for the incorrect location.
            </Paragraph>

            <CodeBlock>
              {`let routes = prepareRoutes([
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
]);

let router = createRouter(browser, routes, {
  invisibleRedirects: false
});
// navigating to "/old/2" will automatically redirect
// to "/new/2" without emitting a response for the Old route`}
            </CodeBlock>
          </HashSection>
        </HashSection>
      </HashSection>

      <HashSection tag="h3" meta={propertiesMeta}>
        <Paragraph>
          The router has a number of properties for you to use when rendering
          your application.
        </Paragraph>

        <HashSection tag="h4" meta={urlMeta}>
          <Paragraph>
            The <IJS>url</IJS> method is used to generate a URL string.
          </Paragraph>

          <CodeBlock>
            {`router.url({
  name: "User",
  params: { id: 1 },
  hash: "other"
});`}
          </CodeBlock>

          <HashSection tag="h5" meta={{ title: "Arguments", hash: "url-args" }}>
            <Paragraph>
              <IJS>url</IJS> takes a single argument, an object with details
              about the location to navigate to and how to navigate.
            </Paragraph>

            <HashSection tag="h5" meta={{ title: "name", hash: "url-name" }}>
              <Paragraph>The name of a route.</Paragraph>
            </HashSection>

            <HashSection
              tag="h5"
              meta={{ title: "params", hash: "url-params" }}
            >
              <Paragraph>
                An object of any route params for the named route (and any of
                its ancestors that require params).
              </Paragraph>
            </HashSection>

            <HashSection tag="h5" meta={{ title: "hash", hash: "url-hash" }}>
              <Paragraph>The hash string of a location.</Paragraph>
            </HashSection>

            <HashSection tag="h5" meta={{ title: "query", hash: "url-query" }}>
              <Paragraph>The query value of a location.</Paragraph>
            </HashSection>
          </HashSection>
        </HashSection>

        <HashSection tag="h4" meta={navigateMeta}>
          <Paragraph>
            The <IJS>navigate</IJS> method is used to navigate programmatically.
            It takes an object with the details of where and how to navigate.
          </Paragraph>

          <CodeBlock>
            {`router.navigate({ url: "/photos/123/456" });
// navigates to "/photos/123/456"
// using default "anchor" method`}
          </CodeBlock>

          <HashSection
            tag="h5"
            meta={{ title: "Arguments", hash: "navigate-args" }}
          >
            <Paragraph>
              <IJS>navigate</IJS> takes a single argument, an object with
              details about the location to navigate to and how to navigate.
            </Paragraph>

            <HashSection tag="h5" meta={{ title: "url", hash: "navigate-url" }}>
              <Paragraph>
                The URL string of the location to navigate to.
              </Paragraph>
            </HashSection>

            <HashSection
              tag="h5"
              meta={{ title: "state", hash: "navigate-state" }}
            >
              <Paragraph>
                Any serializable state to attach to the location.
              </Paragraph>
            </HashSection>

            <HashSection
              tag="h5"
              meta={{ title: "method", hash: "navigate-method" }}
            >
              <Paragraph>
                How to navigate. <IJS>"push"</IJS> appends the new location
                after the current one. <IJS>"replace"</IJS> replaces the current
                location. <IJS>"anchor"</IJS> is the default method and acts
                like clicking a link. This behavior is a mix of{" "}
                <IJS>"push"</IJS> and <IJS>"replace"</IJS> where the current
                location is replaced if the new location has the exact same URL.
              </Paragraph>
            </HashSection>

            <HashSection
              tag="h5"
              meta={{
                title: "finished & cancelled",
                hash: "navigate-finished-cancelled"
              }}
            >
              <Paragraph>
                <IJS>finished</IJS> is a function to call once the navigation
                has finished.
              </Paragraph>

              <Paragraph>
                <IJS>cancelled</IJS> is a function to call if the navigation is
                superseded by another navigation.
              </Paragraph>

              <Paragraph>
                These properties should only be provided when navigating to
                asynchronous routes. Synchronous routes navigate immediately, so
                there is no waiting time for the navigation.
              </Paragraph>
            </HashSection>
          </HashSection>
        </HashSection>

        <HashSection tag="h4" meta={onceMeta}>
          <Paragraph>
            Register a response handler that will only be called one time.
          </Paragraph>

          <Paragraph>
            When a matched route is async (it has a <IJS>resolve</IJS>{" "}
            function), a response will not be created until the function has
            resolved. <IJS>once</IJS> is useful for delaying an application's
            initial render.
          </Paragraph>

          <CodeBlock>
            {`router.once(({ response }) => {
  // render the application based on the response
});`}
          </CodeBlock>

          <HashSection
            tag="h5"
            meta={{ title: "Arguments", hash: "once-args" }}
          >
            <HashSection
              tag="h5"
              meta={{
                title: "Response Handler",
                hash: "once-response-handler"
              }}
            >
              <Paragraph>
                A function that will be called once the router has generated a
                response. If the router has already generated a response, the
                function will be called immediately with the existing response.
                Otherwise, the function will be called once a new response is
                generated.
              </Paragraph>

              <Paragraph>
                The function will be passed an object with three properties: the{" "}
                <IJS>response</IJS>, a <IJS>navigation</IJS> object, and the{" "}
                <IJS>router</IJS>.
              </Paragraph>
            </HashSection>

            <HashSection
              tag="h5"
              meta={{ title: "Options", hash: "once-options" }}
            >
              <HashSection
                tag="h5"
                meta={{ title: "initial", hash: "once-options-initial" }}
              >
                <Paragraph>
                  When <IJS>true</IJS> (the default), the response handler will
                  be called immediately if there is an existing response. When{" "}
                  <IJS>false</IJS>, the response handler will not be called
                  until a new response is generated.
                </Paragraph>

                <CodeBlock>
                  {`router.once(responseHandler, {
  initial: false
});`}
                </CodeBlock>
              </HashSection>
            </HashSection>
          </HashSection>
        </HashSection>

        <HashSection tag="h4" meta={observeMeta}>
          <Paragraph>
            Register a response handler that will be called every time a
            response is generated.
          </Paragraph>

          <Paragraph>
            When a matched route is async (it has a <IJS>resolve</IJS>{" "}
            function), a response will not be created until the function has
            resolved.
          </Paragraph>

          <CodeBlock>
            {`router.observe(({ response }) => {
  // render the application based on the response
});`}
          </CodeBlock>

          <Paragraph>
            <IJS>observe</IJS> returns a function, which can be called to stop
            observing.
          </Paragraph>

          <CodeBlock>
            {`let stopObserving = router.observe(fn);
// the router will call the response handler for all responses

stopObserving();
// the router no longer calls the response handler`}
          </CodeBlock>

          <HashSection
            tag="h5"
            meta={{ title: "Arguments", hash: "observe-args" }}
          >
            <HashSection
              tag="h5"
              meta={{
                title: "Response Handler",
                hash: "observe-response-handler"
              }}
            >
              <Paragraph>
                A function that will be called whenever a new response is
                generated. If a response already exists when the function is
                called, the response handler will be called immediately with the
                existing response.
              </Paragraph>
            </HashSection>

            <HashSection
              tag="h5"
              meta={{ title: "Options", hash: "observe-options" }}
            >
              <HashSection
                tag="h5"
                meta={{ title: "initial", hash: "observe-options-initial" }}
              >
                <Paragraph>
                  When <IJS>true</IJS> (the default), the response handler will
                  be called immediately if there is an existing response. When{" "}
                  <IJS>false</IJS>, the response handler will not be called
                  until a new response is generated.
                </Paragraph>

                <CodeBlock>
                  {`router.observe(responseHandler, {
  initial: false
});`}
                </CodeBlock>
              </HashSection>
            </HashSection>
          </HashSection>
        </HashSection>

        <HashSection tag="h4" meta={cancelMeta}>
          <Paragraph>
            With navigating to an asynchronous route, there is a time between
            when a navigation begins and when the route's asynchronous actions
            have finished, during which a user may decide to cancel the
            navigation.
          </Paragraph>

          <Paragraph>
            In a multi-page application, the browser updates the refresh button
            to a stop button. There is no equivalent functionality for
            single-page applications, so Curi provides a <IJS>cancel</IJS>{" "}
            function to roughly imitate the behavior.
          </Paragraph>

          <Paragraph>
            <IJS>cancel</IJS> takes an observer function that will be called
            when navigation starts and when the navigation is finished. When the
            navigation starts, the observer function will be called with a
            function to cancel the navigation. When the navigation finishes, the
            function will be called with <IJS>undefined</IJS>.
          </Paragraph>

          <Paragraph>
            Calling <IJS>cancel</IJS> returns a function to stop observing.
          </Paragraph>

          <CodeBlock>
            {`let stopCancelling = router.cancel(fn);
// fn will be called for async navigation

stopCancelling();
// fn will no longer be called`}
          </CodeBlock>

          <HashSection
            tag="h5"
            meta={{ title: "Arguments", hash: "cancel-args" }}
          >
            <HashSection
              tag="h5"
              meta={{ title: "Cancel Handler", hash: "cancel-handler" }}
            >
              <Paragraph>
                A function that will be called when an asynchronous navigation
                begins and ends.
              </Paragraph>

              <Paragraph>
                When the navigation begins, the function will be passed a
                function that can be called to cancel the navigation.
              </Paragraph>

              <Paragraph>
                When the navigation ends, the function will be passed{" "}
                <IJS>undefined</IJS>.
              </Paragraph>

              <CodeBlock>
                {`router.cancel(fn => {
  if (fn === undefined) {
    // the navigation has finished/been cancelled
  } else {
    // calling fn will cancel the navigation
  }
});`}
              </CodeBlock>

              <Paragraph>
                Calling the cancel handler after the navigation has ended does
                nothing.
              </Paragraph>
            </HashSection>
          </HashSection>
        </HashSection>

        <HashSection tag="h4" meta={currentMeta}>
          <Paragraph>
            The <IJS>current</IJS> method returns the current{" "}
            <IJS>response</IJS> and <IJS>navigation</IJS> objects.
          </Paragraph>

          <Note>
            <Paragraph>
              If you call <IJS>current</IJS> before the initial response has
              been generated, the <IJS>response</IJS> and <IJS>navigation</IJS>{" "}
              properties will be <IJS>undefined</IJS>.
            </Paragraph>
          </Note>

          <CodeBlock>
            {`let router = createRouter(browser, routes);
let tooSoon = router.current();
// tooSoon.response === undefined
// tooSoon.navigation === undefined

router.once(({ response, navigation }) => {
  let perfect = router.current();
  // perfect.response === response
  // perfect.navigation === navigation
});`}
          </CodeBlock>
        </HashSection>

        <HashSection tag="h4" meta={routeMeta}>
          <Paragraph>
            The <IJS>route</IJS> method is used to get the public data about a
            route. This is useful in conjuction with{" "}
            <Link name="Guide" params={{ slug: "route-interactions" }}>
              route interactions
            </Link>
            .
          </Paragraph>
        </HashSection>

        <HashSection tag="h4" meta={historyMeta}>
          <Paragraph>The route's history object.</Paragraph>
        </HashSection>

        <HashSection tag="h4" meta={externalMeta}>
          <Paragraph>
            The <IJS>external</IJS> value that was passed through{" "}
            <Link hash="options-external">
              <IJS>createRouter</IJS>'s options
            </Link>
            .
          </Paragraph>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
