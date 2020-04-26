import React from "react";

import {
  Page,
  HashSection,
  Paragraph,
  CodeBlock,
  IJS,
  OnGithub,
  onGitHubMeta
} from "../../components/example/common";

let meta = {
  title: "Server Rendering"
};

let explanationMeta = {
  title: "Explanation",
  hash: "explanation"
};

let contents = [explanationMeta, onGitHubMeta];

function ServerRenderingExample() {
  return (
    <Page title={meta.title}>
      <HashSection meta={explanationMeta} tag="h2">
        <Paragraph>
          Server rendering with Curi is pretty similar to client side rendering.
          The server should have a catch all route handler that will respond to
          all (non-static file) requests.
        </Paragraph>

        <CodeBlock lang="javascript">
          {`// express
import { createReusable } from "@curi/in-memory";

// 1. Create a history function
let reusable = createReusable();

function catchAll(req, res) {
  // 2. Create a router using the current location
  //    and the root React routing component
  let router = createRouter(reusable, routes, {
    history: { location: req.url }
  });
  let Router = createRouterComponent(router);

  // 3. Wait for the response to be generated
  router.once(({ response, navigation }) => {
    // 4. Generate the HTML markup by rendering the <Router>
    let markup = renderToString(
      <Router>
        {renderFunction}
      </Router>
    );
    // 5. Insert the markup into the page's html and send it
    res.send(renderFullPage(markup));
  });
}

app.get("*", catchAll);`}
        </CodeBlock>

        <Paragraph>
          The above example is very basic. Some other things that you might need
          to consider are:
        </Paragraph>

        <ul>
          <li>
            Data loading — You would need to maintain two copies of your routes
            if you want to handle data fetching on the server differently than
            it works on the client side. This is not something that I have
            explored very closely yet, so I don't have any recommendations on
            exactly how to approach this.
          </li>
          <li>
            Code splitting — In order to use dynamic imports on the server, you
            will probably need to use a Babel plugin like{" "}
            <IJS>dynamic-import-node</IJS>. Unfortunately,{" "}
            <IJS>dynamic-import-node</IJS> breaks Webpack's code splitting. In
            order for your code to be split into multiple bundles, you should
            ensure that <IJS>dynamic-import-node</IJS> isn't being run when
            building your client side bundle. The solution used in this
            experiment is to use the <IJS>env</IJS> property.
            <CodeBlock lang="javascript">
              {`{
    "presets": [ "es2015", "react" ],
    "plugins": [
      "syntax-dynamic-import"
    ],
    "env": {
      "server": {
        "plugins": ["dynamic-import-node"]
      }
    }
  }`}
            </CodeBlock>
            <Paragraph>
              Then, when starting the server, make sure that BABEL_ENV=server.
            </Paragraph>
            <CodeBlock lang="markup">
              {`cross-env BABEL_ENV=server npm start`}
            </CodeBlock>
          </li>
        </ul>
      </HashSection>

      <OnGithub path="misc/server-rendering" />
    </Page>
  );
}

export { ServerRenderingExample as component, contents };
