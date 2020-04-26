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
  CodeSandboxDemo
} from "../../components/tutorial/common";

let demoMeta = {
  title: "Demo",
  hash: "demo"
};

let setupMeta = { title: "Setup", hash: "setup" };

let initialMeta = { title: "Initial Render", hash: "initial-render" };
let asyncMeta = {
  title: "Asynchronous Routes",
  hash: "async",
  children: [initialMeta]
};

let splittingMeta = {
  title: "Code Splitting",
  hash: "code-splitting"
};
let splitMeta = {
  title: "Code Splitting in Routes",
  hash: "code-splitting-routes",
  children: [splittingMeta]
};

let fakeMeta = { title: "The Fake API", hash: "fake-api" };
let preloadMeta = {
  title: "Preloading Data",
  hash: "preloading-data",
  children: [fakeMeta]
};

let navigatingMeta = {
  title: "Link is navigating?",
  hash: "link-navigating"
};
let loadingMeta = {
  title: "Visualizing Loading",
  hash: "loading",
  children: [navigatingMeta]
};

let caveatsMeta = { title: "Async Caveats", hash: "caveats" };

let contents = [
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
      <TitledPlainSection title="React Advanced Tutorial">
        <Paragraph>
          In this tutorial, we will be expanding on the website built in the{" "}
          <Link name="Tutorial" params={{ slug: "react-basics" }}>
            React basics tutorial
          </Link>
          . We will take advantage of Curi's async features to add code
          splitting and data preloading to the application.
        </Paragraph>

        <Outline>
          <li>Add code splitting to routes.</li>
          <li>Preload route data with asynchronous navigation.</li>
        </Outline>
      </TitledPlainSection>

      <HashSection meta={demoMeta} tag="h2">
        <Paragraph>
          You can run a demo of the site we are building with CodeSandbox.
        </Paragraph>

        <CodeSandboxDemo
          id="github/curijs/react-advanced-tutorial/tree/master/"
          title="Curi React advanced tutorial"
        />
      </HashSection>

      <HashSection meta={setupMeta} tag="h2">
        <Paragraph>
          If you did not complete the React basics tutorial, you should either
          clone its{" "}
          <a href="https://github.com/curijs/react-basic-tutorial/">repo</a> or
          fork its{" "}
          <a href="https://codesandbox.io/s/github/curijs/react-basic-tutorial/tree/master/">
            sandbox
          </a>
          .
        </Paragraph>
        <Paragraph>
          If you are cloning the repo, you should also install its dependencies
          and then start the development server.
        </Paragraph>

        <CodeBlock lang="bash">
          {`git clone https://github.com/curijs/react-basic-tutorial react-advanced-tutorial
cd react-advanced-tutorial
npm install
npm run start`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={asyncMeta} tag="h2">
        <Paragraph>
          Curi lets you attach async functions to a route through its{" "}
          <IJS>resolve</IJS> function. When that route matches, a response will
          not be emitted until the <IJS>resolve</IJS> has resolved.
        </Paragraph>
        <Paragraph>
          <IJS>resolve</IJS> be passed an object of the matched route
          properties, which you may use to specify what data to load.
        </Paragraph>
        <Paragraph>
          The results of the async functions will be available in a route's{" "}
          <IJS>respond</IJS> function through the <IJS>resolved</IJS> object.
          Each result will be stored in the object using the async function's
          name.
        </Paragraph>
        <Paragraph>
          If any of the async functions throws an uncaught error, that error
          will be available in the <IJS>respond</IJS> function through the{" "}
          <IJS>error</IJS> property. That said, it is preferable for you to
          catch and handle the errors yourself.
        </Paragraph>

        <CodeBlock>
          {`{
  name: "A Route",
  path: "route/:id",
  resolve({ params }) {
    let body = import("./components/SomeComponent")
      .then(preferDefault);
    let data = fetch(\`/api/data/$\{params.id\}\`);
    return Promise.all([ component, data ]);
  },
  respond({ resolved, error }) {
    if (error) {
      // handle an uncaught error
    }
    let [body, data] = resolved;
    return { body, data };
  }
}`}
        </CodeBlock>

        <Note>
          <Paragraph>
            These async functions are called every time a route matches. If you
            have functions that should re-use the results from previous calls,
            you will probably want to implement some caching. Curi provides a{" "}
            <Link
              name="Package"
              params={{ package: "helpers", version: "v2" }}
              hash="once"
            >
              <IJS>once</IJS>
            </Link>{" "}
            function for simple caching, but leaves more advanced caching
            solutions to the user.
          </Paragraph>
        </Note>

        <Paragraph>
          Curi uses Promises to manage async code, so async functions should
          return Promises. <IJS>Promise.resolve</IJS> can be used to wrap a
          return value in a Promise.
        </Paragraph>

        <CodeBlock>
          {`import { preferDefault } from "@curi/helpers";

let routes = prepareRoutes([
  {
    name: "A Route",
    path: "route/:id",
    resolve({ params }) {
      let body = import("./components/SomeComponent")
        .then(preferDefault);
      let data = fetch(\`/api/data/$\{params.id\}\`);
      return Promise.all([ component, data ]);
    },
    respond({ resolved, error }) {
      if (error) {
        // handle an uncaught error
      }
      let [body, data] = resolved;
      return { body, data };
    }
  }
]);`}
        </CodeBlock>

        <HashAside meta={initialMeta} tag="h3">
          <Paragraph>
            There is one caveat to async routes: we cannot safely render the
            application immediately on load because the initial response might
            not be ready yet.
          </Paragraph>

          <Paragraph>
            Curi does not emit a response object to its observers until it is
            ready. If the initial route that matches is asynchronous, then there
            is a delay between when the application is ready to render and when
            there is a response to render.
          </Paragraph>

          <Paragraph>
            If you attempt to render immediately after creating a router and the
            initial response is still being created, the <IJS>response</IJS>{" "}
            that will be passed to the <IJS>Router</IJS>'s <IJS>children</IJS>{" "}
            will be <IJS>undefined</IJS>.
          </Paragraph>

          <Paragraph>
            There are a few possible ways to handle this situation.
          </Paragraph>

          <Paragraph>
            The first is to delay rendering by placing your{" "}
            <IJS>ReactDOM.render</IJS> call inside of a <IJS>router.once</IJS>{" "}
            callback. This will guarantee that the render isn't called until the
            first response is ready.
          </Paragraph>

          <CodeBlock>
            {`// delay rendering
router.once(() => {
  ReactDOM.render((
    <Router>
      <App />
    </Router>
  ), holder);
});
`}
          </CodeBlock>

          <Paragraph>
            Alternatively, you can update the root <IJS>App</IJS> component to
            detect when the <IJS>response</IJS> is <IJS>undefined</IJS> and
            render a loading message.
          </Paragraph>

          <CodeBlock>
            {`// render fallback when response is null
function App() {
  let { response } = useResponse();
  if (response === undefined) {
    return <Paragraph>Loading...</Paragraph>;
  }
  let { body:Body } = response;
  return <Body response={response} />;
}`}
          </CodeBlock>

          <Paragraph>
            Which approach is best will depend on the specifics of an
            application. If there are routes that will take a long time for the
            initial load, you will probably want to render something while they
            load. For async code with short loading times, a blank screen might
            be more acceptable.
          </Paragraph>
        </HashAside>

        <Paragraph>
          For more information on async route properties, please refer to the{" "}
          <Link name="Guide" params={{ slug: "routes" }}>
            routes guide
          </Link>
          .
        </Paragraph>
      </HashSection>

      <HashSection meta={splitMeta} tag="h2">
        <Paragraph>
          Currently, the <IJS>routes.js</IJS> module imports all of the route
          modules at the top of the file. This results in a single bundle of all
          of a website's code. This can be improved by adding code splitting to
          an application, which will result in more, but smaller, bundles.
        </Paragraph>

        <HashAside meta={splittingMeta} tag="h3">
          <Paragraph>
            Code splitting works by "dynamically" importing modules using the{" "}
            <IJS>import</IJS> function. When bundlers like Webpack see{" "}
            <IJS>import</IJS> functions, they know to create a separate bundle
            for that module (and that module's imports, etc.).
          </Paragraph>

          <Paragraph>
            You can set a chunk's name using the{" "}
            <a href="https://webpack.js.org/api/module-methods/#magic-comments">
              <IJS>webpackChunkName</IJS>
            </a>{" "}
            magic comment with an <IJS>import</IJS> call.
          </Paragraph>

          <Paragraph>
            Create React App's default configuration is already setup to support
            code splitting, but if you were creating your own Webpack
            configuration, you would need to use{" "}
            <a href="https://webpack.js.org/configuration/output/#output-chunkfilename">
              <IJS>output.chunkFilename</IJS>
            </a>{" "}
            to support code splitting.
          </Paragraph>

          <CodeBlock>
            {`// this creates a "Test" bundle
import(/* webpackChunkName: "Test" */ "./components/Test.js")`}
          </CodeBlock>

          <Paragraph>
            <IJS>import</IJS> returns a module object, so if you want to access
            a module's default export, you can use a <IJS>then</IJS> function to
            get that value.
          </Paragraph>

          <CodeBlock>
            {`import("some-module.js")
  .then(module => module.default)`}
          </CodeBlock>
        </HashAside>

        <Paragraph>
          Currently <IJS>respond</IJS> function returns an object whose{" "}
          <IJS>body</IJS> property is a module imported at the top of the file.
          In order to add code splitting to routes, we can add a{" "}
          <IJS>resolve</IJS> function that imports the module.
        </Paragraph>

        <Paragraph>
          The <IJS>@curi/helpers</IJS> package provides a{" "}
          <IJS>preferDefault</IJS> function. This function will return an
          imported module's default property if it exists, and returns the
          entire module if it doesn't have a default property.
        </Paragraph>

        <CodeBlock>
          {`import { preferDefault } from "@curi/helpers";

let routes = prepareRoutes([
  {
    name: "Test",
    path: "test",
    resolve() {
      return import(
        /* webpackChunkName: "Test" */ "./components/Test.js"
      ).then(preferDefault);
    }
  }
]);`}
        </CodeBlock>

        <Paragraph>
          When a module fails to load, the error will be passed to the{" "}
          <IJS>respond</IJS> function through the <IJS>error</IJS> property. We
          won't be incorporating this into the application here, but in a real
          application you probably want to have a fallback component to display
          an error message (especially if you have an offline mode with service
          workers).
        </Paragraph>

        <CodeBlock>
          {`import displayLoadError from "./components/LoadError";

let routes = prepareRoutes([
  {
    name: "One",
    path: "one",
    resolve() {
      return import("./components/One.js")
        .then(preferDefault)
        .catch(err => displayLoadError(err);
    },
    respond({ resolved }) {
      return {
        body: resolved
      };
    }
  }
]);`}
        </CodeBlock>

        <Paragraph>
          We can now update the <IJS>routes.js</IJS> module to remove the
          imports at the top of the file and use <IJS>import</IJS> to import the
          route components. We will use <IJS>preferDefault</IJS> to only resolve
          the component instead of the entire module object.
        </Paragraph>
        <Paragraph>
          The <IJS>respond</IJS> functions should also be updated to set the
          return object's <IJS>body</IJS> property to <IJS>resolved.body</IJS>{" "}
          instead of the import at the top of the file.
        </Paragraph>

        <CodeBlock data-line="3,10-16,21-27,32-38,43-49">
          {`// src/routes.js
import { prepareRoutes } from "@curi/router";
import { preferDefault } from "@curi/helpers";

export default prepareRoutes([
  {
    name: "Home",
    path: "",
    resolve() {
      return import("./components/Home")
        .then(preferDefault);
    },
    respond({ resolved }) {
      return { body: resolved };
    }
  },
  {
    name: "Book",
    path: "book/:id",
    resolve() {
      return import("./components/Book")
        .then(preferDefault);
    },
    respond({ resolved }) {
      return { body: resolved };
    }
  },
  {
    name: "Checkout",
    path: "checkout",
    resolve() {
      return import("./components/Checkout")
        .then(preferDefault);
    },
    respond({ resolved }) {
      return { body: resolved };
    }
  },
  {
    name: "Catch All",
    path: "(.*)",
    resolve() {
      return import("./components/NotFound")
        .then(preferDefault);
    },
    respond({ resolved }) {
      return { body: resolved };
    }
  }
]);`}
        </CodeBlock>

        <Paragraph>
          For this tutorial, we will use <IJS>router.once</IJS> to delay the
          initial render while we wait for the initial response. We should
          update the <IJS>index.js</IJS> module to do this.
        </Paragraph>

        <CodeBlock data-line="22-28">
          {`// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { createRouter, announce } from "@curi/router";
import { browser } from '@hickory/browser';
import { createRouterComponent } from '@curi/react-dom';

import routes from './routes';
import './index.css';
import NavMenu from './components/NavMenu';
import registerServiceWorker from './registerServiceWorker';

let router = createRouter(browser, routes, {
  sideEffects: [
    announce(({ response }) => {
      return \`Navigated to \${response.location.pathname}\`;
    })
  ]
});
let Router = createRouterComponent(router);

router.once(() => {
  ReactDOM.render((
    <Router>
      <App />
    </Router>
  ), document.getElementById('root'));
});
registerServiceWorker();`}
        </CodeBlock>

        <Paragraph>
          With those changes, Webpack will now split the application into
          multiple bundles. The initial render will be delayed until after the
          code split bundle for the first route has been loaded.
        </Paragraph>
      </HashSection>

      <HashSection meta={preloadMeta} tag="h2">
        <Paragraph>
          Preloading data lets you delay navigation until after the data for a
          route has loaded. This can save you from having to render a partial
          page with spinners if the data takes a while to load.
        </Paragraph>
        <Paragraph>
          While the data is loading, the user will be able to continue
          interacting with the current page. This means that the user can also
          start a new navigation while the current navigation is running. When
          this happens, Curi knows to to cancel the previous navigation and
          perform the new navigation instead.
        </Paragraph>
        <Paragraph>
          We have two routes that need to load data: <IJS>Home</IJS> and{" "}
          <IJS>Book</IJS>. The <IJS>Home</IJS> route will load the known books,
          while the <IJS>Book</IJS> route will load data about a specific book.
        </Paragraph>
        <Paragraph>
          Currently the data for both of these routes is imported in their
          components. In a real site you would most likely make API calls to a
          REST or GraphQL endpoint, but here we will simulate this with a fake
          API.
        </Paragraph>

        <HashSection meta={fakeMeta} tag="h3">
          <Paragraph>
            The fake API will simulate asynchronous calls to the server by
            returning Promises, similarly to the{" "}
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">
              Fetch API
            </a>
            .
          </Paragraph>

          <Paragraph>
            First, we will create an <IJS>api.js</IJS> module that exports the
            fake API functions.
          </Paragraph>

          <CodeBlock lang="bash">{`touch src/api.js`}</CodeBlock>

          <Paragraph>
            In the API module, we will import the <IJS>books.js</IJS> data.
          </Paragraph>
          <Paragraph>
            We need to write two functions. The first returns a list of all
            books and the second returns the data for a specific book. For both,
            we can use <IJS>Promise.resolve</IJS> to return a Promise, even
            though we don't really have any asynchronous code being run.
          </Paragraph>

          <CodeBlock>
            {`// src/api.js
import books from "./books";

export let BOOKS = () => Promise.resolve(books);

export let BOOK = id => Promise.resolve(
  let intID = parseInt(id, 10);
  books.find(b => b.id === intID)
);`}
          </CodeBlock>
        </HashSection>

        <Paragraph>
          When the router is created, it can take a third argument, which is an
          options object. One of the properties of this object is{" "}
          <IJS>external</IJS>, which is used to pass in external values that
          will be accessible in a route's <IJS>resolve</IJS> and{" "}
          <IJS>respond</IJS> functions. This is particularly useful for data
          that is initialized at runtime, like an Apollo store, but we will also
          use it here.
        </Paragraph>

        <CodeBlock data-line="11,20-22">
          {`// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { createRouter } from "@curi/router";
import { browser } from '@hickory/browser';
import { createRouterComponent } from '@curi/react-dom';

import routes from './routes';
import './index.css';
import NavMenu from './components/NavMenu';
import * as bookAPI from "./api";
import registerServiceWorker from './registerServiceWorker';

let router = createRouter(browser, routes, {
  sideEffects: [
    announce(({ response }) => {
      return \`Navigated to \${response.location.pathname}\`;
    })
  ],
  external: {
    bookAPI
  }
});
let Router = createRouterComponent(router);

router.once(() => {
  ReactDOM.render((
    <Router>
      <App />
    </Router>
  ), document.getElementById('root'));
});
registerServiceWorker();`}
        </CodeBlock>

        <Paragraph>
          What do we want to do with the data loaded from the API calls? Along
          with the <IJS>body</IJS> property, another valid return property for{" "}
          <IJS>respond</IJS> functions is <IJS>data</IJS>. This is a convenient
          way to attach any data to a response, which we can read from while
          rendering.
        </Paragraph>
        <Paragraph>
          The <IJS>Home</IJS> route already has an asynchronous action:
          importing the <IJS>body</IJS> component. We will name the async call
          to load the books data <IJS>"books"</IJS>.
        </Paragraph>
        <Paragraph>
          The <IJS>Book</IJS> route's <IJS>respond</IJS> function also needs to
          be updated to attach the books data (<IJS>resolved.books</IJS>) to the
          response.
        </Paragraph>
        <Paragraph>
          The <IJS>book</IJS> API call expects to be given the <IJS>id</IJS>{" "}
          number of the book it should return data for. We can grab the correct
          param (<IJS>id</IJS>) from the <IJS>params</IJS> property. However,
          when params are parsed, they are stored as strings. To convert it to a
          number, we can use the route's <IJS>params</IJS> property to tell Curi
          how to parse the <IJS>id</IJS>. By giving it a function that calls{" "}
          <IJS>parseInt</IJS> on the provided value, <IJS>params.id</IJS> will
          be a number instead of a string.
        </Paragraph>

        <CodeBlock data-line="10,13,17-21,27,30,34-38">
          {`// src/routes.js
import { prepareRoutes } from "@curi/router";
import { preferDefault } from "@curi/helpers";

export default prepareRoutes([
  {
    name: "Home",
    path: "",
    resolve(_, external) {
      let body = import("./components/Home")
        .then(preferDefault);
      let books = external.bookAPI.BOOKS();
      return Promise.all([body, books]);
    },
    respond({ resolved }) {
      let [body, books] = resolved;
      return {
        body,
        data: { books }
      };
    }
  },
  {
    name: "Book",
    path: "book/:id",
    resolve({ params }, external) {
      let body = import("./components/Book")
        .then(preferDefault);
      let book = external.bookAPI.BOOK(params.id);
      return Promise.all([body, books]);
    },
    respond({ resolved }) {
      let [body, book] = resolved;
      return {
        body,
        data: { book }
      };
    }
  },
  {
    name: "Checkout",
    path: "checkout",
    resolve() {
      return import("./components/Checkout")
        .then(preferDefault);
    },
    respond({ resolved }) {
      return { body: resolved };
    }
  },
  {
    name: "Catch All",
    path: "(.*)",
    resolve() {
      return import("./components/NotFound")
        .then(preferDefault);
    },
    respond({ resolved }) {
      return { body: resolved };
    }
  }
]);`}
        </CodeBlock>

        <Paragraph>
          With the data attached to our responses, we can remove the data
          imports from the components and just read from the response.
        </Paragraph>

        <Paragraph>
          In the <IJS>Home</IJS> component's module, we can remove the{" "}
          <IJS>books.js</IJS> import and grab the response from the component's
          props. The books data can be access as <IJS>response.data.books</IJS>.
        </Paragraph>

        <CodeBlock lang="jsx" data-line="5,9">
          {`// src/components/Home.js
import React from 'react';
import { Link } from '@curi/react-dom';

export default function Home({ response }) {
  return (
    <article>
      <ul>
        {response.data.books.map(book => (
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
          Likewise, we can remove the <IJS>books.js</IJS> import from the{" "}
          <IJS>Book</IJS> component's module and grab the book data from{" "}
          <IJS>response.data</IJS> instead of searching for it in the books
          array.
        </Paragraph>

        <CodeBlock lang="jsx" data-line="9">
          {`// src/components/Book.js
import React from 'react';
import { useRouter } from '@curi/react-dom';

import cart from '../cart';

export default function Book({ response }) {
  let router = useRouter();
  let { book } = response.data;
  if (!book) {
    return <article>The requested book could not be found</article>;
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
};`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={loadingMeta} tag="h2">
        <Paragraph>
          At this point, we have the same functionality as the basic tutorial,
          but we have added async data loading. The bundle importing has real
          loading times, but the fake API calls resolve immediately, which
          doesn't necessarily reflect real world performance.
        </Paragraph>
        <Paragraph>
          We can update the fake API to delay resolving so that we can take a
          look at some of the <IJS>@curi/react-dom</IJS> components that are
          navigation-aware. The implementation here isn't important, so you can
          just copy+paste the code. The only thing to know is that the{" "}
          <IJS>BOOKS</IJS> function has a one second delay and the{" "}
          <IJS>BOOK</IJS> function has a 2.5 second delay the first time a book
          is requested (and responds instantly on subsequent calls).
        </Paragraph>

        <CodeBlock>
          {`// src/api.js
import books from "./books";

export let BOOKS = () => new Promise(resolve => {
  // artificial delay
  setTimeout(() => {
    resolve(books);
  }, 1000);
});

let BOOK_CACHE = {};
export let BOOK = id => new Promise(resolve => {
  if (BOOK_CACHE[id]) {
    resolve(BOOK_CACHE[id]);
    return;
  }
  let intID = parseInt(id, 10);
  // artificial delay on first call
  setTimeout(() => {
    let book = books.find(b => b.id === id);
    BOOK_CACHE[id] = book;
    resolve(book);
  }, 2500);
});`}
        </CodeBlock>

        <HashSection meta={navigatingMeta} tag="h3">
          <Paragraph>
            The <IJS>Link</IJS> component has a sibling component called{" "}
            <IJS>AsyncLink</IJS>, can takes a render-invoked function as its{" "}
            <IJS>children</IJS> prop. The function is called with a{" "}
            <IJS>navigating</IJS> boolean that indicates whether the router is
            currently navigating to that link. This is useful for when you know
            that there is a long (multiple seconds) delay between when the user
            clicks the link and when the navigation will occur.
          </Paragraph>

          <Paragraph>
            We can replace the <IJS>Link</IJS>s in the <IJS>Home</IJS> component
            with <IJS>AsyncLink</IJS>s and use render-invoked functions to
            display a loading spinner while we wait for the book data to load.
          </Paragraph>

          <CodeBlock lang="jsx">
            {`import { AsyncLink } from "@curi/react-dom";

<AsyncLink name="Book" params={{ id: 1 }}>
  {navigating => (
    <React.Fragment>
      Book 1
      {navigating ? <Spinner /> : null}
    </React.Fragment>
  )}
</AsyncLink>`}
          </CodeBlock>

          <Paragraph>
            We will use the{" "}
            <a href="https://github.com/KyleAMathews/react-spinkit">
              <IJS>react-spinkit</IJS>
            </a>{" "}
            package, which provides a variety of spinner components.
          </Paragraph>

          <CodeBlock lang="bash">{`npm install react-spinkit`}</CodeBlock>

          <Paragraph>
            In the <IJS>Home</IJS> component's module, we need to import the{" "}
            <IJS>Spinner</IJS> component. The <IJS>Link</IJS> needs to be
            swapped from a React element to a render-invoked function. We wrap
            the contents in a <IJS>React.Fragment</IJS> to avoid unnecessary DOM
            elements. In the function, we render a <IJS>Spinner</IJS> when the{" "}
            <IJS>Link</IJS> is navigating and <IJS>null</IJS> when it is not.
          </Paragraph>
          <Note>
            <Paragraph>
              <IJS>react-spinkit</IJS> is highly customizable, but we are
              sticking with the defaults here. <IJS>react-spinkit</IJS> has a
              default one second render delay, which is why the spinner does not
              display immediately.
            </Paragraph>
          </Note>

          <CodeBlock lang="jsx" data-line="3-4,12-19">
            {`// src/components/Home.js
import React from 'react';
import { AsyncLink } from '@curi/react-dom';
import Spinner from "react-spinkit";

export default function Home({ response }) {
  return (
    <article>
      <ul>
        {response.data.books.map(book => (
          <li key={book.id}>
            <AsyncLink name="Book" params={{ id: book.id }} >
              {navigating => (
                <React.Fragment>
                  {book.title} by {book.author}
                  {navigating ? <Spinner /> : null}
                </React.Fragment>
              )}
            </AsyncLink>
          </li>
        ))}
      </ul>
    </article>
  );
}`}
          </CodeBlock>
        </HashSection>
      </HashSection>

      <HashSection meta={caveatsMeta} tag="h2">
        <Paragraph>
          Adding asynchronous loading to an application can help reduce initial
          load size and speed up user interactions, however it also has some
          issues that you will need to consider.
        </Paragraph>
        <Paragraph>
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
        </Paragraph>
        <Paragraph>
          Another consideration is whether or not you want to "hoist" data
          requirements. Curi's async functionality relies on you knowing all of
          the data requirements for a route, but you might prefer to keep the
          data associated with individual components. React Suspense will help
          with this (and Curi will support it once it releases), but this is
          still a ways out. At the very least, I would recommend using Curi for
          code splitting routes. Whether your should hoist other data
          requirements is something that should be determined on a case-by-case
          basis.
        </Paragraph>
      </HashSection>
    </React.Fragment>
  );
}

export { ReactAdvancedTutorial as component, contents };
