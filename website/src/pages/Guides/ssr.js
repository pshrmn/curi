import React from "react";

import {
  TitledPlainSection,
  HashSection,
  Paragraph,
  CodeBlock,
  Note,
  Warning,
  IJS,
  Cmp
} from "../../components/guide/common";

let meta = {
  title: "Server-Side Rendering"
};

let reuseMeta = {
  title: "Reusing Code",
  hash: "reuse"
};

let frameworkMeta = {
  title: "Web Framework",
  hash: "framework"
};

let clientMeta = {
  title: "Client-Side Routes",
  hash: "client-side-routes"
};
let staticMeta = {
  title: "Static Assets",
  hash: "static-assets"
};
let orderMeta = {
  title: "Path Order",
  hash: "path-order"
};
let requestMeta = {
  title: "Request Matching",
  hash: "request-matching",
  children: [clientMeta, staticMeta, orderMeta]
};

let handlerMeta = {
  title: "Render Handler",
  hash: "handler"
};

let historyMeta = {
  title: "History",
  hash: "history"
};
let routesMeta = {
  title: "Routes",
  hash: "routes"
};
let routerMeta = {
  title: "Router",
  hash: "router",
  children: [historyMeta, routesMeta]
};

let redirectMeta = {
  title: "Redirect Responses",
  hash: "redirect-responses"
};
let responseMeta = {
  title: "Handling the Response",
  hash: "handling-response",
  children: [redirectMeta]
};

