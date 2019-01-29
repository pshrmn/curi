import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Cmp,
  Note
} from "../../../../components/package/common";

export const StaticFilesAPIMeta = {
  title: "staticFiles()",
  hash: "staticFiles"
};

export function StaticFilesAPI() {
  return (
    <HashSection title={StaticFilesAPIMeta.title} id={StaticFilesAPIMeta.hash}>
      <p>
        The <IJS>staticFiles()</IJS> function is used to generate HTML files for
        a static website and save them to the disk. An HTML file will be created
        for each page that you provide.
      </p>
      <p>
        Files will be created as <IJS>index.html</IJS> in the directory for
        their path. For example, the page for the pathname <IJS>/about</IJS>{" "}
        would create an <IJS>/about/index.html</IJS> file.
      </p>

      <CodeBlock>
        {`import { staticFiles } from '@curi/static';
import { join } from "path";

import routes from "../src/routes";

staticFiles({
  routes,
  pages: [{ name: "Home" }, { name: "About" }],
  dir: join(process.cwd(), "public"),
  render: () => {...},
  insert: () => {...}
});`}
      </CodeBlock>

      <p>
        <IJS>staticFiles()</IJS> returns a Promise that resolve with an array of
        results. Each entry in the results array contains the{" "}
        <IJS>pathname</IJS> of the result, a <IJS>success</IJS> boolean, and, if{" "}
        <IJS>success</IJS> is false, the <IJS>error</IJS> that occurred.
      </p>
      <p>
        It can be useful to log the results to easily see what pages were
        successfully built and which had issues.
      </p>

      <CodeBlock>
        {`staticFiles({...})
  .then(results => {
    const resultString = results
      .map(result => {
        return result.success
          ? \`✔ \${result.pathname}\`
          : \`✖ \${result.pathname} (\${result.error.message})\`;
      })
      .join("\\n");
    console.log(resultString);
  });`}
      </CodeBlock>

      <HashSection tag="h4" title="Arguments" id="staticFiles-arguments">
        <p>
          The <IJS>staticFiles</IJS> functions is passed an object of arguments.
        </p>

        <HashSection tag="h5" title="pages" id="staticFiles-pages">
          <p>
            An array of page descriptors. A page descriptor is an object with a{" "}
            <IJS>name</IJS> property defining which route to generate a page
            for. If the route (or any of its ancestors) has any params, they
            should be passed as an object with the <IJS>params</IJS> property.
          </p>

          <CodeBlock>
            {`const pages = [
  { name: "Home" },
  { name: "User", params: { id: 1 }},
  { name: "User", params: { id: 2 }},
];


staticFiles({
  // ...
  pages
});`}
          </CodeBlock>
        </HashSection>

        <HashSection tag="h5" title="router" id="staticFiles-router">
          <p>
            The router property is an object with two properties:{" "}
            <IJS>routes</IJS> and <IJS>getRouterOptions</IJS>.
          </p>

          <HashSection tag="h6" title="routes" id="staticFiles-routes">
            <p>
              <IJS>routes</IJS> is an array of route descriptors. This is the
              same array that you would use to create a router in client-side
              code.
            </p>

            <CodeBlock>
              {`const routes = prepareRoutes([
  {
    name: "Home",
    path: "",
  },
  {
    name: "User",
    path: "u/:id"
  }
]);

staticFiles({
  // ...
  router: {
    routes
  }
});`}
            </CodeBlock>
          </HashSection>

          <HashSection
            tag="h6"
            title="getRouterOptions()"
            id="staticFiles-getRouterOptions"
          >
            <p>
              The <IJS>getRouterOptions()</IJS> function returns the options for
              a router. This is only necessary if you need to use route
              interactions, side effects, or other route options.
            </p>
            <p>
              When you call <IJS>staticFiles()</IJS>, a router is created for
              each page. <IJS>staticFiles()</IJS> creates its own{" "}
              <IJS>history</IJS> instances, and gets its routes from the{" "}
              <IJS>routes</IJS> options, but the router may also need to be
              provided with other options, like route interactions.
            </p>
            <Note>
              <p>
                This is a function so that each router has its own instances of
                route interactions in order to avoid any possible issues with
                routers resetting other router's interactions.
              </p>
            </Note>

            <CodeBlock>
              {`import active from "@curi/active";

const getRouterOptions = () => ({
  routes: [active()]
});

staticFiles({
  // ...
  router: {
    getRouterOptions
  }
});`}
            </CodeBlock>
          </HashSection>
        </HashSection>

        <HashSection tag="h5" title="fallback" id="staticFiles-fallback">
          <p>
            Some hosts allow you to provide a fallback page for when a request
            doesn't match any of your generated HTML files. The{" "}
            <IJS>fallback</IJS> option takes the <IJS>pathname</IJS> it should
            generate page contents for and the <IJS>filename</IJS> to save the
            file as.
          </p>

          <CodeBlock>
            {`staticFiles({
  // ...
  fallback: {
    pathname: "/404",
    filename: "404.html"
  }
});`}
          </CodeBlock>
        </HashSection>

        <HashSection tag="h5" title="output" id="staticFiles-output">
          <p>
            The <IJS>output</IJS> property is used to describe how output files
            are generated and where they are stored.
          </p>

          <HashSection tag="h6" title="render()" id="staticFiles-render">
            <p>
              A function that takes the emitted <IJS>response</IJS>,{" "}
              <IJS>navigation</IJS>, and <IJS>router</IJS> for a location and
              returns the content that should be inserted into the page's HTML.
            </p>
            <p>
              <IJS>render()</IJS>s behavior will depend on what type of
              application is being built. For a React application, this would
              call the <IJS>renderToString()</IJS> method from{" "}
              <IJS>react-dom/server</IJS>. A Vue application would use{" "}
              <IJS>vue-server-renderer</IJS>.
            </p>
            <p>
              <IJS>render()</IJS> can return anything you want it to. This may
              be a string for simple rendering, or an object with multiple
              properties for more complex rendering (e.g. title/style properties
              for the <Cmp>head</Cmp> and rendered markup to insert in the{" "}
              <Cmp>body</Cmp>).
            </p>

            <CodeBlock lang="jsx">
              {`// for a React application
import { renderToString } from "react-dom";
import { curiProvider } from "@curi/react-dom";

function render(emitted) {
  const { router } = emitted;
  const Router = curiProvider(router);
  return renderToString(
    <Router>
      {({ response }) => {...}}
    </Router>
  )
}

staticFiles({
  // ...
  output: {
    render
  }
});`}
            </CodeBlock>
          </HashSection>

          <HashSection tag="h6" title="insert()" id="staticFiles-insert">
            <p>
              A function that takes the value returned by the{" "}
              <IJS>render()</IJS> function and inserts it into the full HTML for
              a page.
            </p>

            <CodeBlock>
              {`function insert(markup) {
  return \`<!doctype html>
<html>
  <head>
    <title>\${markup.title}</title>
  </head>
  <body>
    <div id="root">\${markup.html}</div>
    <script src="/static/js/bundle.js"></script>
  </body>
</html>\`;
}

// where the markup comes from the render() function:
function render() {
  return { title: "Yo!", html: "<div>Hey!</div>" };
}

staticFiles({
  // ...
  output: {
    insert
  }
});`}
            </CodeBlock>
          </HashSection>

          <HashSection tag="h6" title="dir" id="staticFiles-dir">
            <p>The folder where the generated HTML files should be saved.</p>

            <CodeBlock>
              {`staticFiles({
  // ...
  output: {
    dir: "dist"
  }
})`}
            </CodeBlock>
          </HashSection>

          <HashSection tag="h6" title="redirects" id="staticFiles-redirects">
            <p>
              If a route automatically redirects, you probably do not need to
              create an HTML file for it. If you set <IJS>redirects</IJS> to{" "}
              <IJS>true</IJS>, HTML files will be generated for redirect pages.
            </p>
            <p>
              Your server should be configured to return a fallback page when
              there is no content for a route, so you should not need to create
              HTML files for redirected pages.
            </p>
            <Note>
              <p>
                If you do create HTML files for redirects, be sure that your
                application knows how to render redirect responses. If you are
                using setting <IJS>emitRedirects</IJS> to <IJS>false</IJS> in
                your client side code, your application probably doesn't know
                how to render redirects.
              </p>
            </Note>
          </HashSection>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
