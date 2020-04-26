import React from "react";

import {
  TitledPlainSection,
  PlainSection,
  HashSection,
  Paragraph,
  CodeBlock,
  Note,
  IJS,
  Cmp
} from "../../components/guide/common";

let meta = {
  title: "History"
};

let browserMeta = {
  title: "Browser History",
  hash: "browser"
};
let hashMeta = {
  title: "Hash History",
  hash: "hash"
};
let inMemoryMeta = {
  title: "In Memory History",
  hash: "in-memory"
};
let typesMeta = {
  title: "Types of History",
  hash: "types",
  children: [browserMeta, hashMeta, inMemoryMeta]
};

let queryMeta = {
  title: "Query Objects",
  hash: "query-objects"
};
let locationsMeta = {
  title: "Locations",
  hash: "locations",
  children: [queryMeta]
};

let goMeta = { title: "go", hash: "go" };
let navigateMeta = { title: "navigate", hash: "navigate" };
let navigationMeta = {
  title: "Navigation",
  hash: "navigation",
  children: [goMeta, navigateMeta]
};

let contents = [typesMeta, locationsMeta, navigationMeta];

function HistoryGuide() {
  return (
    <React.Fragment>
      <TitledPlainSection title={meta.title}>
        <Paragraph>
          A router's history enables navigation. It is responsible for creating
          the location objects, interfacing with its native environment (e.g. a
          browser) to perform navigation, and telling the router that navigation
          has occured.
        </Paragraph>

        <Paragraph>
          Curi uses <a href="https://github.com/pshrmn/hickory">Hickory</a>{" "}
          packages for its history implementations. Hickory is designed with
          asynchronous navigation in mind. This means that when a user clicks a
          link, your application can load data for the matched route before
          updating the location.
        </Paragraph>

        <CodeBlock>{`import { browser } from "@hickory/browser";
let router = createRouter(browser, routes);`}</CodeBlock>

        <Paragraph>
          You most likely will not need to interact directly with the
          application's <IJS>history</IJS>, but you should be familiar with the
          different choices.
        </Paragraph>
      </TitledPlainSection>

      <HashSection meta={typesMeta} tag="h2">
        <Paragraph>
          There are three Hickory packages to choose from. Which one you use
          depends on where your application is running.
        </Paragraph>

        <HashSection meta={browserMeta} tag="h3">
          <CodeBlock>
            {`import { browser } from "@hickory/browser";
let router = createRouter(browser, routes);`}
          </CodeBlock>

          <Paragraph>
            The browser history is used for applications running in a browser.
          </Paragraph>

          <Paragraph>
            If you use the browser history, your application should be hosted on
            a server that can handle dynamic requests. This either means:
          </Paragraph>

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
            {`import { hash } from "@hickory/hash";
let router = createRouter(Hash, routes);`}
          </CodeBlock>

          <Paragraph>
            The hash history is a fallback history for applications running in a
            browser. It should only be used if you cannot configure the server
            to respond to requests that don't match files on the server. The
            browser history is almost always a better choice.
          </Paragraph>
        </HashSection>

        <HashSection meta={inMemoryMeta} tag="h3">
          <CodeBlock>
            {`import { inMemory, createReusable } from "@hickory/in-memory";

let router = createRouter(inMemory, routes);
// or
let reusable = createReusable();
let router = createRouter(reusable, routes);`}
          </CodeBlock>

          <Paragraph>
            An in-memory history is used for applications not running in a
            browser. For example, the in memory history is used on the server,
            in a React Native app, and during testing. The{" "}
            <IJS>@hickory/in-memory</IJS> package provides two in-memory history
            types.
          </Paragraph>

          <Paragraph>
            The <IJS>inMemory</IJS> function is a full history object, capable
            of in-app navigation, which is useful for native applications and
            testing.
          </Paragraph>

          <Paragraph>
            The <IJS>createReusable</IJS> function returns lightweight history
            function for server-side rendering. The returned history cannot
            navigate, which is fine for server rendering.
          </Paragraph>
        </HashSection>

        <Note>
          <Paragraph>
            If you are not familiar with how single-page applications interact
            with a server, this article should help:{" "}
            <a href="https://blog.pshrmn.com/entry/single-page-applications-and-the-server/">
              Single-Page Applications and the Server
            </a>
            .
          </Paragraph>
        </Note>
      </HashSection>

      <HashSection meta={locationsMeta} tag="h2">
        <Paragraph>
          The history object will map URL strings into location objects. Only
          the <IJS>pathname</IJS>, <IJS>query</IJS> (search), and{" "}
          <IJS>hash</IJS> components of a URL are used; locations ignore a URL's
          domain and protocol.
        </Paragraph>

        <Paragraph>
          Matching locations to routes only uses the location's{" "}
          <IJS>pathname</IJS>.
        </Paragraph>

        <CodeBlock>
          {`// https://www.example.com/page?key=value#trending
location = {
  pathname: "/page",
  query: "key=value"
  hash: "trending"
}`}
        </CodeBlock>

        <HashSection meta={queryMeta} tag="h3">
          <Paragraph>
            The <IJS>query</IJS> value of a location is a string by default, but
            the history object can be configured to automatically parse it into
            an object.
          </Paragraph>

          <Paragraph>
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
          </Paragraph>

          <CodeBlock>
            {`import { parse, stringify } from "qs";
import { browser } from "@hickory/browser";

let router = createRouter(browser, routes, {
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

      <HashSection meta={navigationMeta} tag="h2">
        <Paragraph>
          A history object has two methods for navigation: <IJS>navigate</IJS>{" "}
          and <IJS>go</IJS>.
        </Paragraph>

        <Note>
          <Paragraph>
            Curi wraps the <IJS>navigate</IJS> method and exposes its own{" "}
            <IJS>router.navigate</IJS> method. You should use that instead of{" "}
            <IJS>history.navigate</IJS>.
          </Paragraph>
        </Note>

        <HashSection tag="h3" meta={goMeta}>
          <Paragraph>
            The <IJS>go</IJS> method allows you to jump to another, already
            visited. <IJS>go</IJS> takes one argument, the number of locations
            forward (positive numbers) or backward (negative numbers) to go.
          </Paragraph>

          <CodeBlock>
            {`history.go(-1); // go back to the previous location`}
          </CodeBlock>

          <Paragraph>
            In browsers, there is "external" navigation. This includes the user
            typing a URL in the address bar and clicking the browser's forward
            and back buttons. These navigations are all treated similarly to the{" "}
            <IJS>go</IJS> method.
          </Paragraph>

          <Note>
            <Paragraph>
              <IJS>go</IJS> is asynchronous, meaning that the navigation happens
              before the router knows about it. This should not affect your
              application, but it is useful to be aware of.
            </Paragraph>
          </Note>
        </HashSection>

        <HashSection tag="h3" meta={navigateMeta}>
          <Paragraph>
            There are three types of navigation with <IJS>navigate</IJS>: push,
            replace, and anchor.
          </Paragraph>

          <Paragraph>
            Push navigation adds a new location after the current location. Any
            locations that existed after the current location are wiped out by
            push navigation.
          </Paragraph>

          <Paragraph>
            Replace navigation replaces the current location with a new
            location. This has no effect on any locations after the current
            location.
          </Paragraph>

          <Paragraph>
            Anchor navigation is a mix between push and replace. If the new
            location is the same as the current location, it replaces;
            otherwise, it pushes. This behavior is the same as how clicking an{" "}
            <Cmp>a</Cmp> in a multi-page application works, hence the name
            "anchor".
          </Paragraph>
        </HashSection>
      </HashSection>

      <PlainSection>
        <Paragraph>
          For more details on the history objects and their APIs, please check
          out the{" "}
          <a href="https://github.com/pshrmn/hickory/tree/master/docs">
            Hickory documentation
          </a>
          .
        </Paragraph>
      </PlainSection>
    </React.Fragment>
  );
}

export { HistoryGuide as component, contents };
