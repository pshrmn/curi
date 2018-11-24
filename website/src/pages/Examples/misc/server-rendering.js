import React from "react";

import { Section } from "../../../components/layout/Sections";
import { InlineJS as IJS } from "../../../components/highlight/Inline";
import { CodeBlock } from "../../../components/layout/Groups";
import { Explanation } from "../../../components/layout/Groups";
import OnGithub from "../../../components/example/OnGithub";

const meta = {
  title: "Server Rendering"
};

export default function ServerRenderingExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Section title="Explanation" id="explanation">
        <Explanation>
          <p>
            Server rendering with Curi is pretty similar to client side
            rendering. The server should have a catch all route handler that
            will respond to all (non-static file) requests.
          </p>
        </Explanation>

        <CodeBlock lang="javascript">
          {`// express
          
  function catchAll(req, res) {
    // 1. Create a memory history using the requested location
    const history = InMemory({ locations: [req.url]});

    // 2. Create a router and the root React routing component
    const router = curi(history, routes);
    const Router = curiProvider(router);

    // 3. Wait for the response to be generated
    router.once(({ response, navigation }) => {
      // 4. Generate the HTML markup by rendering the <Router>
      const markup = renderToString(
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

        <Explanation>
          <p>
            The above example is very basic. Some other things that you might
            need to consider are:
          </p>

          <ul>
            <li>
              Data loading — You would need to maintain two copies of your
              routes if you want to handle data fetching on the server
              differently than it works on the client side. This is not
              something that I have explored very closely yet, so I don't have
              any recommendations on exactly how to approach this.
            </li>
            <li>
              Code splitting — In order to use dynamic imports on the server,
              you will probably need to use a Babel plugin like{" "}
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
              Then, when starting the server, make sure that BABEL_ENV=server.
              <CodeBlock lang="markup">
                {`cross-env BABEL_ENV=server npm start`}
              </CodeBlock>
            </li>
          </ul>
        </Explanation>
      </Section>

      <OnGithub path="misc/server-rendering" />
    </React.Fragment>
  );
}
