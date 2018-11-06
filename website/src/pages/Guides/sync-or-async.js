import React from "react";
import { Link } from "@curi/react-dom";

import { InlineJS as IJS } from "../../components/highlight/Inline";
import { Section } from "../../components/layout/Sections";
import { Note } from "../../components/Messages";
import { CodeBlock, Explanation } from "../../components/layout/Groups";

const meta = {
  title: "Sync or Async"
};

export default function SyncAndAsyncGuide() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Explanation>
        <p>Curi can have synchronous and asynchronous routes.</p>

        <p>
          When a navigation event is triggered (e.g. clicking a link or button),
          the router will match a route. If the route is synchronous, the
          response will be emitted immediately. If the route is asynchronous,
          the response will not be emitted until the route's async functions
          have finished. This is useful for code splitting and preloading data
          for a route.
        </p>

        <p>
          By default, routes are synchronous. If a route has any functions in
          its <IJS>resolve</IJS> object, it becomes async.
        </p>
      </Explanation>
      <CodeBlock>
        {`// sync
{ name: "Home", path: "" },

// async
{
  name: "User",
  path: "user/:id,
  // any functions in here makes the route async
  resolve: {
    body: () => import("./components/User"),
  }
}`}
      </CodeBlock>

      <Section title="Async Things to Think About" id="think">
        <Explanation>
          <p>
            For the most part, it shouldn't matter to you (or your users)
            whether Curi is sync or async, but there are a couple of things that
            you should be aware of when it comes to async matching.
          </p>
        </Explanation>

        <ol>
          <li>
            <Explanation>
              <p>
                If the initial route that matches is async and you try to render
                immediately, the <IJS>response</IJS> will be <IJS>null</IJS>.
                You can wait to render until the initial response is ready with{" "}
                <IJS>router.oncd()</IJS>. The function you pass to that will be
                called one time, once the initial response is ready.
              </p>
            </Explanation>
            <CodeBlock>
              {`const router = curi(history, routes);
router.once(() => {
  // the initial response is ready,
  // so it is safe to render
  ReactDOM.render(...);
});`}
            </CodeBlock>
          </li>
          <li>
            <Explanation>
              <p>
                With async routes, there is a delay between when the user clicks
                a link and when the new response is emitted. During this time,
                the navigation can be interrupted with a new navigation. Curi
                handles this internally, but you might want to update your UI
                after a link/button is clicked to indicate that the next page is
                loading.
              </p>
              <p>
                You can see an example of this in the{" "}
                <Link
                  name="Example"
                  params={{ category: "react", slug: "data-loading" }}
                >
                  Data Loading Example
                </Link>.
              </p>
            </Explanation>
            <CodeBlock lang="jsx">
              {`<Link
  name="User"
  params={{ id: 1 }}
  onClick={() => {
    // display a loading bar when
    // the user clicks a link.
    nprogress.start();
  }}
>User 1</Link>

// use a side effect to finish
// loading bar when the new response
// is ready
const finishLoading = () => {
  nprogress.done();
};

const router = curi(history, routes, {
  sideEffects: [finishLoading]
});`}
            </CodeBlock>
          </li>
        </ol>
      </Section>
    </React.Fragment>
  );
}
