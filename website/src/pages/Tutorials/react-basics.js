import React from "react";
import { Link } from "@curi/react-dom";

import {
  HashSection,
  Explanation,
  CodeBlock,
  Outline,
  Note,
  IJS,
  Cmp,
  CodeSandboxDemo,
  ScrollableTable
} from "../../components/tutorial/common";

export default function ReactBasicsTutorial() {
  return (
    <React.Fragment>
      <h1>React Basics Tutorial</h1>
      <p>
        In this tutorial, we will be building the front end of a website for a
        bookstore.
      </p>
      <Outline>
        <ul>
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
        </ul>
      </Outline>

      <HashSection title="Demo" id="demo">
        <p>You can run a demo of the site we are building with CodeSandbox.</p>
        <CodeSandboxDemo id="github/curijs/react-basic-tutorial/tree/master/" />
      </HashSection>

      <HashSection title="Setup" id="setup">
        <Explanation>
          <p>
            We will be using{" "}
            <a href="https://github.com/facebook/create-react-app">
              <IJS>create-react-app</IJS>
            </a>{" "}
            to develop this website.
          </p>
          <Note>
            The instructions here assume that you have NodeJS and NPM installed
            on your computer. If you do not, cannot, or prefer to avoid setup
            altogether, you can follow along using{" "}
            <a href="https://codesandbox.io/">CodeSandbox</a>. Some of the
            boilerplate will be different, but the differences are minor.
          </Note>
          <p>
            Begin by opening a terminal and navigating to the directory where
            you want to save your code. Then, we will use <IJS>npx</IJS> to
            create the application.
          </p>
        </Explanation>

        <CodeBlock lang="bash">
          {`npx create-react-app curi-react-bookstore # create the app
cd curi-react-bookstore # enter the new app directory`}
        </CodeBlock>

        <Explanation>
          <p>
            There are three routing related packages that we will be using, so
            let's install them now.
          </p>

          <p>
            The <IJS>@hickory/browser</IJS> manages locations and navigation
            within an application. <IJS>@curi/router</IJS> creates our router.{" "}
            <IJS>@curi/react-dom</IJS> provides React components that interact
            with the router.
          </p>
        </Explanation>

        <CodeBlock lang="bash">
          {`npm install @hickory/browser @curi/router @curi/react-dom`}
        </CodeBlock>

        <Explanation>
          <p>
            Next, we can start <IJS>create-react-app</IJS>'s dev server. The dev
            server will automatically update when we change files, so we can
            leave that running.
          </p>
        </Explanation>

        <CodeBlock lang="bash">
          {`npm run start # start the dev server`}
        </CodeBlock>
      </HashSection>

      <HashSection title="Routes" id="routes">
        <Explanation>
          <p>
            A single-page application is made up of a number of "routes", which
            are the valid locations within the application. The router matches
            the application against its routes to determine which one matches.
          </p>
          <p>
            With Curi, routes are JavaScript objects. They have two required
            properties: <IJS>name</IJS> and <IJS>path</IJS>.
          </p>
        </Explanation>

        <CodeBlock>
          {`// this is a route
{ name: "Home", path: "" }`}
        </CodeBlock>

        <Explanation>
          <p>
            A route's <IJS>name</IJS> needs to be unique. Route names are used
            to identify which route to interact with for different
            functionality, like navigation.
          </p>
          <p>
            A route's <IJS>path</IJS> is what the router uses to identify if a
            location matches the route. The <IJS>path</IJS> is only matched
            against the location's pathname, the other segments of a URL are not
            used for matching.
          </p>
        </Explanation>

        <HashSection
          title="Path basics"
          id="path-basics"
          className="aside"
          tag="h3"
        >
          <Explanation>
            <p>
              Route paths are strings describing the pathname segments of a URL
              that they should match.
            </p>
          </Explanation>

          <CodeBlock>
            {`{ path: '' } // matches "/"
{ path: 'about/stuff' } // matches "/about/stuff"`}
          </CodeBlock>

          <Explanation>
            <p>Paths never begin with a slash.</p>
          </Explanation>

          <CodeBlock>
            {`// yes
{ path: '' }
// no
{ path: '/' }`}
          </CodeBlock>

          <Explanation>
            <p>
              Paths can include dynamic parameters. These are specified with a
              string that starts with a colon (<IJS>:</IJS>) followed by the
              name of the params.
            </p>
          </Explanation>

          <CodeBlock>
            {`// a param named "id"
{ path: 'user/:id' }
// user/abc -> { id: "abc" }`}
          </CodeBlock>

          <Explanation>
            <p>
              Routes can be nested using the <IJS>children</IJS> property of a
              route. A nested route inherits the path from its ancestor
              route(s), so its <IJS>path</IJS> is only the additional part of
              the pathname that should be matched.
            </p>
          </Explanation>

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
        </HashSection>

        <Explanation>
          <p>The website will start with four routes.</p>

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
            Curi uses the{" "}
            <a href="https://github.com/pillarjs/path-to-regexp">
              <IJS>path-to-regexp</IJS>
            </a>{" "}
            package for route matching. You can read its documentation to learn
            about more advanced path syntax.
          </Note>
          <p>
            Inside of the <IJS>src</IJS> directory, we will create a{" "}
            <IJS>routes.js</IJS> file where we can define the application's
            routes.
          </p>
        </Explanation>

        <CodeBlock lang="bash">{`touch src/routes.js`}</CodeBlock>

        <Explanation>
          <p>
            We can create an array of routes using the above names and paths.
          </p>
          <p>
            <IJS>@curi/router</IJS> provides a <IJS>prepareRoutes</IJS>{" "}
            function, which is used to setup routes for the router. We will pass
            the routes array to <IJS>prepareRoutes</IJS> and export the result
            of that function call.
          </p>
        </Explanation>

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

        <Explanation>
          <p>
            We will be creating the router in the <IJS>index.js</IJS> file, so
            the routes array should be imported there.
          </p>
        </Explanation>

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

      <HashSection title="History" id="history">
        <Explanation>
          <p>
            Along with the routes, we also need to create a history object for
            the router. The history object is responsible for creating locations
            and navigation within the application.
          </p>
          <p>
            Curi uses the{" "}
            <a href="https://github.com/pshrmn/hickory">Hickory</a> library for
            its history implementations. There are a few Hickory packages to
            choose from for different environments. For most websites, the{" "}
            <IJS>@hickory/browser</IJS> is the right choice for the front end,
            which is what we will be using
          </p>
          <p>
            We can import the <IJS>Browser</IJS> function from{" "}
            <IJS>@hickory/browser</IJS> in our index file (
            <IJS>src/index.js</IJS>, which <IJS>create-react-app</IJS> created
            for us) and call the function to create a history object.
          </p>
          <Note>
            The history object can be configured with{" "}
            <a href="https://github.com/pshrmn/hickory/blob/master/docs/api/Browser.md#options">
              an options object
            </a>
            , but we will stick with the defaults.
          </Note>
        </Explanation>

        <CodeBlock lang="jsx" data-line="4,11">
          {`// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Browser from '@hickory/browser';

import routes from "./routes";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const history = Browser();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();`}
        </CodeBlock>
      </HashSection>

      <HashSection title="The Router" id="router">
        <Explanation>
          <p>
            We are now ready to create the router. In the{" "}
            <IJS>src/index.js</IJS> file, we should import the <IJS>curi</IJS>{" "}
            function from <IJS>@curi/router</IJS>. To create the router, call
            the <IJS>curi()</IJS> function passing it the <IJS>history</IJS>{" "}
            object and the <IJS>routes</IJS> array.
          </p>
        </Explanation>

        <CodeBlock lang="jsx" data-line="4,13">
          {`// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { curi } from '@curi/router';
import Browser from '@hickory/browser';

import routes from './routes';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const history = Browser();
const router = curi(history, routes);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();`}
        </CodeBlock>

        <Explanation>
          <p>The router is now ready and we can render the application.</p>
        </Explanation>
      </HashSection>

      <HashSection title="Rendering with React" id="rendering">
        <Explanation>
          <p>
            The <IJS>@curi/react-dom</IJS> provides the components that we will
            use to interact with the router.
          </p>
          <p>
            We create a <Cmp>Router</Cmp> component by passing the router to the{" "}
            <IJS>curiProvider</IJS> higher-order component.
          </p>

          <Note>
            Curi uses a higher-order component to create a component instead of
            a regular component because the router is a permanent "prop". An
            application should only have one router, so this approach
            discourages trying to swap routers.
          </Note>
        </Explanation>

        <CodeBlock lang="jsx" data-line="6,15">
          {`// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { curi } from '@curi/router';
import Browser from '@hickory/browser';
import { curiProvider } from "@curi/react-dom";

import routes from './routes';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const history = Browser();
const router = curi(history, routes);
const Router = curiProvider(router);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();`}
        </CodeBlock>

        <Explanation>
          <p>
            The <Cmp>Router</Cmp> component will re-render the application
            whenever there is in-app navigation. It also sets up a React
            context, so the other <IJS>@curi/react-dom</IJS> components need to
            be descendants of the <Cmp>Router</Cmp> in order to access the
            context.
          </p>
          <p>
            The <Cmp>Router</Cmp> takes one prop: <IJS>children</IJS>.{" "}
            <IJS>children</IJS> is a render-invoked function that should return
            the content for the website. This function will receive an object
            that has three properties: <IJS>router</IJS>, <IJS>response</IJS>,
            and <IJS>navigation</IJS>. These properties (mostly the{" "}
            <IJS>response</IJS>) should be useful in determining what to render.
          </p>
          <p>
            We can also remove the <Cmp>App</Cmp> component import and delete
            the related files.
          </p>
        </Explanation>

        <CodeBlock lang="bash">
          {`rm src/App.js src/App.css src/App.test.js`}
        </CodeBlock>

        <CodeBlock lang="jsx" data-line="16-22">
          {`// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { curi } from '@curi/router';
import Browser from '@hickory/browser';
import { curiProvider } from "@curi/react-dom";

import routes from './routes';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const history = Browser();
const router = curi(history, routes);
const Router = curiProvider(router);

ReactDOM.render((
  <Router>
    {({ router, response, navigation }) => {
      return <div>This is the website</div>;
    }}
  </Router>
), document.getElementById('root'));
registerServiceWorker();`}
        </CodeBlock>

        <Explanation>
          <p>
            The <IJS>router</IJS> property is our Curi router, but what are the
            other two?
          </p>
        </Explanation>

        <HashSection
          title="Responses and Navigation"
          id="responses"
          className="aside"
          tag="h3"
        >
          <Explanation>
            <p>
              Whenever Curi receives a location, it matches its routes against
              it and creates a response object, which contains data about the
              route that matched the location.
            </p>
          </Explanation>

          <CodeBlock>
            {`// a sample response object
{
  body: undefined,
  data: undefined,
  error: undefined,
  location: { pathname: '/', ... },
  name: 'Home',
  params: {},
  partials: [],
  status: 200
}`}
          </CodeBlock>

          <Explanation>
            <p>
              The router uses the{" "}
              <a href="https://en.wikipedia.org/wiki/Observer_pattern">
                observer pattern
              </a>{" "}
              to register functions that will be called when a new response is
              created. The <Cmp>Router</Cmp> automatically observes the router
              so that it can re-render the application whenever there is a new
              response.
            </p>
            <p>
              The <IJS>navigation</IJS> object contains additional information
              about a navigation that doesn't make sense to include in the
              response object. This includes the navigation's "action" (
              <IJS>PUSH</IJS>, <IJS>POP</IJS>, or <IJS>REPLACE</IJS>) and the
              previous response object.
            </p>
          </Explanation>
          <CodeBlock>
            {`// a sample navigation object
{
  action: "PUSH",
  previous: { name: ..., location: ..., ... }
}`}
          </CodeBlock>
        </HashSection>

        <Explanation>
          <p>
            The response is the most useful of these three properties, but the
            other two may can be handy. For example, the <IJS>navigation</IJS>{" "}
            can be useful for animating route transitions.
          </p>
          <p>
            How do we render using the <IJS>response</IJS>? Any way you want!
            The best way is to use a <IJS>response</IJS>'s <IJS>body</IJS>{" "}
            property.
          </p>
        </Explanation>

        <HashSection
          title="route.response()"
          id="route-response"
          className="aside"
          tag="h3"
        >
          <Explanation>
            <p>
              Route's can have a <IJS>response</IJS> property, which is a
              function that returns an object. The (valid) properties of the
              object will be merged onto the response object.
            </p>

            <p>
              One of these valid properties is <IJS>body</IJS>, so if the{" "}
              <IJS>response</IJS> function returns an object with a{" "}
              <IJS>body</IJS> property, we can access it from the response as{" "}
              <IJS>response.body</IJS>.
            </p>
          </Explanation>

          <CodeBlock>
            {`{
  name: "Home",
  path: "",
  response() {
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
        </HashSection>

        <Explanation>
          <p>
            If a response's <IJS>body</IJS> is a React component, we can render
            it! We haven't actually defined components for our routes yet, so we
            should throw together some placeholders.
          </p>
        </Explanation>

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
    <div>Home</div>
  );
}`}
        </CodeBlock>
        <CodeBlock lang="jsx">
          {`// src/components/Book.js
import React from 'react';

export default function Book(){
  return (
    <div>Book</div>
  );
}`}
        </CodeBlock>
        <CodeBlock lang="jsx">
          {`// src/components/Checkout.js
import React from 'react';

export default function Checkout() {
  return (
    <div>Checkout</div>
  );
}`}
        </CodeBlock>
        <CodeBlock lang="jsx">
          {`// src/components/NotFound.js
import React from 'react';

export default function NotFound() {
  return (
    <div>Not Found</div>
  );
}`}
        </CodeBlock>
        <p>
          These components can be imported in <IJS>src/routes.js</IJS>. Each
          route can be given a <IJS>response()</IJS> function which returns an
          object with their respective component as its <IJS>body</IJS>.
        </p>
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
    response() {
      return { body: Home };
    }
  },
  {
    name: "Book",
    path: "book/:id",
    response() {
      return { body: Book };
    }
  },
  {
    name: "Checkout",
    path: "checkout",
    response() {
      return { body: Checkout };
    }
  },
  {
    name: "Catch All",
    path: "(.*)",
    response() {
      return { body: NotFound };
    }
  }
]);`}
        </CodeBlock>

        <Explanation>
          <p>
            We can now update the <Cmp>Router</Cmp>'s <IJS>children</IJS>{" "}
            function to render <IJS>response.body</IJS>.
          </p>
          <p>
            We will also pass the <IJS>response</IJS> as a prop to the rendered
            component, which means that each of the route components will have
            access to the <IJS>response</IJS> when they are rendered.
          </p>
        </Explanation>

        <CodeBlock lang="jsx" data-line="18-23">
          {`// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { curi } from '@curi/router';
