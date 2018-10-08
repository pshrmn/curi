import React from "react";
import { Link } from "@curi/react-dom";

import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../components/highlight/Inline";
import { Section, Subsection } from "../../components/layout/Sections";
import { Note } from "../../components/Messages";
import { CodeBlock, Explanation } from "../../components/layout/Groups";

const meta = {
  title: "Creating a Router"
};

export default function CreatingARouterGuide() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Section title="The Router" id="router-object">
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
      </Section>
      <Section title="History" id="history-object">
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
        <ol>
          <li>
            <Explanation>
              <p>
                The <IJS>browser</IJS> history is used for applications running
                in a browser.
              </p>
              <p>
                If you use the <IJS>browser</IJS> history, your application
                should be hosted on a server that can handle dynamic requests.
                This either means a server with real time route matching (like
                an Express server) or through configuration where a fallback
                page is served when the request doesn't map to a real file on
                the server.
              </p>
              <p>
                You can use{" "}
                <Link to="Package" params={{ package: "static" }}>
                  <IJS>@curi/static</IJS>
                </Link>{" "}
                to generate static HTML pages for a <IJS>browser</IJS> history
                powered application.
              </p>
            </Explanation>
            <CodeBlock>
              {`import Browser from "@hickory/browser";
const browserHistory = Browser();`}
            </CodeBlock>
          </li>
          <li>
            <Explanation>
              <p>
                The <IJS>hash</IJS> history is a fallback history for
                applications running in a browser.
              </p>
              <p>
                A <IJS>hash</IJS> history should only be used if you cannot
                configure the server to respond to requests that don't match
                files on the server. Most static file hosts are configurable, so
                you probably don't need to use this.
              </p>
            </Explanation>
            <CodeBlock>
              {`import Hash from "@hickory/hash";
const hashHistory = Hash();`}
            </CodeBlock>
          </li>
          <li>
            <Explanation>
              <p>
                The <IJS>in-memory</IJS> history is used for applications not
                running in a browser. For example, the <IJS>in-memory</IJS>{" "}
                history is used on the server, in a React Native app, and during
                testing.
              </p>
            </Explanation>
            <CodeBlock>
              {`import InMemory from "@hickory/in-memory";
const inMemoryHistory = InMemory();`}
            </CodeBlock>
          </li>
        </ol>
        <Explanation>
          <p>
            If you are not familiar with how single-page applications interact
            with a server, this article should help:{" "}
            <a href="https://medium.com/@pshrmn/single-page-applications-and-the-server-32a23d67936">
              Single-Page Applications and the Server
            </a>.
          </p>
        </Explanation>

        <Subsection title="Locations" id="locations">
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
  query: "key=value"
  hash: "trending"
}`}
          </CodeBlock>

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
        </Subsection>

        <Explanation>
          <p>
            For more details on the history objects and their APIs, please check
            out the{" "}
            <a href="https://github.com/pshrmn/hickory/tree/master/docs">
              Hickory documentation
            </a>.
          </p>
        </Explanation>
      </Section>
      <Section title="Routes" id="routes-array">
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
          <Note>
            <IJS>path</IJS> strings do not start with a slash.
          </Note>
          <p>
            Routes can be nested. A child route's <IJS>path</IJS> will build on
            the paths from any ancestor routes.
          </p>
          <p>
            You will almost always want to include a "catch all" route to match
            any "invalid" locations and render a 404 page. The path{" "}
            <IJS>"(.*)"</IJS> matches every location. During development, Curi
            will log a warning in the console to let you know if you forgot to
            include a catch all route.
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
        // matches /photos/6789/12345 with params
        // { albumID: "6789", photoID: "12345" }
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
        <Subsection title="Route names" id="route-names">
          <Explanation>
            <p>
              Why do routes have names? Curi lets you interact with routes using
              their names.
            </p>
            <p>
              For example, Curi provides a <IJS>pathname</IJS> route interaction
              to generate the <IJS>pathname</IJS> of a location to navigate to.
              Instead of manually writing <IJS>pathname</IJS> strings, you tell
              Curi the name of the route that you want to navigate to (and also
              any required params) and Curi will create the <IJS>pathname</IJS>{" "}
              for you.
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
        </Subsection>
      </Section>
      <Section title="Navigation" id="navigation">
        <Explanation>
          <p>
            When navigation occurs, the router receives the new location from
            its <IJS>history</IJS> object. This either happens from in-app
            navigation (e.g. clicking a link) or platform navigation (e.g.
            clicking the back button or typing URL in the address bar and
            hitting enter).
          </p>
          <p>
            The router has a <IJS>navigate()</IJS> method to let you navigate
            with code. The function takes the <IJS>name</IJS> of the route you
            want to navigate to and any route <IJS>params</IJS>. The navigation{" "}
            <IJS>method</IJS> controls how the history changes locations, with
            the default behavior acting like clicking a link.
          </p>
        </Explanation>
        <CodeBlock>
          {`router.navigate({
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
});`}
        </CodeBlock>
      </Section>

      <Section title="Response Handlers" id="response-handlers">
        <Explanation>
          <p>
            When the router has created a response, it emits it to any response
            handlers. There are three types of response handlers: observers, one
            time functions, and side effects.
          </p>
          <p>
            Side effects are passed to the router when you are creating it. You
            can read more about them in the{" "}
            <Link to="Guide" params={{ slug: "side-effects" }}>
              side effects guide
            </Link>.
          </p>
          <p>
            One time functions are passed to the router using{" "}
            <IJS>router.once()</IJS>. These are response handlers that will only
            be called one time. If a response already exists, then the response
            handler will be called immediately (unless configured not to).
            Otherwise, the one time response handler will be called after the
            next response is emitted.
          </p>
          <p>
            Observers are passed to the router using <IJS>router.observe()</IJS>.
            Unlike one time functions, these will be called for every response
            emitted by the router (until you tell the router to stop calling
            it). You most likely will not need to call this yourself. The
            different framework implementations (<IJS>@curi/react-dom</IJS>,{" "}
            <IJS>@curi/react-native</IJS>, <IJS>@curi/vue</IJS>, and{" "}
            <IJS>@curi/svelte</IJS>) setup observers for you.
          </p>
        </Explanation>
        <CodeBlock>
          {`const router = curi(history, routes);

const stop = router.observe(({ response }) => {
  console.log('new response!', response);
});
// ...
stop();
// no longer observing`}
        </CodeBlock>

        <Explanation>
          <p>
            If you have any asynchronous routes (routes with <IJS>resolve</IJS>{" "}
            functions), <IJS>router.once()</IJS> should be used to delay the
            initial render until after the initial response is ready.
          </p>
        </Explanation>
        <CodeBlock>
          {`// wait for initial response to be ready
router.once(() => {
  // safe to render async routes now
});`}
        </CodeBlock>
      </Section>
      <Section title="Rendering" id="rendering">
        <Explanation>
          <p>
            Rendering is left to whatever rendering library you are using. The
            way that Curi interfaces with each of them varies, but they all use
            observers to be notified when there is a new response.
          </p>
        </Explanation>

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
});`}
        </CodeBlock>

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
      </Section>
    </React.Fragment>
  );
}
