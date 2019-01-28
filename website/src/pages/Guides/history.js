import React from "react";

import {
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

export default function CreatingARouterGuide() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <p>
        The <IJS>history</IJS> object manages navigation between locations
        within an application.
      </p>
      <p>
        Curi uses <a href="https://github.com/pshrmn/hickory">Hickory</a> for
        its history implementation.
      </p>
      <p>
        You should almost never have to interact directly with Hickory, but you
        do have to create your own <IJS>history</IJS> object for your
        application and use it when creating the router.
      </p>

      <CodeBlock>
        {`const history = Browser();
const router = curi(history, routes);`}
      </CodeBlock>

      <HashSection title="Types of History" id="types">
        <p>
          There are three types of <IJS>history</IJS> to choose from; which one
          you use depends on where your application is running.
        </p>

        <HashSection title="Browser History" id="browser" tag="h3">
          <CodeBlock>
            {`import Browser from "@hickory/browser";
const browserHistory = Browser();`}
          </CodeBlock>
          <p>
            The <IJS>browser</IJS> history is used for applications running in a
            browser.
          </p>
          <p>
            If you use the <IJS>browser</IJS> history, your application should
            be hosted on a server that can handle dynamic requests. This either
            means:
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

        <HashSection title="Hash History" id="hash" tag="h3">
          <CodeBlock>
            {`import Hash from "@hickory/hash";
const hashHistory = Hash();`}
          </CodeBlock>

          <p>
            The <IJS>hash</IJS> history is a fallback history for applications
            running in a browser. It should only be used if you cannot configure
            the server to respond to requests that don't match files on the
            server.
          </p>
          <Warning>
            This should only be used as a last resort. The <IJS>browser</IJS>{" "}
            history is almost always a better choice.
          </Warning>
        </HashSection>

        <HashSection title="In Memory History" id="in-memory" tag="h3">
          <CodeBlock>
            {`import InMemory from "@hickory/in-memory";
const inMemoryHistory = InMemory();`}
          </CodeBlock>

          <p>
            The <IJS>in-memory</IJS> history is used for applications not
            running in a browser. For example, the <IJS>in-memory</IJS> history
            is used on the server, in a React Native app, and during testing.
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

      <HashSection title="Locations" id="locations">
        <p>
          The <IJS>history</IJS> object will map URLs into location objects.
          Only the <IJS>pathname</IJS>, <IJS>query</IJS> (search), and{" "}
          <IJS>hash</IJS> segments are used; locations ignore the domain and
          protocol segments of a URL.
        </p>
        <p>
          When matching loactions to routes, only the <IJS>pathname</IJS> is
          used.
        </p>

        <CodeBlock>
          {`// https://www.example.com/page?key=value#trending
location = {
pathname: "/page",
query: "key=value"
hash: "trending"
}`}
        </CodeBlock>

        <HashSection title="Query Objects" id="query-objects" tag="h3">
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

      <HashSection title="Navigation" id="navigation">
        <p>
          The <IJS>history</IJS> object supports four kinds of navigation. You
          can think of the <IJS>history</IJS> as storing an array of locations
          and keeping an index of which location in the array is the current
          location.
        </p>
        <p>
          Pop navigation is either performed by calling <IJS>history.go(n)</IJS>{" "}
          (where <IJS>n</IJS> is the number of locations forward/backward to go)
          or happens natively (e.g. clicking the browser's back button).
        </p>

        <CodeBlock>
          {`history.go(-1); // go back to the previous location`}
        </CodeBlock>

        <p>Push navigation adds a new location after the current location.</p>
        <p>
          Replace navigation replaces the current location with a new location.
        </p>
        <p>
          Anchor navigation is a mix between push and replace. If the new
          location is the same as the current location, it replaces; otherwise,
          it pushes. This behavior is the same as how clicking an <Cmp>a</Cmp>{" "}
          in a multi-page application works, hence the name "anchor".
        </p>
        <p>
          Push, replace, and anchor navigation are performed using the{" "}
          <IJS>history</IJS> object's <IJS>navigate()</IJS> method. That said,
          the Curi router has a wrapper implementation, so you shouldn't need to
          call <IJS>history.navigate()</IJS> yourself.
        </p>

        <CodeBlock>
          {`history.navigate({ pathname: "/test" }, "PUSH");`}
        </CodeBlock>
      </HashSection>

      <p>
        For more details on the history objects and their APIs, please check out
        the{" "}
        <a href="https://github.com/pshrmn/hickory/tree/master/docs">
          Hickory documentation
        </a>
        .
      </p>
    </React.Fragment>
  );
}
