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

const goMeta = { title: "go", hash: "go" };
const navigateMeta = { title: "navigate", hash: "navigate" };
const navigationMeta = {
  title: "Navigation",
  hash: "navigation",
  children: [goMeta, navigateMeta]
};

const contents = [typesMeta, locationsMeta, navigationMeta];

function HistoryGuide() {
  return (
    <React.Fragment>
      <PlainSection>
        <h1>{meta.title}</h1>

        <p>
          A router's history enables navigation. It is responsible for creating
          the location objects, interfacing with its native environment (e.g. a
          browser) to perform navigation, and telling the router that navigation
          has occured.
        </p>

        <p>
          Curi uses <a href="https://github.com/pshrmn/hickory">Hickory</a>{" "}
          packages for its history implementations. Hickory is designed with
          asynchronous navigation in mind. This means that when a user clicks a
          link, your application can load data for the matched route before
          updating the location.
        </p>

        <CodeBlock>{`import { Browser } from "@hickory/browser";
const router = curi(Browser, routes);`}</CodeBlock>

        <p>
          You most likely will not need to interact directly with the
          application's <IJS>history</IJS>, but you should be familiar with the
          different choices.
        </p>
      </PlainSection>

      <HashSection meta={typesMeta}>
        <p>
          There are three Hickory packages to choose from for an application.
          Which one you use depends on where your application is running.
        </p>

        <HashSection meta={browserMeta} tag="h3">
          <CodeBlock>
            {`import { Browser } from "@hickory/browser";
const router = curi(Browser, routes);`}
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
            {`import { Hash } from "@hickory/hash";
const router = curi(Hash, routes);`}
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
            {`import { InMemory, createServerHistory } from "@hickory/in-memory";

const router = curi(InMemory, routes);
// or
const ServerHistory = createServerHistory();
const router = curi(ServerHistory, routes);`}
          </CodeBlock>

          <p>
            An in-memory history is used for applications not running in a
            browser. For example, the in memory history is used on the server,
            in a React Native app, and during testing.
          </p>

          <p>
            The <IJS>InMemory</IJS> function is a full history object, capable
            of in-app navigation.
          </p>

          <p>
            The <IJS>createServerHistory</IJS> function returns lightweight
            history function for server-side rendering. The returned history
            cannot navigate, which is fine for server rendering.
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
          <IJS>hash</IJS> components of a URL are used; locations ignore a URL's
          domain and protocol.
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
import { Browser } from "@hickory/browser";

const router = curi(Browser, routes, {
  history: {
    query: { parse, stringify }
  }
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
        <p>
          A history object has two methods for navigation: <IJS>navigate</IJS>{" "}
          and <IJS>go</IJS>.
        </p>

        <Note>
          <p>
            Curi wraps the <IJS>navigate</IJS> method and exposes its own{" "}
            <IJS>router.navigate</IJS> method. You should use that instead of{" "}
            <IJS>history.navigate</IJS>.
          </p>
        </Note>

        <HashSection tag="h3" meta={goMeta}>
          <p>
            The <IJS>go</IJS> method allows you to jump to another, already
            visited. <IJS>go</IJS> takes one argument, the number of locations
            forward (positive numbers) or backward (negative numbers) to go.
          </p>

          <CodeBlock>
            {`history.go(-1); // go back to the previous location`}
          </CodeBlock>

          <p>
            In browsers, there is "external" navigation. This includes the user
            typing a URL in the address bar and clicking the browser's forward
            and back buttons. These navigations are all treated similarly to the{" "}
            <IJS>go</IJS> method.
          </p>

          <Note>
            <p>
              <IJS>go</IJS> is asynchronous, meaning that the navigation happens
              before the router knows about it. This should not affect your
              application, but it is useful to be aware of.
            </p>
          </Note>
        </HashSection>

        <HashSection tag="h3" meta={navigateMeta}>
          <p>
            There are three types of navigation with <IJS>navigate</IJS>: push,
            replace, and anchor.
          </p>

          <p>
            Push navigation adds a new location after the current location. Any
            locations that existed after the current location are wiped out by
            push navigation.
          </p>

          <p>
            Replace navigation replaces the current location with a new
            location. This has no effect on any locations after the current
            location.
          </p>

          <p>
            Anchor navigation is a mix between push and replace. If the new
            location is the same as the current location, it replaces;
            otherwise, it pushes. This behavior is the same as how clicking an{" "}
            <Cmp>a</Cmp> in a multi-page application works, hence the name
            "anchor".
          </p>
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
