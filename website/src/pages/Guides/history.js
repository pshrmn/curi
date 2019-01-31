import React from "react";

import {
  PlainSection,
  HashSection,
  CodeBlock,
  Note,
  Warning,
  IJS,
  Cmp
} from "../../components/guide/common";

const meta = {
  title: "History"
};

const browserMeta = {
  title: "Browser History",
  hash: "browser"
};
const hashMeta = {
  title: "Hash History",
  hash: "hash"
};
const inMemoryMeta = {
  title: "In Memory History",
  hash: "in-memory"
};
const typesMeta = {
  title: "Types of History",
  hash: "types",
  children: [browserMeta, hashMeta, inMemoryMeta]
};

const queryMeta = {
  title: "Query Objects",
  hash: "query-objects"
};
const locationsMeta = {
  title: "Locations",
  hash: "locations",
  children: [queryMeta]
};

const popMeta = { title: "pop", hash: "pop" };
const praMeta = { title: "push, replace, anchor", hash: "push-replace-anchor" };
const navigationMeta = {
  title: "Navigation",
  hash: "navigation",
  children: [popMeta, praMeta]
};

const contents = [typesMeta, locationsMeta, navigationMeta];

function HistoryGuide() {
  return (
    <React.Fragment>
      <PlainSection>
        <h1>{meta.title}</h1>

        <p>
          A router's history object powers navigation behind the scenes. Besides
          creating the object and passing it the the <IJS>curi</IJS> function to
          create a router, you likely will not directly interact with it.
        </p>

        <p>
          Curi uses <a href="https://github.com/pshrmn/hickory">Hickory</a>{" "}
          packages for its history implementations. Hickory is designed with
          asynchronous navigation in mind. This means that when a user clicks a
          link, your application can load data for the mastched route before
          updating the location.
        </p>

        <CodeBlock>
          {`const history = Browser();
const router = curi(history, routes);`}
        </CodeBlock>
      </PlainSection>

      <HashSection meta={typesMeta}>
        <p>
          There are three Hickory packages to choose from for an application. W
          hich one you use depends on where your application is running.
        </p>

        <HashSection meta={browserMeta} tag="h3">
          <CodeBlock>
            {`import Browser from "@hickory/browser";
const browserHistory = Browser();`}
          </CodeBlock>

          <p>
            The browser history is used for applications running in a browser.
          </p>

          <p>
            If you use the browser history, your application should be hosted on
            a server that can handle dynamic requests. This either means:
          </p>

          <ol>
            <li>
              A server with real time route matching (like an Express server).
            </li>
            <li>
              Configuring the server to respond with a fallback page when the
              request doesn't map to a real file on the server (e.g. with NGINX
              or Apache).
            </li>
            <li>
              Using a static file host that can be configured to respond with a
              fallback page.
            </li>
          </ol>
        </HashSection>

        <HashSection meta={hashMeta} tag="h3">
          <CodeBlock>
            {`import Hash from "@hickory/hash";
const hashHistory = Hash();`}
          </CodeBlock>

          <p>
            The hash history is a fallback history for applications running in a
            browser. It should only be used if you cannot configure the server
            to respond to requests that don't match files on the server.
          </p>

          <Warning>
            <p>
              This should only be used as a last resort. The browser history is
              almost always a better choice.
            </p>
          </Warning>
        </HashSection>

        <HashSection meta={inMemoryMeta} tag="h3">
          <CodeBlock>
            {`import InMemory from "@hickory/in-memory";
const inMemoryHistory = InMemory();`}
          </CodeBlock>

          <p>
            The in memory history is used for applications not running in a
            browser. For example, the in memory history is used on the server,
            in a React Native app, and during testing.
          </p>
        </HashSection>

        <Note>
          <p>
            If you are not familiar with how single-page applications interact
            with a server, this article should help:{" "}
            <a href="https://medium.com/@pshrmn/single-page-applications-and-the-server-32a23d67936">
              Single-Page Applications and the Server
            </a>
            .
          </p>
        </Note>
      </HashSection>

      <HashSection meta={locationsMeta}>
        <p>
          The history object will map URL strings into location objects. Only
          the <IJS>pathname</IJS>, <IJS>query</IJS> (search), and{" "}
          <IJS>hash</IJS> segments of a URL are used; locations ignore the
          domain and protocol segments of a URL.
        </p>

        <p>
          Matching locations to routes only uses the location's{" "}
          <IJS>pathname</IJS>.
        </p>

        <CodeBlock>
          {`// https://www.example.com/page?key=value#trending
location = {
  pathname: "/page",
  query: "key=value"
  hash: "trending"
}`}
        </CodeBlock>

        <HashSection meta={queryMeta} tag="h3">
          <p>
            The <IJS>query</IJS> value of a location is a string by default, but
            the history object can be configured to automatically parse it into
            an object.
          </p>

          <p>
            You can choose whichever query parsing/stringifying package you
            prefer. Some of the most popular are{" "}
            <a href="http://npmjs.com/package/qs">
              <IJS>qs</IJS>
            </a>
            ,{" "}
            <a href="http://npmjs.com/package/query-string">
              <IJS>query-string</IJS>
            </a>
            , and{" "}
            <a href="https://www.npmjs.com/package/querystring">
              <IJS>querystring</IJS>
            </a>
            .
          </p>

          <CodeBlock>
            {`import { parse, stringify } from "qs";
import Browser from "@hickory/browser";

const history = Browser({
  query: { parse, stringify }
});

// https://www.example.com/page?key=value#trending
location = {
  pathname: "/page",
  query: { key: "value" }
  hash: "trending"
}`}
          </CodeBlock>
        </HashSection>
      </HashSection>

      <HashSection meta={navigationMeta}>
        <p>The history object supports four kinds of navigation.</p>

        <p>
          When a user navigates to your application, this starts a new session.
          A session is essentially an array of locations that have been visited
          (but isn't directly accessible in the browser).
        </p>

        <HashSection tag="h3" meta={popMeta}>
          <p>
            Pop navigation is either performed by calling{" "}
            <IJS>history.go(n)</IJS> (where <IJS>n</IJS> is the number of
            locations forward/backward to go) or happens natively (e.g. clicking
            the browser's back button).
          </p>

          <CodeBlock>
            {`history.go(-1); // go back to the previous location`}
          </CodeBlock>
        </HashSection>

        <HashSection tag="h3" meta={praMeta}>
          <p>Push navigation adds a new location after the current location.</p>

          <p>
            Replace navigation replaces the current location with a new
            location.
          </p>

          <p>
            Anchor navigation is a mix between push and replace. If the new
            location is the same as the current location, it replaces;
            otherwise, it pushes. This behavior is the same as how clicking an{" "}
            <Cmp>a</Cmp> in a multi-page application works, hence the name
            "anchor".
          </p>

          <p>
            Push, replace, and anchor navigation are performed using the history
            object's <IJS>navigate()</IJS> method. That said, the Curi router
            has a wrapper implementation, so you shouldn't need to call{" "}
            <IJS>history.navigate()</IJS> yourself.
          </p>

          <CodeBlock>
            {`history.navigate({ pathname: "/test" }, "PUSH");`}
          </CodeBlock>
        </HashSection>
      </HashSection>

      <PlainSection>
        <p>
          For more details on the history objects and their APIs, please check
          out the{" "}
          <a href="https://github.com/pshrmn/hickory/tree/master/docs">
            Hickory documentation
          </a>
          .
        </p>
      </PlainSection>
    </React.Fragment>
  );
}

export { HistoryGuide as component, contents };