import Browser from '@hickory/browser';
import { curiProvider } from '@curi/react-dom';

import routes from './routes';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const history = Browser();
const router = curi(history, routes);
const Router = curiProvider(router);

ReactDOM.render((
  <Router>
    {({ response }) => {
      const { body:Body } = response;
      return (
        <Body response={response} />
      );
    }}
  </Router>
), document.getElementById('root'));
registerServiceWorker();`}
        </CodeBlock>

        <Explanation>
          <p>
            At this point in time our app is rendering, but is isn't very
            interesting because we cannot navigate between locations.
          </p>
        </Explanation>
      </HashSection>

      <HashSection title="Navigating between locations" id="navigating">
        <Explanation>
          <p>
            The <IJS>@curi/react-dom</IJS> package provides a <Cmp>Link</Cmp>{" "}
            component that we can use to navigate between locations within our
            application.
          </p>
        </Explanation>

        <HashSection
          title={
            <span>
              The <Cmp>Link</Cmp> Component
            </span>
          }
          id="link-component"
          className="aside"
          tag="h3"
        >
          <Explanation>
            <p>
              Navigation isn't done by manually typing the pathname of the
              location the link should navigate to. Instead, we specify the name
              of the route using the <IJS>name</IJS> prop.
            </p>
          </Explanation>

          <CodeBlock lang="jsx">
            {`// { name: "Home", path: "" }
