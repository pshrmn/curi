import React from "react";
import { Link } from "@curi/react";

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

    <p>There are a few concepts that you should know about Curi.</p>

    <Section title="The Router" id="router-object">
      <SideBySide>
        <Explanation>
          <p>
            A router is created using a <IJS>history</IJS> object and a{" "}
            <IJS>routes</IJS> array.
          </p>
          <p>
            The <IJS>history</IJS> object manages navigation between locations
            within an application.
          </p>
          <p>
            The <IJS>routes</IJS> array defines what the application renders for
            different locations.
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
            The type of <IJS>history</IJS> that an application uses depends on
            where it is running. There are three types of histories:
          </p>
          <ol>
            <li>
              The <IJS>browser</IJS> history is used for applications running in
              a browser. If you use the <IJS>browser</IJS> history, your
              application should be hosted on a server that can handle dynamic
              requests.
            </li>
            <li>
              The <IJS>hash</IJS> history is a fallback history for applications
              running in a browser, but are hosted on servers that can only
              handle requests for files that exist (static file servers).
            </li>
            <li>
              The <IJS>in-memory</IJS> history is used for applications not
              running in a browser. For example, the <IJS>in-memory</IJS>{" "}
              history is used on the server or in a React Native app.
            </li>
          </ol>
          <p>
            If you are unfamiliar with how single-page applications interact
            with a server, please check out this article:{" "}
            <a href="https://medium.com/@pshrmn/single-page-applications-and-the-server-32a23d67936">
              Single-Page Applications and the Server
            </a>.
          </p>
        </Explanation>
        <CodeBlock>
          {`import Browser from "@hickory/browser";
const browserHistory = Browser();

import Hash from "@hickory/hash";
const hashHistory = Hash();

import InMemory from "@hickory/in-memory";
const inMemoryHistory = InMemory();`}
        </CodeBlock>
      </SideBySide>
      <SideBySide>
        <Explanation>
          <p>
            The <IJS>history</IJS> object will map URLs into location objects.
            The domain and protocol segments of a URL are ignored. Only the{" "}
            <IJS>pathname</IJS>, <IJS>query</IJS> (search), and <IJS>hash</IJS>{" "}
            segments are used.
          </p>
          <p>
            Only the <IJS>pathname</IJS> will be used for route matching.
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
            The <IJS>query</IJS> value of a location is a string by default, but
            the history object can be configured to automatically parse it into
            an object.
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
    </Section>
    <Section title="Routes" id="routes-array">
      <SideBySide>
        <Explanation>
          <p>
            <IJS>routes</IJS> is an array of route objects. Each route has a
            unique <IJS>name</IJS> and a <IJS>path</IJS> that describes what
            locations to match.
          </p>
          <p>
            <strong>Note:</strong> <IJS>path</IJS> strings do not include a
            leading slash.
          </p>
          <p>
            Routes can be nested. A child route's <IJS>path</IJS> will build on
            the paths from any ancestor routes.
          </p>
          <p>
            The "Not Found" route's <IJS>path</IJS> matches every location, so
            it is included after all other routes to render a 404 page.
          </p>
          <p>
            URLs can be annoying to write, so Curi handles this for you. When
            you want to navigate to another route in an application, you specify
            the name of the route to navigate to (and any params for the route)
            instead of having to write the URL.
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
      // matches /photos/6789/12345
      {
        name: "Photo",
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
    </Section>
    <Section title="Responses" id="response-object">
      <SideBySide>
        <Explanation>
          <p>
            When Curi receives a location, it compares the location's{" "}
            <IJS>pathname</IJS> to each route's <IJS>path</IJS> to find which
            one matches best and uses that route to create a response object.
          </p>
          <p>
            Some of a response's properties are set based on the matched route,
            while others are set by the matched route's <IJS>response()</IJS>{" "}
            function.
          </p>
          <p>
            The <IJS>body</IJS> is the most important property because it is
            what the application will render (e.g. a React or Vue component).
          </p>
        </Explanation>
        <CodeBlock>
          {`response = {
  // match properties
  name: 'Photo',
  partials: ['Album'],
  params: { photoID: 12345, albumID: 6789 },
  location: {
    pathname: '/photos/6789/12345',
    ...
  },

  // set by matched route's response() function
  body: function Photo() {...},
  status: 200,
  data: {...},
  title: 'Photo 12345',
  error: undefined
}`}
        </CodeBlock>
      </SideBySide>
    </Section>
    <Section title="Navigation" id="navigation">
      <SideBySide>
        <Explanation>
          <p>
            The router receives locations from its <IJS>history</IJS> object.
            This either happens from in-app navigation (e.g. clicking a link) or
            browser navigation (e.g. click the back button or typing URL in the
            address bar and hitting enter).
          </p>
          <p>
            The router has a <IJS>navigate()</IJS> method that navigates using
            the <IJS>name</IJS> of the route you want to navigate to and any
            route <IJS>params</IJS>. The navigation <IJS>method</IJS> controls
            how the history session is updated, with the default behavior acting
            like clicking a link.
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
  method: "REPLACE"
});`}</CodeBlock>
      </SideBySide>
    </Section>
    <Section title="Setting Response Properties" id="route-response">
      <SideBySide>
        <Explanation>
          <p>
            Each route can have a <IJS>response</IJS> function for adding
            properties to a response when that route matches the location.
          </p>
          <p>
            The function receives an object with the <IJS>match</IJS> properties
            of the response.
          </p>
          <p>
            The argument object also has a <IJS>resolved</IJS> property to
            access any asynchronously resolve data from the matched routes{" "}
            <IJS>match</IJS> functions.
          </p>
        </Explanation>
        <CodeBlock>
          {`import User from "./components/User";
