import React from "react";
import { Link } from "@curi/react-dom";

import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../components/highlight/Inline";
import { Section } from "../../components/layout/Sections";
import { CodeBlock, Explanation } from "../../components/layout/Groups";
import { Note, Warning } from "../../components/Messages";

const meta = {
  title: "Server-Side Rendering"
};

export default function UsingSideEffectsGuide() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Explanation>
        <p>
          Server-side rendering (SSR) allows an application to generate the HTML
          for pages on the server. While not strictly necessary for single-page
          applications, server-side rendering can potentially be beneficial by:
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
      </Explanation>

      <Section title="Reusing Code" id="reuse">
        <Explanation>
          <p>
            Being able to reuse code on the client and server is one of the
            benefits of JavaScript. If you are using syntax in your client-side
            code that Node doesn't know how to parse, such as import/export or
            JSX, you may quickly run into issues.
          </p>
          <p>
            The <a href="https://babeljs.io/">Babel</a> package{" "}
            <IJS>@babel/node</IJS> lets Babel compile your code on the fly to
            syntax that Node understands. Anywhere that you would call{" "}
            <IJS>{`node <command>`}</IJS>, you should call{" "}
            <IJS>{`babel-node <command>`}</IJS> instead.
          </p>
        </Explanation>
        <CodeBlock lang="bash">
          {`npm install --save-dev @babel/node`}
        </CodeBlock>
        <Warning>
          <IJS>@babel/node</IJS> should only be used in development. For
          production, the server's modules should be pre-compiled (using Babel).
        </Warning>
      </Section>

      <Section title="Web Framework" id="framework">
        <Explanation>
          <p>
            In order to render JavaScript on the server, you will need to use
            Node. This guide will be using the{" "}
            <a href="https://expressjs.com/">Express</a> web framework.
          </p>
          <Note>
            There are ways to mix Node server-side rendering with non-Node
            frameworks, but that is outside of the scope of this guide.
          </Note>
          <p>
            Familiarity with Express is not expected, so to get you started,
            this guide will provide some code snippets for a basic setup.
          </p>
        </Explanation>

        <CodeBlock lang="bash">{`npm install express`}</CodeBlock>
        <Explanation>
          <p>
            The server's setup code can be placed anywhere, but we will follow
            Node's convention and save it in a <IJS>server.js</IJS> file.
          </p>
        </Explanation>
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
        <Explanation>
          <p>
            With the server ready to go, we can start configuring it to render a
            single-page application.
          </p>
        </Explanation>
      </Section>

      <Section title="Request Matching" id="request-matching">
        <Explanation>
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
        </Explanation>
        <CodeBlock>
          {`app.use("/hi", function(req, res) {
  res.send("Hey!");
})`}
        </CodeBlock>
        <Section tag="h3" title="Client-Side Routes" id="client-side-routes">
          <Explanation>
            <p>
              Instead of telling the server about every single valid client-side
              route, a wildcard path is used to match every request. Determining
              what to render for the request will be done by a Curi router,
              which we will create in the wildcard's handler function.
            </p>
          </Explanation>
          <CodeBlock>
            {`// the wildcard matches every GET request
app.get("*", renderHandler);`}
          </CodeBlock>
          <Explanation>
            <Note>
              The <IJS>*</IJS> wildcard handler is similar to the Curi path{" "}
              <IJS>(.*)</IJS>. Express and Curi both use{" "}
              <IJS>path-to-regexp</IJS> for path matching. However, Express uses
              an old version. <IJS>path-to-regexp</IJS> removed support for the
              barebones <IJS>*</IJS> pattern in the version that Curi uses,
              which is why we have to use <IJS>(.*)</IJS> in Curi routes.
            </Note>
          </Explanation>
        </Section>

        <Section tag="h3" title="Static Assets" id="static-assets">
          <Explanation>
            <p>
              Page requests aren't the only requests that the framework will
              handle. Requests for static resources, like scripts, stylesheet,
              and images shouldn't be handled by Curi. Express provides a{" "}
              <IJS>static()</IJS> method to map request locations "real" (files
              exist on the server) locations.
            </p>
          </Explanation>
          <CodeBlock>{`app.use("/static", express.static());`}</CodeBlock>
          <Explanation>
            <p>
              Using the above static file handler, all static file requests in
              HTML/JavaScript should begin with <IJS>/static</IJS>.
            </p>
          </Explanation>
          <CodeBlock lang="html">
            {`<img src="/static/img/circle.png" />`}
          </CodeBlock>
        </Section>

        <Section tag="h3" title="Path Order" id="path-order">
          <Explanation>
            <p>
              Express matches against paths in the order that they are
              registered, so the static files path needs to be defined before
              the wildcard path.
            </p>
            <p>
              Any other non-page paths, like APIs, would also need to be defined
              before the catch-all.
            </p>
          </Explanation>
          <CodeBlock>
            {`app.use("/static", express.static());
app.use("/api", dataHandler);
app.get("*", renderHandler);`}
          </CodeBlock>
        </Section>
      </Section>

      <Section title="Render Handler" id="handler">
        <Explanation>
          <p>
            The render handler function receives the request object and a
            response object. The response object is used to build and send a
            response to the user.
          </p>
        </Explanation>
        <CodeBlock>
          {`// renderer.js
export default function renderHandler(req, res) {

}

// server.js
const renderHandler = require("./renderer");

app.get("*", renderHandler)`}
        </CodeBlock>
        <Note>
          If you are setting up a server without server-side rendering, the{" "}
          <IJS>renderHandler</IJS> function could use <IJS>res.sendFile()</IJS>{" "}
          to return a universal HTML file for every route.
        </Note>
        <CodeBlock>
          {`const index = path.join(__dirname, "public", "index.html");
          
export default function renderHandler(req, res) {
  res.sendFile(index);
}`}
        </CodeBlock>
      </Section>

      <Section title="Router" id="router">
        <Explanation>
          <p>
            A router instance will be created for every single request. This is
            a big reason why we wrap the routes array in a{" "}
            <IJS>prepareRoutes</IJS> call. Without <IJS>prepareRoutes</IJS>, the
            route pathes would need to be re-compiled for every request!
          </p>
          <p>
            The router will match the requested location to its routes and
            generate a response. Once the response is generated, the handler can
            render the application.
          </p>
        </Explanation>
        <CodeBlock>
          {`// renderer.js
function handler(req, res) {
  const router = curi(history, routes);
  router.once(({ response }) => {
    // render the response
  })
}`}
        </CodeBlock>
        <Explanation>
          <p>Where do the history and routes come from?</p>
        </Explanation>

        <Section tag="h3" title="History" id="history">
          <Explanation>
            <p>
              On the client-side, a single-page application uses{" "}
              <IJS>@hickory/browser</IJS> to create a history instance. However,
              that uses browser only APIs. On the server, the{" "}
              <IJS>@hickory/in-memory</IJS> package is used to create an
              equivalent history instance.
            </p>
          </Explanation>
          <CodeBlock lang="bash">{`npm install @hickory/in-memory`}</CodeBlock>
          <Explanation>
            An in-memory history takes an array of locations. For server-side
            rendering, we want to pass it the location from the request.
          </Explanation>
          <CodeBlock>
            {`// handler.js
import InMemory from "@hickory/in-memory";

function handler(req, res) {
  const history = InMemory({ locations: [req.path] });
  const router = curi(history, routes);
  // ...
}`}
          </CodeBlock>
        </Section>

        <Section tag="h3" title="Routes" id="routes">
          <Explanation>
            <p>
              Ideally, you will be able to re-use your client side routes on the
              server, but if the client routes use browser only APIs, you may
              need to adapt the routes to work on the server.
            </p>
          </Explanation>
          <CodeBlock>
            {`// handler.js
import routes from "../client/routes";`}
          </CodeBlock>
          <Explanation>
            <p>
              One approach to client/server routes is to keep two copies: one
              for the client and one for the server. However, this should be a
              last resort because it can lead to inconsistencies if you update
              one file but not the other.
            </p>
            <p>
              A more reusable approach would be to use "universal" wrappers
              around any environment specific APIs. For example, the{" "}
              <a href="https://github.com/matthew-andrews/isomorphic-fetch">
                <IJS>isomorphic-fetch</IJS>
              </a>{" "}
              package could be used to support <IJS>fetch()</IJS> in the browser
              and Node.
            </p>
          </Explanation>
          <CodeBlock>
            {`// routes.js
import fetch from "isomorphic-fetch";
import { prepareRoutes } from "@curi/router";

export default prepareRoutes([
  {
    name: "Test",
    path: "test",
    resolve: {
      data: () => fetch("/test-data")
    }
  }
]);`}
          </CodeBlock>
        </Section>

        <Section tag="h3" title="Automatic Redirects" id="automatic-redirects">
          <Explanation>
            <p>
              Curi automatically redirects to a new location when a response
              with a <IJS>redirectTo</IJS> property is generated. On the client,
              this is convenient because it saves you from having to detect the
              redirect and manually redirecting yourself. However, on the server
              it can cause issues.
            </p>
            <p>
              The issue happens because when Curi automatically redirects,
              another response is created for the location that Curi redirects
              to. If this response is ready before you try to render the current
              response, you'll render the redirected location's response instead
              of the initial response.
            </p>
            <p>
              Curi's <IJS>automaticRedirects</IJS> option lets you disable
              automatic redirects when its value is <IJS>false</IJS>. This lets
              you be certain that you are rendering using the initial response.
            </p>
          </Explanation>
          <CodeBlock data-line="3-5">
            {`function renderHandler(req, res) {
  const history = InMemory({ locations: [req.path] });
  const router = curi(history, routes, {
    automaticRedirects: false
  });
}`}
          </CodeBlock>
        </Section>
      </Section>

      <Section title="Handling the Response" id="handling-response">
        <Explanation>
          <p>
            When the router is created, it will start generating a response by
            matching its <IJS>history</IJS> object's current location. If the
            application has any asynchronous routes, the <IJS>response</IJS> may
            not be ready immediately. The safest approach is to use{" "}
            <IJS>router.once</IJS> to wait for the <IJS>response</IJS>.
          </p>
        </Explanation>
        <CodeBlock data-line="6-8">
          {`function renderHandler(req, res) {
  const history = InMemory({ locations: [req.path] });
  const router = curi(history, routes, {
    automaticRedirects: false
  });
  router.once(({ response }) => {
    // ...
  });
}`}
        </CodeBlock>

        <Explanation>
          <p>
            The next step is to render the application to generate an HTML
            response string that will be sent to the user. How exactly you do
            this depends on what UI renderer you are using, but the process is
            approximately the same for most renderering libraries.
          </p>
          <p>
            Here, we will assume that you are using React. The{" "}
            <IJS>react-dom</IJS> package (through its <IJS>server</IJS> module),
            provides a <IJS>renderToString</IJS> method, which will render an
            application as a string.
          </p>
          <p>
            Rendering with React on the server is essentially the same as
            rendering on the client. We create a <Cmp>Router</Cmp> and use{" "}
            <IJS>renderToString</IJS> (instead of <IJS>ReactDOM.render</IJS>) to
            render the component, passing it a render-invoked function.
          </p>
        </Explanation>

        <CodeBlock data-line="1-2,10-18">
          {`import { renderToString } from "react-dom/server";
import { curiProvider } from "@curi/react-dom";
         
function renderHandler(req, res) {
  const history = InMemory({ locations: [req.path] });
  const router = curi(history, routes, {
    automaticRedirects: false
  });
  router.once(({ response }) => {
    const Router = curiProvider(router);
    const markup = renderToString(
      <Router>
        {({ response }) => {
          const { body:Body } = response;
          return <Body response={response} />;
        }}
      </Router>
    );
  });
}`}
        </CodeBlock>

        <Explanation>
          <p>
            Rendering with <IJS>renderToString</IJS> only generates an HTML
            string for the application. We are missing the <Cmp>html</Cmp>,{" "}
            <Cmp>head</Cmp>,
            <Cmp>body</Cmp>, <Cmp>script</Cmp>, etc. tags that are required for
            the full HTML page.
          </p>
          <p>
            We can write a function that takes the string created by{" "}
            <IJS>renderToString</IJS>
            and inserts it into the full HTML string for a page.
          </p>
          <p>
            For a React application, the markup string should be set as the
            child of its container element. If you render into the{" "}
            <IJS>#root</IJS> element on the client, the HTML should have a{" "}
            <IJS>#root</IJS> element.
          </p>
          <p>
            Any JavaScript scripts that need to be rendered should also be
            included in the HTML. Make sure that their paths are absolute; if
            the path is relative, then you will run into errors resolving the
            location for nested routes!
          </p>
          <p>
            If your routes set <IJS>title</IJS> strings on the{" "}
            <IJS>response</IJS>, you can also pass that value to the markup
            insertion function and set the title in the HTML string.
          </p>
        </Explanation>

        <CodeBlock data-line="4-15,32-33">
          {`import { renderToString } from "react-dom/server";
import { curiProvider } from "@curi/react-dom";

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
  const history = InMemory({ locations: [req.path] });
  const router = curi(history, routes, {
    automaticRedirects: false
  });
  router.once(({ response }) => {
    const Router = curiProvider(router);
    const markup = renderToString(
      <Router>
        {({ response }) => {
          const { body:Body } = response;
          return <Body response={response} />;
        }}
      </Router>
    );
    const html = insertMarkup(markup, response.title);
    res.send(html);
  });
}`}
        </CodeBlock>

        <Explanation>
          <Note>
            If you server render a React application, you should use{" "}
            <IJS>ReactDOM.hydrate</IJS> instead of <IJS>ReactDOM.render</IJS> on
            the client.
          </Note>
        </Explanation>

        <Section tag="h3" title="Redirect Responses" id="redirect-responses">
          <Explanation>
            <p>
              If a route matches and it redirects, you can handle it without
              rendering the application. A <IJS>response</IJS> is a redirect if
              it has a <IJS>redirectTo</IJS> property. <IJS>redirectTo.url</IJS>{" "}
              is that full URL (<IJS>pathname</IJS>, <IJS>query</IJS>, and{" "}
              <IJS>hash</IJS>).
            </p>
          </Explanation>

          <CodeBlock data-line="10-13">
            {`import { renderToString } from "react-dom/server";
import { curiProvider } from "@curi/react-dom";

function renderHandler(req, res) {
  const history = InMemory({ locations: [req.path] });
  const router = curi(history, routes, {
    automaticRedirects: false
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
        </Section>
      </Section>
    </React.Fragment>
  );
}
