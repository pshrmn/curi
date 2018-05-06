import React from "react";
import { Link } from "@curi/react";

import BaseTutorial from "./base/BaseTutorial";
import { TutorialBranch, CompleteBranch, Outline } from "./base/Branch";
import {
  InlineJS as IJS,
  InlineComponent as Cmp,
  PrismBlock
} from "../../components/PrismBlocks";
import { Note } from "../../components/Messages";
import { Section, Subsection } from "../../components/Sections";
import CodeSandboxDemo from "../../components/CodeSandboxDemo";

export default () => (
  <BaseTutorial>
    <h1>React Basics Tutorial</h1>
    <p>
      In this tutorial, we will be building a website for a bookstore. This will
      focus on the front-end part of the application.
    </p>
    <Outline>
      <ul>
        <li>Learn how to define routes and setup the Curi router.</li>
        <li>
          Learn how to render React components based on the current location.
        </li>
        <li>Learn how to navigate within the application.</li>
      </ul>
    </Outline>
    <Section title="Demo" id="demo">
      <p>You can run a demo of the site we are building with CodeSandbox.</p>
      <CodeSandboxDemo id="github/curijs/react-basic-tutorial/tree/master/" />
    </Section>
    <Section title="Setup" id="setup">
      <p>
        We will be using{" "}
        <a href="https://github.com/facebook/create-react-app">
          <IJS>create-react-app</IJS>
        </a>{" "}
        to develop this website.
      </p>
      <Note>
        The instructions here assume that you have NodeJS and NPM > 5.2
        installed on your computer. If you do not, cannot, or prefer to avoid
        setup altogether, you can follow along using{" "}
        <a href="https://codesandbox.io/">CodeSandbox</a>. Some of the
        boilerplate will be different, but the differences are minor.
      </Note>
      <p>
        Begin by opening a terminal and navigating to the directory where you
        want to save your code. Then, we will use <IJS>npx</IJS> to create the
        application.
      </p>
      <PrismBlock lang="bash">
        {`npx create-react-app curi-bookstore # create the app
cd curi-bookstore # enter the new app directory
yarn start # start the dev server`}
      </PrismBlock>
      <p>
        <IJS>create-react-app</IJS>'s dev server will automatically update when
        we change files, so we can leave that running. We will still be working
        in the terminal, so you will want to open up a new terminal window/tab
        and navigate to the application's directory. Once you have done that,
        there are a few packages that need to be installed.
      </p>
      <PrismBlock lang="bash">
        {`yarn add @hickory/browser @curi/core @curi/react`}
      </PrismBlock>
      <p>
        The <IJS>@hickory/browser</IJS> package will be used to create an object
        that interacts with the browser to power navigation (e.g. updates the
        URI in the address bar when you click a link). <IJS>@curi/core</IJS>{" "}
        provides the function to actually create the router.{" "}
        <IJS>@curi/react</IJS> gives us some React components that interact with
        the router.
      </p>
    </Section>
    <Section title="History and Locations" id="history">
      <p>
        URIs can be broken into parts to identify a location. With a single-page
        application, we don't care about the URI's protocol (http, https) or its
        hostname (www.example.com). The properties we care about are the{" "}
        <IJS>pathname</IJS>, <IJS>hash</IJS>, and <IJS>query</IJS>.
      </p>
      <PrismBlock lang="javascript">
        {`// uri = "https://example.com/one?key=value#id
{
  pathname: "/one",
  query: "key=value",
  hash: "id"
}`}
      </PrismBlock>
      <p>
        The router will match its routes against a location's{" "}
        <IJS>pathname</IJS> to figure out which route matches. The{" "}
        <IJS>query</IJS> and <IJS>hash</IJS> values are not used for matching
        routes.
      </p>
      <p>
        Curi uses the <a href="https://github.com/pshrmn/hickory">Hickory</a>{" "}
        library to create a history object that will enable us to navigate
        within our application. Hickory provides a few different packages to
        create history objects for different environments, but the only one we
        care about right now is the browser history, which comes from the{" "}
        <IJS>@hickory/browser</IJS> package. A browser history object will
        interact with the browser's native{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/History_API">
          History API
        </a>{" "}
        so that our application can change locations (and the URI in the address
        bar) without making a request to a server and reloading the page.
      </p>
      <p>
        We can import the <IJS>Browser</IJS> function from{" "}
        <IJS>@hickory/browser</IJS> in our index file (<IJS>src/index.js</IJS>,
        which <IJS>create-react-app</IJS> created for us). To create a history
        object, we call that function.
      </p>
      <Note>
        The history object can be configured with{" "}
        <a href="https://github.com/pshrmn/hickory/blob/master/docs/api/Browser.md#options">
          an options object
        </a>, but we will stick with the defaults.
      </Note>
      <PrismBlock lang="jsx" data-line="4,10">
        {`// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Browser from '@hickory/browser';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const history = Browser();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();`}
      </PrismBlock>
    </Section>
    <Section title="Defining the Routes" id="defining-routes">
      <p>
        Routes are JavaScript objects that define the valid locations for a
        router. They have a <IJS>name</IJS> and a <IJS>path</IJS>.
      </p>
      <PrismBlock lang="javascript">
        {`// this is a route
{ name: "Home", path: "" }`}
      </PrismBlock>
      <p>
        A route's <IJS>name</IJS> needs to be unique. We will use route names
        when we navigate within the application. A route's <IJS>path</IJS>{" "}
        describes the location pathname that it should match.
      </p>
      <Subsection title="Path basics" id="path-basics" type="aside">
        <p>
          Route paths are strings describing the pathname segments they should
          match.
        </p>
        <PrismBlock lang="javascript">
          {`{ path: '' } // matches "/"
{ path: 'about/stuff' } // matches "/about/stuff"`}
        </PrismBlock>
        <p>Paths never begin with a slash.</p>
        <PrismBlock lang="javascript">
          {`// yes
{ path: '' }
// no
{ path: '/' }`}
        </PrismBlock>
        <p>
          Paths can include dynamic parameters. These are specified with a
          string that starts with a colon (<IJS>:</IJS>) followed by the name of
          the params.
        </p>
        <PrismBlock lang="javascript">
          {`// a param named "id"
{ path: ':id' }`}
        </PrismBlock>
        <p>
          Routes can be nested using the <IJS>children</IJS> property of a
          route. A nested route inherits the path from its ancestor route(s), so
          its <IJS>path</IJS> is only the additional part of the pathname that
          should be matched.
        </p>
        <PrismBlock lang="javascript">
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
        </PrismBlock>
      </Subsection>
      <p>The website will start with four routes.</p>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>path</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Home</td>
            <td>
              <IJS>""</IJS>
            </td>
            <td>Lists books available for purchase</td>
          </tr>
          <tr>
            <td>Book</td>
            <td>
              <IJS>"book/:id"</IJS>
            </td>
            <td>Details about an individual book</td>
          </tr>
          <tr>
            <td>Checkout</td>
            <td>
              <IJS>"checkout"</IJS>
            </td>
            <td>"Buy" the books in the shopping cart</td>
          </tr>
          <tr>
            <td>Catch All</td>
            <td>
              <IJS>"(.*)"</IJS>
            </td>
            <td>Display a not found page for all other locations</td>
          </tr>
        </tbody>
      </table>
      <Note>
        The catch all route uses a regular expression syntax to indicate that it
        should match everything. Curi uses the{" "}
        <a href="https://github.com/pillarjs/path-to-regexp">
          <IJS>path-to-regexp</IJS>
        </a>{" "}
        package for route matching. We will only be using some of its basic
        syntax, but you can read its documentation to learn about more advanced
        path syntax.
      </Note>
      <p>
        Inside of the <IJS>src</IJS> directory, we will create a{" "}
        <IJS>routes.js</IJS> file where we can define the application's routes.
      </p>
      <PrismBlock lang="bash">{`touch src/routes.js`}</PrismBlock>
      <PrismBlock lang="javascript">
        {`// src/routes.js
export default [
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
];`}
      </PrismBlock>
    </Section>
    <Section title="The Router" id="router">
      <p>
        With the history object created and the routes defined, we are ready to
        create the router. Back in the <IJS>src/index.js</IJS> file, we should
        import the <IJS>curi</IJS> function from <IJS>@curi/core</IJS> as well
        as our routes from <IJS>src/routes.js</IJS>
      </p>
      <PrismBlock lang="jsx" data-line="4,8,13">
        {`// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import curi from '@curi/core';
import Browser from '@hickory/browser';

import './index.css';
import routes from './routes';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const history = Browser();
const router = curi(history, routes);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();`}
      </PrismBlock>
    </Section>
    <Section title="Rendering with React" id="rendering">
      <p>
        We can now render our application. To do this, we will use the{" "}
        <Cmp>CuriProvider</Cmp> component from the <IJS>@curi/react</IJS>{" "}
        package. This component does two things:
      </p>
      <ol>
        <li>
          It places router-related values on the context for other{" "}
          <IJS>@curi/react</IJS> components
        </li>
        <li>It re-renders the application whenever the location changes.</li>
      </ol>
      <p>
        The <Cmp>CuriProvider</Cmp> takes two props. The first is{" "}
        <IJS>router</IJS>, which is the router we created above. The second is a
        children function, passed as the children of the <Cmp>CuriProvider</Cmp>.
        This function will receive an object that has three properties:{" "}
        <IJS>router</IJS>, <IJS>response</IJS>, and <IJS>navigation</IJS>.
      </p>
      <PrismBlock lang="jsx">
        {`<CuriProvider router={router}>
  {({ router, response, navigation }) => {
    return <div>This is the website</div>;
  }}
</CuriProvider>`}
      </PrismBlock>
      <p>
        The <IJS>router</IJS> is our Curi router, but what are the other two?
      </p>
      <Subsection title="Responses and Navigation" id="responses" type="aside">
        <p>
          Whenever Curi receives a location, it matches its routes against it
          and generates a response. This is an object with data related to the
          route that matched the location. Later on we will modify this data
          ourselves, but for now the important thing to know is that the
          response lets us know about the current route.
        </p>
        <PrismBlock lang="javascript">
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
        </PrismBlock>
        <p>
          The router uses an observer model to let functions subscribe to be
          called when a new response is generated. The <Cmp>CuriProvider</Cmp>{" "}
          observes the router so that it can re-render the application whenever
          there is a new one.
        </p>
        <p>
          The <IJS>navigation</IJS> object contains additional information about
          a navigation that doesn't make sense to include in the response
          object. This includes the navigation's "action" (<IJS>PUSH</IJS>,{" "}
          <IJS>POP</IJS>, or <IJS>REPLACE</IJS>) and the previous response
          object.
        </p>
      </Subsection>
      <p>
        Most of the time, the response is the only property you will need to use
        to render, but the other two may occasionally be useful.
      </p>
      <p>
        How do we use the response to render? Any way you want. Based on the
        sample response above, the <IJS>name</IJS> stands out as the best way to
        identify which route matched. We can make this even easier by adding
        another property to the response: <IJS>body</IJS>.
      </p>
      <p>
        Earlier it was mentioned that response objects can be modified. This is
        done by returning an object from a route's <IJS>response()</IJS>{" "}
        function. <IJS>response()</IJS> receives an object with a whole bunch of
        properties that we can use to help determine how to modify the response,
        but for the time being, we don't care about any of those. All we need to
        know is that if we return an object with a <IJS>body</IJS> property,
        that value will be set on our response object.
      </p>
      <PrismBlock lang="javascript">
        {`{
  name: "Home",
  path: "",
  response() {
    return {
      body: "Home, sweet home."
    };
    /*
      * response = {
      *   body: "Home, sweet home.",
      *   // ...
      * }
      */
  }
}`}
      </PrismBlock>
      <p>
        If the return object's <IJS>body</IJS> is a React component, we can
        render it in the <Cmp>CuriProvider</Cmp>'s children function. We haven't
        actually defined components for our routes yet, so we should throw
        together some placeholders.
      </p>
      <PrismBlock lang="bash">
        {`mkdir -p src/components
touch src/components/Home.js src/components/Book.js \\
  src/components/Checkout.js src/components/NotFound.js`}
      </PrismBlock>
      <PrismBlock lang="jsx">
        {`// src/components/Home.js
import React from 'react';

export default () => (
  <div>Home</div>
);`}
      </PrismBlock>
      <PrismBlock lang="jsx">
        {`// src/components/Book.js
import React from 'react';

export default () => (
  <div>Book</div>
);`}
      </PrismBlock>
      <PrismBlock lang="jsx">
        {`// src/components/Checkout.js
import React from 'react';

export default () => (
  <div>Checkout</div>
);`}
      </PrismBlock>
      <PrismBlock lang="jsx">
        {`// src/components/NotFound.js
import React from 'react';

export default () => (
  <div>Not Found</div>
);`}
      </PrismBlock>
      <p>
        These components can be imported in <IJS>src/routes.js</IJS> and
        attached to their respective routes.
      </p>
      <PrismBlock lang="javascript" data-line="2-5,11-15,20-24,29-33,38-42">
        {`// src/routes.js
import Home from './components/Home';
import Book from './components/Book';
import Checkout from './components/Checkout';
import NotFound from './components/NotFound';

export default [
  {
    name: "Home",
    path: "",
    response() {
      return {
        body: Home
      };
    }
  },
  {
    name: "Book",
    path: "book/:id",
    response() {
      return {
        body: Book
      };
    }
  },
  {
    name: "Checkout",
    path: "checkout",
    response() {
      return {
        body: Checkout
      };
    }
  },
  {
    name: "Catch All",
    path: "(.*)",
    response() {
      return {
        body: NotFound
      };
    }
  }
];`}
      </PrismBlock>
      <p>
        We can now render the <Cmp>CuriProvider</Cmp> in our index file. The{" "}
        <Cmp>CuriProvider</Cmp> gets passed the Curi router using the{" "}
        <IJS>router</IJS> prop and a render-invoked function as the component's{" "}
        <IJS>children</IJS>. In the render-invoked function, we can use{" "}
        <IJS>response.body</IJS> to render the component for the matched route.
        We will also pass the <IJS>response</IJS> as a prop to the rendered
        component, which will be useful soon.
      </p>

      <PrismBlock lang="jsx" data-line="6,15-24">
        {`// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import curi from '@curi/core';
import Browser from '@hickory/browser';
import { CuriProvider } from '@curi/react';

import './index.css';
import routes from './routes';
import registerServiceWorker from './registerServiceWorker';

const history = Browser();
const router = curi(history, routes);

ReactDOM.render((
  <CuriProvider router={router}>
    {({ response }) => {
      const { body:Body } = response;
      return (
        <Body response={response} />
      );
    }}
  </CuriProvider>
), document.getElementById('root'));
registerServiceWorker();`}
      </PrismBlock>
      <p>
        We can also remove the <Cmp>App</Cmp> component import and delete the
        related files.
      </p>
      <PrismBlock lang="bash">
        {`rm src/App.js src/App.css src/App.test.js`}
      </PrismBlock>
      <p>
        At this point in time our app is rendering, but is isn't very
        interesting because we cannot navigate between locations.
      </p>
    </Section>
    <Section title="Navigating between locations" id="navigating">
      <p>
        The <IJS>@curi/react</IJS> package provides a <Cmp>Link</Cmp> component
        that we can use to navigate between locations within our application.
      </p>
      <Subsection
        title={
          <span>
            The <Cmp>Link</Cmp> Component
          </span>
        }
        id="link-component"
        type="aside"
      >
        <p>
          Navigation isn't done by manually typing the pathname of the location
          the link should navigate to. Instead, we specify the name of the route
          using the <IJS>to</IJS> prop.
        </p>
        <PrismBlock lang="jsx">
          {`// { name: "Home", path: "" }
<Link to="Home">Home</Link>
// <a href="/">Home</a>`}
        </PrismBlock>
        <p>
          If a route has params, we provide these to the <Cmp>Link</Cmp> as a{" "}
          <IJS>params</IJS> object. For a nested route, we would also need to
          provide params for any ancestor routes.
        </p>
        <PrismBlock lang="jsx">
          {`// { name: "Book", path: "book/:id" }
<Link to="Book" params={{ id: 7 }}>The Dark Forest</Link>
// <a href="/book/7">The Dark Forest</a>`}
        </PrismBlock>
        <p>
          The <Cmp>Link</Cmp> is only for in-app navigation. If you want to link
          to pages outside of the application, use an anchor.
        </p>
        <PrismBlock lang="jsx">
          {`// in-app
<Link to="Some Route">Some Route</Link>

// out of app
<a href="https://github.com">GitHub</a>`}
        </PrismBlock>
        <p>
          If you need to attach query or hash data to a <Cmp>Link</Cmp>, use the{" "}
          <IJS>query</IJS> and <IJS>hash</IJS> props.
        </p>
        <PrismBlock lang="jsx">
          {`// { name: "Checkout", path: "checkout" }
<Link to="Checkout" query='affiliate=123'>Checkout</Link>
// <a href="/checkout?affiliate=123">Checkout</a>`}
        </PrismBlock>
      </Subsection>
      <Subsection title="A Navigation Menu" id="nav-menu">
        <p>
          We will start with creating a navigation menu component with links to
          our home page and checkout page.
        </p>
        <PrismBlock lang="bash">{`touch src/components/NavMenu.js`}</PrismBlock>
        <PrismBlock lang="jsx">
          {`// src/components/NavMenu.js
import React from 'react';
import { Link } from '@curi/react';

export default () => (
  <nav>
    <ul>
      <li>
        <Link to="Home">Home</Link>
      </li>
      <li>
        <Link to="Checkout">Checkout</Link>
      </li>
    </ul>
  </nav>
);`}
        </PrismBlock>
        <p>
          We can import that in our index file and add it to our{" "}
          <IJS>children</IJS> function. This is a good opportunity to also add
          some structure to the elements returned by the <IJS>children</IJS>{" "}
          function.
        </p>
        <PrismBlock lang="jsx" data-line="10,21-28">
          {`// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import curi from '@curi/core';
import Browser from '@hickory/browser';
import { CuriProvider } from '@curi/react';

import './index.css';
import routes from './routes';
import NavMenu from './components/NavMenu';
import registerServiceWorker from './registerServiceWorker';

const history = Browser();
const router = curi(history, routes);

ReactDOM.render((
  <CuriProvider router={router}>
    {({ response }) => {
      const { body:Body } = response;
      return (
        <div>
          <header>
            <NavMenu />
          </header>
          <main>
            <Body response={response} />
          </main>
        </div>
      );
    }}
  </CuriProvider>
), document.getElementById('root'));
registerServiceWorker();`}
        </PrismBlock>
      </Subsection>
      <Subsection title="Linking to Books" id="book-links">
        <p>
          We want to be able to link to individual books from the home page.
          First, we need data about the books. For now, we're going to hard-code
          the books in the <IJS>src/books.js</IJS> module.
        </p>
        <PrismBlock lang="bash">{`touch src/books.js`}</PrismBlock>
        <p>
          You can copy+paste or modify the data, but the structure of the
          provided data should stay the same.
        </p>
        <PrismBlock lang="javascript">
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
        </PrismBlock>
        <p>
          The data can be imported in the <Cmp>Home</Cmp> component. We will
          iterate over the books with a <Cmp>Link</Cmp> to each one.
        </p>
        <PrismBlock lang="jsx" data-line="4,7-17">
          {`// src/components/Home.js
import React from 'react';
import { Link } from '@curi/react';

import books from '../books';

export default () => (
  <div>
    <ul>
      {books.map(book => (
        <li key={book.id}>
          <Link to="Book" params={{ id: book.id }} >
            {book.title} by {book.author}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);`}
        </PrismBlock>
        <p>
          Now that we can navigate to the books, we should fill out the UI for
          the <Cmp>Book</Cmp> component. Up above, we passed the{" "}
          <IJS>response</IJS> object as a prop to the <IJS>response.body</IJS>{" "}
          component. Now, we can use that object in the <Cmp>Book</Cmp>{" "}
          component to access the captured route params. This will allow us to
          know which book to show.
        </p>
        <p>
          We will once again import the <IJS>books.js</IJS> data. We can use{" "}
          <IJS>params.id</IJS> to select the correct book. <IJS>params.id</IJS>{" "}
          is a string, so we will need to parse it into an integer. Sometimes
          there won't be a valid book for the <IJS>params.id</IJS>. In that
          case, we will also want to display a message that the requested book
          could not be found.
        </p>
        <PrismBlock lang="jsx" data-line="4,6-20">
          {`// src/components/Book.js
import React from 'react';

import books from '../books';

export default ({ response }) => {
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
        </PrismBlock>
      </Subsection>
    </Section>
    <Section title="Let's go shopping" id="shopping">
      <p>
        We want to be able to add books to our shopping cart. Since this is a
        play site, we will store the cart data in memory.
      </p>
      <PrismBlock lang="bash">{`touch src/cart.js`}</PrismBlock>
      <p>
        The shopping cart implementation will be a JavaScript <IJS>Map</IJS>. We
        can call its <IJS>set</IJS> method to add books, its <IJS>clear</IJS>{" "}
        method to reset the cart, and iterate over its <IJS>entries</IJS> with a{" "}
        <IJS>for...of</IJS> loop.
      </p>
      <PrismBlock lang="javascript">
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
      </PrismBlock>
      <p>
        Before we edit the <Cmp>Book</Cmp> component, we should quickly revisit
        the <Cmp>CuriProvider</Cmp>'s <IJS>children</IJS> function. In addition
        to passing the <IJS>response</IJS> to <IJS>response.body</IJS>, we
        should also pass it our router. This will allow us to do programmatic
        navigation.
      </p>
      <PrismBlock lang="jsx" data-line="18,26">
        {`// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import curi from '@curi/core';
import Browser from '@hickory/browser';
import { CuriProvider } from '@curi/react';

import './index.css';
import routes from './routes';
import NavMenu from './components/NavMenu';
import registerServiceWorker from './registerServiceWorker';

const history = Browser();
const router = curi(history, routes);

ReactDOM.render((
  <CuriProvider router={router}>
    {({ response, router }) => {
      const { body:Body } = response;
      return (
        <div>
          <header>
            <NavMenu />
          </header>
          <main>
            <Body response={response} router={router} />
          </main>
        </div>
      );
    }}
  </CuriProvider>
), document.getElementById('root'));
registerServiceWorker();`}
      </PrismBlock>
      <p>
        We can now access our <IJS>router</IJS> in the <Cmp>Book</Cmp>{" "}
        component. The router's <IJS>navigate()</IJS> function can be used to
        navigate to a new location. This means that when the user clicks a
        button to add a book to their shopping cart, we can automatically
        navigate to the checkout page.
      </p>
      <Subsection title="Navigate Method" id="nav-method" type="aside">
        <p>
          <IJS>router.navigate()</IJS> is used to navigate to new locations.
          There are three methods of navigation: <IJS>PUSH</IJS>,{" "}
          <IJS>REPLACE</IJS>, and <IJS>ANCHOR</IJS>.
        </p>
        <p>
          <IJS>PUSH</IJS> pushes a new location after the current index,
          removing any locations after the current location.
        </p>
        <PrismBlock lang="javascript">
          {`// session = ['/one', '/two', '/three'], index = 1
router.navigate({ name: "New", method: "PUSH" });
// session = ['/one', '/two', '/new'], index = 2`}
        </PrismBlock>
        <p>
          <IJS>REPLACE</IJS> replaces the location at the current index.
        </p>
        <PrismBlock lang="javascript">
          {`// session = ['/one', '/two', '/three'], index = 1
router.navigate({ name: "Replace", method: "REPLACE" });
// session = ['/one', '/replacement', '/three'], index = 1`}
        </PrismBlock>
        <p>
          <IJS>ANCHOR</IJS> is a mix between <IJS>PUSH</IJS> and{" "}
          <IJS>REPLACE</IJS>. It mimics the behavior of clicking on links, so if
          you navigate to the same location as the current one it will replace,
          and if you navigate to a new location it will push.
        </p>
        <p>
          If <IJS>method.navigate()</IJS> is called without a navigation{" "}
          <IJS>method</IJS>, it will default to <IJS>ANCHOR</IJS>.
        </p>
        <PrismBlock lang="javascript">
          {`// session = ['/one', '/two', '/three'], index = 1
router.navigate({ name: "Two", method: "ANCHOR" });
// session = ['/one', '/two', '/three'], index = 1
router.navigate({ name: "New", method: "ANCHOR" });
// session = ['/one', '/two', '/new'], index = 2`}`}
        </PrismBlock>
      </Subsection>
      <p>
        We also want to import our shopping cart API so that we can add a book
        to the cart.
      </p>
      <PrismBlock lang="jsx" data-line="5,19-28">
        {`// src/components/Book.js
import React from 'react';

import books from '../books';
import cart from '../cart';

export default ({ response, router }) => {
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
      </PrismBlock>
      <p>
        Finally, we can update our <Cmp>Checkout</Cmp> component to display the
        books in the shopping cart. To do this, we will import our cart and
        books. Our cart only stores book <IJS>id</IJS>s, so we will need to
        merge the book data with the cart data.
      </p>
      <p>
        When a user "buys" the books in their shopping cart, we need to clear
        out the cart. We will also replace the current location with one whose{" "}
        <IJS>location.hash</IJS> is the string "thanks". When that is present in
        the URI, we can render a "Thanks for your purchase" message to "confirm"
        the purchase.
      </p>
      <PrismBlock lang="jsx">
        {`// src/components/Checkout.js
import React from 'react';

import cart from '../cart';

export default ({ router, response }) => {
  const books = cart.items();  
  if (!books.length) {
    return response.location.hash === 'thanks'
      ? <div>Thanks for your purchase!</div>
      : <div>The cart is currently empty</div>;
  }
  return (
    <div>
      <h1>Checkout</h1>
      <table>
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
      </table>
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
      </PrismBlock>
    </Section>
    <Section title="What's next?" id="next">
      <p>
        We now have a functional website built with React and Curi. What should
        you do next? Build another site! You can also check out the{" "}
        <Link to="Guides">guides</Link> for information on advanced techniques.
      </p>
    </Section>
  </BaseTutorial>
);
