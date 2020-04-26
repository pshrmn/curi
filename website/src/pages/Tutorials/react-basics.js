import React from "react";
import { Link } from "@curi/react-dom";

import {
  TitledPlainSection,
  HashSection,
  HashAside,
  Paragraph,
  CodeBlock,
  Outline,
  Note,
  IJS,
  Cmp,
  CodeSandboxDemo,
  ScrollableTable
} from "../../components/tutorial/common";

let demoMeta = {
  title: "Demo",
  hash: "demo"
};

let setupMeta = { title: "Setup", hash: "setup" };

let pathMeta = {
  title: "Path basics",
  hash: "path-basics"
};
let routesMeta = {
  title: "Routes",
  hash: "routes",
  children: [pathMeta]
};

let historyMeta = { title: "History", hash: "history" };

let a11yMeta = {
  title: "Announcing Navigation",
  hash: "announcing-navigation"
};
let routerMeta = {
  title: "The Router",
  hash: "router",
  children: [a11yMeta]
};

let responseMeta = {
  title: "Responses and Navigation",
  hash: "responses"
};
let respondFnMeta = {
  title: "route.respond",
  hash: "route-respond"
};
let renderingMeta = {
  title: "Rendering with React",
  hash: "rendering",
  children: [responseMeta, respondFnMeta]
};

let linkMeta = {
  title: "The <Link> Component",
  hash: "link-component"
};
let menuMeta = { title: "A Navigation Menu", hash: "nav-menu" };
let bookLinkMeta = { title: "Linking to Books", hash: "book-links" };
let navigatingMeta = {
  title: "Navigating between locations",
  hash: "navigating",
  children: [linkMeta, menuMeta, bookLinkMeta]
};

let urlAndNavigateMeta = {
  title: "The Router's URL & Navigate Methods",
  hash: "url-nav-method"
};
let shoppingMeta = {
  title: "A Shopping API",
  hash: "shopping"
};
let useRouterMeta = {
  title: "Using useRouter",
  hash: "useRouter",
  children: [urlAndNavigateMeta]
};
let nextMeta = { title: "What's next?", hash: "next" };

let contents = [
  demoMeta,
  setupMeta,
  routesMeta,
  historyMeta,
  routerMeta,
  renderingMeta,
  navigatingMeta,
  shoppingMeta,
  useRouterMeta,
  nextMeta
];

