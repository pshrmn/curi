import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Cmp,
  Note
} from "../../../../../components/package/common";

const argumentsMeta = {
  title: "Arguments",
  hash: "static_files-arguments"
};
export const meta = {
  title: "static_files()",
  hash: "static_files",
  children: [argumentsMeta]
};

export function StaticFilesAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        The <IJS>static_files()</IJS> function is used to generate HTML files
        for a static website and save them to the disk. An HTML file will be
        created for each page that you provide.
      </p>
      <p>
        Files will be created as <IJS>index.html</IJS> in the directory for
        their path. For example, the page for the pathname <IJS>/about</IJS>{" "}
        would create an <IJS>/about/index.html</IJS> file.
      </p>

      <CodeBlock>
        {`import { static_files } from '@curi/static';
import { join } from "path";

import routes from "../src/routes";

static_files({
  routes,
  pages: [{ name: "Home" }, { name: "About" }],
  dir: join(process.cwd(), "public"),
  render: () => {...},
  insert: () => {...}
});`}
      </CodeBlock>

      <p>
        <IJS>static_files()</IJS> returns a Promise that resolve with an array
        of results. Each entry in the results array contains the{" "}
        <IJS>pathname</IJS> of the result, a <IJS>success</IJS> boolean, and, if{" "}
        <IJS>success</IJS> is false, the <IJS>error</IJS> that occurred.
      </p>
      <p>
        It can be useful to log the results to easily see what pages were
        successfully built and which had issues.
      </p>

      <CodeBlock>
        {`static_files({...})
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

      <HashSection tag="h4" meta={argumentsMeta}>
        <p>
          The <IJS>static_files</IJS> functions is passed an object of
          arguments.
        </p>

        <HashSection
          tag="h5"
          meta={{ title: "pages", hash: "static_files-pages" }}
        >
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


static_files({
  // ...
  pages
});`}
          </CodeBlock>
        </HashSection>

        <HashSection
          tag="h5"
          meta={{ title: "router", hash: "static_files-router" }}
        >
          <p>
            The router property is an object with two properties:{" "}
            <IJS>routes</IJS> and <IJS>getRouterOptions</IJS>.
          </p>

          <HashSection
            tag="h6"
            meta={{ title: "routes", hash: "static_files-routes" }}
          >
            <p>
              <IJS>routes</IJS> is an array of route descriptors. This is the
              same array that you would use to create a router in client-side
              code.
            </p>

            <CodeBlock>
              {`const routes = prepare_routes([
  {
    name: "Home",
    path: "",
  },
  {
    name: "User",
    path: "u/:id"
  }
]);

static_files({
  // ...
  router: {
    routes
  }
});`}
            </CodeBlock>
          </HashSection>

          <HashSection
            tag="h6"
            meta={{
              title: "getRouterOptions()",
              hash: "static_files-getRouterOptions"
            }}
          >
            <p>
              The <IJS>getRouterOptions()</IJS> function returns the options for
              a router. This is only necessary if you need to use route
              interactions, side effects, or other route options.
            </p>
            <p>
              When you call <IJS>static_files()</IJS>, a router is created for
              each page. <IJS>static_files()</IJS> creates its own{" "}
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

static_files({
  // ...
  router: {
    getRouterOptions
  }
});`}
            </CodeBlock>
          </HashSection>
        </HashSection>

        <HashSection
          tag="h5"
          meta={{ title: "fallback", hash: "static_files-fallback" }}
        >
          <p>
            Some hosts allow you to provide a fallback page for when a request
            doesn't match any of your generated HTML files. The{" "}
            <IJS>fallback</IJS> option takes the <IJS>pathname</IJS> it should
            generate page contents for and the <IJS>filename</IJS> to save the
            file as.
          </p>

          <CodeBlock>
            {`static_files({
  // ...
  fallback: {
    pathname: "/404",
    filename: "404.html"
  }
});`}
          </CodeBlock>
        </HashSection>

        <HashSection
          tag="h5"
          meta={{ title: "output", hash: "static_files-output" }}
        >
          <p>
            The <IJS>output</IJS> property is used to describe how output files
            are generated and where they are stored.
          </p>

          <HashSection
            tag="h6"
            meta={{ title: "render()", hash: "static_files-render" }}
          >
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
import { create_router_component } from "@curi/react-dom";

function render(emitted) {
  const { router } = emitted;
  const Router = create_router_component(router);
  return renderToString(
    <Router>
      <App />
    </Router>
  )
}

static_files({
  // ...
  output: {
    render
  }
});`}
            </CodeBlock>
          </HashSection>

          <HashSection
            tag="h6"
            meta={{ title: "insert()", hash: "static_files-insert" }}
          >
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
    <div, hash: "root">\${markup.html}</div>
    <script src="/static/js/bundle.js"></script>
  </body>
</html>\`;
}

// where the markup comes from the render() function:
function render() {
  return { title: "Yo!", html: "<div>Hey!</div>" };
}

static_files({
  // ...
  output: {
    insert
  }
});`}
            </CodeBlock>
          </HashSection>

          <HashSection
            tag="h6"
            meta={{ title: "dir", hash: "static_files-dir" }}
          >
            <p>The folder where the generated HTML files should be saved.</p>

            <CodeBlock>
              {`static_files({
  // ...
  output: {
    dir: "dist"
  }
})`}
            </CodeBlock>
          </HashSection>

          <HashSection
            tag="h6"
            meta={{ title: "redirects", hash: "static_files-redirects" }}
          >
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
