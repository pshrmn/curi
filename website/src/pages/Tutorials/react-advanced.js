import React from "react";
import { Link } from "@curi/react-dom";

import {
  PlainSection,
  HashSection,
  CodeBlock,
  Outline,
  Note,
  IJS,
  Cmp,
  CodeSandboxDemo
} from "../../components/tutorial/common";

const demoMeta = {
  title: "Demo",
  hash: "demo"
};

const setupMeta = { title: "Setup", hash: "setup" };

const initialMeta = { title: "Initial Render", hash: "initial-render" };
const asyncMeta = {
  title: "Asynchronous Routes",
  hash: "async",
  children: [initialMeta]
};

const splittingMeta = {
  title: "Code Splitting",
  hash: "code-splitting"
};
const splitMeta = {
  title: "Code Splitting in Routes",
  hash: "code-splitting-routes",
  children: [splittingMeta]
};

const fakeMeta = { title: "The Fake API", hash: "fake-api" };
const preloadMeta = {
  title: "Preloading Data",
  hash: "preloading-data",
  children: [fakeMeta]
};

const navigatingMeta = {
  title: "<Link> is navigating?",
  hash: "link-navigating"
};
const loadingMeta = {
  title: "Visualizing Loading",
  hash: "loading",
  children: [navigatingMeta]
};

const caveatsMeta = { title: "Async Caveats", hash: "caveats" };

const contents = [
  demoMeta,
  setupMeta,
  asyncMeta,
  splitMeta,
  preloadMeta,
  loadingMeta,
  caveatsMeta
];

