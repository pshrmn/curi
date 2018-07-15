import React from "react";
import { Link } from "@curi/react";

import BaseTutorial from "./base/BaseTutorial";
import { TutorialBranch, CompleteBranch, Outline } from "./base/Branch";
import {
  InlineJS as IJS,
  InlineComponent as Cmp,
  PrismBlock
} from "../../components/PrismBlocks";
import { Section, Subsection } from "../../components/Sections";
import {
  SideBySide,
  CodeBlock,
  Explanation
} from "../../components/SideBySide";
import { Note } from "../../components/Messages";
import CodeSandboxDemo from "../../components/CodeSandboxDemo";

export default () => (
  <BaseTutorial>
    <h1>React Advanced Tutorial</h1>
    <p>
      In this tutorial, we will be expanding on the website built in the{" "}
      <Link to="Tutorial" params={{ slug: "react-basics" }}>
        React basics tutorial
      </Link>. We will take advantage of Curi's async features to add code
      splitting and data preloading to the application.
    </p>
    <Outline>
      <ul>
        <li>Learn how to code split routes.</li>
        <li>Learn how to preload data for routes.</li>
      </ul>
    </Outline>
    <Section title="Demo" id="demo">
      <p>You can run a demo of the site we are building with CodeSandbox.</p>
      <CodeSandboxDemo id="github/curijs/react-advanced-tutorial/tree/master/" />
    </Section>
    <Section title="Setup" id="setup">
      <SideBySide>
        <Explanation>
          <p>
            If you did not complete the React basics tutorial, you should either
            clone its{" "}
            <a href="https://github.com/curijs/react-basic-tutorial/">repo</a>{" "}
            or fork its{" "}
            <a href="https://codesandbox.io/s/github/curijs/react-basic-tutorial/tree/master/">
              sandbox
            </a>.
          </p>
          <p>
            If you are cloning the repo, you should also install its
            dependencies and then start the development server. The repo was
            made using <IJS>yarn</IJS>, but if you only have NPM installed, you
            can use the analagous commands.
          </p>
        </Explanation>
        <CodeBlock lang="bash">
          {`git clone https://github.com/curijs/react-basic-tutorial react-advanced-tutorial
cd react-advanced-tutorial

yarn
yarn start
# or
npm install
npm run start`}
        </CodeBlock>
      </SideBySide>
    </Section>
    <Section title="Async Routes" id="async">
      <SideBySide>
        <Explanation>
          <p>
            Curi lets you attach async functions to a route, and when that route
            matches, a response will not be emitted until the async functions
            have completed. The results of the async functions will be available
            in a route's <IJS>response()</IJS> function under the{" "}
            <IJS>resolved</IJS> object.
          </p>
          <Note>
            These async functions are called every time a route matches. If you
            have functions that should re-use the results from previous calls,
            you will probably want to implement some caching into your async
            functions. Curi provides a{" "}
            <Link to="Package" params={{ package: "router" }} hash="once">
              <IJS>once()</IJS>
            </Link>{" "}
            function for simple caching, but leaves more advanced caching
            solutions to the user.
          </Note>
          <p>
            The async functions for a route are grouped under the route's{" "}
            <IJS>match</IJS> object. The name of each function is the name that
            the function's result will be available as on the{" "}
            <IJS>resolved</IJS> object. If any of the async functions throws an
            error, that error will be available in the <IJS>response()</IJS>{" "}
            function through the <IJS>error</IJS> property.
          </p>
          <p>
            Async functions will be passed an object of the matched route
            properties, which you may use to specify what data to load.
          </p>
          <p>
            Curi uses Promises to manage async code, so async functions should
            return Promises. If you want to return a value, you can use{" "}
            <IJS>Promise.resolve()</IJS> to return it using a Promise.
          </p>
        </Explanation>
        <CodeBlock>
          {`const routes = [
  {
    name: "A Route",
    path: "route/:id",
    match: {
      component: () => import("./components/SomeComponent")
        .then(module => module.default),
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
];`}
        </CodeBlock>
      </SideBySide>
      <SideBySide>
        <Explanation>
          <p>
            There is one caveat to async routes: we cannot safely render the
            application immediately on load because the initial response might
            not be ready yet. When a user loads your application and the first
            route that matches has asynchronous functions, there is no response
            to render until the async code finishes. This means that if you
            attempt to render immediately after creating a router, the{" "}
            <IJS>response</IJS> that will be passed to the{" "}
            <Cmp>CuriProvider</Cmp>'s <IJS>children()</IJS> will be{" "}
            <IJS>null</IJS>.
          </p>
          <p>
            There are a few possible ways to handle this situation. The first is
            to delay rendering by placing your <IJS>ReactDOM.render()</IJS> call
            inside of a <IJS>router.respond()</IJS> callback. This will
            guarantee that the render isn't called until the first response is
            ready. Alternatively, you can update the render-invoked{" "}
            <IJS>children()</IJS> function to know what to do when{" "}
            <IJS>response</IJS> is <IJS>null</IJS>.
          </p>
          <p>
            Which approach is best will depend on the specifics of an
            application. If there are routes that will take a long time for the
            initial load, you will probably want to render something while they
            load. For async code with short loading times, a blank screen might
            be more acceptable.
          </p>
        </Explanation>
        <CodeBlock>
          {`// delay rendering
const router = curi(...);
router.respond(() => {
  ReactDOM.render((
    <CuriProvider>
      {...}
    </CuriProvider>
  ), holder);
});

// render using null response
ReactDOM.render((
  <CuriProvider>
    {({ response }) => {
      if (response == null) {
        return <div>Loading...</div>;
      }
      const { body:Body } = response;
      return <Body response={response} />;
    }}
  </CuriProvider>
), holder);`}
        </CodeBlock>
      </SideBySide>
      <SideBySide>
        <Explanation>
          <p>
            For more information on async route properties, please refer to the{" "}
            <Link to="Guide" params={{ slug: "routes" }}>
              routes guide
            </Link>.
          </p>
        </Explanation>
      </SideBySide>
    </Section>
    <Section title="Code Splitting" id="code-splitting">
      <SideBySide>
        <Explanation>
          <p>
            Code splitting works by "dynamically" importing modules using the{" "}
            <IJS>import()</IJS> function. When bundlers like Webpack see{" "}
            <IJS>import()</IJS> functions, they know to create a separate bundle
            for that module (and that module's imports, etc.).
          </p>
          <p>
            You can add a <IJS>/* webpackChunkName: "chunkName" */</IJS> comment
            to an <IJS>import()</IJS> call to let Webpack know what to name a
            code split bundle.
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
        </Explanation>
        <CodeBlock>
          {`// this creates a "Test" bundle
import(/* webpackChunkName: "Test" */ "./components/Test.js")`}
        </CodeBlock>
      </SideBySide>
      <SideBySide>
        <Explanation>
          <p>
            Currently, the <IJS>routes.js</IJS> module imports all of the route
            modules at the top of the file. In order to add code splitting, we
            need to switch to using <IJS>import()</IJS>.
          </p>
          <p>
            Currently <IJS>response()</IJS> returns an object whose{" "}
            <IJS>body</IJS> property is a module imported at the top of the
            file. Now we want to change this to have <IJS>body</IJS> be the
            imported module.
          </p>
        </Explanation>
        <CodeBlock>
          {`const routes = [
  {
    name: "Test",
    path: "test",
    match: {
      body: () => import(/* webpackChunkName: "Test" */ "./components/Test.js")
    }
  }
];`}
        </CodeBlock>
      </SideBySide>
      <Note>
        <SideBySide>
          <Explanation>
            <p>
              <IJS>import()</IJS> resolves a module object, not a component. Our
              components are exported using default exports, so they will be
              available as the module object's <IJS>default</IJS> property.
            </p>
            <p>
              There are a couple different approaches that you can take to
              accessing the component from the module object.
            </p>
            <p>
              The first is to use <IJS>import().then()</IJS> to resolve the
              module object's <IJS>default</IJS> property.
            </p>
            <p>
              The second is to reference <IJS>resolved.body.default</IJS> (or
              whatever you name the function) in the <IJS>response()</IJS>{" "}
              functions.
            </p>
            <p>Which you choose is mostly a matter of personal preference.</p>
          </Explanation>
          <CodeBlock>
            {`const routes = [
  {
    name: "One",
    path: "one",
    match: {
      body: () => import("./components/One.js")
        .then(module => module.default)
    },
    response({ resolved }) {
      return {
        body: resolved.body
      };
    }
  },
  {
    name: "Two",
    path: "two",
    match: {
      body: () => import("./components/Two.js")
    },
    response({ resolved }) {
      return {
        body: resolved.body.default
      };
    }
  }
];`}
          </CodeBlock>
        </SideBySide>
      </Note>
      <SideBySide>
        <Explanation>
          <p>
            When a module fails to load, the error will be passed to the{" "}
            <IJS>response()</IJS> function through the <IJS>error</IJS>{" "}
            property. We won't be incorporating this into the application here,
            but in a real application you probably want to have a fallback
            component to display an error message (especially if you have an
            offline mode with service workers).
          </p>
        </Explanation>
        <CodeBlock>
          {`import displayLoadError from "./components/LoadError";
        
const routes = [
  {
    name: "One",
    path: "one",
    match: {
      body: () => import("./components/One.js")
        .then(module => module.default)
        .catch(err => displayLoadError(err))
    },
    response({ resolved }) {
      return {
        body: resolved.body
      };
    }
  }
];`}
        </CodeBlock>
      </SideBySide>
      <SideBySide>
        <Explanation>
          <p>
            We can now update the <IJS>routes.js</IJS> module to remove the
            imports at the top of the file and use <IJS>import()</IJS> to import
            the route components. We will use <IJS>then()</IJS> to only resolve
            the component instead of the entire module object.
          </p>
          <p>
            The <IJS>response()</IJS> functions should also be updated to set
            the return object's <IJS>body</IJS> property to{" "}
            <IJS>resolved.body</IJS>
          </p>
        </Explanation>
        <CodeBlock data-line="6-14,19-27,32-40,45-53">
          {`// src/routes.js
export default [
  {
    name: "Home",
    path: "",
    match: {
      body: () => import("./components/Home")
        .then(module => module.default)
    },
    response({ resolved }) {
      return {
        body: resolved.body
      };
    }
  },
  {
    name: "Book",
    path: "book/:id",
    match: {
      body: () => import("./components/Book")
        .then(module => module.default)
    },
    response({ resolved }) {
      return {
        body: resolved.body
      };
    }
  },
  {
    name: "Checkout",
    path: "checkout",
    match: {
      body: () => import("./components/Checkout")
        .then(module => module.default)
    },
    response({ resolved }) {
      return {
        body: resolved.body
      };
    }
  },
  {
    name: "Catch All",
    path: "(.*)",
    match: {
      body: () => import("./components/NotFound")
        .then(module => module.default)
    },
    response({ resolved }) {
      return {
        body: resolved.body
      };
    }
  }
];`}
        </CodeBlock>
      </SideBySide>
      <SideBySide>
        <Explanation>
          <p>
            We will also update the <IJS>index.js</IJS> module to use{" "}
            <IJS>router.respond()</IJS> to delay the initial render.
          </p>
        </Explanation>
        <CodeBlock data-line="16-34">
          {`// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { curi } from '@curi/router';
import Browser from '@hickory/browser';
import { CuriProvider } from '@curi/react';

import './index.css';
import routes from './routes';
import NavMenu from './components/NavMenu';
import registerServiceWorker from './registerServiceWorker';

const history = Browser();
const router = curi(history, routes);

router.respond(() => {
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
});
registerServiceWorker();`}
        </CodeBlock>
      </SideBySide>
      <SideBySide>
        <Explanation>
          <p>
            With those changes, Webpack will now split the application into
            multiple bundles. The initial render will be delayed until after the
            code split bundle for the first route has been loaded.
          </p>
        </Explanation>
      </SideBySide>
    </Section>
    <Section title="Preloading Data" id="preloading-data">
      <SideBySide>
        <Explanation>
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
            <IJS>Book</IJS>. The <IJS>Home</IJS> route will load the known
            books, while the <IJS>Book</IJS> route will load data about a
            specific book.
          </p>
          <p>
            Currently the data for both of these routes is imported in their
            components. In a real site you would most likely make API calls to a
            REST or GraphQL endpoint, but here we will simulate this with a fake
            API.
          </p>
        </Explanation>
      </SideBySide>
      <Subsection title="The Fake API" id="fake-api">
        <SideBySide>
          <Explanation>
            <p>
              The fake API will simulate asynchronous calls to the server by
              returning Promises, similarly to the{" "}
              <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">
                Fetch API
              </a>.
            </p>
          </Explanation>
        </SideBySide>
        <SideBySide>
          <Explanation>
            <p>
              First, we will create an <IJS>api.js</IJS> module that exports the
              fake API functions.
            </p>
          </Explanation>
          <CodeBlock lang="bash">{`touch src/api.js`}</CodeBlock>
        </SideBySide>
        <SideBySide>
          <Explanation>
            <p>
              In the API module, we will import the <IJS>books.js</IJS> data.
            </p>
            <p>
              We need to write two functions. The first returns a list of all
              books and the second returns the data for a specific book. For
              both, we can use <IJS>Promise.resolve()</IJS> to return a Promise,
              even though we don't really have any asynchronous code being run.
            </p>
          </Explanation>
          <CodeBlock>
            {`// src/api.js
import books from "./books";

export const BOOKS = () => Promise.resolve(books);

export const BOOK = id => Promise.resolve(
  books.find(b => b.id === id)
);`}
          </CodeBlock>
        </SideBySide>
      </Subsection>
      <SideBySide>
        <Explanation>
          <p>
            The fake API functions should be imported in the{" "}
            <IJS>routes.js</IJS> module so that we can call the functions from
            the routes' async methods.
          </p>
          <p>
            What do we want to do with the data loaded from the API calls? We
            can attach it to a response through its <IJS>data</IJS> property.
            When we render, we will be able to access that data as{" "}
            <IJS>response.data</IJS>. <IJS>data</IJS> can be anything you want
            it to be. We will set <IJS>data</IJS> to be an object with
            appropriately named properties.
          </p>
          <p>
            The <IJS>Home</IJS> route already has an <IJS>import()</IJS>, which
            we name <IJS>body</IJS>. We will name the async call to load the
            books data <IJS>"books"</IJS>.
          </p>
          <p>
            The <IJS>Book</IJS> route's <IJS>response()</IJS> also needs to be
            updated to attach the books data (<IJS>resolved.books</IJS>) to the
            response.
          </p>
          <p>
            The <IJS>book()</IJS> API call expects to be given the <IJS>id</IJS>{" "}
            number of the book it should return data for. We can grab the
            correct param (<IJS>id</IJS>) from the <IJS>params</IJS> property.
            However, when params are parsed, they are stored as strings. To
            convert it to a number, we can use the route's <IJS>params</IJS>{" "}
            property to tell Curi how to parse the <IJS>id</IJS>. By giving it a
            function that calls <IJS>parseInt()</IJS> on the provided value,{" "}
            <IJS>params.id</IJS> will be a number instead of a string.
          </p>
        </Explanation>
        <CodeBlock data-line="2,9-13,16-20,26-28,30-32,35-38">
          {`// src/routes.js
import { BOOKS, BOOK } from "./api";

export default [
  {
    name: "Home",
    path: "",
    match: {
      body: () => import("./components/Home")
        .then(module => module.default),
      books: () => BOOKS()
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
    params: {
      id: id => parseInt(id, 10)
    },
    match: {
      body: () => import("./components/Book")
        .then(module => module.default),
      book: ({ params }) => BOOK(params.id)
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
    match: {
      body: () => import("./components/Checkout")
        .then(module => module.default)
    },
    response({ resolved }) {
      return {
        body: resolved.body
      };
    }
  },
  {
    name: "Catch All",
    path: "(.*)",
    match: {
      body: () => import("./components/NotFound")
        .then(module => module.default)
    },
    response({ resolved }) {
      return {
        body: resolved.body
      };
    }
  }
];`}
        </CodeBlock>
      </SideBySide>
      <SideBySide>
        <Explanation>
          <p>
            With the data attached to our responses, we can remove the data
            imports from the components and just read from the response.
          </p>
        </Explanation>
      </SideBySide>
      <SideBySide>
        <Explanation>
          <p>
            In the <Cmp>Home</Cmp> component's module, we can remove the{" "}
            <IJS>books.js</IJS> import and grab the response from the
            component's props. The books data can be access as{" "}
            <IJS>response.data.books</IJS>.
          </p>
        </Explanation>
        <CodeBlock lang="jsx" data-line="5,8">
          {`// src/components/Home.js
import React from 'react';
import { Link } from '@curi/react';

export default ({ response }) => (
  <div>
    <ul>
      {response.data.books.map(book => (
        <li key={book.id}>
          <Link to="Book" params={{ id: book.id }} >
            {book.title} by {book.author}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);`}
        </CodeBlock>
      </SideBySide>
      <SideBySide>
        <Explanation>
          <p>
            Likewise, we can remove the <IJS>books.js</IJS> import from the{" "}
            <Cmp>Book</Cmp> component's module and grab the book data from{" "}
            <IJS>response.data</IJS> instead of searching for it in the books
            array.
          </p>
        </Explanation>
        <CodeBlock lang="jsx" data-line="7">
          {`// src/components/Book.js
import React from 'react';

import cart from '../cart';

export default ({ response, router }) => {
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
      </SideBySide>
    </Section>
    <Section title="Visualizing Loading" id="loading">
      <SideBySide>
        <Explanation>
          <p>
            At this point, we have the same functionality as the basic tutorial,
            but we have added async data loading. The bundle importing has real
            loading times, but the fake API calls resolve immediately, which
            doesn't necessarily reflect real world performance.
          </p>
          <p>
            We can update the fake API to delay resolving so that we can take a
            look at some of the <IJS>@curi/react</IJS> components that are
            navigation-aware. The implementation here isn't important, so you
            can just copy+paste the code. The only thing to know is that the{" "}
            <IJS>BOOKS()</IJS> function has a one second delay and the{" "}
            <IJS>BOOK()</IJS> function has a 2.5 second delay the first time a
            book is requested (and responds instantly on subsequent calls).
          </p>
        </Explanation>
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
  // artificial delay on first call
  setTimeout(() => {
    const book = books.find(b => b.id === id);
    BOOK_CACHE[id] = book;
    resolve(book);
  }, 2500);
});`}
        </CodeBlock>
      </SideBySide>
      <Subsection
        title={
          <span>
            <Cmp>Link</Cmp> is navigating?
          </span>
        }
        id="link-navigating"
      >
        <SideBySide>
          <Explanation>
            <p>
              The <Cmp>Link</Cmp> component can be called with a render-invoked{" "}
              <IJS>children()</IJS> function. If you do this, the function will
              be called with a <IJS>navigating</IJS> boolean that indicates
              whether the router is currently navigating to that link. This is
              useful for when you know that there is a long (multiple seconds)
              delay between when the user clicks the link and when the
              navigation will occur.
            </p>
            <p>
              We can update the <Cmp>Link</Cmp>s in the <Cmp>Home</Cmp>{" "}
              component to using render-invoked functions and display a loading
              spinner while we wait for the book data to load.
            </p>
          </Explanation>
          <CodeBlock lang="jsx">
            {`import { Link } from "@curi/react";
            
<Link to="Book" params={{ id: 1 }}>
  {navigating => (
    <React.Fragment>
      Book 1
      {navigating ? <Spinner /> : null}
    </React.Fragment>
  )}
</Link>`}
          </CodeBlock>
        </SideBySide>
        <SideBySide>
          <Explanation>
            <p>
              <a href="https://github.com/KyleAMathews/react-spinkit">
                <IJS>react-spinkit</IJS>
              </a>{" "}
              provides some pretty loading spinners, so we will use that.
            </p>
          </Explanation>
          <CodeBlock lang="bash">{`yarn add react-spinkit`}</CodeBlock>
        </SideBySide>
        <SideBySide>
          <Explanation>
            <p>
              In the <Cmp>Home</Cmp> component's module, we need to import the{" "}
              <Cmp>Spinner</Cmp> component. The <Cmp>Link</Cmp> needs to be
              swapped from a React element to a render-invoked function. We wrap
              the contents in a <Cmp>React.Fragment</Cmp> to avoid unnecessary
              DOM elements. In the function, we render a <Cmp>Spinner</Cmp> when
              the <Cmp>Link</Cmp> is navigating and <IJS>null</IJS> when it is
              not.
            </p>
            <Note>
              <IJS>react-spinkit</IJS> is highly customizable, but we are
              sticking with the defaults here. <IJS>react-spinkit</IJS> has a
              default one second render delay, which is why the spinner does not
              display immediately.
            </Note>
          </Explanation>
          <CodeBlock lang="jsx" data-line="4,12-17">
            {`// src/components/Home.js
import React from 'react';
import { Link } from '@curi/react';
import Spinner from "react-spinkit";

export default ({ response }) => (
  <div>
    <ul>
      {response.data.books.map(book => (
        <li key={book.id}>
          <Link to="Book" params={{ id: book.id }} >
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
);`}
          </CodeBlock>
        </SideBySide>
      </Subsection>
      <Subsection title="Data Prefetching" id="prefetching">
        <SideBySide>
          <Explanation>
            <p>
              Displaying a loading spinner while data loads provides a good
              visual indication that data is loading, but the user still has to
              wait.
            </p>
            <p>
              Curi has a{" "}
              <Link to="Package" params={{ package: "route-prefetch" }}>
                data prefetching route interaction
              </Link>{" "}
              that lets you call the async functions for a route before the user
              has navigated there. Combined with a cache, this allows you to
              prefetch data and "instantly" navigate when the user does navigate
              to a route.
            </p>
          </Explanation>
          <CodeBlock lang="bash">{`yarn add @curi/route-prefetch`}</CodeBlock>
        </SideBySide>
        <SideBySide>
          <Explanation>
            <p>
              The prefetch route interaction has to be added to the router when
              it is created, so we need to update the <IJS>index.js</IJS>{" "}
              module.
            </p>
            <p>
              A route is prefetched by calling{" "}
              <IJS>router.route.prefetch("Route Name")</IJS>. Params and other
              options can be passed through the function's second argument,
              which you can read more about in the{" "}
              <Link to="Package" params={{ package: "route-prefetch" }}>
                <IJS>@curi/route-prefetch</IJS> documentation
              </Link>.
            </p>
          </Explanation>
          <CodeBlock data-line="6,15-17">
            {`// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { curi } from '@curi/router';
import Browser from '@hickory/browser';
import prefetch from '@curi/route-prefetch';
import { CuriProvider } from '@curi/react';

import './index.css';
import routes from './routes';
import NavMenu from './components/NavMenu';
import registerServiceWorker from './registerServiceWorker';

const history = Browser();
const router = curi(history, routes, {
  route: [prefetch()]
});

router.respond(() => {
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
});

registerServiceWorker();`}
          </CodeBlock>
        </SideBySide>
        <SideBySide>
          <Explanation>
            <p>
              We are already handling book loads with spinners, so we will
              prefetch the list of books for the homepage.
            </p>
            <Note>
              Prefetching only works once the app has loaded, so prefetching
              data for the home page is only really necessary when the user
              initially navigates to a page that isn't the home page.
            </Note>
            <p>
              <IJS>@curi/react</IJS> provides a <Cmp>Prefetch</Cmp> component
              that will automatically prefetch data for a route when the DOM
              element it renders becomes visible in the page (using the
              <a href="https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver">
                <IJS>IntersectionObserver</IJS>API
              </a>). If we render a <Cmp>Link</Cmp> in a <Cmp>Prefetch</Cmp>, we
              can prefetch the data for a route when the link to it is visible.
            </p>
            <p>
              <Cmp>Prefetch</Cmp> works by passing a <IJS>ref</IJS> to its
              render-invoked <IJS>children()</IJS> function. You need to pass
              this to the DOM element that should trigger the loading. You
              should only attach this to host components (e.g. <Cmp>div</Cmp>,{" "}
              <Cmp>img</Cmp>, etc.) or components that forward the{" "}
              <IJS>ref</IJS> to a host component (<IJS>@curi/react</IJS>'s{" "}
              <Cmp>Link</Cmp> does that).
            </p>
          </Explanation>
          <CodeBlock lang="jsx">
            {`import { Prefetch, Link } from "@curi/react";
            
<Prefetch
  match={{ name: "Route Name", params: { id: 2} }}
>
  {ref => (
    <Link to="Route Name" params={{ id: 2 }} ref={ref}>
      Route 2
    </Link>
  )}
</Prefetch>`}
          </CodeBlock>
        </SideBySide>
        <SideBySide>
          <Explanation>
            <p>
              Before making the data prefetching change, you should load one of
              the book routes, refresh the page (so the home page data isn't
              cached), and click the link to the home page. As you will see,
              after clicking the link there is a one second delay before the
              home page is rendered.
            </p>
            <p>
              We link to the home page from the header menu component (<Cmp>
                NavMenu
              </Cmp>), so that is where we want to prefetch the data for the
              home page. To prefetch the home page data, we wrap the{" "}
              <Cmp>Link</Cmp> in a <Cmp>Prefetch</Cmp>, tell the{" "}
              <Cmp>Prefetch</Cmp> which route to prefetch data for, and pass its{" "}
              <IJS>ref</IJS> to the element whose visibility should trigger
              prefetching.
            </p>
            <p>
              Once you have made these changes to the code, you should try
              replicating the steps from above (navigate to a book page,
              refresh, and click the home page button). Now, instead of waiting
              for a second, the home page should load essentially instantly!
            </p>
          </Explanation>
          <CodeBlock lang="jsx" data-line="3,9-11">
            {`// src/components/NavMenu.js
import React from 'react';
import { Prefetch, Link } from '@curi/react';

export default () => (
  <nav>
    <ul>
      <li>
        <Prefetch match={{ name: "Home" }}>
          {ref => <Link to="Home" ref={ref}>Home</Link>}
        </Prefetch>
      </li>
      <li>
        <Link to="Checkout">Checkout</Link>
      </li>
    </ul>
  </nav>
);`}
          </CodeBlock>
        </SideBySide>
      </Subsection>
    </Section>
    <Section title="Async Caveats" id="caveats">
      <SideBySide>
        <Explanation>
          <p>
            Adding asynchronous loading to an application can help reduce
            initial load size and speed up user interactions, however it also
            has some issues that you will need to consider.
          </p>
          <p>
            The biggest consideration is that there is nothing the frontend can
            do to get the data for the initial render faster. Your application's
            frontend can only fetch data as it discovers it needs it. If you are
            performing server-side rendering, you may want to load the initial
            data on the server and inject it into the page's HTML output. The
            implementation details for this vary greatly and are more related to
            how you store data (e.g.{" "}
            <a href="https://redux.js.org/recipes/server-rendering#the-server-side">
              with redux
            </a>).
          </p>
          <p>
            Another consideration is whether or not you want to "hoist" data
            requirements. Curi's async functionality relies on you knowing all
            of the data requirements for a route, but you might prefer to keep
            the data associated with individual components. React Suspense will
            help with this (and Curi will support it once it releases), but this
            is still a ways out. At the very least, I would recommend using Curi
            for code splitting routes. Whether your should hoist other data
            requirements is something that should be determined on a
            case-by-case basis.
          </p>
        </Explanation>
      </SideBySide>
    </Section>
  </BaseTutorial>
);
