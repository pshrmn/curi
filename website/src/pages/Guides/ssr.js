import React from "react";

import {
  PlainSection,
  HashSection,
  CodeBlock,
  Note,
  Warning,
  IJS,
  Cmp
} from "../../components/guide/common";

const meta = {
  title: "Server-Side Rendering"
};

const reuseMeta = {
  title: "Reusing Code",
  hash: "reuse"
};

const frameworkMeta = {
  title: "Web Framework",
  hash: "framework"
};

const clientMeta = {
  title: "Client-Side Routes",
  hash: "client-side-routes"
};
const staticMeta = {
  title: "Static Assets",
  hash: "static-assets"
};
const orderMeta = {
  title: "Path Order",
  hash: "path-order"
};
const requestMeta = {
  title: "Request Matching",
  hash: "request-matching",
  children: [clientMeta, staticMeta, orderMeta]
};

const handlerMeta = {
  title: "Render Handler",
  hash: "handler"
};

const historyMeta = {
  title: "History",
  hash: "history"
};
const routesMeta = {
  title: "Routes",
  hash: "routes"
};
const routerMeta = {
  title: "Router",
  hash: "router",
  children: [historyMeta, routesMeta]
};

const redirectMeta = {
  title: "Redirect Responses",
  hash: "redirect-responses"
};
const responseMeta = {
  title: "Handling the Response",
  hash: "handling-response",
  children: [redirectMeta]
};

const contents = [
  reuseMeta,
  frameworkMeta,
  requestMeta,
  handlerMeta,
  routerMeta,
  responseMeta
];