const routes = [
  {
    name: "User",
    path: "",
    response({ match, resolved }) {
      return {
        body: User,
        title: \`User \${match.params.id}\`
      };
    }
  }
];`}
        </CodeBlock>
      </SideBySide>
    </Section>
    <Section title="Async Routes" id="async-route">
      <SideBySide>
        <Explanation>
          <p>
            A route can have functions that will be called when a route matches.
            These are grouped under the <IJS>match</IJS> property.{" "}
            <IJS>match</IJS> functions are called every time that a route
            matches. However, Curi also provides a <IJS>once()</IJS> function to
            add some basic caching for functions that will re-use their result.
          </p>
          <p>
            The resolved values from <IJS>match</IJS> functions will be passed
            to the route's <IJS>response()</IJS> function through the{" "}
            <IJS>resolved</IJS> property. The resolved values can be accessed
            using the <IJS>match</IJS> functions' names.
          </p>
          <p>
            <IJS>match</IJS> functions receive the matched route properties of a
            response and are expected to return a Promise.
          </p>
          <p>
            If any <IJS>match</IJS> function has an uncaught error, it will be
            available in the route's <IJS>response()</IJS> method as{" "}
            <IJS>error</IJS>.
          </p>
        </Explanation>
        <CodeBlock>{`const routes = [
  {
    name: "User",
    path: "user/:id",
    match: {
      body() => import("./components/User"),
      data({ params })) => fetch(\`api/user/\${params.id}\`)
        .then(resp => JSON.parse(resp))
    },
    response({ resolved, error }) {
      if (error) {
        // handle the error
      }
      return {
        body: resolved.body,
        data: resolved.data
      }
    }
  }
];`}</CodeBlock>
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
            trigger re-renders for new responses. <IJS>@curi/react</IJS> does
            this using the <Cmp>CuriProvider</Cmp> component and{" "}
            <IJS>@curi/vue</IJS> uses the <IJS>CuriPlugin</IJS>.
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
            If you have any asynchronous routes (routes with <IJS>match</IJS>{" "}
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
            We've finally gotten to rendering. How this is done really varies
            based on how you are rendering, but the idea is always the same.
          </p>
          <p>
            When the app loads and whenever there is navigation in the app, a
            new response is created. The application will use the properties of
            this new response, especially <IJS>response.body</IJS>, to render
            new content.
          </p>
        </Explanation>
      </SideBySide>
      <SideBySide>
        <Explanation>
          <p>
            <IJS>@curi/react</IJS> uses a <Cmp>CuriProvider</Cmp> with a
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
ReactDOM.render((
  <CuriProvider router={router}>
    {({ response }) => {
      const { body:Body } = response;
      return <Body />;
    }}
  </CuriProvider>
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

    <h2>Next</h2>
    <p>
      Curi can match routes synchronously or asynchronously. The{" "}
      <Link to="Guide" params={{ slug: "sync-or-async" }}>
        Sync or Async Guide
      </Link>{" "}
      covers how this works and what it means for your application.
    </p>
  </BaseGuide>
);
