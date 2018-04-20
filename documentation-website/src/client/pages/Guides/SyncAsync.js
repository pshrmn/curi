import React from "react";
import { Link } from "@curi/react";

import BaseGuide from "./base/BaseGuide";
import { InlineJS as IJS, PrismBlock } from "../../components/PrismBlocks";
import { Section } from "../../components/Sections";
import { Note } from "../../components/Messages";

export default ({ name }) => (
  <BaseGuide>
    <h1>{name}</h1>

    <p>Curi can match routes synchronously or asynchronously.</p>

    <p>
      Synchronous matching means when a navigation event is triggered (e.g.
      clicking a link or button), the router will immediately match a route and
      emit a response.
    </p>

    <p>
      Asynchronous matching, on the other hand, allows you to make data requests
      related to the matched route, and the response will not be emitted until
      after those requests have completed. This is useful for code-splitting and
      preloading data for a route.
    </p>

    <p>
      By default, Curi will perform synchronous matching. If any of your routes
      have async methods (<IJS>on.initial()</IJS> and <IJS>on.every()</IJS>),
      the router will become asynchronous.
    </p>

    <PrismBlock lang="javascript">
      {`// sync
const routes = [
  { name: "Home", path: "" },
  { name: "About", path: "about }
];

// async
const routes = [
  { name: "Home", path: "" },
  {
    name: "About",
    path: "about,
    on: {
      // this trigger async matching
      initial: () => import("./components/About")
    }
  }
];`}
    </PrismBlock>

    <Note>
      When Curi does asynchronous matching, <strong>all</strong> routes are
      matched asynchronously, not just the ones with <IJS>on.initial()</IJS>/<IJS
      >
        on.every()
      </IJS>{" "}
      functions.
    </Note>

    <p>
      For the most part, it shouldn't matter to you (or your users) whether Curi
      is performing synchronous or asynchronous matching. However, there are a
      couple of things that you should be aware of when it comes to async
      matching.
    </p>

    <ol>
      <li>
        <p>
          In async mode, you should wait for the initial response before
          rendering. This can be done by using <IJS>router.respond</IJS> to
          delay rendering until the initial response is ready. This isn't
          absolutely necessary, but if you do not do this, the initial render
          might be performed with a response that is <IJS>undefined</IJS>
        </p>
        <PrismBlock lang="javascript">
          {`const router = curi(history, routes);
router.respond(() => {
  // the initial response is ready, so it is safe to render
  ReactDOM.render(...);
});`}
        </PrismBlock>
      </li>
      <li>
        <p>
          Navigation is async, which means there might be a slight delay between
          when the user clicks a link and when the new response is emitted.
          During this time, the navigation can be interrupted with a new
          navigation. Curi handles this internally, but you might want to update
          your UI after a link/button is clicked to indicate that the next page
          is loading. You can see an example of this in the{" "}
          <Link
            to="Example"
            params={{ category: "react", slug: "data-loading" }}
          >
            Data Loading Example
          </Link>.
        </p>
      </li>
    </ol>

    <h2>Next</h2>
    <p>
      We should take a look at how to write routes with the{" "}
      <Link to="Guide" params={{ slug: "routes" }}>
        All About Routes
      </Link>{" "}
      guide.
    </p>
  </BaseGuide>
);