let contents = [
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
      <TitledPlainSection title={meta.title}>
        <Paragraph>
          Server-side rendering (SSR) is used to generate the HTML for pages
          when the server receives a request for them. While not strictly
          necessary for single-page applications, server-side rendering can
          potentially be beneficial by:
        </Paragraph>
        <ol>
          <li>Speeding up the initial render time.</li>
          <li>
            Making it easier for web crawlers to view the application's content
            (which <em>may</em> improve SEO).
          </li>
        </ol>
        <Paragraph>
          This guide will cover how to setup server-side rendering and some of
          the issues that you may run into.
        </Paragraph>
      </TitledPlainSection>

      <HashSection meta={reuseMeta} tag="h2">
        <Paragraph>
          Being able to reuse code on the client and server is one of the
          benefits of JavaScript. If you are using syntax in your client-side
          code that Node doesn't know how to parse, such as import/export or
          JSX, you may run into issues.
        </Paragraph>
        <Paragraph>
          The <a href="https://babeljs.io/">Babel</a> package{" "}
          <IJS>@babel/node</IJS> lets Babel compile your code on the fly to
          syntax that Node understands. Anywhere that you would call{" "}
          <IJS>{`node <command>`}</IJS>, you should call{" "}
          <IJS>{`babel-node <command>`}</IJS> instead.
        </Paragraph>

        <CodeBlock lang="bash">
          {`npm install --save-dev @babel/node`}
        </CodeBlock>

        <Warning>
          <Paragraph>
            <IJS>@babel/node</IJS> should only be used in development. For
            production, the server's modules should be pre-compiled (using
            Babel).
          </Paragraph>
        </Warning>
      </HashSection>

      <HashSection meta={frameworkMeta} tag="h2">
        <Paragraph>
          In order to render JavaScript on the server, you will need to use
          Node. This guide will be using the{" "}
          <a href="https://expressjs.com/">Express</a> web framework.
        </Paragraph>

        <Note>
          <Paragraph>
            There are ways to mix Node server-side rendering with non-Node
            frameworks, but that is outside the scope of this guide.
          </Paragraph>
        </Note>

        <Paragraph>
          Familiarity with Express is not expected, so to get you started, this
          guide will provide some code snippets for a basic setup.
        </Paragraph>

        <CodeBlock lang="bash">{`npm install express`}</CodeBlock>

        <Paragraph>
          The server's setup code can be placed anywhere, but we will follow
          Node's convention and save it in a <IJS>server.js</IJS> file.
        </Paragraph>

        <CodeBlock>
          {`// server.js
let express = require("express");

let app = express();

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

        <Paragraph>
          With the server ready to go, we can start configuring it to render a
          single-page application.
        </Paragraph>
      </HashSection>

      <HashSection meta={requestMeta} tag="h2">
        <Paragraph>
          A web framework receives requests from the client and returns
          responses.
        </Paragraph>
        <Paragraph>
          In the client-side application, we define the routes that are valid
          for the application. Similarly, the server needs to define which
          request paths are valid so that it can properly respond to them.
        </Paragraph>
        <Paragraph>
          Server paths are given handler functions. These can do a variety of
          things, but we will only be using them to send responses.
        </Paragraph>

        <CodeBlock>
          {`app.use("/hi", function(req, res) {
  res.send("Hey!");
})`}
        </CodeBlock>

        <HashSection tag="h3" meta={clientMeta}>
          <Paragraph>
            Instead of telling the server about every single valid client-side
            route, a wildcard path is used to match every request. Determining
            what to render for the request will be done by Curi.
          </Paragraph>

          <CodeBlock>
            {`// the wildcard matches every GET request
app.get("*", renderHandler);`}
          </CodeBlock>

          <Note>
            <Paragraph>
              The <IJS>*</IJS> wildcard handler is similar to the Curi path{" "}
              <IJS>(.*)</IJS>. Express and Curi both use{" "}
              <IJS>path-to-regexp</IJS> for path matching. However, Express uses
              an old version. <IJS>path-to-regexp</IJS> removed support for the
              barebones <IJS>*</IJS> pattern in the version that Curi uses,
              which is why we have to use <IJS>(.*)</IJS> in Curi routes.
            </Paragraph>
          </Note>
        </HashSection>

        <HashSection tag="h3" meta={staticMeta}>
          <Paragraph>
            Page requests aren't the only requests that the framework will
            handle. Requests for static resources, like scripts, stylesheet, and
            images shouldn't be handled by Curi. Express provides a{" "}
            <IJS>static</IJS> method to map request locations "real" (files
            exist on the server) locations.
          </Paragraph>

          <CodeBlock>{`app.use("/static", express.static());`}</CodeBlock>

          <Paragraph>
            Using the above static file handler, all static file requests in
            HTML/JavaScript should begin with <IJS>/static</IJS>.
          </Paragraph>

          <CodeBlock lang="html">
            {`<img src="/static/img/circle.png" />`}
          </CodeBlock>
        </HashSection>

        <HashSection tag="h3" meta={orderMeta}>
          <Paragraph>
            Express matches against paths in the order that they are registered,
            so the static files path needs to be defined before the wildcard
            path.
          </Paragraph>
          <Paragraph>
            Any other non-page paths, like APIs, would also need to be defined
            before the catch-all.
          </Paragraph>

          <CodeBlock>
            {`app.use("/static", express.static());
app.use("/api", dataHandler);
app.get("*", renderHandler);`}
          </CodeBlock>
        </HashSection>
      </HashSection>

      <HashSection meta={handlerMeta} tag="h2">
        <Paragraph>
          The render handler function receives the request object and a response
          object. The response object is used to build and send a response to
          the user.
        </Paragraph>

        <CodeBlock>
          {`// renderer.js
function renderHandler(req, res) {

}

// server.js
let renderHandler = require("./renderer");

app.get("*", renderHandler)`}
        </CodeBlock>

        <Note>
          <Paragraph>
            If you are setting up a server without server-side rendering, the{" "}
            <IJS>renderHandler</IJS> function could use <IJS>res.sendFile</IJS>{" "}
            to return a universal HTML file for every route.
          </Paragraph>
        </Note>

        <CodeBlock>
          {`let index = path.join(__dirname, "public", "index.html");

function renderHandler(req, res) {
  res.sendFile(index);
}`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={routerMeta} tag="h2">
        <Paragraph>
          A router instance will be created for every single request. The router
          will match the requested location to its routes and generate a
          response, which can be used to render the HTML.
        </Paragraph>

        <Paragraph>
          Curi has two optimizations to make this more efficient:
        </Paragraph>

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

let reusable = createReusable();

function handler(req, res) {
  let router = createRouter(reusable, routes, {
    history: { location: req.url }
  });
  router.once(({ response }) => {
    // render the response
  })
}`}
        </CodeBlock>

        <HashSection tag="h3" meta={historyMeta}>
          <Paragraph>
            On the client-side, a single-page application uses{" "}
            <IJS>@hickory/browser</IJS> to create a history instance. However,
            that uses browser only APIs. On the server, the{" "}
            <IJS>@hickory/in-memory</IJS> package is used to create a history
            instance that only exists in memory.
          </Paragraph>

          <CodeBlock lang="bash">{`npm install @hickory/in-memory`}</CodeBlock>

          <Paragraph>
            The server doesn't need a fully functional history object. Instead,
            the server only needs a history object that knows its location and
            how to generate URLs.
          </Paragraph>

          <Paragraph>
            The <IJS>createReusable</IJS> function exported by{" "}
            <IJS>@hickory/in-memory</IJS> is made specifically for this job.{" "}
            <IJS>createReusable</IJS> takes history options and returns a
            history function.
          </Paragraph>

          <Paragraph>
            <IJS>createReusable</IJS> creates internal functions for location
            parsing/stringifying ahead of time so that they don't need to be
            recreated for every request.
          </Paragraph>

          <CodeBlock>
            {`// handler.js
import { createRouter } from "@curi/router";
import { createReusable } from "@hickory/in-memory";

let reusable = createReusable();`}
          </CodeBlock>

          <Paragraph>
            When creating the router, we must pass a <IJS>history</IJS> option
            with the location of the request.
          </Paragraph>

          <CodeBlock>
            {`function handler(req, res) {
  let router = createRouter(reusable, routes, {
    history: { location: req.url }
  });
  // ...
}`}
          </CodeBlock>
        </HashSection>

        <HashSection tag="h3" meta={routesMeta}>
          <Paragraph>
            As stated above, the <IJS>prepareRoutes</IJS> function is used to
            pre-compile routes, which means that they don't end up being
            re-compiled for every single request. If all of an application's
            routes are synchronous (they don't use <IJS>route.resolve</IJS>),
            then they don't need to do anything else for server-side rendering.
          </Paragraph>

          <Paragraph>
            Ideally, you will be able to re-use your client side routes on the
            server, but if the client routes use browser only APIs, you may need
            to adapt the routes to work on the server.
          </Paragraph>

          <CodeBlock>
            {`// handler.js
import routes from "../client/routes";`}
          </CodeBlock>

          <Paragraph>
            One approach to client/server routes is to keep two copies: one for
            the client and one for the server. However, this should be a last
            resort because it can lead to inconsistencies if you update one file
            but not the other.
          </Paragraph>
          <Paragraph>
            A more reusable approach would be to use "universal" wrappers around
            any environment specific APIs. For example, the{" "}
            <a href="https://github.com/matthew-andrews/isomorphic-fetch">
              <IJS>isomorphic-fetch</IJS>
            </a>{" "}
            package could be used to support <IJS>fetch</IJS> in the browser and
            Node.
          </Paragraph>

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

      <HashSection meta={responseMeta} tag="h2">
        <Paragraph>
          When the router is created, it will start generating a response by
          matching its <IJS>history</IJS> object's current location. If the
          application has any asynchronous routes, the <IJS>response</IJS> may
          not be ready immediately. The safest approach is to use{" "}
          <IJS>router.once</IJS> to wait for the <IJS>response</IJS>.
        </Paragraph>

        <CodeBlock data-line="5-7">
          {`function renderHandler(req, res) {
  let router = createRouter(reusable, routes, {
    history: { location: req.url }
  });
  router.once(({ response }) => {
    // ...
  });
}`}
        </CodeBlock>

        <Paragraph>
          Once the response is generated, we are ready to render. This step will
          generate the HTML string for the application. How exactly you do this
          depends on what UI renderer you are using, but the process is
          approximately the same for most renderering libraries.
        </Paragraph>

        <Paragraph>
          Here, we will assume that you are using React. The{" "}
          <IJS>react-dom/server</IJS> module provides a{" "}
          <IJS>renderToString</IJS> method, which will render an application as
          a string.
        </Paragraph>

        <Paragraph>
          Rendering with React on the server is essentially the same as
          rendering on the client. We create a <IJS>Router</IJS> and use{" "}
          <IJS>renderToString</IJS> (instead of <IJS>ReactDOM.render</IJS>) to
          render the component.
        </Paragraph>

        <CodeBlock data-line="1-2,9-14">
          {`import { renderToString } from "react-dom/server";
import { createRouterComponent } from "@curi/react-dom";

function renderHandler(req, res) {
  let router = createRouter(reusable, routes, {
    history: { location: req.url }
  });
  router.once(({ response }) => {
    let Router = createRouterComponent(router);
    let markup = renderToString(
      <Router>
        <App />
      </Router>
    );
  });
}`}
        </CodeBlock>

        <Paragraph>
          Rendering with <IJS>renderToString</IJS> only generates an HTML string
          for the application. We are missing the <Cmp>html</Cmp>,{" "}
          <Cmp>head</Cmp>,<Cmp>body</Cmp>, <Cmp>script</Cmp>, etc. tags that are
          required for the full HTML page to properly function.
        </Paragraph>

        <Paragraph>
          We can write a function that takes the string created by{" "}
          <IJS>renderToString</IJS>
          and inserts it into the full HTML string for a page.
        </Paragraph>

        <Paragraph>
          For a React application, the markup string should be set as the child
          of its container element. If you render into the <IJS>#root</IJS>{" "}
          element on the client, the HTML should have a <IJS>#root</IJS>{" "}
          element.
        </Paragraph>

        <Paragraph>
          Any JavaScript scripts that need to be rendered should also be
          included in the HTML. Make sure that their paths are absolute; if the
          path is relative, then you will run into errors resolving the location
          for nested routes!
        </Paragraph>

        <Paragraph>
          The <IJS>meta</IJS> property of a <IJS>response</IJS> is useful for
          server-side rendering. For example, routes can set{" "}
          <IJS>meta.title</IJS> to be the page's title, which can be inserted
          into the generated HTML.
        </Paragraph>

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
  let router = createRouter(reusable, routes, {
    history: { location: req.url }
  });
  router.once(({ response }) => {
    let Router = createRouterComponent(router);
    let markup = renderToString(
      <Router>
        <App />
      </Router>
    );
    let html = insertMarkup(markup, response.meta.title);
    res.send(html);
  });
}`}
        </CodeBlock>

        <Note>
          <Paragraph>
            If you server render a React application, you should use{" "}
            <IJS>ReactDOM.hydrate</IJS> instead of <IJS>ReactDOM.render</IJS> on
            the client.
          </Paragraph>
        </Note>

        <HashSection tag="h3" meta={redirectMeta}>
          <Paragraph>
            If a route matches and it redirects, you can handle it without
            rendering the application. A <IJS>response</IJS> is a redirect if it
            has a <IJS>redirect</IJS> property. <IJS>redirect.url</IJS> is that
            full URL (<IJS>pathname</IJS>, <IJS>query</IJS>, and <IJS>hash</IJS>
            ).
          </Paragraph>

          <CodeBlock data-line="9-12">
            {`import { renderToString } from "react-dom/server";
import { createRouterComponent } from "@curi/react-dom";

function renderHandler(req, res) {
  let router = createRouter(reusable, routes, {
    history: { location: req.url }
  });
  router.once(({ response }) => {
    if (response.redirect) {
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
