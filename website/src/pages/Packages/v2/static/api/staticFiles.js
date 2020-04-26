import React from "react";

import {
  HashSection,
  Paragraph,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

let argumentsMeta = {
  title: "Arguments",
  hash: "staticFiles-arguments"
};
export let meta = {
  title: "staticFiles",
  hash: "staticFiles"
};

export function StaticFilesAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <Paragraph>
        The <IJS>staticFiles</IJS> function is used to generate HTML files for a
        static website and save them to the disk. An HTML file will be created
        for each page that you provide.
      </Paragraph>
      <Paragraph>
        Files will be created as <IJS>index.html</IJS> in the directory for
        their path. For example, the page for the pathname <IJS>/about</IJS>{" "}
        would create an <IJS>/about/index.html</IJS> file.
      </Paragraph>

      <CodeBlock>
        {`import { staticFiles } from '@curi/static';
import { join } from "path";

import routes from "../src/routes";

staticFiles({
  routes,
  pages: [{ name: "Home" }, { name: "About" }],
  output: {
    dir: join(process.cwd(), "public"),
    render: () => {...}
  }
});`}
      </CodeBlock>

      <Paragraph>
        <IJS>staticFiles</IJS> returns a Promise that resolve with an array of
        results. Each entry in the results array contains the{" "}
        <IJS>pathname</IJS> of the result, a <IJS>success</IJS> boolean, and, if{" "}
        <IJS>success</IJS> is false, the <IJS>error</IJS> that occurred.
      </Paragraph>
      <Paragraph>
        It can be useful to log the results to easily see what pages were
        successfully built and which had issues.
      </Paragraph>

      <CodeBlock>
        {`staticFiles({...})
  .then(results => {
    let resultString = results
      .map(result => {
        return result.success
          ? \`✔ \${result.pathname}\`
          : \`✖ \${result.pathname} (\${result.error.message})\`;
      })
      .join("\\n");
    console.log(resultString);
  });`}
      </CodeBlock>

      <HashSection tag="h3" meta={argumentsMeta}>
        <Paragraph>
          The <IJS>staticFiles</IJS> functions is passed an object of arguments.
        </Paragraph>

        <HashSection
          tag="h4"
          meta={{ title: "pages", hash: "staticFiles-pages" }}
        >
          <Paragraph>
            An array of page descriptors. A page descriptor is an object with a{" "}
            <IJS>name</IJS> property defining which route to generate a page
            for. If the route (or any of its ancestors) has any params, they
            should be passed as an object with the <IJS>params</IJS> property.
          </Paragraph>

          <CodeBlock>
            {`let pages = [
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

        <HashSection
          tag="h4"
          meta={{ title: "router", hash: "staticFiles-router" }}
        >
          <Paragraph>
            The router property is an object with two properties:{" "}
            <IJS>routes</IJS> and <IJS>options</IJS>.
          </Paragraph>

          <HashSection
            tag="h5"
            meta={{ title: "routes", hash: "staticFiles-routes" }}
          >
            <Paragraph>
              <IJS>routes</IJS> is an array of route descriptors. This is the
              same array that you would use to create a router in client-side
              code.
            </Paragraph>

            <CodeBlock>
              {`let routes = prepare_routes([
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
            tag="h5"
            meta={{
              title: "options",
              hash: "staticFiles-options"
            }}
          >
            <Paragraph>
              The <IJS>options</IJS> object is the options for a router. This is
              only necessary if you need to use side effects or other route
              options.
            </Paragraph>

            <Paragraph>
              When you call <IJS>staticFiles</IJS>, a router is created for each
              page. <IJS>staticFiles</IJS> creates its own <IJS>history</IJS>{" "}
              instances, and gets its routes from the <IJS>routes</IJS> options,
              but the router may also need to be provided with other options.
            </Paragraph>

            <CodeBlock>
              {`staticFiles({
  // ...
  router: {
    options: {
      sideEffects: [...]
    }
  }
});`}
            </CodeBlock>
          </HashSection>
        </HashSection>

        <HashSection
          tag="h4"
          meta={{ title: "fallback", hash: "staticFiles-fallback" }}
        >
          <Paragraph>
            Some hosts allow you to provide a fallback page for when a request
            doesn't match any of your generated HTML files. The{" "}
            <IJS>fallback</IJS> option takes the <IJS>pathname</IJS> it should
            generate page contents for and the <IJS>filename</IJS> to save the
            file as.
          </Paragraph>

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

        <HashSection
          tag="h4"
          meta={{ title: "output", hash: "staticFiles-output" }}
        >
          <Paragraph>
            The <IJS>output</IJS> property is used to describe how output files
            are generated and where they are stored.
          </Paragraph>

          <HashSection
            tag="h5"
            meta={{ title: "render", hash: "staticFiles-render" }}
          >
            <Paragraph>
              A function that takes the emitted <IJS>response</IJS>,{" "}
              <IJS>navigation</IJS>, and <IJS>router</IJS> for a location and
              returns the page's HTML.
            </Paragraph>

            <Paragraph>
              How the content is generated will depend on what type of
              application is being built. For a React application, this would
              call the <IJS>renderToString</IJS> method from{" "}
              <IJS>react-dom/server</IJS>. A Vue application would use{" "}
              <IJS>vue-server-renderer</IJS>.
            </Paragraph>

            <Paragraph>
              <IJS>render</IJS> is expected to return the complete HTML for a
              page
            </Paragraph>

            <Paragraph>
              If the <IJS>response</IJS> should not be rendered, the{" "}
              <IJS>render</IJS> function should throw an error.
            </Paragraph>

            <CodeBlock lang="jsx">
              {`// for a React application
import { renderToString } from "react-dom";
import { createRouterComponent } from "@curi/react-dom";

function render(emitted) {
  let { router, response } = emitted;
  // if the route shouldn't be rendered, throw
  if (response.redirect) {
    throw new Error(\`\${response.location.pathname} redirects\`);
  }

  let Router = createRouterComponent(router);
  // generate markup
  let markup = renderToString(
    <Router>
      <App />
    </Router>
  );

  // return full HTML for the page
  return \`<!doctype html>
<html>
  <head>...</head>
  <body>
    <div id="root">
      \${markup}
    </div>
  </body>
</html>\`;
}

staticFiles({
  // ...
  output: {
    render
  }
});`}
            </CodeBlock>
          </HashSection>

          <HashSection
            tag="h5"
            meta={{ title: "dir", hash: "staticFiles-dir" }}
          >
            <Paragraph>
              The folder where the generated HTML files should be saved.
            </Paragraph>

            <CodeBlock>
              {`staticFiles({
  // ...
  output: {
    dir: "dist"
  }
})`}
            </CodeBlock>
          </HashSection>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
