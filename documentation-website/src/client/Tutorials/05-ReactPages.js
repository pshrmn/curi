import React from "react";
import { Link } from "@curi/react";

import BaseTutorial from "./base/BaseTutorial";
import { TutorialBranch, CompleteBranch, Outline } from "./base/Branch";
import {
  InlineJS as IJS,
  InlineComponent as Cmp,
  PrismBlock
} from "../components/PrismBlocks";
import { Note } from "../components/Messages";
import { Section, Subsection } from "../components/Sections";
import CodeSandboxDemo from "../components/CodeSandboxDemo";

export default () => (
  <BaseTutorial>
    <h1>Part 5: React Pages</h1>
    <p>
      Now that we have our router ready to go, we can think about what our pages
      should look like. This tutorial will be rendering our website using React.
      If you prefer to use Vue, you should check out the{" "}
      <Link to="Tutorial" params={{ name: "05-pages-vue" }}>
        Part 5: Vue Pages
      </Link>{" "}
      tutorial.
    </p>
    <Outline>
      <ul>
        <li>Modifying our Babel configuration to support React.</li>
        <li>
          Installing the <IJS>@curi/react</IJS> package and learning about some
          of the components it provides (<Cmp>CuriBase</Cmp> and <Cmp>Link</Cmp>).
        </li>
        <li>
          Defining the <IJS>render</IJS> function that will render the contents
          of the website.
        </li>
        <li>Creating page components for each of the routes.</li>
        <li>
          Adding links so that users can navigate between locations in the
          website.
        </li>
      </ul>
    </Outline>
    <TutorialBranch name="05-pages-react" />
    <Section title="Babel" id="babel">
      <p>
        Before we dive in, let's make sure that our build scripts can handle
        React. To do this, we just need to install Babel's React preset and add
        it to our Babel configuration file.
      </p>
      <PrismBlock lang="bash">
        {`npm install --save-dev @babel/preset-react`}
      </PrismBlock>
      <PrismBlock lang="javascript" data-line="7-8">
        {`// .babelrc.js
module.exports = {
  presets: [
    ['@babel/env',{
      modules: false
    }],
    '@babel/react'
  ]
};`}
      </PrismBlock>
    </Section>
    <Section
      title={
        <span>
          The <IJS>@curi/react</IJS> Package
        </span>
      }
      id="package"
    >
      <p>
        The <IJS>@curi/react</IJS> package provides React components that know
        how to interact with Curi. For this tutorial, we will only be using two:{" "}
        <Cmp>CuriBase</Cmp> and <Cmp>Link</Cmp>. However, there are a number of
        other ones that you might find useful. You can read more about them in
        the{" "}
        <Link
          to="Package"
          params={{ package: "react" }}
          details={{ hash: "API" }}
        >
          <IJS>@curi/react</IJS> documentation
        </Link>.
      </p>
      <Subsection title="Installation" id="installation">
        <p>
          Let's start by installing the <IJS>@curi/react</IJS> package. If you
          haven't already, you should also install the <IJS>react</IJS> and{" "}
          <IJS>react-dom</IJS> packages.
        </p>
        <PrismBlock lang="bash">
          {`npm install @curi/react react react-dom`}
        </PrismBlock>
      </Subsection>
      <Subsection
        title={
          <span>
            The <Cmp>CuriBase</Cmp> Component
          </span>
        }
        id="CuriBase"
      >
        <PrismBlock lang="javascript">
          {`// src/index.js
import { CuriBase } from '@curi/react';`}
        </PrismBlock>
        <p>
          The <Cmp>CuriBase</Cmp> is responsible for rendering the website
          whenever the location changes. It can take four props:{" "}
          <IJS>response</IJS>, <IJS>navigation</IJS>,
          <IJS>router</IJS>, and <IJS>render</IJS>.
        </p>
        <ol>
          <li>
            <IJS>response</IJS> is a Curi response object.
          </li>
          <li>
            <IJS>navigation</IJS> is an object with data about the latest
            navigation.
          </li>
          <li>
            <IJS>router</IJS> is our Curi router.
          </li>
          <li>
            <IJS>render</IJS> is a function that will be called whenever a new
            response is emitted (and during the initial render) and returns the
            React element(s) that make up your website. It will receive three
            arguments: the new <IJS>response</IJS> object, the{" "}
            <IJS>navigation</IJS> and the Curi router object. The second two can
            be useful occasionally, but the <IJS>response</IJS> is what we
            really need for rendering.
          </li>
        </ol>
        <p>
          In order to set the <IJS>response</IJS> prop, we need to subscribe to
          our Curi router. That will allow us to always have the latest response
          object.
        </p>
        <PrismBlock lang="jsx" data-line="2-4, 9-18">
          {`// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { CuriBase } from '@curi/react';

// ...

router.respond((response, navigation) => {
  ReactDOM.render((
    <CuriBase
      router={router}
      response={response}
      navigation={navigation}
      render={({ response }) => {
        return null;
      }}
    />
  ), document.getElementById('root'));
});`}
        </PrismBlock>
        <p>
          The <Cmp>CuriBase</Cmp> also adds a <IJS>curi</IJS> object to React's
          context. This object has <IJS>router</IJS>, <IJS>response</IJS>, and{" "}
          <IJS>navigation</IJS> properties. A number of the other components
          exported by <IJS>@curi/react</IJS> rely on these variables to
          render/function.
        </p>
        <p>
          The above <IJS>render</IJS> function isn't very interesting because
          our application is rendering nothing (<IJS>null</IJS>). We'll come
          back to that in a minute, but first we should learn about the other
          React component that we'll be using.
        </p>
      </Subsection>

      <Subsection
        title={
          <span>
            The <Cmp>Link</Cmp> Component
          </span>
        }
        id="Link"
      >
        <PrismBlock lang="javascript">
          {`import { Link } from '@curi/react';`}
        </PrismBlock>
        <p>
          The <Cmp>Link</Cmp> component renders anchor (<Cmp>a</Cmp>) elements.
          However, unlike an anchor, we don't actually have to write the URI
          that we want to navigate to (the <IJS>href</IJS>). Instead, you use
          the <IJS>to</IJS> prop to pass the name of the route that you want to
          navigate to.
        </p>
        <PrismBlock lang="jsx">
          {`<Link to='Home'>Home</Link>
// <a href='/'>Home</a>`}
        </PrismBlock>
        <p>
          If the route that you are navigating to has any params, you pass them
          using the <IJS>params</IJS> prop.
        </p>
        <PrismBlock lang="jsx">
          {`{ name: 'Book', path: ':id' }
// (inherits 'books' path from parent route)
<Link to='Book' params={{ id: 1357 }}>
  Some Book
</Link>
// <a href='/books/1357'>Some Book</a>`}
        </PrismBlock>
        <p>
          If you need to pass any other location properties (<IJS>query</IJS>,{" "}
          <IJS>hash</IJS>, or <IJS>state</IJS>), you can provide them using the{" "}
          <IJS>details</IJS> prop.
        </p>
        <PrismBlock lang="jsx">
          {`<Link to='Contact' details={{ hash: 'email' }}>
  Contact by Email
</Link>
// <a href='/contact#email>Contact by Email</a>`}
        </PrismBlock>
        <Note>
          If you want to navigate outside of the application, use an anchor not
          a <Cmp>Link</Cmp>.
          <PrismBlock lang="jsx">
            {`// interal
<Link to='Contact'>Contact</Link>
// external
<a href="https://github.com">GitHub</a>`}
          </PrismBlock>
        </Note>
      </Subsection>
    </Section>

    <Section title="The render function" id="render-function">
      <p>
        Let's go back to that <IJS>render</IJS> function that we pass to the{" "}
        <Cmp>CuriBase</Cmp>. In the sample code above, we just returned{" "}
        <IJS>null</IJS>. Of course, for our website we want to return the actual
        elements that make up a page. How should we do this? Let's take a look
        at the properties of our response object.
      </p>
      <PrismBlock lang="jsx">
        {`function render({ response }) {
  console.log('response:', response);
  return null;
}
/*
response: {
 body: undefined,
 data: undefined,
 error: undefined,
 key: '1.0',
 location: { pathname: '/', ... },
 name: 'Home',
 params: {},
 partials: [],
 status: 200
}
*/`}
      </PrismBlock>
      <Note>
        The{" "}
        <Link
          to="Guide"
          params={{ slug: "responses" }}
          details={{ hash: "properties" }}
        >
          Rendering with Responses
        </Link>{" "}
        guide goes into more detail about each of the properties of a response
        object.
      </Note>

      <p>
        In{" "}
        <Link to="Tutorial" params={{ name: "02-routes" }}>
          Part 3
        </Link>{" "}
        of this tutorial, we added <IJS>match.response</IJS> functions that set
        the <IJS>body</IJS> property for each of our routes. There, we just used
        a placeholder string, but now we can actually set the component for each
        route. Instead of returning a string, what if <IJS>set.body</IJS> set
        the <IJS>body</IJS> to be a React component? Then, our render function
        can use the <IJS>body</IJS> property of our response object to render
        our website. We'll expand on that later on, but for now, let's go ahead
        and define the components for each of our routes.
      </p>
    </Section>
    <Section title="The Route Components" id="route-components">
      <p>
        To refresh your memory, we have "Home", "Contact", "Book List", "Book",
        "Checkout", and "Not Found" pages that we will need to create components
        for. We can write some barebones components and add some more content
        later on.
      </p>
      <p>
        Let's create a <IJS>components</IJS> directory inside of our{" "}
        <IJS>src</IJS> directory. Then, we can add files for each route in
        there.
      </p>
      <PrismBlock lang="bash">{`mkdir -p src/components`}</PrismBlock>
      <PrismBlock lang="jsx">
        {`// src/components/Home.js
import React from 'react';
const Home = () => (
  <div className='home'>
    Welcome to our book store!
  </div>
);
export default Home;`}
      </PrismBlock>
      <PrismBlock lang="jsx">
        {`// src/components/Contact.js
import React from 'react';
const Contact = () => (
  <div className='contact'>
    You can contact us by fax at 1-206-555-0123.
  </div>
);
export default Contact;`}
      </PrismBlock>
      <PrismBlock lang="jsx">
        {`// src/components/BookList.js
import React from 'react';
const BookList = () => (
  <div className='book-list'>
    Available Books
  </div>
);
export default BookList;`}
      </PrismBlock>
      <PrismBlock lang="jsx">
        {`// src/components/Book.js
import React from 'react';
const Book = () => (
  <div className='book'>
    Book
  </div>
);
export default Book;`}
      </PrismBlock>
      <PrismBlock lang="jsx">
        {`// src/components/Checkout.js
import React from 'react';
const Checkout = () => (
  <div className='checkout'>
    Checkout
  </div>
);
export default Checkout;`}
      </PrismBlock>
      <PrismBlock lang="jsx">
        {`// src/components/NotFound.js
import React from 'react';
const NotFound = () => (
  <div className='not-found'>
    Page not found
  </div>
);
export default NotFound;`}
      </PrismBlock>
      <p>
        All of these components should be imported in our <IJS>routes.js</IJS>.
        We can now update our <IJS>set.body()</IJS> calls to set the actual
        components as the <IJS>body</IJS> property of responses.
      </p>
      <PrismBlock lang="javascript" data-line="2-7,15,24,33,42,51,62">
        {`// src/routes.js
import Home from './components/Home';
import Contact from './components/Contact';
import BookList from './components/BookList';
import Book from './components/Book';
import Checkout from './components/Checkout';
import NotFound from './components/NotFound';

const routes = [
  {
    name: 'Home',
    path: '',
    match: {
      response: ({ set }) => {
        set.body(Home);
      }
    }
  },
  {
    name: 'Contact',
    path: 'contact',
    match: {
      response: ({ set }) => {
        set.body(Contact);
      }
    }
  },
  {
    name: 'Checkout',
    path: 'checkout',
    match: {
      response: ({ set }) => {
        set.body(Checkout);
      }
    }
  },
  {
    name: 'Book List',
    path: 'books',
    match: {
      response: ({ set }) => {
        set.body(BookList);
      }
    },
    children: [
      {
        name: 'Book',
        path: ':id',
        match: {
          response: ({ set }) => {
            set.body(Book);
          }
        }
      }
    ]
  },
  {
    name: 'Not Found',
    path: '(.*)',
    match: {
      response: ({ set }) => {
        set.body(NotFound);
      }
    }
  }
];

export default routes;`}
      </PrismBlock>
      <p>
        Our <IJS>render</IJS> function is now able to use{" "}
        <IJS>response.body</IJS>. This is also a good time to separate the
        render function from the component. This isn't absolutely necessary, but
        can help keep the code cleaner.
      </p>
      <PrismBlock lang="jsx">
        {`// src/render.js
export default function({ response }) {
  return <response.body />;
}`}
      </PrismBlock>
      <PrismBlock lang="jsx" data-line="2,11">
        {`// src/index.js
import renderFunction from './render';

let root = document.getElementById('root');
router.respond((response, navigation) => {
  ReactDOM.render((
    <CuriBase
      router={router}
      response={response}
      navigation={navigation}
      render={renderFunction}
    />
  ), root);
});`}
      </PrismBlock>
      <p>
        Now, if we load up our application, we will render our home page (the{" "}
        <IJS>Home</IJS> component). Unfortunately, there is no way to navigate
        to any of our other pages. In order to do this, we will need to add some{" "}
        <Cmp>Link</Cmp>s to our application.
      </p>
    </Section>

    <Section title="A Navigation Menu" id="nav-menu">
      <p>
        We can write a simple <Cmp>NavLinks</Cmp> menu component to add
        navigation to our application. From this menu, we only need to be able
        to navigate to our "Home", "Contact", "Book List", and "Checkout"
        routes. Navigation to individual books will be done from the book list
        page.
      </p>
      <p>
        We will use a <Cmp>nav</Cmp> element as the parent for our{" "}
        <Cmp>NavLinks</Cmp>. Inside of that is a <Cmp>ul</Cmp> and then each of
        our routes will be <Cmp>Link</Cmp>s wrapped in <Cmp>li</Cmp>s.
      </p>
      <PrismBlock lang="jsx">
        {`// src/components/NavLinks.js
import React from 'react';
import { Link } from '@curi/react';

const NavLinks = () => (
  <nav>
    <ul>
      <li>
        <Link to='Home'>Home</Link>
      </li>
      <li>
        <Link to='Contact'>Contact Us</Link>
      </li>
      <li>
        <Link to='Book List'>Books for Sale</Link>
      </li>
      <li>
        <Link to='Checkout'>Checkout</Link>
      </li>
    </ul>
  </nav>
);
export default NavLinks;`}
      </PrismBlock>
      <p>
        That is simple enough, but where should we render this? Our{" "}
        <Cmp>Link</Cmp> components rely on the context variables that are
        provided by the <Cmp>CuriBase</Cmp>. This means that our{" "}
        <Cmp>NavLinks</Cmp> needs to be a child of the <Cmp>CuriBase</Cmp>.
      </p>
      <p>
        The easiest way for us to do that would be to modify our{" "}
        <IJS>render</IJS> function. Instead of just returning the{" "}
        <IJS>response.body</IJS> component, we can return a <Cmp>div</Cmp> that
        wraps both <IJS>response.body</IJS> and our <Cmp>NavLinks</Cmp>{" "}
        component.
      </p>
      <PrismBlock lang="jsx">
        {`// src/render.js
import NavLinks from './components/NavLinks.js';

export default function({ response }) {
  const { body: Body } = response;
  return (
    <div>
      <header>
        <NavLinks />
      </header>
      <main>
        <Body />
      </main>
    </div>
  );
}`}
      </PrismBlock>
      <p>
        With the <Cmp>NavLink</Cmp>s, we can navigate between most of our
        routes. However, we still need to add navigation to our individual
        books.
      </p>
    </Section>
    <Section title="Navigating to Our Books" id="param-navigation">
      <p>
        Our "Book" route is different than all of our other routes because the
        book path includes an <IJS>id</IJS> param. This means that we need to
        actually have "id" values to pass to our <Cmp>Link</Cmp>s. Later on,
        we'll generate some better data, but for now we can just generate a
        placeholder list in a module called <IJS>books.js</IJS>.
      </p>
      <PrismBlock lang="jsx">
        {` // src/books.js
const books = [
  { id: 0 },
  { id: 1 },
  { id: 2 },
  { id: 3 }
];
export default books;`}
      </PrismBlock>
      <p>
        In the <Cmp>BookList</Cmp> component we can iterate over this list to
        generate links to our books.
      </p>
      <PrismBlock lang="jsx">
        {`// src/components/BookList.js
import { Link } from '@curi/react';

import books from '../books';

const BookList = () => (
  <div className='book-list'>
    <h1>Available Books</h1>
    <div className='books'>
      { books.map(b => (
        <div className='book-item' key={b.id}>
          <Link to='Book' params={{ id: b.id }}>
            Book {b.id}
          </Link>
        </div>
      )) }
    </div>
  </div>
);`}
      </PrismBlock>
    </Section>
    <Section title="Book Props" id="book-props">
      <p>
        The <Cmp>Link</Cmp>s above allow us to navigate to our books, but we
        don't actually have any information about which book we are supposed to
        be seeing. It would really help if our <Cmp>Book</Cmp> was able to
        access the parsed params so that it can render the information for the
        correct book.
      </p>
      <p>
        The <IJS>params</IJS> object is a property of our response object. That
        means that if we pass our response object as a prop to the{" "}
        <Cmp>Body</Cmp>, we can access these params in our route components.
      </p>
      <PrismBlock lang="jsx">
        {`// src/render.js
export default function({ response }) {
  const { body: Body } = response;
  return (
    <div>
      <header>
        <NavLinks />
      </header>
      <main>
        <Body response={response} />
      </main>
    </div>
  );
}`}
      </PrismBlock>
      <Note>
        There are a number of ways that you can decide to pass props to your
        route components. The one thing to keep in mind is that <em>all</em> of
        your route components will receive the same set of props. You can either
        be very specific and only pass the props that are necessary (e.g.{" "}
        <Cmp>Body params={`{params}`}</Cmp>) or you can just pass the entire
        response object (e.g. <Cmp>Body response={`{response}`}</Cmp>) so you
        don't have to worry about updating this every time one of your route
        components needs another prop from the response.
      </Note>
      <p>
        Next, we just need to update our <Cmp>Book</Cmp> component so that it
        can access its <IJS>params</IJS> prop and figure out which book to
        render content for.
      </p>
      <PrismBlock lang="jsx">
        {`// src/components/Book.js
const Book = ({ response }) => (
  <div className='book'>
    Book {response.params.id}
  </div>
);`}
      </PrismBlock>
    </Section>
    <Section title="Review" id="review">
      <p>
        After completing this tutorial, we now have a semi-functional website
        that renders basic content for each of our pages.
      </p>
      <CompleteBranch name="06-loading-data-react" />
      <CodeSandboxDemo id="github/pshrmn/curi-tutorial/tree/06-loading-data-react" />
    </Section>
    <Section title="Next" id="next">
      <p>
        At this point, we have a website with a number of pages. It isn't
        particularly useful yet, but at least we can navigate between pages.
        Next we will take a step back from React and learn how to implement data
        loading with{" "}
        <Link to="Tutorial" params={{ name: "06-loading-data" }}>
          Part 6: Loading Data
        </Link>.
      </p>
    </Section>
  </BaseTutorial>
);
