import React from "react";

import {
  PlainSection,
  HashSection,
  CodeBlock,
  IJS
} from "../../components/guide/common";

const meta = {
  title: "Development Tips"
};

const hmrMeta = {
  title: "Hot Module Replacement",
  hash: "hmr"
};
const contents = [hmrMeta];

function DevTipsGuide() {
  return (
    <React.Fragment>
      <PlainSection>
        <h1>{meta.title}</h1>
      </PlainSection>

      <HashSection meta={hmrMeta} tag="h2">
        <p>
          Hot module replacement (HMR) can make development more convenient by
          automatically updating page content without refreshing the page. With
          Webpack, there are only a few steps required to get this working with
          Curi.
        </p>

        <p>
          The first step is to get your Webpack configuration setup for hot
          module replacement. Webpack's{" "}
          <a href="https://webpack.js.org/guides/hot-module-replacement/">
            hot module replacement guide
          </a>{" "}
          is a good resource to learn how to do this.
        </p>

        <p>
          The next step is identifying what file(s) you want to watch. A watched
          file will be notified when it, any of its dependencies, or any
          dependencies depndencies (and so on down the line) are updated.
          Ideally, a file close to the root (<IJS>index.js</IJS>) is watched. If
          you define the router in its own module, you can watch the file.
        </p>

        <p>
          <IJS>module.hot.accept</IJS> is used for watching a file and calling a
          callback when that files or any files in its dependency chain are
          updated. In the callback, we can re-import the router and use that to
          re-render the application.
        </p>

        <CodeBlock>
          {`// index.js
import router from "./router";

render(router);

if (module.hot) {
  module.hot.accept("./router.js", function() {
    const nextRouter = require("./router").default;
    render(nextRouter);
  });
}`}
        </CodeBlock>

        <p>
          The exact implementation will vary based on how you are rendering the
          application. It may require a little bit of duplication, but this is
          all code that will be removed in your production build. For example,
          this documentation website uses the following code to hot replace with
          React.
        </p>

        <CodeBlock lang="jsx">
          {`if (process.env.NODE_ENV !== "production") {
  if (module.hot) {
    module.hot.accept("./router", () => {
      const nextRouter = require("./router").default;
      const Router = createRouterComponent(nextRouter);
      render(
        <Router>
          <App />
        </Router>,
        document.getElementById("root")
      );
    });
  }
}`}
        </CodeBlock>
      </HashSection>
    </React.Fragment>
  );
}

export { DevTipsGuide as component, contents };
