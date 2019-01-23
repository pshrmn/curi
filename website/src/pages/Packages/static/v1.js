import React from "react";

import {
  About,
  APIBlock,
  Section,
  Explanation,
  CodeBlock,
  IJS,
  Cmp,
  Note
} from "../../../components/package/common";

export default class StaticPackage extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <About>
          <Explanation>
            <p>
              The <IJS>@curi/static</IJS> package is for creating static assets
              for your server. Its exported functions should be used in a build
              script, not the source of an application.
            </p>
          </Explanation>
        </About>
        <APIBlock>
          <Section tag="h3" title="staticFiles()" id="staticFiles">
            <Explanation>
              <p>
                The <IJS>staticFiles()</IJS> function is used to generate HTML
                files for a static website and save them to the disk. An HTML
                file will be created for each page that you provide.
              </p>
              <p>
                Files will be created as <IJS>index.html</IJS> in the directory
                for their path. For example, the page for the pathname{" "}
                <IJS>/about</IJS> would create an <IJS>/about/index.html</IJS>{" "}
                file.
              </p>
            </Explanation>
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

            <Explanation>
              <p>
                <IJS>staticFiles()</IJS> returns a Promise that resolve with an
                array of results. Each entry in the results array contains the{" "}
                <IJS>pathname</IJS> of the result, a <IJS>success</IJS> boolean,
                and, if <IJS>success</IJS> is false, the <IJS>error</IJS> that
                occurred.
              </p>
              <p>
                It can be useful to log the results to easily see what pages
                were successfully built and which had issues.
              </p>
            </Explanation>
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

            <Section tag="h4" title="Arguments" id="staticFiles-arguments">
              <Explanation>
                <p>
                  The <IJS>staticFiles</IJS> functions is passed an object of
                  arguments.
                </p>
              </Explanation>

              <Section tag="h5" title="pages" id="staticFiles-pages">
                <Explanation>
                  <p>
                    An array of page descriptors. A page descriptor is an object
                    with a <IJS>name</IJS> property defining which route to
                    generate a page for. If the route (or any of its ancestors)
                    has any params, they should be passed as an object with the{" "}
                    <IJS>params</IJS> property.
                  </p>
                </Explanation>
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
              </Section>

              <Section tag="h5" title="router" id="staticFiles-router">
                <Explanation>
                  <p>
                    The router property is an object with two properties:{" "}
                    <IJS>routes</IJS> and <IJS>getRouterOptions</IJS>.
                  </p>
                </Explanation>

                <Section tag="h6" title="routes" id="staticFiles-routes">
                  <Explanation>
                    <p>
                      <IJS>routes</IJS> is an array of route descriptors. This
                      is the same array that you would use to create a router in
                      client-side code.
                    </p>
                  </Explanation>
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
                </Section>

                <Section
                  tag="h6"
                  title="getRouterOptions()"
                  id="staticFiles-getRouterOptions"
                >
                  <Explanation>
                    <p>
                      The <IJS>getRouterOptions()</IJS> function returns the
                      options for a router. This is only necessary if you need
                      to use route interactions, side effects, or other route
                      options.
                    </p>
                    <p>
                      When you call <IJS>staticFiles()</IJS>, a router is
                      created for each page. <IJS>staticFiles()</IJS> creates
                      its own <IJS>history</IJS> instances, and gets its routes
                      from the <IJS>routes</IJS> options, but the router may
                      also need to be provided with other options, like route
                      interactions.
                    </p>
                    <Note>
                      This is a function so that each router has its own
                      instances of route interactions in order to avoid any
                      possible issues with routers resetting other router's
                      interactions.
                    </Note>
                  </Explanation>
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
                </Section>
              </Section>

              <Section tag="h5" title="fallback" id="staticFiles-fallback">
                <Explanation>
                  <p>
                    Some hosts allow you to provide a fallback page for when a
                    request doesn't match any of your generated HTML files. The{" "}
                    <IJS>fallback</IJS> option takes the <IJS>pathname</IJS> it
                    should generate page contents for and the{" "}
                    <IJS>filename</IJS> to save the file as.
                  </p>
                </Explanation>

                <CodeBlock>
                  {`staticFiles({
  // ...
  fallback: {
    pathname: "/404",
    filename: "404.html"
  }
});`}
                </CodeBlock>
              </Section>

              <Section tag="h5" title="output" id="staticFiles-output">
                <Explanation>
                  <p>
                    The <IJS>output</IJS> property is used to describe how
                    output files are generated and where they are stored.
                  </p>
                </Explanation>

                <Section tag="h6" title="render()" id="staticFiles-render">
                  <Explanation>
                    <p>
                      A function that takes the emitted <IJS>response</IJS>,{" "}
                      <IJS>navigation</IJS>, and <IJS>router</IJS> for a
                      location and returns the content that should be inserted
                      into the page's HTML.
                    </p>
                    <p>
                      <IJS>render()</IJS>s behavior will depend on what type of
                      application is being built. For a React application, this
                      would call the <IJS>renderToString()</IJS> method from{" "}
                      <IJS>react-dom/server</IJS>. A Vue application would use{" "}
                      <IJS>vue-server-renderer</IJS>.
                    </p>
                    <p>
                      <IJS>render()</IJS> can return anything you want it to.
                      This may be a string for simple rendering, or an object
                      with multiple properties for more complex rendering (e.g.
                      title/style properties for the <Cmp>head</Cmp> and
                      rendered markup to insert in the <Cmp>body</Cmp>).
                    </p>
                  </Explanation>
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
                </Section>

                <Section tag="h6" title="insert()" id="staticFiles-insert">
                  <Explanation>
                    <p>
                      A function that takes the value returned by the{" "}
                      <IJS>render()</IJS> function and inserts it into the full
                      HTML for a page.
                    </p>
                  </Explanation>
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
                </Section>

                <Section tag="h6" title="dir" id="staticFiles-dir">
                  <Explanation>
                    <p>
                      The folder where the generated HTML files should be saved.
                    </p>
                  </Explanation>
                  <CodeBlock>
                    {`staticFiles({
  // ...
  output: {
    dir: "dist"
  }
})`}
                  </CodeBlock>
                </Section>

                <Section tag="h6" title="redirects" id="staticFiles-redirects">
                  <Explanation>
                    <p>
                      If a route automatically redirects, you probably do not
                      need to create an HTML file for it. If you set{" "}
                      <IJS>redirects</IJS> to <IJS>true</IJS>, HTML files will
                      be generated for redirect pages.
                    </p>
                    <p>
                      Your server should be configured to return a fallback page
                      when there is no content for a route, so you should not
                      need to create HTML files for redirected pages.
                    </p>
                    <Note>
                      If you do create HTML files for redirects, be sure that
                      your application knows how to render redirect responses.
                      If you are using <IJS>emitRedirects = false</IJS> in your
                      client side code, your application probably doesn't know
                      how to render redirects.
                    </Note>
                  </Explanation>
                </Section>
              </Section>
            </Section>
          </Section>

          <Section tag="h3" title="pathnames()" id="pathnames">
            <Explanation>
              <p>
                The <IJS>pathnames()</IJS> function is used to generate
                pathnames from an array of provided page descriptors. This can
                be useful for generating a sitemap.
              </p>
            </Explanation>

            <Section tag="h4" title="Arguments" id="pathnames-arguments">
              <Section tag="h5" title="routes" id="pathnames-routes">
                <Explanation>
                  <p>
                    The array of route descriptors that is passed to a router.
                  </p>
                </Explanation>
                <CodeBlock>
                  {`routes = prepareRoutes([
  {
    name: "Home",
    path: "",
  },
  {
    name: "User",
    path: "u/:id"
  }
]);


const paths = pathnames({
  // ...
  routes
});`}
                </CodeBlock>
              </Section>

              <Section tag="h5" title="pages" id="pathnames-pages">
                <Explanation>
                  <p>
                    An array of page descriptors. A page descriptor is an object
                    with a <IJS>name</IJS> property defining which route to
                    generate a page for. If the route (or any of its ancestors)
                    has any params, they should be passed as an object with the{" "}
                    <IJS>params</IJS> property.
                  </p>
                </Explanation>
                <CodeBlock>
                  {`const pages = [
  { name: "Home" },
  { name: "User", params: { id: 1 }},
  { name: "User", params: { id: 2 }},
];


const paths = pathnames({
  // ...
  pages
});`}
                </CodeBlock>
              </Section>

              <Section
                tag="h5"
                title="routerOptions"
                id="pathnames-routerOptions"
              >
                <Explanation>
                  <p>
                    The options for a router, predominantly useful for passing
                    any route interactions the application may need while
                    rendering.
                  </p>
                </Explanation>
                <CodeBlock>
                  {`import active from "@curi/active";
const routerOptions = {
  routes: [active()]
};

const paths = pathnames({
  // ...
  routerOptions
});`}
                </CodeBlock>
              </Section>
            </Section>
          </Section>
        </APIBlock>
      </React.Fragment>
    );
  }
}
