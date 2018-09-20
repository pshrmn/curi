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
import { Note } from "../../components/Messages";

export default class StaticPackage extends React.PureComponent {
  render() {
    const { name, version, globalName } = this.props;
    return (
      <BasePackage
        name={name}
        version={version}
        globalName={globalName}
        unpkg={false}
        about={
          <div>
            <p>
              The <IJS>@curi/static</IJS> package is for creating static assets
              for your server. Its exported functions should be used in a build
              script, not the source of an application.
            </p>
          </div>
        }
      >
        <APIBlock>
          <Section tag="h3" title="staticFiles()" id="staticFiles">
            <SideBySide>
              <Explanation>
                <p>
                  The <IJS>staticFiles()</IJS> function is used to generate HTML
                  files for a static website and save them to the disk. An HTML
                  file will be created for each page that you provide.
                </p>
                <p>
                  Files will be created as <IJS>index.html</IJS> in the
                  directory for their path. For example, the page for the
                  pathname <IJS>/about</IJS> would create an{" "}
                  <IJS>/about/index.html</IJS> file.
                </p>
              </Explanation>
              <CodeBlock>
                {`import { staticFiles } from '@curi/static';
import { join } from "path";

import routes from "../src/routes";

staticFiles({
  routes,
  pages: [{ name}],
  outputDir: join(process.cwd(), "public"),
  render: () => {...},
  insert: () => {...}
});`}
              </CodeBlock>
            </SideBySide>

            <Section tag="h4" title="Arguments" id="staticFiles-arguments">
              <Subsection tag="h5" title="routes" id="staticFiles-routes">
                <SideBySide>
                  <Explanation>
                    <p>
                      The array of route descriptors that is passed to a router.
                    </p>
                  </Explanation>
                  <CodeBlock>
                    {`routes = [
  {
    name: "Home",
    path: "",
  },
  {
    name: "User",
    path: "u/:id"
  }
];


staticFiles({
  // ...
  routes
});`}
                  </CodeBlock>
                </SideBySide>
              </Subsection>
              <Subsection tag="h5" title="pages" id="staticFiles-pages">
                <SideBySide>
                  <Explanation>
                    <p>
                      An array of page descriptors. A page descriptor is an
                      object with a <IJS>name</IJS> property defining which
                      route to generate a page for. If the route (or any of its
                      ancestors) has any params, they should be passed as an
                      object with the <IJS>params</IJS> property.
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
                </SideBySide>
              </Subsection>
              <Subsection tag="h5" title="render()" id="staticFiles-render">
                <SideBySide>
                  <Explanation>
                    <p>
                      A function that takes the emitted <IJS>response</IJS>,{" "}
                      <IJS>navigation</IJS>, and <IJS>router</IJS> for a
                      location and returns the markup generated from those
                      values.
                    </p>
                    <p>
                      <IJS>render()</IJS>s behavior will depend on what type of
                      application is being built. For a React application, this
                      would call the <IJS>renderToString()</IJS> method from{" "}
                      <IJS>react-dom/server</IJS>. A Vue application would use{" "}
                      <IJS>vue-server-renderer</IJS>.
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
  render
});`}
                  </CodeBlock>
                </SideBySide>
              </Subsection>
              <Subsection tag="h5" title="insert()" id="staticFiles-insert">
                <SideBySide>
                  <Explanation>
                    <p>
                      A function that takes the markup returned by the{" "}
                      <IJS>render()</IJS> function and inserts it into the full
                      HTML for a page. The function also receives the emitted
                      values (<IJS>response</IJS>, <IJS>navigation</IJS>, and{" "}
                      <IJS>router</IJS>) in case you need to use those values.
                    </p>
                  </Explanation>
                  <CodeBlock>
                    {`function insert(markup, emitted) {
  return \`<!doctype html>
<html>
  <head>
    <title>\${emitted.response.title}</title>
  </head>
  <body>
    <div id="root">\${markup}</div>
    <script src="/static/js/bundle.js"></script>
  </body>
</html>\`;
}


staticFiles({
  // ...
  insert
});`}
                  </CodeBlock>
                </SideBySide>
              </Subsection>
              <Subsection tag="h5" title="outputDir" id="staticFiles-outputDir">
                <SideBySide>
                  <Explanation>
                    <p>
                      The folder where the generated HTML files should be saved.
                    </p>
                  </Explanation>
                </SideBySide>
              </Subsection>
              <Subsection
                tag="h5"
                title="outputRedirects"
                id="staticFiles-outputRedirects"
              >
                <SideBySide>
                  <Explanation>
                    <p>
                      If a route automatically redirects, you probably do not
                      need to create an HTML file for it. If you set{" "}
                      <IJS>outputRedirects</IJS> to <IJS>true</IJS>, HTML files
                      will be generated for redirect pages.
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
                </SideBySide>
              </Subsection>
              <Subsection
                tag="h5"
                title="routerOptions()"
                id="staticFiles-routerOptions"
              >
                <SideBySide>
                  <Explanation>
                    <p>
                      The <IJS>routerOptions()</IJS> function returns the
                      options for a router.
                    </p>
                    <p>
                      When you call <IJS>staticFiles()</IJS>, a number of
                      routers will be created behind the scenes.{" "}
                      <IJS>staticFiles()</IJS> creates its own{" "}
                      <IJS>history</IJS> instances, and gets its routes from the{" "}
                      <IJS>routes</IJS> options, but the router may also need to
                      be provided with other options, like route interactions.
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
const routerOptions = () => ({
  routes: [active()]
});

staticFiles({
  // ...
  routerOptions
});`}
                  </CodeBlock>
                </SideBySide>
              </Subsection>
            </Section>
          </Section>

          <Section tag="h3" title="pathnames()" id="pathnames">
            <SideBySide>
              <Explanation>
                <p>
                  The <IJS>pathnames()</IJS> function is used to generate
                  pathnames from an array of provided page descriptors. This can
                  be useful for generating a sitemap.
                </p>
              </Explanation>
            </SideBySide>
            <Section tag="h4" title="Arguments" id="pathnames-arguments">
              <Subsection tag="h5" title="routes" id="pathnames-routes">
                <SideBySide>
                  <Explanation>
                    <p>
                      The array of route descriptors that is passed to a router.
                    </p>
                  </Explanation>
                  <CodeBlock>
                    {`routes = [
  {
    name: "Home",
    path: "",
  },
  {
    name: "User",
    path: "u/:id"
  }
];


const paths = pathnames({
  // ...
  routes
});`}
                  </CodeBlock>
                </SideBySide>
              </Subsection>
              <Subsection tag="h5" title="pages" id="pathnames-pages">
                <SideBySide>
                  <Explanation>
                    <p>
                      An array of page descriptors. A page descriptor is an
                      object with a <IJS>name</IJS> property defining which
                      route to generate a page for. If the route (or any of its
                      ancestors) has any params, they should be passed as an
                      object with the <IJS>params</IJS> property.
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
                </SideBySide>
              </Subsection>
              <Subsection
                tag="h5"
                title="routerOptions"
                id="pathnames-routerOptions"
              >
                <SideBySide>
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
                </SideBySide>
              </Subsection>
            </Section>
          </Section>
        </APIBlock>
      </BasePackage>
    );
  }
}