function SSRGuide() {
  return (
    <React.Fragment>
      <PlainSection>
        <h1>{meta.title}</h1>

        <p>
          Server-side rendering (SSR) is used to generate the HTML for pages
          when the server receives a request for them. While not strictly
          necessary for single-page applications, server-side rendering can
          potentially be beneficial by:
        </p>
        <ol>
          <li>Speeding up the initial render time.</li>
          <li>
            Making it easier for web crawlers to view the application's content
            (which <em>may</em> improve SEO).
          </li>
        </ol>
        <p>
          This guide will cover how to setup server-side rendering and some of
          the issues that you may run into.
        </p>
      </PlainSection>

      <HashSection meta={reuseMeta}>
        <p>
          Being able to reuse code on the client and server is one of the
          benefits of JavaScript. If you are using syntax in your client-side
          code that Node doesn't know how to parse, such as import/export or
          JSX, you may run into issues.
        </p>
        <p>
          The <a href="https://babeljs.io/">Babel</a> package{" "}
          <IJS>@babel/node</IJS> lets Babel compile your code on the fly to
          syntax that Node understands. Anywhere that you would call{" "}
          <IJS>{`node <command>`}</IJS>, you should call{" "}
          <IJS>{`babel-node <command>`}</IJS> instead.
        </p>

        <CodeBlock lang="bash">
          {`npm install --save-dev @babel/node`}
        </CodeBlock>

        <Warning>
          <p>
            <IJS>@babel/node</IJS> should only be used in development. For
            production, the server's modules should be pre-compiled (using
            Babel).
          </p>
        </Warning>
      </HashSection>

      <HashSection meta={frameworkMeta}>
        <p>
          In order to render JavaScript on the server, you will need to use
          Node. This guide will be using the{" "}
          <a href="https://expressjs.com/">Express</a> web framework.
        </p>

        <Note>
          <p>
            There are ways to mix Node server-side rendering with non-Node
            frameworks, but that is outside the scope of this guide.
          </p>
        </Note>

        <p>
          Familiarity with Express is not expected, so to get you started, this
          guide will provide some code snippets for a basic setup.
        </p>

        <CodeBlock lang="bash">{`npm install express`}</CodeBlock>

        <p>
          The server's setup code can be placed anywhere, but we will follow
          Node's convention and save it in a <IJS>server.js</IJS> file.
        </p>

        <CodeBlock>
          {`// server.js
const express = require("express");

const app = express();

// ...

app.listen("8080", () => {
  console.log("Server is running.");
});`}
        </CodeBlock>

        <CodeBlock lang="bash">
          {`# tell node to start the server
# (development only!)
babel-node server.js`}
        </CodeBlock>

        <p>
          With the server ready to go, we can start configuring it to render a
          single-page application.
        </p>
      </HashSection>

      <HashSection meta={requestMeta}>
        <p>
          A web framework receives requests from the client and returns
          responses.
        </p>
        <p>
          In the client-side application, we define the routes that are valid
          for the application. Similarly, the server needs to define which
          request paths are valid so that it can properly respond to them.
        </p>
        <p>
          Server paths are given handler functions. These can do a variety of
          things, but we will only be using them to send responses.
        </p>

        <CodeBlock>
          {`app.use("/hi", function(req, res) {
  res.send("Hey!");
})`}
        </CodeBlock>

        <HashSection tag="h3" meta={clientMeta}>
          <p>
            Instead of telling the server about every single valid client-side
            route, a wildcard path is used to match every request. Determining
            what to render for the request will be done by Curi.
          </p>

          <CodeBlock>
            {`// the wildcard matches every GET request
app.get("*", renderHandler);`}
          </CodeBlock>

          <Note>
            <p>
              The <IJS>*</IJS> wildcard handler is similar to the Curi path{" "}
              <IJS>(.*)</IJS>. Express and Curi both use{" "}
              <IJS>path-to-regexp</IJS> for path matching. However, Express uses
              an old version. <IJS>path-to-regexp</IJS> removed support for the
              barebones <IJS>*</IJS> pattern in the version that Curi uses,
              which is why we have to use <IJS>(.*)</IJS> in Curi routes.
            </p>
          </Note>
        </HashSection>

        <HashSection tag="h3" meta={staticMeta}>
          <p>
            Page requests aren't the only requests that the framework will
            handle. Requests for static resources, like scripts, stylesheet, and
            images shouldn't be handled by Curi. Express provides a{" "}
            <IJS>static()</IJS> method to map request locations "real" (files
            exist on the server) locations.
          </p>

          <CodeBlock>{`app.use("/static", express.static());`}</CodeBlock>

          <p>
            Using the above static file handler, all static file requests in
            HTML/JavaScript should begin with <IJS>/static</IJS>.
          </p>

          <CodeBlock lang="html">
            {`<img src="/static/img/circle.png" />`}
          </CodeBlock>
        </HashSection>

        <HashSection tag="h3" meta={orderMeta}>
          <p>
            Express matches against paths in the order that they are registered,
            so the static files path needs to be defined before the wildcard
            path.
          </p>
          <p>
            Any other non-page paths, like APIs, would also need to be defined
            before the catch-all.
          </p>

          <CodeBlock>
            {`app.use("/static", express.static());
app.use("/api", dataHandler);
app.get("*", renderHandler);`}
          </CodeBlock>
        </HashSection>
      </HashSection>

      <HashSection meta={handlerMeta}>
        <p>
          The render handler function receives the request object and a response
          object. The response object is used to build and send a response to
          the user.
        </p>

        <CodeBlock>
          {`// renderer.js
function renderHandler(req, res) {

}

// server.js
const renderHandler = require("./renderer");

app.get("*", renderHandler)`}
        </CodeBlock>

        <Note>
          <p>
            If you are setting up a server without server-side rendering, the{" "}
            <IJS>renderHandler</IJS> function could use{" "}
            <IJS>res.sendFile()</IJS> to return a universal HTML file for every
            route.
          </p>
        </Note>

        <CodeBlock>
          {`const index = path.join(__dirname, "public", "index.html");

function renderHandler(req, res) {
  res.sendFile(index);
}`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={routerMeta}>
        <p>
          A router instance will be created for every single request. The router
          will match the requested location to its routes and generate a
          response, which can be used to render the HTML.
        </p>

        <p>Curi has two optimizations to make this more efficient:</p>

        <ol>
          <li>
            By wrapping the routes array in a <IJS>prepareRoutes</IJS> call, all
            of an application's routes are pre-compiled. Without{" "}
            <IJS>prepareRoutes</IJS>, the route pathes would need to be
            re-compiled for every request!
          </li>
          <li>
            We will use a lightweight history type created specifically for
            server-side rendering.
          </li>
        </ol>

        <CodeBlock>
          {`// renderer.js
import { createRouter } from "@curi/router";
import { createReusable } from "@hickory/in-memory";

const reusable = createReusable();

function handler(req, res) {
  const router = createRouter(reusable, routes, {
    history: { location: req.url }
  });
  router.once(({ response }) => {
    // render the response
  })
}`}
        </CodeBlock>

        <HashSection tag="h3" meta={historyMeta}>
          <p>
            On the client-side, a single-page application uses{" "}
            <IJS>@hickory/browser</IJS> to create a history instance. However,
            that uses browser only APIs. On the server, the{" "}
            <IJS>@hickory/in-memory</IJS> package is used to create a history
            instance that only exists in memory.
          </p>

          <CodeBlock lang="bash">{`npm install @hickory/in-memory`}</CodeBlock>

          <p>
            The server doesn't need a fully functional history object. Instead,
            the server only needs a history object that knows its location and
            how to generate URLs.
          </p>

          <p>
            The <IJS>createReusable</IJS> function exported by{" "}
            <IJS>@hickory/in-memory</IJS> is made specifically for this job.
            This function takes history options and returns a history
            constructor function.
          </p>

          <p>
            <IJS>createReusable</IJS> creates internal functions for location
            parsing/stringifying ahead of time so that they don't need to be
            recreated for every request.
          </p>

          <CodeBlock>
            {`// handler.js
import { createRouter } from "@curi/router";
import { createReusable } from "@hickory/in-memory";

const reusable = createReusable();`}
          </CodeBlock>

          <p>
            When creating the router, we must pass a <IJS>history</IJS> option
            with the location of the request.
          </p>

          <CodeBlock>
            {`function handler(req, res) {
  const router = createRouter(reusable, routes, {
    history: { location: req.url }
  });
  // ...
}`}
          </CodeBlock>
        </HashSection>

        <HashSection tag="h3" meta={routesMeta}>
          <p>
            As stated above, the <IJS>prepareRoutes</IJS> function is used to
            pre-compile routes, which means that they don't end up being
            re-compiled for every single request. If all of an application's
            routes are synchronous (they don't use <IJS>route.resolve</IJS>),
            then they don't need to do anything else for server-side rendering.
          </p>

          <p>
            Ideally, you will be able to re-use your client side routes on the
            server, but if the client routes use browser only APIs, you may need
            to adapt the routes to work on the server.
          </p>

          <CodeBlock>
            {`// handler.js
import routes from "../client/routes";`}
          </CodeBlock>

          <p>
            One approach to client/server routes is to keep two copies: one for
            the client and one for the server. However, this should be a last
            resort because it can lead to inconsistencies if you update one file
            but not the other.
          </p>
          <p>
            A more reusable approach would be to use "universal" wrappers around
            any environment specific APIs. For example, the{" "}
            <a href="https://github.com/matthew-andrews/isomorphic-fetch">
              <IJS>isomorphic-fetch</IJS>
            </a>{" "}
            package could be used to support <IJS>fetch()</IJS> in the browser
            and Node.
          </p>

          <CodeBlock>
            {`// routes.js
import fetch from "isomorphic-fetch";
import { prepareRoutes } from "@curi/router";

export default prepareRoutes([
  {
    name: "Test",
    path: "test",
    resolve() {
      return fetch("/test-data");
    }
  }
]);`}
          </CodeBlock>
        </HashSection>
      </HashSection>

      <HashSection meta={responseMeta}>
        <p>
          When the router is created, it will start generating a response by
          matching its <IJS>history</IJS> object's current location. If the
          application has any asynchronous routes, the <IJS>response</IJS> may
          not be ready immediately. The safest approach is to use{" "}
          <IJS>router.once</IJS> to wait for the <IJS>response</IJS>.
        </p>

        <CodeBlock data-line="5-7">
          {`function renderHandler(req, res) {
  const router = createRouter(reusable, routes, {
    history: { location: req.url }
  });
  router.once(({ response }) => {
    // ...
  });
}`}
        </CodeBlock>

        <p>
          Once the response is generated, we are ready to render. This step will
          generate the HTML string for the application. How exactly you do this
          depends on what UI renderer you are using, but the process is
          approximately the same for most renderering libraries.
        </p>

        <p>
          Here, we will assume that you are using React. The{" "}
          <IJS>react-dom/server</IJS> module provides a{" "}
          <IJS>renderToString</IJS> method, which will render an application as
          a string.
        </p>

        <p>
          Rendering with React on the server is essentially the same as
          rendering on the client. We create a <IJS>Router</IJS> and use{" "}
          <IJS>renderToString</IJS> (instead of <IJS>ReactDOM.render</IJS>) to
          render the component.
        </p>

        <CodeBlock data-line="1-2,9-14">
          {`import { renderToString } from "react-dom/server";
import { createRouterComponent } from "@curi/react-dom";

function renderHandler(req, res) {
  const router = createRouter(reusable, routes, {
    history: { location: req.url }
  });
  router.once(({ response }) => {
    const Router = createRouterComponent(router);
    const markup = renderToString(
      <Router>
        <App />
      </Router>
    );
  });
}`}
        </CodeBlock>

        <p>
          Rendering with <IJS>renderToString</IJS> only generates an HTML string
          for the application. We are missing the <Cmp>html</Cmp>,{" "}
          <Cmp>head</Cmp>,<Cmp>body</Cmp>, <Cmp>script</Cmp>, etc. tags that are
          required for the full HTML page to properly function.
        </p>

        <p>
          We can write a function that takes the string created by{" "}
          <IJS>renderToString</IJS>
          and inserts it into the full HTML string for a page.
        </p>

        <p>
          For a React application, the markup string should be set as the child
          of its container element. If you render into the <IJS>#root</IJS>{" "}
          element on the client, the HTML should have a <IJS>#root</IJS>{" "}
          element.
        </p>

        <p>
          Any JavaScript scripts that need to be rendered should also be
          included in the HTML. Make sure that their paths are absolute; if the
          path is relative, then you will run into errors resolving the location
          for nested routes!
        </p>

        <p>
          If your routes set <IJS>title</IJS> strings on the <IJS>response</IJS>
          , you can also pass that value to the markup insertion function and
          set the title in the HTML string.
        </p>

        <CodeBlock data-line="4-15,28-29">
          {`import { renderToString } from "react-dom/server";
import { createRouterComponent } from "@curi/react-dom";

function insertMarkup(markup, title) {
  return \`<!doctype html>
<html>
  <head>
    <title>\$\{title\} | My Site</title>
  </head>
  <body>
    <div id="root">\$\{markup\}</div>
    <script src="/static/js/bundle.js"></script>
  </body>
</html>\`;
}

function renderHandler(req, res) {
  const router = createRouter(reusable, routes, {
    history: { location: req.url }
  });
  router.once(({ response }) => {
    const Router = createRouterComponent(router);
    const markup = renderToString(
      <Router>
        <App />
      </Router>
    );
    const html = insertMarkup(markup, response.title);
    res.send(html);
  });
}`}
        </CodeBlock>

        <Note>
          <p>
            If you server render a React application, you should use{" "}
            <IJS>ReactDOM.hydrate</IJS> instead of <IJS>ReactDOM.render</IJS> on
            the client.
          </p>
        </Note>

        <HashSection tag="h3" meta={redirectMeta}>
          <p>
            If a route matches and it redirects, you can handle it without
            rendering the application. A <IJS>response</IJS> is a redirect if it
            has a <IJS>redirectTo</IJS> property. <IJS>redirectTo.url</IJS> is
            that full URL (<IJS>pathname</IJS>, <IJS>query</IJS>, and{" "}
            <IJS>hash</IJS>).
          </p>

          <CodeBlock data-line="9-12">
            {`import { renderToString } from "react-dom/server";
import { createRouterComponent } from "@curi/react-dom";

function renderHandler(req, res) {
  const router = createRouter(reusable, routes, {
    history: { location: req.url }
  });
  router.once(({ response }) => {
    if (response.redirectTo) {
      res.redirect(301);
      return;
    }
    // otherwise, render
  });
}`}
          </CodeBlock>
        </HashSection>
      </HashSection>
    </React.Fragment>
  );
}

export { SSRGuide as component, contents };
