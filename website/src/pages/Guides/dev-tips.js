import React from "react";

import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../components/highlight/Inline";
import { Section } from "../../components/layout/Sections";
import { CodeBlock, Explanation } from "../../components/layout/Groups";

const meta = {
  title: "Development Tips"
};

export default function DevTipsGuide() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Section title="Hot Module Replacement" id="hmr">
        <Explanation>
          <p>
            Hot module replacement (HMR) can make development more convenient by
            automatically updating page content without refreshing the page.
            With Webpack, there are only a few steps required to get this
            working with Curi.
          </p>
          <p>
            The first step is to get your Webpack configuration setup for hot
            module replacement. Webpack's{" "}
            <a href="https://webpack.js.org/guides/hot-module-replacement/">
              hot module replacement guide
            </a>{" "}
            is a good resource to learn how to do this.
          </p>
        </Explanation>

        <Explanation>
          <p>
            The next step is identifying what file(s) you want to watch. A
            watched file will be notified when it, any of its dependencies, or
            any dependencies depndencies (and so on down the line) are updated.
            The best way to do this with a Curi application is to watch the file
            where your routes are defined.
          </p>
          <p>
            The <IJS>router</IJS> has a <IJS>refresh()</IJS> method that is used
            for providing new routes to the router. When it is called, it will
            also generate and emit a new response.
          </p>
          <p>
            <IJS>module.hot.accept()</IJS> is used for watching a file and
            calling a callback when that files or any files in its dependency
            chain are updated. In the callback, we can re-import the routes and
            pass them to the router's <IJS>refresh()</IJS> method. This will in
            turn emit a new response, which will automatically be rendered.
          </p>
          <p>
            With that, your application should be setup to support hot module
            replacement.
          </p>
        </Explanation>
        <CodeBlock data-line="9-14">
          {`// index.js
import { curi } from "@curi/core";
import Browser from "@hickory/browser";
import routes from "./routes";

const history = Browser();
const router = curi(history, routes);

if (module.hot) {
  module.hot.accept("./routes.js", function() {
    const nextRoutes = require("./routes").default;
    router.refresh(nextRoutes);
  });
}`}
        </CodeBlock>
      </Section>
    </React.Fragment>
  );
}
