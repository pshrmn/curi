import React from "react";
import { Link } from "@curi/react-dom";

import BaseGuide from "./base/BaseGuide";
import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../components/PrismBlocks";
import { Section, Subsection } from "../../components/Sections";
import { Note } from "../../components/Messages";
import {
  SideBySide,
  CodeBlock,
  Explanation
} from "../../components/SideBySide";

export default ({ name }) => (
  <BaseGuide>
    <h1>{name}</h1>

    <Section title="The Router" id="router-object">
      <SideBySide>
        <Explanation>
          <p>
            The router is the controller of the single-page application. A
            router is created using a <IJS>history</IJS> object and a{" "}
            <IJS>routes</IJS> array.
          </p>
        </Explanation>
        <CodeBlock>
          {`import { curi } from '@curi/router';

const history = Browser();
const routes = [...];
const router = curi(history, routes);`}
        </CodeBlock>
      </SideBySide>
    </Section>
    <Section title="History" id="history-object">
      <SideBySide>
        <Explanation>
          <p>
            The <IJS>history</IJS> object manages navigation between locations
            within an application.
          </p>
          <p>
            There are three types of <IJS>history</IJS> to choose from; which
            one you use depends on where your application is running.
          </p>
        </Explanation>
      </SideBySide>
      <ol>
        <li>
          <SideBySide>
            <Explanation>
              <p>
                The <IJS>browser</IJS> history is used for applications running
                in a browser. If you use the <IJS>browser</IJS> history, your
                application should be hosted on a server that can handle dynamic
                requests.
              </p>
            </Explanation>
            <CodeBlock>
              {`import Browser from "@hickory/browser";
const browserHistory = Browser();`}
            </CodeBlock>
          </SideBySide>
        </li>
        <li>
          <SideBySide>
            <Explanation>
              <p>
                The <IJS>hash</IJS> history is a fallback history for
                applications running in a browser, but are hosted on servers
                that can only handle requests for files that exist (static file
                servers).
              </p>
            </Explanation>
            <CodeBlock>
              {`import Hash from "@hickory/hash";
const hashHistory = Hash();`}
            </CodeBlock>
          </SideBySide>
        </li>
        <li>
          <SideBySide>
            <Explanation>
              <p>
                The <IJS>in-memory</IJS> history is used for applications not
                running in a browser. For example, the <IJS>in-memory</IJS>{" "}
                history is used on the server or in a React Native app.
              </p>
            </Explanation>
            <CodeBlock>
              {`import InMemory from "@hickory/in-memory";
const inMemoryHistory = InMemory();`}
            </CodeBlock>
          </SideBySide>
        </li>
      </ol>
      <SideBySide>
        <Explanation>
          <p>
            If you are not familiar with how single-page applications interact
            with a server, this article should help:{" "}
            <a href="https://medium.com/@pshrmn/single-page-applications-and-the-server-32a23d67936">
              Single-Page Applications and the Server
            </a>.
          </p>
        </Explanation>
      </SideBySide>
      <Subsection title="Locations" id="locations">
        <SideBySide>
          <Explanation>
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
          </Explanation>
          <CodeBlock>
            {`// https://www.example.com/page?key=value#trending
location = {
  pathname: "/page",
  query: "?key=value"
  hash: "trending"
}`}
          </CodeBlock>
        </SideBySide>
        <SideBySide>
          <Explanation>
            <p>
              The <IJS>query</IJS> value of a location is a string by default,
              but the history object can be configured to automatically parse it
              into an object.
            </p>
            <p>
              You can choose whichever query parsing/stringifying package you
              prefer. Some of the most popular are{" "}
              <a href="http://npmjs.com/package/qs">
                <IJS>qs</IJS>
              </a>,{" "}
              <a href="http://npmjs.com/package/query-string">
                <IJS>query-string</IJS>
              </a>, and{" "}
              <a href="https://www.npmjs.com/package/querystring">
                <IJS>querystring</IJS>
              </a>.
            </p>
          </Explanation>
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
        </SideBySide>
      </Subsection>
    </Section>
    <Section title="Routes" id="routes-array">
      <SideBySide>
        <Explanation>
          <p>
            The <IJS>routes</IJS> array defines the valid locations within an
            application. When the router receives a new location, it matches it
            against the routes to generate a response.
          </p>
          <p>
            Each route is an object that has a unique <IJS>name</IJS> and a{" "}
            <IJS>path</IJS> string, which defines what locations the route
            matches.
          </p>
          <p>
            <strong>Note:</strong> <IJS>path</IJS> strings do not start with a
            slash.
          </p>
          <p>
            Routes can be nested. A child route's <IJS>path</IJS> will build on
            the paths from any ancestor routes.
          </p>
          <p>
            You will probably want to include a "catch all" route to match any
            "invalid" locations and render a 404 page. The path{" "}
            <IJS>"(.*)"</IJS> matches every location.
          </p>
        </Explanation>
        <CodeBlock>
          {`const routes = [
  {
    name: "Home",
    path: ""
  },
  {
    name: "Album",
    path: "photos/:albumID",
    children: [
      {
        name: "Photo",
        // matches /photos/6789/12345
        path: ":photoID"
      }
    ]
  },
  {
    name: "Not Found",
    path: "(.*)"
  }
];`}
        </CodeBlock>
      </SideBySide>
      <SideBySide>
        <Explanation>
          <p>
            Why do routes have names? Curi lets you interact with routes using
            their names. For example, Curi provides a <IJS>pathname</IJS> route
            interaction. When you want to navigate to a route within your
            application, you specify the name of the route to navigate to (and
            any params for the route) and Curi will create the URL for you.
          </p>
        </Explanation>
        <CodeBlock>
          {`const pathname = router.route.pathname(
  "Photo",
  {
    albumID: "abcd",
    photoId: "98765"
  }
);
// pathname = "/photos/abcd/98765"`}
        </CodeBlock>
      </SideBySide>
    </Section>
    <Section title="Navigation" id="navigation">
      <SideBySide>
        <Explanation>
          <p>
            The router receives locations from its <IJS>history</IJS> object.
            This either happens from in-app navigation (e.g. clicking a link) or
            platform navigation (e.g. clicking the back button or typing URL in
            the address bar and hitting enter).
          </p>
          <p>
            The router has a <IJS>navigate()</IJS> method to let you navigate
            with code. The function takes the <IJS>name</IJS> of the route you
            want to navigate to and any route <IJS>params</IJS>. The navigation{" "}
            <IJS>method</IJS> controls how the history changes locations, with
            the default behavior acting like clicking a link.
          </p>
        </Explanation>
        <CodeBlock>{`router.navigate({
  name: "Photo",
  params: { albumID: 1357, photoID: 02468 },
  hash: "comments"
});
// /photos/1357/02468#comments

router.navigate({
  name: "Login",
  state: { next: location.pathname },
  // replace the current location with the Login location
  // "REPLACE" is ideal for redirects
  method: "REPLACE"
});`}</CodeBlock>
      </SideBySide>
    </Section>

    <Section title="Observers" id="observer">
      <SideBySide>
        <Explanation>
          <p>
            When the router has created a response, it emits it to any
            observers. You can give the router an observer function through its{" "}
            <IJS>respond()</IJS> method.
          </p>
          <p>
            You usually do not have to call this yourself. Framework
            implementations will set observers up internally to automatically
            trigger re-renders for new responses. <IJS>@curi/react-dom</IJS>{" "}
            does this using a component created by calling{" "}
            <IJS>curiProvider(router)</IJS> and <IJS>@curi/vue</IJS> uses the{" "}
            <IJS>CuriPlugin</IJS>.
          </p>
        </Explanation>
        <CodeBlock>
          {`const router = curi(history, routes);

// { observe: true } sets up an observer function
// to be called for every new response
const stop = router.respond(({ response }) => {
  console.log('new response!', response);
}, { observe: true });
// ...
stop();
// no longer observing`}
        </CodeBlock>
      </SideBySide>
      <SideBySide>
        <Explanation>
          <p>
            If you have any asynchronous routes (routes with <IJS>resolve</IJS>{" "}
            functions), <IJS>router.respond()</IJS> should be used to delay the
            initial render. If you don't pass the{" "}
            <IJS>{`{ observe: true }`}</IJS> option, the observer function will
            only be called once, which is perfect for delaying the initial
            render.
          </p>
        </Explanation>
        <CodeBlock>
          {`// wait for initial response to render with an
// observer function that will only be called once
router.respond(() => {
  // safe to render async routes now
});`}
        </CodeBlock>
      </SideBySide>
    </Section>
    <Section title="Rendering" id="rendering">
      <SideBySide>
        <Explanation>
          <p>
            Rendering is left to whatever rendering library you are using. The
            way that Curi interfaces with each of them varies, but they all use
            observers to be notified when there is a new response.
          </p>
        </Explanation>
      </SideBySide>
      <SideBySide>
        <Explanation>
          <p>
            <IJS>@curi/react-dom</IJS> uses a <Cmp>Router</Cmp> with a
            render-invoked <IJS>children</IJS> function that will be called
            whenever there is a new response.
          </p>
          <p>
            In React applications, <IJS>response.body</IJS> should be a React
            component, so rendering the application means creating an element
            from <IJS>response.body</IJS>.
          </p>
          <p>
            The{" "}
            <Link to="Tutorial" params={{ slug: "react-basics" }}>
              React Basics Tutorial
            </Link>{" "}
            gets into more detail about how this works.
          </p>
        </Explanation>
        <CodeBlock>
          {`// React
const Router = curiProvider(router);

ReactDOM.render((
  <Router>
    {({ response }) => {
      const { body:Body } = response;
      return <Body />;
    }}
  </Router>
), document.getElementById('root'));`}
        </CodeBlock>
      </SideBySide>
      <SideBySide>
        <Explanation>
          <p>
            <IJS>@curi/vue</IJS> sets up reactive objects that update when there
            is a new response. <Cmp>component :is</Cmp> can be used to render
            the <IJS>body</IJS> component.
          </p>
          <p>
            The{" "}
            <Link to="Tutorial" params={{ slug: "react-basics" }}>
              Vue Basics Tutorial
            </Link>{" "}
            details how to use Vue and Curi.
          </p>
        </Explanation>
        <CodeBlock>
          {`// Vue
Vue.use(CuriPlugin, { router });
new Vue({
  el: '#app',
  template: '<app />',
  components: { app }
});
`}
        </CodeBlock>
      </SideBySide>
      <SideBySide>
        <Explanation>
          <p>
            <IJS>@curi/svelte</IJS> uses the Svelte store and{" "}
            <Cmp>svelte:component</Cmp> to render.
          </p>
        </Explanation>
        <CodeBlock>
          {`// Svelte
const store = curiStore(router);
new app({ target, store });`}
        </CodeBlock>
      </SideBySide>
    </Section>
  </BaseGuide>
);
