import React from "react";
import { Link } from "@curi/react-dom";

import {
  TitledPlainSection,
  HashSection,
  Paragraph,
  CodeBlock,
  IJS
} from "../../components/guide/common";

let meta = {
  title: "Sync or Async"
};

let thinkMeta = {
  title: "Async Things to Think About",
  hash: "think"
};

let contents = [thinkMeta];

function SyncAndAsyncGuide() {
  return (
    <React.Fragment>
      <TitledPlainSection title={meta.title}>
        <Paragraph>
          With Curi, routes can be synchronous or asynchronous. By default,
          routes are synchronous. If a route has a <IJS>resolve</IJS> function,
          it becomes async.
        </Paragraph>

        <Paragraph>
          When a navigation event is triggered (e.g. clicking a link or button),
          the router will match a route. If the route is synchronous, the
          response will be emitted immediately. If the route is asynchronous,
          the response will not be emitted until the route's async functions
          have finished. Asynchronous routes are useful for code splitting and
          preloading data.
        </Paragraph>

        <CodeBlock>
          {`// sync
{ name: "Home", path: "" },

// async
{
  name: "User",
  path: "user/:id,
  // any functions in here makes the route async
  resolve() {
    return import("./components/User");
  }
}`}
        </CodeBlock>
      </TitledPlainSection>

      <HashSection meta={thinkMeta} tag="h2">
        <Paragraph>
          For the most part, it shouldn't matter to you (or your users) whether
          routes are sync or async, but there are a couple of things that you
          should be aware of when it comes to async matching.
        </Paragraph>

        <ol>
          <li>
            <Paragraph>
              If the initial route that matches is async and you try to render
              immediately, the <IJS>response</IJS> will be <IJS>undefined</IJS>.
              You can wait to render until the initial response is ready with{" "}
              <IJS>router.once</IJS>.
            </Paragraph>

            <CodeBlock>
              {`let router = createRouter(browser, routes);
router.once(() => {
  // the initial response is ready,
  // so it is safe to render
  ReactDOM.render(...);
});`}
            </CodeBlock>
          </li>
          <li>
            <Paragraph>
              With async routes, there is a delay between when the user clicks a
              link and when the new response is emitted (the delay being the
              time it takes for the asynchronous actions to run). During this
              time, the navigation can be interrupted with a new navigation. It
              can be useful to update your UI after a link/button is clicked to
              indicate that the next page is loading.
            </Paragraph>

            <Paragraph>
              You can see an example of this in the{" "}
              <Link
                name="Example"
                params={{ category: "react", slug: "async-nav" }}
              >
                Asynchronous Navigation Example
              </Link>
              .
            </Paragraph>
          </li>
        </ol>
      </HashSection>
    </React.Fragment>
  );
}

export { SyncAndAsyncGuide as component, contents };