<Link name="Home">Home</Link>
// <a href="/">Home</a>`}
          </CodeBlock>

          <Explanation>
            <p>
              If a route has params, we provide these to the <Cmp>Link</Cmp> as
              a <IJS>params</IJS> object. For a nested route, we would also need
              to provide params for any ancestor routes.
            </p>
          </Explanation>

          <CodeBlock lang="jsx">
            {`// { name: "Book", path: "book/:id" }
<Link name="Book" params={{ id: 7 }}>The Dark Forest</Link>
// <a href="/book/7">The Dark Forest</a>`}
          </CodeBlock>

          <Explanation>
            <p>
              The <Cmp>Link</Cmp> is only for in-app navigation. If you want to
              link to pages outside of the application, use an anchor.
            </p>
          </Explanation>

          <CodeBlock lang="jsx">
            {`// in-app
<Link name="Some Route">Some Route</Link>

// out of app
<a href="https://github.com">GitHub</a>`}
          </CodeBlock>

          <Explanation>
            <p>
              If you need to attach query or hash data to a <Cmp>Link</Cmp>, use
              the <IJS>query</IJS> and <IJS>hash</IJS> props.
            </p>
          </Explanation>

          <CodeBlock lang="jsx">
            {`// { name: "Checkout", path: "checkout" }
<Link name="Checkout" query='affiliate=123'>Checkout</Link>
// <a href="/checkout?affiliate=123">Checkout</a>`}
          </CodeBlock>
        </HashSection>

        <HashSection title="A Navigation Menu" id="nav-menu" tag="h3">
          <Explanation>
            <p>
              The application will have a navigation menu component with links
              to our home page and checkout page.
            </p>
          </Explanation>

          <CodeBlock lang="bash">{`touch src/components/NavMenu.js`}</CodeBlock>

          <Explanation>
            <p>
              In order to link to these routes, we only need to know their name,
              not the actual pathname for the URL.
            </p>
          </Explanation>

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
          <p>
            We can import the menu in our index file and render it in the{" "}
            <Cmp>Router</Cmp>'s <IJS>children</IJS> function.
          </p>
          <p>
            The <IJS>children</IJS> function can be thought of as the root of
            the application's content. We can add structure to the site by
            rendering <Cmp>header</Cmp> and <Cmp>main</Cmp> elements around
            their respective content.
          </p>
          <CodeBlock lang="jsx" data-line="10,22-29">
            {`// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { curi } from '@curi/router';
import Browser from '@hickory/browser';
import { curiProvider } from '@curi/react-dom';

import routes from './routes';
import './index.css';
import NavMenu from './components/NavMenu';
import registerServiceWorker from './registerServiceWorker';

const history = Browser();
const router = curi(history, routes);
const Router = curiProvider(router);

ReactDOM.render((
  <Router>
    {({ response }) => {
      const { body:Body } = response;
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
    }}
  </Router>
), document.getElementById('root'));
registerServiceWorker();`}
          </CodeBlock>
        </HashSection>

        <HashSection title="Linking to Books" id="book-links" tag="h3">
          <Explanation>
            <p>
              The website should link to individual books from its home page. To
              do this, we need data about the available books. Since we don't
              have a backend to fetch book data from, we'll hard-code the books
              data in the <IJS>src/books.js</IJS> module.
            </p>
          </Explanation>

          <CodeBlock lang="bash">{`touch src/books.js`}</CodeBlock>

          <Explanation>
            <p>
              You can copy+paste or modify the data, but the structure of the
              provided data should stay the same.
            </p>
          </Explanation>

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

          <Explanation>
            <p>
              The data can be imported in the <Cmp>Home</Cmp> component and we
              can iterate over the books to render a <Cmp>Link</Cmp> to each
              one.
            </p>
          </Explanation>

          <CodeBlock lang="jsx" data-line="5,8-20">
            {`// src/components/Home.js
import React from 'react';
import { Link } from '@curi/react-dom';

import books from '../books';

export default function Home() {
  return (
    <div>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <Link name="Book" params={{ id: book.id }} >
              {book.title} by {book.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}`}
          </CodeBlock>

          <Explanation>
            <p>
              Now that we can navigate to the books, we should fill out the UI
              for the <Cmp>Book</Cmp> component. Up above, we passed the{" "}
              <IJS>response</IJS> object as a prop to the{" "}
              <IJS>response.body</IJS> component. Now, we can use that object in
              the <Cmp>Book</Cmp> component to access the captured route params
              so that we know which book to show.
            </p>
            <p>
              We will once again import the <IJS>books.js</IJS> data. We can use{" "}
              <IJS>params.id</IJS> to select the correct book.{" "}
              <IJS>params.id</IJS> is a string, so we will need to parse it into
              an integer. Sometimes there won't be a valid book for the{" "}
              <IJS>params.id</IJS>. In that case, we will also want to display a
              message that the requested book could not be found.
            </p>
          </Explanation>

          <CodeBlock lang="jsx" data-line="4,6-20">
            {`// src/components/Book.js
import React from 'react';

import books from '../books';

export default function Book({ response }) {
  const id = parseInt(response.params.id, 10);
  const book = books.find(b => b.id === id);
  if (!book) {
    return <div>The requested book could not be found</div>;
  }
  return (
    <div>
      <h1>{book.title}</h1>
      <h2>by {book.author}</h2>
      <p>Published in {book.published}</p>
      <p>{book.pages} pages</p>
    </div>
  );
}`}
          </CodeBlock>
        </HashSection>
      </HashSection>

      <HashSection title="Let's go shopping" id="shopping">
        <Explanation>
          <p>
            Users of the website should be able to add books to their shopping
            cart. For brevity, we will store the cart data in memory (i.e. it
            will be lost when refreshing the page).
          </p>
        </Explanation>

        <CodeBlock lang="bash">{`touch src/cart.js`}</CodeBlock>

        <Explanation>
          <p>
            The shopping cart implementation will be a JavaScript <IJS>Map</IJS>
            . We can call its <IJS>set</IJS> method to add books, its{" "}
            <IJS>clear</IJS> method to reset the cart, and iterate over its{" "}
            <IJS>entries</IJS> with a <IJS>for...of</IJS> loop.
          </p>
          <Note>
            The <IJS>Map</IJS> or some of its features may not work in older
            browsers.
          </Note>
        </Explanation>

        <CodeBlock>
          {`// src/cart.js
const cart = new Map();

export default {
  add(book, quantity) {
    cart.set(book, quantity);
  },
  items() {
    const books = [];
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

        <Explanation>
          <p>
            Before we edit the <Cmp>Book</Cmp> component, we should quickly
            revisit the <Cmp>Router</Cmp>'s <IJS>children</IJS> function. In
            addition to passing the <IJS>response</IJS> to the <Cmp>Body</Cmp>,
            we should also pass it our <IJS>router</IJS>, which will allow us to
            do programmatic navigation.
          </p>
        </Explanation>

        <CodeBlock lang="jsx" data-line="19,27">
          {`// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { curi } from '@curi/router';
import Browser from '@hickory/browser';
import { curiProvider } from '@curi/react-dom';

import routes from './routes';
import './index.css';
import NavMenu from './components/NavMenu';
import registerServiceWorker from './registerServiceWorker';

const history = Browser();
const router = curi(history, routes);
const Router = curiProvider(router);

ReactDOM.render((
  <Router>
    {({ response, router }) => {
      const { body:Body } = response;
      return (
        <React.Fragment>
          <header>
            <NavMenu />
          </header>
          <main>
            <Body response={response} router={router} />
          </main>
        </React.Fragment>
      );
    }}
  </Router>
), document.getElementById('root'));
registerServiceWorker();`}
        </CodeBlock>

        <Explanation>
          <p>
            We can now access our <IJS>router</IJS> in the <Cmp>Book</Cmp>{" "}
            component. The router's <IJS>navigate()</IJS> function can be used
            to navigate to a new location. This means that when the user clicks
            a button to add a book to their shopping cart, we can automatically
            navigate to the checkout page.
          </p>
        </Explanation>

        <HashSection
          title="The Router's Navigate Method"
          id="nav-method"
          className="aside"
          tag="h3"
        >
          <Explanation>
            <p>
              <IJS>router.navigate()</IJS> is used to navigate to new locations.
              There are three methods of navigation: <IJS>PUSH</IJS>,{" "}
              <IJS>REPLACE</IJS>, and <IJS>ANCHOR</IJS>.
            </p>
            <p>
              <IJS>PUSH</IJS> pushes a new location after the current index,
              removing any locations after the current location.
            </p>
          </Explanation>

          <CodeBlock>
            {`// session = ['/one', '/two', '/three'], index = 1
router.navigate({ name: "New", method: "PUSH" });
// session = ['/one', '/two', '/new'], index = 2`}
          </CodeBlock>

          <Explanation>
            <p>
              <IJS>REPLACE</IJS> replaces the location at the current index.
            </p>
          </Explanation>

          <CodeBlock>
            {`// session = ['/one', '/two', '/three'], index = 1
router.navigate({ name: "Replace", method: "REPLACE" });
// session = ['/one', '/replacement', '/three'], index = 1`}
          </CodeBlock>

          <Explanation>
            <p>
              <IJS>ANCHOR</IJS> is a mix between <IJS>PUSH</IJS> and{" "}
              <IJS>REPLACE</IJS>. It mimics the behavior of clicking on links,
              so if you navigate to the same location as the current one it will
              replace, and if you navigate to a new location it will push.
            </p>
            <p>
              If <IJS>method.navigate()</IJS> is called without a navigation{" "}
              <IJS>method</IJS>, it will default to <IJS>ANCHOR</IJS>.
            </p>
          </Explanation>

          <CodeBlock>
            {`// session = ['/one', '/two', '/three'], index = 1
router.navigate({ name: "Two", method: "ANCHOR" });
// session = ['/one', '/two', '/three'], index = 1
router.navigate({ name: "New", method: "ANCHOR" });
// session = ['/one', '/two', '/new'], index = 2`}
            `}
          </CodeBlock>
        </HashSection>

        <Explanation>
          <p>
            We also want to import our shopping cart API so that we can add a
            book to the cart.
          </p>
        </Explanation>

        <CodeBlock lang="jsx" data-line="5,19-27">
          {`// src/components/Book.js
import React from 'react';

import books from '../books';
import cart from '../cart';

export default function Book({ response, router }) {
  const id = parseInt(response.params.id, 10);
  const book = books.find(b => b.id === id);
  if (!book) {
    return <div>The requested book could not be found</div>;
  }
  return (
    <div>
      <h1>{book.title}</h1>
      <h2>by {book.author}</h2>
      <p>Published in {book.published}</p>
      <p>{book.pages} pages</p>
      <button
        type="button"
        onClick={() => {
          cart.add(book, 1);
          router.navigate({ name: "Checkout" });
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}`}
        </CodeBlock>

        <Explanation>
          <p>
            Finally, we can update our <Cmp>Checkout</Cmp> component to display
            the books in the shopping cart. To do this, we will import our cart
            and books. Our cart only stores book <IJS>id</IJS>s, so we will need
            to merge the book data with the cart data.
          </p>
          <p>
            When a user "buys" the books in their shopping cart, we need to
            clear out the cart. We will also replace the current location with
            one whose <IJS>location.hash</IJS> is the string "thanks". When that
            is present in the location, we can render a "Thanks for your
            purchase" message.
          </p>
        </Explanation>

        <CodeBlock lang="jsx">
          {`// src/components/Checkout.js
import React from 'react';

import cart from '../cart';

export default function Checkout({ router, response }) {
  const books = cart.items();  
  if (!books.length) {
    return response.location.hash === 'thanks'
      ? <div>Thanks for your purchase!</div>
      : <div>The cart is currently empty</div>;
  }
  return (
    <div>
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
          const pathname = router.route.pathname('Checkout');
          router.navigate({
            name: "Checkout",
            hash: "thanks",
            method: "REPLACE"
          });
        }}
      >
        Buy
      </button>
    </div>
  );
};`}
        </CodeBlock>
      </HashSection>
      <HashSection title="What's next?" id="next">
        <Explanation>
          <p>
            We now have a functional website built with React and Curi. What
            should you do next? Build another site! You can also check out the{" "}
            <Link name="Guides">guides</Link> for information on advanced
            techniques.
          </p>
        </Explanation>
      </HashSection>
    </React.Fragment>
  );
}