function ReactBasicsTutorial() {
  return (
    <React.Fragment>
      <TitledPlainSection title="React Basics Tutorial">
        <Paragraph>
          In this tutorial, we will be building the front end of a website for a
          bookstore.
        </Paragraph>

        <Outline>
          <li>
            Creating a React application using{" "}
            <a href="https://facebook.github.io/create-react-app/">
              Create React App
            </a>
            .
          </li>
          <li>Defining the website's valid routes</li>
          <li>Setting up a router</li>
          <li>Rendering different content based on the current location.</li>
          <li>Writing links to navigate within the application.</li>
        </Outline>
      </TitledPlainSection>

      <HashSection meta={demoMeta} tag="h2">
        <Paragraph>
          You can run a demo of the site we are building with CodeSandbox.
        </Paragraph>
        <CodeSandboxDemo
          id="github/curijs/react-basic-tutorial/tree/master/"
          title="Curi React basic tutorial"
        />
      </HashSection>

      <HashSection meta={setupMeta} tag="h2">
        <Paragraph>
          We will be using{" "}
          <a href="https://github.com/facebook/create-react-app">
            <IJS>create-react-app</IJS>
          </a>{" "}
          to develop this website.
        </Paragraph>

        <Note>
          <Paragraph>
            The instructions here assume that you have NodeJS and NPM installed
            on your computer. If you do not, cannot, or prefer to avoid setup
            altogether, you can follow along using{" "}
            <a href="https://codesandbox.io/">CodeSandbox</a>. Some of the
            boilerplate will be different, but the differences are minor.
          </Paragraph>
        </Note>

        <Paragraph>
          Begin by opening a terminal and navigating to the directory where you
          want to save your code. Then, we will use <IJS>npx</IJS> to create the
          application.
        </Paragraph>

        <CodeBlock lang="bash">
          {`npx create-react-app curi-react-bookstore # create the app
cd curi-react-bookstore # enter the new app directory`}
        </CodeBlock>

        <Paragraph>
          There are three routing related packages that we will be using, so
          let's install them now.
        </Paragraph>

        <Paragraph>
          The <IJS>@hickory/browser</IJS> manages locations and navigation
          within an application. <IJS>@curi/router</IJS> creates our router.{" "}
          <IJS>@curi/react-dom</IJS> provides React components that interact
          with the router.
        </Paragraph>

        <CodeBlock lang="bash">
          {`npm install @hickory/browser @curi/router @curi/react-dom`}
        </CodeBlock>

        <Paragraph>
          Next, we can start <IJS>create-react-app</IJS>'s dev server. The dev
          server will automatically update when we change files, so we can leave
          that running.
        </Paragraph>

        <CodeBlock lang="bash">
          {`npm run start # start the dev server`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={routesMeta} tag="h2">
        <Paragraph>
          A single-page application is made up of a number of "routes", which
          are the valid locations within the application. The router matches the
          application against its routes to determine which one matches.
        </Paragraph>
        <Paragraph>
          With Curi, routes are JavaScript objects. They have two required
          properties: <IJS>name</IJS> and <IJS>path</IJS>.
        </Paragraph>

        <CodeBlock>
          {`// this is a route
{ name: "Home", path: "" }`}
        </CodeBlock>

        <Paragraph>
          A route's <IJS>name</IJS> needs to be unique. Route names are used to
          identify which route to interact with for different functionality,
          like navigation.
        </Paragraph>
        <Paragraph>
          A route's <IJS>path</IJS> is what the router uses to identify if a
          location matches the route. The <IJS>path</IJS> is only matched
          against the location's pathname, the other parts of a URL are not used
          for matching.
        </Paragraph>

        <HashAside meta={pathMeta} tag="h3">
          <Paragraph>
            Route paths are strings describing the pathname segments of a URL
            that they should match.
          </Paragraph>

          <CodeBlock>
            {`{ path: '' } // matches "/"
{ path: 'about/stuff' } // matches "/about/stuff"`}
          </CodeBlock>

          <Paragraph>Paths never begin with a slash.</Paragraph>

          <CodeBlock>
            {`// yes
{ path: '' }
// no
{ path: '/' }`}
          </CodeBlock>

          <Paragraph>
            Paths can include dynamic parameters. These are specified with a
            string that starts with a colon (<IJS>:</IJS>) followed by the name
            of the params.
          </Paragraph>

          <CodeBlock>
            {`// a param named "id"
{ path: 'user/:id' }
// user/abc -> { id: "abc" }`}
          </CodeBlock>

          <Paragraph>
            Routes can be nested using the <IJS>children</IJS> property of a
            route. A nested route inherits the path from its ancestor route(s),
            so its <IJS>path</IJS> is only the additional part of the pathname
            that should be matched.
          </Paragraph>

          <CodeBlock>
            {`{
  name: "Parent",
  path: "parent", // matches /parent
  children: [
    // matches /parent/daughter
    { name: "Daughter", path: "daughter" },
    // matches /parent/son
    { name: "Son", path: "son" }
  ]
}`}
          </CodeBlock>
        </HashAside>

        <Paragraph>The website will start with four routes.</Paragraph>

        <ScrollableTable>
          <thead>
            <tr>
              <th>name</th>
              <th>path</th>
              <th>use case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Home</td>
              <td>
                <IJS>""</IJS>
              </td>
              <td>Lists books available for purchase.</td>
            </tr>
            <tr>
              <td>Book</td>
              <td>
                <IJS>"book/:id"</IJS>
              </td>
              <td>
                Details about an individual book. The <IJS>id</IJS> param
                identifies a specific book.
              </td>
            </tr>
            <tr>
              <td>Checkout</td>
              <td>
                <IJS>"checkout"</IJS>
              </td>
              <td>Buy the books in the shopping cart.</td>
            </tr>
            <tr>
              <td>Catch All</td>
              <td>
                <IJS>"(.*)"</IJS>
              </td>
              <td>
                Display a not found page. This path matches every location
                (using a regular expression syntax), so it should be the last
                route.
              </td>
            </tr>
          </tbody>
        </ScrollableTable>

        <Note>
          <Paragraph>
            Curi uses the{" "}
            <a href="https://github.com/pillarjs/path-to-regexp">
              <IJS>path-to-regexp</IJS>
            </a>{" "}
            package for route matching. You can read its documentation to learn
            about more advanced path syntax.
          </Paragraph>
        </Note>
        <Paragraph>
          Inside of the <IJS>src</IJS> directory, we will create a{" "}
          <IJS>routes.js</IJS> file where we can define the application's
          routes.
        </Paragraph>

        <CodeBlock lang="bash">{`touch src/routes.js`}</CodeBlock>

        <Paragraph>
          We can create an array of routes using the above names and paths.
        </Paragraph>
        <Paragraph>
          <IJS>@curi/router</IJS> provides a <IJS>prepareRoutes</IJS> function,
          which is used to setup routes for the router. We will pass the routes
          array to <IJS>prepareRoutes</IJS> and export the result of that
          function call.
        </Paragraph>

        <CodeBlock>
          {`// src/routes.js
import { prepareRoutes } from "@curi/router";

export default prepareRoutes([
  {
    name: "Home",
    path: ""
  },
  {
    name: "Book",
    path: "book/:id"
  },
  {
    name: "Checkout",
    path: "checkout"
  },
  {
    name: "Catch All",
    path: "(.*)"
  }
]);`}
        </CodeBlock>

        <Paragraph>
          We will be creating the router in the <IJS>index.js</IJS> file, so the
          routes array should be imported there.
        </Paragraph>

        <CodeBlock lang="jsx" data-line="5">
          {`// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';

import routes from "./routes";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={historyMeta} tag="h2">
        <Paragraph>
          The routes define what the application renders for a particular
          location, but we also need to define how the application navigates.
          When we create the router, we will pass it a history function that
          will be used to enable navigation.
        </Paragraph>

        <Paragraph>
          Curi uses the <a href="https://github.com/pshrmn/hickory">Hickory</a>{" "}
          library for its history. There are a few Hickory packages to choose
          from for different environments. For most websites, the{" "}
          <IJS>@hickory/browser</IJS> is the right choice for the front end.
        </Paragraph>

        <Paragraph>
          We can import the <IJS>browser</IJS> function from{" "}
          <IJS>@hickory/browser</IJS> in our index file (<IJS>src/index.js</IJS>
          , which <IJS>create-react-app</IJS> created for us).
        </Paragraph>

        <CodeBlock lang="jsx" data-line="4">
          {`// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { browser } from '@hickory/browser';

import routes from "./routes";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={routerMeta} tag="h2">
        <Paragraph>
          We are now ready to create the router. In the <IJS>src/index.js</IJS>{" "}
          file, we should import the <IJS>createRouter</IJS> function from{" "}
          <IJS>@curi/router</IJS>. To create the router, call the{" "}
          <IJS>createRouter</IJS> function passing it the history function and
          the <IJS>routes</IJS> array.
        </Paragraph>

        <CodeBlock lang="jsx" data-line="4,12">
          {`// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { createRouter } from "@curi/router";
import { browser } from '@hickory/browser';

import routes from './routes';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let router = createRouter(browser, routes);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();`}
        </CodeBlock>

        <Paragraph>
          The router is now ready and we can render the application, but first
          we should do something really important: make the site more
          accessible.
        </Paragraph>

        <HashSection meta={a11yMeta} tag="h3">
          <Paragraph>
            In a multi-page application, a screen reader will announce
            navigation to users. This happens automatically when a new Document
            is loaded. A single-page application reuses its Document, which is
            great for removing unnecessary server requests, but also means that
            the navigation is no longer automatically announced.
          </Paragraph>

          <Paragraph>
            Curi has a concept of "side effects". These are functions that are
            called after a navigation happens and are passed an object with data
            about the navigation.
          </Paragraph>

          <Paragraph>
            The <IJS>@curi/router</IJS> package provides a few side effects that
            are useful for websites. For now, we will focus on the{" "}
            <Link
              name="Package"
              params={{ package: "router", version: "v2" }}
              hash="announce"
            >
              <IJS>announce</IJS>
            </Link>{" "}
            side effect. The <IJS>announce</IJS> side effect returns a string,
            which sets the text content of a{" "}
            <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions">
              ARIA Live region
            </a>
            . Screen readers will detect the changed text and read it to the
            users.
          </Paragraph>

          <Paragraph>
            Let's go ahead and add the <IJS>announce</IJS> side effect to the
            router. We will have it return a string of the response's{" "}
            <IJS>pathname</IJS>.
          </Paragraph>

          <CodeBlock lang="jsx" data-line="4,12-18">
            {`// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { createRouter, announce } from "@curi/router";
import { browser } from '@hickory/browser';

import routes from './routes';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let router = createRouter(browser, routes, {
  sideEffects: [
    announce(({ response }) => {
      return \`Navigated to \${response.location.pathname}\`;
    })
  ]
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();`}
          </CodeBlock>
        </HashSection>
      </HashSection>

      <HashSection meta={renderingMeta} tag="h2">
        <Paragraph>
          The <IJS>@curi/react-dom</IJS> provides the components that we will
          use to interact with the router.
        </Paragraph>
        <Paragraph>
          We create a <IJS>Router</IJS> component by passing the router to the{" "}
          <IJS>createRouterComponent</IJS> higher-order component.
        </Paragraph>

        <Note>
          <Paragraph>
            Curi uses a higher-order component to create a component instead of
            a regular component because the router is a permanent "prop". An
            application should only have one router, so this approach
            discourages trying to swap routers.
          </Paragraph>
        </Note>

        <CodeBlock lang="jsx" data-line="6,20">
          {`// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { createRouter, announce } from "@curi/router";
import { browser } from '@hickory/browser';
import { createRouterComponent } from "@curi/react-dom";

import routes from './routes';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let router = createRouter(browser, routes, {
  sideEffects: [
    announce(({ response }) => {
      return \`Navigated to \${response.location.pathname}\`;
    })
  ]
});
let Router = createRouterComponent(router);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();`}
        </CodeBlock>

        <Paragraph>
          The <IJS>Router</IJS> component will re-render the application
          whenever there is in-app navigation. It also sets up a React context,
          so any <IJS>@curi/react-dom</IJS> components and hooks need to be
          descendants of the <IJS>Router</IJS> in order to access the context.
        </Paragraph>

        <Paragraph>
          We will pass the <IJS>Router</IJS> the <IJS>App</IJS> element, which
          is where we will render the application's content.
        </Paragraph>

        <CodeBlock lang="jsx" data-line="22-26">
          {`// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { createRouter, announce } from "@curi/router";
import { browser } from '@hickory/browser';
import { createRouterComponent } from "@curi/react-dom";

import routes from './routes';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let router = createRouter(browser, routes, {
  sideEffects: [
    announce(({ response }) => {
      return \`Navigated to \${response.location.pathname}\`;
    })
  ]
});
let Router = createRouterComponent(router);

ReactDOM.render((
  <Router>
    <App />
  </Router>
), document.getElementById('root'));
registerServiceWorker();`}
        </CodeBlock>

        <Paragraph>
          The existing content from <IJS>src/App.js</IJS> can be removed and we
          will start from scratch.
        </Paragraph>

        <Paragraph>
          We will import the{" "}
          <Link
            name="Package"
            params={{ package: "react-dom", version: "v2" }}
            hash="useResponse"
          >
            <IJS>useResponse</IJS> hook
          </Link>{" "}
          from <IJS>@curi/react-dom</IJS>. This hook lets us read the context
          data that was set by the <IJS>Router</IJS>. <IJS>useResponse</IJS>{" "}
          returns three objects: <IJS>router</IJS>, <IJS>response</IJS>, and{" "}
          <IJS>navigation</IJS>.
        </Paragraph>

        <CodeBlock lang="jsx">
          {`// src/App.js
import React from "react";
import { useResponse } from "@curi/react-dom";

export default function App() {

}`}
        </CodeBlock>

        <Paragraph>
          The <IJS>router</IJS> property is our Curi router, but what are the
          other two?
        </Paragraph>

        <HashAside meta={responseMeta} tag="h3">
          <Paragraph>
            Whenever Curi receives a location, it matches its routes against it
            and creates a response object, which contains data about the route
            that matched the location.
          </Paragraph>

          <CodeBlock>
            {`// a sample response object
{
  body: undefined,
  data: undefined,
  location: { pathname: '/', ... },
  name: 'Home',
  params: {},
  partials: [],
  meta: {
    status: 200
  }
}`}
          </CodeBlock>

          <Paragraph>
            The router uses the{" "}
            <a href="https://en.wikipedia.org/wiki/Observer_pattern">
              observer pattern
            </a>{" "}
            to register functions that will be called when a new response is
            created. The <IJS>Router</IJS> automatically observes the router so
            that it can re-render the application whenever there is a new
            response.
          </Paragraph>
          <Paragraph>
            The <IJS>navigation</IJS> object contains additional information
            about a navigation that doesn't make sense to include in the
            response object. This includes the navigation's "action" (
            <IJS>push</IJS>, <IJS>pop</IJS>, or <IJS>replace</IJS>) and the
            previous response object.
          </Paragraph>

          <CodeBlock>
            {`// a sample navigation object
{
  action: "push",
  previous: { name: ..., location: ..., ... }
}`}
          </CodeBlock>
        </HashAside>

        <Paragraph>
          The response is the most useful of these three properties, but the
          other two may can be handy. For example, the <IJS>navigation</IJS> can
          be useful for animating route transitions.
        </Paragraph>
        <Paragraph>
          How do we render using the <IJS>response</IJS>? Any way you want! The
          best way is to use a <IJS>response</IJS>'s <IJS>body</IJS> property.
        </Paragraph>

        <HashAside meta={respondFnMeta} tag="h3">
          <Paragraph>
            Route's can have a <IJS>respond</IJS> property, which is a function
            that returns an object. The (valid) properties of the object will be
            merged onto the response object.
          </Paragraph>

          <Paragraph>
            One of these valid properties is <IJS>body</IJS>, so if the{" "}
            <IJS>respond</IJS> function returns an object with a <IJS>body</IJS>{" "}
            property, we can access it from the response as{" "}
            <IJS>response.body</IJS>.
          </Paragraph>

          <CodeBlock>
            {`{
  name: "Home",
  path: "",
  respond() {
    return {
      body: "Home, sweet home."
    };
    /*
      * response = {
      *   name: "Home",
      *   location: {...},
      *   body: "Home, sweet home.",
      *   // ...
      * }
      */
  }
}`}
          </CodeBlock>
        </HashAside>

        <Paragraph>
          We can update the <IJS>App</IJS> to get the response using{" "}
          <IJS>useResponse</IJS>.
        </Paragraph>

        <CodeBlock lang="jsx" data-line="6">
          {`// src/App.js
import React from "react";
import { useResponse } from "@curi/react-dom";

export default function App() {
  let { response } = useResponse();
}`}
        </CodeBlock>

        <Paragraph>
          If a response's <IJS>body</IJS> is a React component, we can render
          it! We haven't actually defined components for our routes yet, so we
          should throw together some placeholders.
        </Paragraph>

        <CodeBlock lang="bash">
          {`mkdir -p src/components
touch src/components/Home.js src/components/Book.js \\
  src/components/Checkout.js src/components/NotFound.js`}
        </CodeBlock>

        <CodeBlock lang="jsx">
          {`// src/components/Home.js
import React from 'react';

export default function Home() {
  return (
    <article>
      <Paragraph>Home</Paragraph>
    </article>
  );
}`}
        </CodeBlock>

        <CodeBlock lang="jsx">
          {`// src/components/Book.js
import React from 'react';

export default function Book(){
  return (
    <article>
      <Paragraph>Book</Paragraph>
    </article>
  );
}`}
        </CodeBlock>

        <CodeBlock lang="jsx">
          {`// src/components/Checkout.js
import React from 'react';

export default function Checkout() {
  return (
    <article>
      <Paragraph>Checkout</Paragraph>
    </article>
  );
}`}
        </CodeBlock>

        <CodeBlock lang="jsx">
          {`// src/components/NotFound.js
import React from 'react';

export default function NotFound() {
  return (
    <article>
      <Paragraph>Not Found</Paragraph>
    </article>
  );
}`}
        </CodeBlock>

        <Paragraph>
          These components can be imported in <IJS>src/routes.js</IJS>. Each
          route can be given a <IJS>respond</IJS> function which returns an
          object with their respective component as its <IJS>body</IJS>.
        </Paragraph>

        <CodeBlock data-line="4-7,13-15,20-22,27-29,34-36">
          {`// src/routes.js
import { prepareRoutes } from "@curi/router";

import Home from './components/Home';
import Book from './components/Book';
import Checkout from './components/Checkout';
import NotFound from './components/NotFound';

export default prepareRoutes([
  {
    name: "Home",
    path: "",
    respond() {
      return { body: Home };
    }
  },
  {
    name: "Book",
    path: "book/:id",
    respond() {
      return { body: Book };
    }
  },
  {
    name: "Checkout",
    path: "checkout",
    respond() {
      return { body: Checkout };
    }
  },
  {
    name: "Catch All",
    path: "(.*)",
    respond() {
      return { body: NotFound };
    }
  }
]);`}
        </CodeBlock>

        <Paragraph>
          Now that the responses have <IJS>body</IJS> properties that are React
          components, we can update the <IJS>App</IJS> to render them.
        </Paragraph>

        <Paragraph>
          We will also pass the <IJS>response</IJS> as a prop to the rendered
          component, which means that each of the route components will have
          access to the <IJS>response</IJS> when they are rendered. This isn't
          strictly necessary, but can come in handy.
        </Paragraph>

        <CodeBlock lang="jsx" data-line="7-8">
          {`// src/App.js
import React from "react";
import { useResponse } from "@curi/react-dom";

export default function App() {
  let { response } = useResponse();
  let { body:Body } = response;
  return <Body response={response} />
}`}
        </CodeBlock>

        <Paragraph>
          At this point in time our app is rendering, but is isn't very
          interesting because we cannot navigate between locations.
        </Paragraph>
      </HashSection>

      <HashSection meta={navigatingMeta} tag="h2">
        <Paragraph>
          The <IJS>@curi/react-dom</IJS> package provides a <IJS>Link</IJS>{" "}
          component that we can use to navigate between locations within our
          application.
        </Paragraph>

        <HashAside meta={linkMeta} tag="h3">
          <Paragraph>
            Navigation isn't done by manually typing the pathname of the
            location the link should navigate to. Instead, we specify the name
            of the route using the <IJS>name</IJS> prop.
          </Paragraph>

          <CodeBlock lang="jsx">
            {`// { name: "Home", path: "" }
<Link name="Home">Home</Link>
// <a href="/">Home</a>`}
          </CodeBlock>

          <Paragraph>
            If a route has params, we provide these to the <IJS>Link</IJS> as a{" "}
            <IJS>params</IJS> object. For a nested route, we would also need to
            provide params for any ancestor routes.
          </Paragraph>

          <CodeBlock lang="jsx">
            {`// { name: "Book", path: "book/:id" }
<Link name="Book" params={{ id: 7 }}>The Dark Forest</Link>
// <a href="/book/7">The Dark Forest</a>`}
          </CodeBlock>

          <Paragraph>
            The <IJS>Link</IJS> is only for in-app navigation. If you want to
            link to pages outside of the application, use an anchor.
          </Paragraph>

          <CodeBlock lang="jsx">
            {`// in-app
<Link name="Some Route">Some Route</Link>

// out of app
<a href="https://github.com">GitHub</a>`}
          </CodeBlock>

          <Paragraph>
            If you need to attach query or hash data to a <IJS>Link</IJS>, use
            the <IJS>query</IJS> and <IJS>hash</IJS> props.
          </Paragraph>

          <CodeBlock lang="jsx">
            {`// { name: "Checkout", path: "checkout" }
<Link name="Checkout" query='affiliate=123'>Checkout</Link>
// <a href="/checkout?affiliate=123">Checkout</a>`}
          </CodeBlock>
        </HashAside>

        <HashSection meta={menuMeta} tag="h3">
          <Paragraph>
            The application will have a navigation menu component with links to
            our home page and checkout page.
          </Paragraph>

          <CodeBlock lang="bash">{`touch src/components/NavMenu.js`}</CodeBlock>

          <Paragraph>
            In order to link to these routes, we only need to know their name,
            not the actual pathname for the URL.
          </Paragraph>

          <CodeBlock lang="jsx">
            {`// src/components/NavMenu.js
import React from 'react';
import { Link } from '@curi/react-dom';

export default function NavMenu() {
  return (
    <nav>
      <ul>
        <li>
          <Link name="Home">Home</Link>
        </li>
        <li>
          <Link name="Checkout">Checkout</Link>
        </li>
      </ul>
    </nav>
  );
}`}
          </CodeBlock>
          <Paragraph>
            The menu can be rendered by the <IJS>App</IJS> component. We can
            also add structure to the site by rendering <Cmp>header</Cmp> and{" "}
            <Cmp>main</Cmp> elements around their respective content.
          </Paragraph>

          <CodeBlock lang="jsx" data-line="5,10-19">
            {`// src/App.js
import React from "react";
import { useResponse } from "@curi/react-dom";

import NavMenu from './components/NavMenu';

export default function App() {
  let { response } = useResponse();
  let { body:Body } = response;
  return (
    <React.Fragment>
      <header>
        <NavMenu />
      </header>
      <main>
        <Body response={response} />
      </main>
    </React.Fragment>
  );
}`}
          </CodeBlock>
        </HashSection>

        <HashSection meta={bookLinkMeta} tag="h3">
          <Paragraph>
            The website should link to individual books from its home page. To
            do this, we need data about the available books. Since we don't have
            a backend to fetch book data from, we'll hard-code the books data in
            the <IJS>src/books.js</IJS> module.
          </Paragraph>

          <CodeBlock lang="bash">{`touch src/books.js`}</CodeBlock>

          <Paragraph>
            You can copy+paste or modify the data, but the structure of the
            provided data should stay the same.
          </Paragraph>

          <CodeBlock>
            {`// src/books.js
export default [
  {
    id: 0,
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    published: '2007',
    pages: 662
  },
  {
    id: 1,
    title: "The Wise Man's Fear",
    author: 'Patrick Rothfuss',
    published: '2011',
    pages: 994
  },
  {
    id: 2,
    title: 'The Way of Kings',
    author: 'Brandon Sanderson',
    published: '2010',
    pages: 1007
  },
  {
    id: 3,
    title: 'A Storm of Swords',
    author: 'George R.R. Martin',
    published: '2003',
    pages: 1177
  },
  {
    id: 78,
    title: 'Words of Radiance',
    author: 'Brandon Sanderson',
    published: '2014',
    pages: 1087
  }
];`}
          </CodeBlock>

          <Paragraph>
            The data can be imported in the <IJS>Home</IJS> component and we can
            iterate over the books to render a <IJS>Link</IJS> to each one.
          </Paragraph>

          <CodeBlock lang="jsx" data-line="5,8-20">
            {`// src/components/Home.js
import React from 'react';
import { Link } from '@curi/react-dom';

import books from '../books';

export default function Home() {
  return (
    <article>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <Link name="Book" params={{ id: book.id }} >
              {book.title} by {book.author}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}`}
          </CodeBlock>

          <Paragraph>
            Now that we can navigate to the books, we should fill out the UI for
            the <IJS>Book</IJS> component. Up above, we passed the{" "}
            <IJS>response</IJS> object as a prop to the <IJS>response.body</IJS>{" "}
            component. Now, we can use that object in the <IJS>Book</IJS>{" "}
            component to access the captured route params so that we know which
            book to show.
          </Paragraph>
          <Paragraph>
            We will once again import the <IJS>books.js</IJS> data. We can use{" "}
            <IJS>params.id</IJS> to select the correct book.{" "}
            <IJS>params.id</IJS> is a string, so we will need to parse it into
            an integer. Sometimes there won't be a valid book for the{" "}
            <IJS>params.id</IJS>. In that case, we will also want to display a
            message that the requested book could not be found.
          </Paragraph>

          <CodeBlock lang="jsx" data-line="4,6-20">
            {`// src/components/Book.js
import React from 'react';

import books from '../books';

export default function Book({ response }) {
  let id = parseInt(response.params.id, 10);
  let book = books.find(b => b.id === id);
  if (!book) {
    return (
      <article>
        <Paragraph>The requested book could not be found</Paragraph>
      </article>
    );
  }
  return (
    <article>
      <h1>{book.title}</h1>
      <h2>by {book.author}</h2>
      <Paragraph>Published in {book.published}</Paragraph>
      <Paragraph>{book.pages} pages</Paragraph>
    </article>
  );
}`}
          </CodeBlock>
        </HashSection>
      </HashSection>

      <HashSection meta={shoppingMeta} tag="h2">
        <Paragraph>
          Users of the website should be able to add books to their shopping
          cart. For brevity, we will store the cart data in memory (i.e. it will
          be lost when refreshing the page).
        </Paragraph>

        <CodeBlock lang="bash">{`touch src/cart.js`}</CodeBlock>

        <Paragraph>
          The shopping cart implementation will be a JavaScript <IJS>Map</IJS>.
          We can call its <IJS>set</IJS> method to add books, its{" "}
          <IJS>clear</IJS> method to reset the cart, and iterate over its{" "}
          <IJS>entries</IJS> with a <IJS>for...of</IJS> loop.
        </Paragraph>
        <Note>
          <Paragraph>
            The <IJS>Map</IJS> or some of its features may not work in older
            browsers.
          </Paragraph>
        </Note>

        <CodeBlock>
          {`// src/cart.js
let cart = new Map();

export default {
  add(book, quantity) {
    cart.set(book, quantity);
  },
  items() {
    let books = [];
    for (let [book, quantity] of cart.entries()) {
      books.push({
        title: book.title,
        quantity
      });
    }
    return books;
  },
  reset() {
    cart.clear();
  }
};`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={useRouterMeta} tag="h2">
        <Paragraph>
          The <IJS>useRouter</IJS> hook allows us to access our router from
          anywhere in our component tree (that is a descendant of the{" "}
          <Cmp>Router</Cmp>).
        </Paragraph>

        <Paragraph>
          While links are generally the best way to navigate, sometimes an
          application should navigate as the result of another action. For
          instance, after a user login is authenticated, the application may
          redirect to another page.
        </Paragraph>

        <Paragraph>
          We will implement something similar in the <IJS>Book</IJS> component
          by having the application navigate to their shopping cart after they
          add a book to it.
        </Paragraph>

        <HashAside meta={urlAndNavigateMeta} tag="h3">
          <Paragraph>
            The router has a <IJS>url</IJS> method that is used to generate a
            URL string using the name of a route and an object of the route's
            params.
          </Paragraph>

          <CodeBlock>{`let url = router.url({ name: "New" });`}</CodeBlock>

          <Paragraph>
            The router's <IJS>navigate</IJS> method is used to navigate; it
            takes a URL (such as one defined using <IJS>router.url</IJS>). The
            function can also take a <IJS>method</IJS> type for the navigation:{" "}
            <IJS>push</IJS>, <IJS>replace</IJS>, or <IJS>anchor</IJS>.
          </Paragraph>

          <Paragraph>
            <IJS>push</IJS> pushes a new location after the current index,
            removing any locations after the current location.
          </Paragraph>

          <CodeBlock>
            {`// session = ['/one', '/two', '/three']
// index = 1
// current = '/two'
router.navigate({ url: "/new", method: "push" });
// session = ['/one', '/two', '/new']
// index = 2
// current = '/new'`}
          </CodeBlock>

          <Paragraph>
            <IJS>replace</IJS> replaces the location at the current index.
          </Paragraph>

          <CodeBlock>
            {`// session = ['/one', '/two', '/three']
// index = 1
// current = '/two'
router.navigate({ url: "/replacement", method: "replace" });
// session = ['/one', '/replacement', '/three']
// index = 1
// current = '/replacement'`}
          </CodeBlock>

          <Paragraph>
            <IJS>anchor</IJS> is a mix between <IJS>push</IJS> and{" "}
            <IJS>replace</IJS>. It mimics the behavior of clicking on links, so
            if you navigate to the same location as the current one it will
            replace, and if you navigate to a new location it will push.
          </Paragraph>
          <Paragraph>
            If <IJS>method.navigate</IJS> is called without a navigation{" "}
            <IJS>method</IJS>, it will default to <IJS>anchor</IJS>.
          </Paragraph>

          <CodeBlock>
            {`// session = ['/one', '/two', '/three']
// index = 1
// current = '/two'
router.navigate({ url: "/two", method: "anchor" });
// session = ['/one', '/two', '/three']
// index = 1
// current = '/two'
router.navigate({ url: "/new", method: "anchor" });
// session = ['/one', '/two', '/new']
// index = 2
// current = '/new'`}
            `}
          </CodeBlock>
        </HashAside>

        <Paragraph>
          In the <IJS>Book</IJS> components module, we should import the{" "}
          <IJS>useRouter</IJS> hook from <IJS>@curi/react-dom</IJS> as well as
          our shopping cart API.
        </Paragraph>

        <CodeBlock lang="jsx" data-line="3,6,21-30">
          {`// src/components/Book.js
import React from 'react';
import { useRouter } from '@curi/react-dom';

import books from '../books';
import cart from '../cart';

export default function Book({ response }) {
  let router = useRouter();
  let id = parseInt(response.params.id, 10);
  let book = books.find(b => b.id === id);
  if (!book) {
    return (
      <article>
        <Paragraph>The requested book could not be found</Paragraph>
      </article>
    );
  }
  return (
    <article>
      <h1>{book.title}</h1>
      <h2>by {book.author}</h2>
      <Paragraph>Published in {book.published}</Paragraph>
      <Paragraph>{book.pages} pages</Paragraph>
      <button
        type="button"
        onClick={() => {
          cart.add(book, 1);
          let url = router.url({ name: "Checkout" });
          router.navigate({ url });
        }}
      >
        Add to Cart
      </button>
    </article>
  );
}`}
        </CodeBlock>

        <Paragraph>
          Finally, we can update our <IJS>Checkout</IJS> component to display
          the books in the shopping cart. To do this, we will import our cart
          and books. Our cart only stores book <IJS>id</IJS>s, so we will need
          to merge the book data with the cart data.
        </Paragraph>
        <Paragraph>
          When a user "buys" the books in their shopping cart, we need to clear
          out the cart. We will also replace the current location with one whose{" "}
          <IJS>location.hash</IJS> is the string "thanks". When that is present
          in the location, we can render a "Thanks for your purchase" message
          instead of the cart's contents. Once again, we will use the{" "}
          <IJS>useRouter</IJS> hook to access the router in order to change
          locations.
        </Paragraph>

        <CodeBlock lang="jsx">
          {`// src/components/Checkout.js
import React from 'react';
import { useRouter } from '@curi/react-dom';

import cart from '../cart';

export default function Checkout({ response }) {
  let router = useRouter();
  let books = cart.items();
  if (!books.length) {
    return response.location.hash === 'thanks'
      ? <article>
          <Paragraph>Thanks for your purchase!</Paragraph>
        </article>
      : <article>
          <Paragraph>The cart is currently empty</Paragraph>
        </article>;
  }
  return (
    <article>
      <h1>Checkout</h1>
      <ScrollableTable>
        <thead>
          <tr>
            <th>Title</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.quantity}</td>
            </tr>
          ))}
        </tbody>
      </ScrollableTable>
      <button
        type="button"
        onClick={() => {
          cart.reset();
          let url = router.url({
            name: "Checkout",
            hash: "thanks"
          });
          router.navigate({ url, method: "replace" });
        }}
      >
        Buy
      </button>
    </article>
  );
};`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={nextMeta} tag="h2">
        <Paragraph>
          We now have a functional website built with React and Curi. What
          should you do next? Build another site!
        </Paragraph>

        <Paragraph>
          There is an{" "}
          <Link name="Tutorial" params={{ slug: "react-advanced" }}>
            advanced React tutorial
          </Link>{" "}
          that continues where this tutorial leaves off. The advanced tutorial
          implements code splitting and data prefetching.
        </Paragraph>

        <Paragraph>
          You can also check out the <Link name="Guides">guides</Link> for
          information on other advanced techniques.
        </Paragraph>
      </HashSection>
    </React.Fragment>
  );
}

export { ReactBasicsTutorial as component, contents };
