import React from "react";
import { Link } from "@curi/react";

import BaseGuide from "./base/BaseGuide";
import { InlineJS as IJS, PrismBlock } from "../../components/PrismBlocks";
import { Section } from "../../components/Sections";
import { Note } from "../../components/Messages";
import {
  SideBySide,
  CodeBlock,
  Explanation
} from "../../components/SideBySide";

export default ({ name }) => (
  <BaseGuide>
    <h1>{name}</h1>

    <SideBySide>
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
          By default, routes are synchronous. If a route has an{" "}
          <IJS>on.initial</IJS> or <IJS>on.every()</IJS> function, it becomes
          async.
        </p>
      </Explanation>
      <CodeBlock>
        {`// sync
{ name: "Home", path: "" },

// async
{
  name: "About",
  path: "about,
  on: {
    // this makes the route async
    initial: () => import("./components/About")
  }
}`}
      </CodeBlock>
    </SideBySide>

    <Section title="Async Things to Think About" id="think">
      <SideBySide>
        <Explanation>
          <p>
            For the most part, it shouldn't matter to you (or your users)
            whether Curi is sync or async. However, there are a couple of things
            that you should be aware of when it comes to async matching.
          </p>
        </Explanation>
      </SideBySide>

      <ol>
        <li>
          <SideBySide>
            <Explanation>
              <p>
                If you have async routes, you should wait for the initial
                response before rendering. If you don't, then the app will have
                to know how to render when a response is <IJS>null</IJS>.
              </p>
              <p>
                Waiting is done by passing a function that renders the app to{" "}
                <IJS>router.respond()</IJS>. That function will be called once
                the initial response is ready.
              </p>
            </Explanation>
            <CodeBlock>
              {`const router = curi(history, routes);
router.respond(() => {
  // the initial response is ready,
  // so it is safe to render
  ReactDOM.render(...);
});`}
            </CodeBlock>
          </SideBySide>
        </li>
        <li>
          <SideBySide>
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
                  to="Example"
                  params={{ category: "react", slug: "data-loading" }}
                >
                  Data Loading Example
                </Link>.
              </p>
            </Explanation>
          </SideBySide>
        </li>
      </ol>
    </Section>
    <h2>Next</h2>
    <p>
      Get to know about route objects with the{" "}
      <Link to="Guide" params={{ slug: "routes" }}>
        All About Routes
      </Link>{" "}
      guide.
    </p>
  </BaseGuide>
);