function ReactAdvancedTutorial() {
  return (
    <React.Fragment>
      <PlainSection>
        <h1>React Advanced Tutorial</h1>

        <p>
          In this tutorial, we will be expanding on the website built in the{" "}
          <Link name="Tutorial" params={{ slug: "react-basics" }}>
            React basics tutorial
          </Link>
          . We will take advantage of Curi's async features to add code
          splitting and data preloading to the application.
        </p>

        <Outline>
          <ul>
            <li>Add code splitting to routes.</li>
            <li>Preload route data with asynchronous navigation.</li>
          </ul>
        </Outline>
      </PlainSection>

      <HashSection meta={demoMeta}>
        <p>You can run a demo of the site we are building with CodeSandbox.</p>

        <CodeSandboxDemo id="github/curijs/react-advanced-tutorial/tree/master/" />
      </HashSection>

      <HashSection meta={setupMeta}>
        <p>
          If you did not complete the React basics tutorial, you should either
          clone its{" "}
          <a href="https://github.com/curijs/react-basic-tutorial/">repo</a> or
          fork its{" "}
          <a href="https://codesandbox.io/s/github/curijs/react-basic-tutorial/tree/master/">
            sandbox
          </a>
          .
        </p>
        <p>
          If you are cloning the repo, you should also install its dependencies
          and then start the development server.
        </p>

        <CodeBlock lang="bash">
          {`git clone https://github.com/curijs/react-basic-tutorial react-advanced-tutorial
cd react-advanced-tutorial
npm install
npm run start`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={asyncMeta}>
        <p>
          Curi lets you attach async functions to a route through its{" "}
          <IJS>resolve</IJS>. When that route matches, a response will not be
          emitted until the async functions have completed.
        </p>
        <p>
          The async functions for a route are grouped under the route's{" "}
          <IJS>resolve</IJS> object. Async functions will be passed an object of
          the matched route properties, which you may use to specify what data
          to load.
        </p>
        <p>
          The results of the async functions will be available in a route's{" "}
          <IJS>response()</IJS> function through the <IJS>resolved</IJS> object.
          Each result will be stored in the object using the async function's
          name.
        </p>
        <p>
          If any of the async functions throws an uncaught error, that error
          will be available in the <IJS>response()</IJS> function through the{" "}
          <IJS>error</IJS> property. That said, it is preferable for you to
          catch and handle the errors yourself.
        </p>

        <CodeBlock>
          {`{
  name: "A Route",
  path: "route/:id",
  resolve: {
    component: () => import("./components/SomeComponent").then(preferDefault),
    data: ({ params }) => fetch(\`/api/data/$\{params.id\}\`)
  },
  response({ resolved, error }) {
    // resolved = { component: ..., data: ... }
    if (error) {
      // handle an uncaught error
    }
    return {
      body: resolved.component,
      data: resolved.data
    }
  }
}`}
        </CodeBlock>

        <Note>
          <p>
            These async functions are called every time a route matches. If you
            have functions that should re-use the results from previous calls,
            you will probably want to implement some caching. Curi provides a{" "}
            <Link
              name="Package"
              params={{ package: "helpers", version: "v1" }}
              hash="once"
            >
              <IJS>once()</IJS>
            </Link>{" "}
            function for simple caching, but leaves more advanced caching
            solutions to the user.
          </p>
        </Note>

        <p>
          Curi uses Promises to manage async code, so async functions should
          return Promises. <IJS>Promise.resolve()</IJS> can be used to wrap a
          return value in a Promise.
        </p>

        <CodeBlock>
          {`import { preferDefault } from "@curi/helpers";
          
const routes = prepareRoutes([
  {
    name: "A Route",
    path: "route/:id",
    resolve: {
      component: () => import("./components/SomeComponent")
        .then(preferDefault),
      data: ({ params }) => fetch(\`/api/data/$\{params.id\}\`)
    },
    response({ resolved, error }) {
      if (error) {
        // ...
      }
      return {
        body: resolved.component,
        data: resolved.data
      }
    }
  }
]);`}
        </CodeBlock>

        <HashSection meta={initialMeta} className="aside" tag="h3">
          <p>
            There is one caveat to async routes: we cannot safely render the
            application immediately on load because the initial response might
            not be ready yet.
          </p>
          <p>
            Curi does not emit a response object to its observers until it is
            ready. If the initial route that matches is asynchronous, then there
            is a delay between when the application is ready to render and when
            there is a response to render.
          </p>
          <p>
            If you attempt to render immediately after creating a router and the
            initial response is still being created, the <IJS>response</IJS>{" "}
            that will be passed to the <Cmp>Router</Cmp>'s <IJS>children()</IJS>{" "}
            will be <IJS>null</IJS>.
          </p>
          <p>There are a few possible ways to handle this situation.</p>
          <p>
            The first is to delay rendering by placing your{" "}
            <IJS>ReactDOM.render()</IJS> call inside of a{" "}
            <IJS>router.once()</IJS> callback. This will guarantee that the
            render isn't called until the first response is ready.
          </p>

          <CodeBlock>
            {`// delay rendering
router.once(() => {
  ReactDOM.render((
    <Router>
      {...}
    </Router>
  ), holder);
});
`}
          </CodeBlock>

          <p>
            Alternatively, you can update the render-invoked{" "}
            <IJS>children()</IJS> function to know what to do when{" "}
            <IJS>response</IJS> is <IJS>null</IJS>.
          </p>

          <CodeBlock>
            {`// render fallback when response is null
ReactDOM.render((
  <Router>
    {({ response }) => {
      if (response == null) {
        return <div>Loading...</div>;
      }
      const { body:Body } = response;
      return <Body response={response} />;
    }}
  </Router>
), holder);`}
          </CodeBlock>

          <p>
            Which approach is best will depend on the specifics of an
            application. If there are routes that will take a long time for the
            initial load, you will probably want to render something while they
            load. For async code with short loading times, a blank screen might
            be more acceptable.
          </p>
        </HashSection>

        <p>
          For more information on async route properties, please refer to the{" "}
          <Link name="Guide" params={{ slug: "routes" }}>
            routes guide
          </Link>
          .
        </p>
      </HashSection>

      <HashSection meta={splitMeta}>
        <p>
          Currently, the <IJS>routes.js</IJS> module imports all of the route
          modules at the top of the file. This results in a single bundle of all
          of a website's code. This can be improved by adding code splitting to
          an application, which will result in more, but smaller, bundles.
        </p>

        <HashSection meta={splittingMeta} className="aside" tag="h3">
          <p>
            Code splitting works by "dynamically" importing modules using the{" "}
            <IJS>import()</IJS> function. When bundlers like Webpack see{" "}
            <IJS>import()</IJS> functions, they know to create a separate bundle
            for that module (and that module's imports, etc.).
          </p>

          <p>
            You can set a chunk's name using the{" "}
            <a href="https://webpack.js.org/api/module-methods/#magic-comments">
              <IJS>webpackChunkName</IJS>
            </a>{" "}
            magic comment with an <IJS>import()</IJS> call.
          </p>

          <p>
            Create React App's default configuration is already setup to support
            code splitting, but if you were creating your own Webpack
            configuration, you would need to use{" "}
            <a href="https://webpack.js.org/configuration/output/#output-chunkfilename">
              <IJS>output.chunkFilename</IJS>
            </a>{" "}
            to support code splitting.
          </p>

          <CodeBlock>
            {`// this creates a "Test" bundle
import(/* webpackChunkName: "Test" */ "./components/Test.js")`}
          </CodeBlock>

          <p>
            <IJS>import()</IJS> returns a module object, so if you want to
            access a module's default export, you can use a <IJS>then</IJS>{" "}
            function to get that value.
          </p>

          <CodeBlock>
            {`import("some-module.js")
  .then(module => module.default)`}
          </CodeBlock>
        </HashSection>

        <p>
          Currently <IJS>response()</IJS> returns an object whose{" "}
          <IJS>body</IJS> property is a module imported at the top of the file.
          In order to add code splitting to routes, we can add a{" "}
          <IJS>resolve</IJS> function that imports the module.
        </p>

        <p>
          The <IJS>@curi/helpers</IJS> package provides a{" "}
          <IJS>preferDefault</IJS> function. This function will return an
          imported module's default property if it exists, and returns the
          entire module if it doesn't have a default property.
        </p>

        <CodeBlock>
          {`import { preferDefault } from "@curi/helpers";
          
const routes = prepareRoutes([
  {
    name: "Test",
    path: "test",
    resolve: {
      body: () => import(/* webpackChunkName: "Test" */ "./components/Test.js")
        .then(preferDefault)
    }
  }
]);`}
        </CodeBlock>

        <p>
          When a module fails to load, the error will be passed to the{" "}
          <IJS>response()</IJS> function through the <IJS>error</IJS> property.
          We won't be incorporating this into the application here, but in a
          real application you probably want to have a fallback component to
          display an error message (especially if you have an offline mode with
          service workers).
        </p>

        <CodeBlock>
          {`import displayLoadError from "./components/LoadError";
        
const routes = prepareRoutes([
  {
    name: "One",
    path: "one",
    resolve: {
      body: () => import("./components/One.js")
        .then(preferDefault)
        .catch(err => displayLoadError(err)
    },
    response({ resolved }) {
      return {
        body: resolved.body
      };
    }
  }
]);`}
        </CodeBlock>

        <p>
          We can now update the <IJS>routes.js</IJS> module to remove the
          imports at the top of the file and use <IJS>import()</IJS> to import
          the route components. We will use <IJS>preferDefault</IJS> to only
          resolve the component instead of the entire module object.
        </p>
        <p>
          The <IJS>response()</IJS> functions should also be updated to set the
          return object's <IJS>body</IJS> property to <IJS>resolved.body</IJS>{" "}
          instead of the import at the top of the file.
        </p>

        <CodeBlock data-line="3,9-15,20-26,31-37,42-48">
          {`// src/routes.js
import { prepareRoutes } from "@curi/router";
import { preferDefault } from "@curi/helpers";

export default prepareRoutes([
  {
    name: "Home",
    path: "",
    resolve: {
      body: () => import("./components/Home")
        .then(preferDefault)
    },
    response({ resolved }) {
      return { body: resolved.body };
    }
  },
  {
    name: "Book",
    path: "book/:id",
    resolve: {
      body: () => import("./components/Book")
        .then(preferDefault)
    },
    response({ resolved }) {
      return { body: resolved.body };
    }
  },
  {
    name: "Checkout",
    path: "checkout",
    resolve: {
      body: () => import("./components/Checkout")
        .then(preferDefault)
    },
    response({ resolved }) {
      return { body: resolved.body };
    }
  },
  {
    name: "Catch All",
    path: "(.*)",
    resolve: {
      body: () => import("./components/NotFound")
        .then(preferDefault)
    },
    response({ resolved }) {
      return { body: resolved.body };
    }
  }
]);`}
        </CodeBlock>

        <p>
          For this tutorial, we will use <IJS>router.once()</IJS> to delay the
          initial render while we wait for the initial response. We should
          update the <IJS>index.js</IJS> module to do this.
        </p>

        <CodeBlock data-line="17-35">
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

router.once(() => {
  ReactDOM.render((
    <Router>
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
    </Router>
  ), document.getElementById('root'));
});
registerServiceWorker();`}
        </CodeBlock>

        <p>
          With those changes, Webpack will now split the application into
          multiple bundles. The initial render will be delayed until after the
          code split bundle for the first route has been loaded.
        </p>
      </HashSection>

      <HashSection meta={preloadMeta}>
        <p>
          Preloading data lets you delay navigation until after the data for a
          route has loaded. This can save you from having to render a partial
          page with spinners if the data takes a while to load.
        </p>
        <p>
          While the data is loading, the user will be able to continue
          interacting with the current page. This means that the user can also
          start a new navigation while the current navigation is running. When
          this happens, Curi knows to to cancel the previous navigation and
          perform the new navigation instead.
        </p>
        <p>
          We have two routes that need to load data: <IJS>Home</IJS> and{" "}
          <IJS>Book</IJS>. The <IJS>Home</IJS> route will load the known books,
          while the <IJS>Book</IJS> route will load data about a specific book.
        </p>
        <p>
          Currently the data for both of these routes is imported in their
          components. In a real site you would most likely make API calls to a
          REST or GraphQL endpoint, but here we will simulate this with a fake
          API.
        </p>

        <HashSection meta={fakeMeta} tag="h3">
          <p>
            The fake API will simulate asynchronous calls to the server by
            returning Promises, similarly to the{" "}
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">
              Fetch API
            </a>
            .
          </p>

          <p>
            First, we will create an <IJS>api.js</IJS> module that exports the
            fake API functions.
          </p>

          <CodeBlock lang="bash">{`touch src/api.js`}</CodeBlock>

          <p>
            In the API module, we will import the <IJS>books.js</IJS> data.
          </p>
          <p>
            We need to write two functions. The first returns a list of all
            books and the second returns the data for a specific book. For both,
            we can use <IJS>Promise.resolve()</IJS> to return a Promise, even
            though we don't really have any asynchronous code being run.
          </p>

          <CodeBlock>
            {`// src/api.js
import books from "./books";

export const BOOKS = () => Promise.resolve(books);

export const BOOK = id => Promise.resolve(
  const intID = parseInt(id, 10);
  books.find(b => b.id === intID)
);`}
          </CodeBlock>
        </HashSection>

        <p>
          When the router is created, it can take a third argument, which is an
          options object. One of the properties of this object is{" "}
          <IJS>external</IJS>, which is used to pass in external values that
          will be accessible in a route's <IJS>resolve</IJS> and{" "}
          <IJS>response</IJS> functions. This is particularly useful for data
          that is initialized at runtime, like an Apollo store, but we will also
          use it here.
        </p>

        <CodeBlock data-line="11,15-19">
          {`// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { curi } from '@curi/router';
import Browser from '@hickory/browser';
import { curiProvider } from '@curi/react-dom';

import routes from './routes';
import './index.css';
import NavMenu from './components/NavMenu';
import * as bookAPI from "./api";
import registerServiceWorker from './registerServiceWorker';

const history = Browser();
const router = curi(history, routes, {
  external: {
    bookAPI
  }
});
const Router = curiProvider(router);

router.once(() => {
  ReactDOM.render((
    <Router>
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
    </Router>
  ), document.getElementById('root'));
});
registerServiceWorker();`}
        </CodeBlock>

        <p>
          What do we want to do with the data loaded from the API calls? Along
          with the <IJS>body</IJS> property, another valid return property for{" "}
          <IJS>response</IJS> functions is <IJS>data</IJS>. This is a convenient
          way to attach any data to a response, which we can read from while
          rendering.
        </p>
        <p>
          The <IJS>Home</IJS> route already has an asynchronous action:
          importing the <IJS>body</IJS> component. We will name the async call
          to load the books data <IJS>"books"</IJS>.
        </p>
        <p>
          The <IJS>Book</IJS> route's <IJS>response()</IJS> also needs to be
          updated to attach the books data (<IJS>resolved.books</IJS>) to the
          response.
        </p>
        <p>
          The <IJS>book()</IJS> API call expects to be given the <IJS>id</IJS>{" "}
          number of the book it should return data for. We can grab the correct
          param (<IJS>id</IJS>) from the <IJS>params</IJS> property. However,
          when params are parsed, they are stored as strings. To convert it to a
          number, we can use the route's <IJS>params</IJS> property to tell Curi
          how to parse the <IJS>id</IJS>. By giving it a function that calls{" "}
          <IJS>parseInt()</IJS> on the provided value, <IJS>params.id</IJS> will
          be a number instead of a string.
        </p>

        <CodeBlock data-line="12,15-18,27,30-33">
          {`// src/routes.js
import { prepareRoutes } from "@curi/router";
import { preferDefault } from "@curi/helpers";

export default prepareRoutes([
  {
    name: "Home",
    path: "",
    resolve: {
      body: () => import("./components/Home")
        .then(preferDefault),
      books: (match, external) => external.bookAPI.BOOKS()
    },
    response({ resolved }) {
      return {
        body: resolved.body,
        data: { books: resolved.books }
      };
    }
  },
  {
    name: "Book",
    path: "book/:id",
    resolve: {
      body: () => import("./components/Book")
        .then(preferDefault),
      book: ({ params }, external) => external.bookAPI.BOOK(params.id)
    },
    response({ resolved }) {
      return {
        body: resolved.body,
        data: { book: resolved.book }
      };
    }
  },
  {
    name: "Checkout",
    path: "checkout",
    resolve: {
      body: () => import("./components/Checkout")
        .then(preferDefault)
    },
    response({ resolved }) {
      return { body: resolved.body };
    }
  },
  {
    name: "Catch All",
    path: "(.*)",
    resolve: {
      body: () => import("./components/NotFound")
        .then(preferDefault)
    },
    response({ resolved }) {
      return { body: resolved.body };
    }
  }
]);`}
        </CodeBlock>

        <p>
          With the data attached to our responses, we can remove the data
          imports from the components and just read from the response.
        </p>

        <p>
          In the <Cmp>Home</Cmp> component's module, we can remove the{" "}
          <IJS>books.js</IJS> import and grab the response from the component's
          props. The books data can be access as <IJS>response.data.books</IJS>.
        </p>

        <CodeBlock lang="jsx" data-line="5,9">
          {`// src/components/Home.js
import React from 'react';
import { Link } from '@curi/react-dom';

export default function Home({ response }) {
  return (
    <div>
      <ul>
        {response.data.books.map(book => (
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

        <p>
          Likewise, we can remove the <IJS>books.js</IJS> import from the{" "}
          <Cmp>Book</Cmp> component's module and grab the book data from{" "}
          <IJS>response.data</IJS> instead of searching for it in the books
          array.
        </p>

        <CodeBlock lang="jsx" data-line="7">
          {`// src/components/Book.js
import React from 'react';

import cart from '../cart';

export default function Book({ response, router }) {
  const { book } = response.data;
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
          router.navigate({ to: "Checkout" });
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={loadingMeta}>
        <p>
          At this point, we have the same functionality as the basic tutorial,
          but we have added async data loading. The bundle importing has real
          loading times, but the fake API calls resolve immediately, which
          doesn't necessarily reflect real world performance.
        </p>
        <p>
          We can update the fake API to delay resolving so that we can take a
          look at some of the <IJS>@curi/react-dom</IJS> components that are
          navigation-aware. The implementation here isn't important, so you can
          just copy+paste the code. The only thing to know is that the{" "}
          <IJS>BOOKS()</IJS> function has a one second delay and the{" "}
          <IJS>BOOK()</IJS> function has a 2.5 second delay the first time a
          book is requested (and responds instantly on subsequent calls).
        </p>

        <CodeBlock>
          {`// src/api.js
import books from "./books";

export const BOOKS = () => new Promise(resolve => {
  // artificial delay
  setTimeout(() => {
    resolve(books);
  }, 1000);
});

const BOOK_CACHE = {};
export const BOOK = id => new Promise(resolve => {
  if (BOOK_CACHE[id]) {
    resolve(BOOK_CACHE[id]);
    return;
  }
  const intID = parseInt(id, 10);
  // artificial delay on first call
  setTimeout(() => {
    const book = books.find(b => b.id === id);
    BOOK_CACHE[id] = book;
    resolve(book);
  }, 2500);
});`}
        </CodeBlock>

        <HashSection meta={navigatingMeta} tag="h3">
          <p>
            The <Cmp>Link</Cmp> component can be called with a render-invoked{" "}
            <IJS>children()</IJS> function. If you do this, the function will be
            called with a <IJS>navigating</IJS> boolean that indicates whether
            the router is currently navigating to that link. This is useful for
            when you know that there is a long (multiple seconds) delay between
            when the user clicks the link and when the navigation will occur.
          </p>
          <p>
            We can update the <Cmp>Link</Cmp>s in the <Cmp>Home</Cmp> component
            to using render-invoked functions and display a loading spinner
            while we wait for the book data to load.
          </p>

          <CodeBlock lang="jsx">
            {`import { Link } from "@curi/react-dom";
            
<Link name="Book" params={{ id: 1 }}>
  {navigating => (
    <React.Fragment>
      Book 1
      {navigating ? <Spinner /> : null}
    </React.Fragment>
  )}
</Link>`}
          </CodeBlock>

          <p>
            <a href="https://github.com/KyleAMathews/react-spinkit">
              <IJS>react-spinkit</IJS>
            </a>{" "}
            provides some pretty loading spinners, so we will use that.
          </p>

          <CodeBlock lang="bash">{`npm install react-spinkit`}</CodeBlock>

          <p>
            In the <Cmp>Home</Cmp> component's module, we need to import the{" "}
            <Cmp>Spinner</Cmp> component. The <Cmp>Link</Cmp> needs to be
            swapped from a React element to a render-invoked function. We wrap
            the contents in a <Cmp>React.Fragment</Cmp> to avoid unnecessary DOM
            elements. In the function, we render a <Cmp>Spinner</Cmp> when the{" "}
            <Cmp>Link</Cmp> is navigating and <IJS>null</IJS> when it is not.
          </p>
          <Note>
            <p>
              <IJS>react-spinkit</IJS> is highly customizable, but we are
              sticking with the defaults here. <IJS>react-spinkit</IJS> has a
              default one second render delay, which is why the spinner does not
              display immediately.
            </p>
          </Note>

          <CodeBlock lang="jsx" data-line="4,13-18">
            {`// src/components/Home.js
import React from 'react';
import { Link } from '@curi/react-dom';
import Spinner from "react-spinkit";

export default function Home({ response }) {
  return (
    <div>
      <ul>
        {response.data.books.map(book => (
          <li key={book.id}>
            <Link name="Book" params={{ id: book.id }} >
              {navigating => (
                <React.Fragment>
                  {book.title} by {book.author}
                  {navigating ? <Spinner /> : null}
                </React.Fragment>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}`}
          </CodeBlock>
        </HashSection>
      </HashSection>

      <HashSection meta={caveatsMeta}>
        <p>
          Adding asynchronous loading to an application can help reduce initial
          load size and speed up user interactions, however it also has some
          issues that you will need to consider.
        </p>
        <p>
          The biggest consideration is that there is nothing the frontend can do
          to get the data for the initial render faster. Your application's
          frontend can only fetch data as it discovers it needs it. If you are
          performing server-side rendering, you may want to load the initial
          data on the server and inject it into the page's HTML output. The
          implementation details for this vary greatly and are more related to
          how you store data (e.g.{" "}
          <a href="https://redux.js.org/recipes/server-rendering#the-server-side">
            with redux
          </a>
          ).
        </p>
        <p>
          Another consideration is whether or not you want to "hoist" data
          requirements. Curi's async functionality relies on you knowing all of
          the data requirements for a route, but you might prefer to keep the
          data associated with individual components. React Suspense will help
          with this (and Curi will support it once it releases), but this is
          still a ways out. At the very least, I would recommend using Curi for
          code splitting routes. Whether your should hoist other data
          requirements is something that should be determined on a case-by-case
          basis.
        </p>
      </HashSection>
    </React.Fragment>
  );
}

export { ReactAdvancedTutorial as component, contents };
