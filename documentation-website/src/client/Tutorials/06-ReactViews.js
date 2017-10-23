import React from 'react';
import { Link } from '@curi/react';

import BaseTutorial from './base/BaseTutorial';
import {
  InlineJS as IJS,
  InlineComponent as Cmp,
  PrismBlock
} from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Section, Subsection } from '../components/Sections';

export default () => (
  <BaseTutorial>
    <h1>Part 6: React Views</h1>
    <p>
      Now that we have our routes setup, our history object created, and our configuration object
      ready to go, we can think about what our pages should look like. This tutorial will be
      rendering our website using React. If you prefer to use Vue, you should check out the{' '}
      <Link to='Tutorial' params={{ name: '06-views-vue' }}>Part 6: Vue Views</Link> tutorial.
    </p>

    <Section
      title={<span>The <IJS>@curi/react</IJS> Package</span>}
      id='package'
    >
      <p>
        The <IJS>@curi/react</IJS> package provides React components that know how to interact
        with Curi. For this tutorial, we will only be using two: <Cmp>Navigator</Cmp> and{' '}
        <Cmp>Link</Cmp>. However, there are a number of other ones that you might find useful.
        You can read more about them in the{' '}
        <Link
          to='Package'
          params={{ package: 'react' }}
          details={{ hash: 'API' }}
        >
          <IJS>@curi/react</IJS> documentation
        </Link>.
      </p>
      <Subsection
        title='Installation'
        id='installation'
      >
        <p>
          Let's start by installing the <IJS>@curi/react</IJS> package. If you haven't
          already, you should also install the <IJS>react</IJS> and{' '}
          <IJS>react-dom</IJS> packages.
        </p>
        <PrismBlock lang='bash'>
          {
`npm install @curi/react react react-dom`
          }
        </PrismBlock>
      </Subsection>
      <Subsection
        title={<span>The <Cmp>Navigator</Cmp> Component</span>}
        id='Navigator'
      >
        <PrismBlock lang='javascript'>
          {
`import { Navigator } from '@curi/react';`
          }
        </PrismBlock>
        <p>
          The <Cmp>Navigator</Cmp> is responsible for re-rendering the website whenever the
          location changes. It has two props that we have to pass it: <IJS>config</IJS>
          {' '}and <IJS>render</IJS>.
        </p>
        <ol>
          <li>
            <IJS>config</IJS> is our Curi configuration object.
          </li>
          <li>
            <IJS>render</IJS> is a function that will be called whenever a new response is
            emitted (and during the initial render). It will receive three arguments: the
            new <IJS>response</IJS> object, the last navigation's <IJS>action</IJS> and
            the Curi config object. The second two can be useful occasionally, but
            the <IJS>response</IJS> is what we really need for rendering. It should return
            the React element(s) that make up your website.
          </li>
        </ol>
        <PrismBlock lang='jsx'>
          {
`// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Navigator } from '@curi/react';

// ...

config.ready().then(() => {
  ReactDOM.render((
    <Navigator config={config} render={(response, action, config) => {
      return null;
    }} />
  ), document.getElementById('root'));
});`
          }
        </PrismBlock>
        <p>
          The <Cmp>Navigator</Cmp> also places some variables on React's context.
          These are <IJS>curi</IJS>, which is the configuration object, and{' '}
          <IJS>curiResponse</IJS>, which is the current response object. Some of the
          other <IJS>@curi/react</IJS> components will use these context variables
          to affect what they render.
        </p>
        <p>
          The above code isn't very interesting because our application is rendering
          nothing (<IJS>null</IJS>). We'll come back to that in a minute, but first we
          should learn the second React component that we'll be using.
        </p>
      </Subsection>

      <Subsection
        title={<span>The <Cmp>Link</Cmp> Component</span>}
        id='Link'
      >
        <PrismBlock lang='javascript'>
          {
`import { Link } from '@curi/react';`
          }
        </PrismBlock>
        <p>
          The <Cmp>Link</Cmp> component renders anchor (<Cmp>a</Cmp>) elements. However,
          unlike an anchor, we don't actually have to write the URI that we want to navigate
          to. Instead, you use the <IJS>to</IJS> prop to pass the name of the route that
          you want to navigate to.
        </p>
        <PrismBlock lang='jsx'>
          {
`<Link to='Home'>Home</Link>
// <a href='/'>Home</a>`
          }
        </PrismBlock>
        <p>
          If the route that you are navigating to has any params, you pass them using
          the <IJS>params</IJS> prop.
        </p>
        <PrismBlock lang='jsx'>
          {
`// { name: 'Book', path: ':id' }
// (inherits 'books' path from parent route)
<Link to='Book' params={{ id: 1357 }}>
  Some Book
</Link>
// <a href='/books/1357'>Some Book</a>`
          }
        </PrismBlock>
        <p>
          If you need to pass any other location properties (<IJS>query</IJS> or <IJS>hash</IJS>),
          you can provide them using the <IJS>details</IJS> prop.
        </p>
        <PrismBlock lang='jsx'>
          {
`<Link to='Contact' details={{ hash: 'email' }}>
  Contact by Email
</Link>
// <a href='/contact#email>Contact by Email</a>`
          }
        </PrismBlock>
        <Note>
          If you want to navigate outside of the application, use an anchor not a <Cmp>Link</Cmp>.
        </Note>
      </Subsection>
    </Section>

    <Section
      title='The render function'
      id='render-function'
    >
      <p>
        Let's go back to that <IJS>render</IJS> function that we pass to the <Cmp>Navigator</Cmp>. In
        the sample code above, we just returned <IJS>null</IJS>. Of course, for our website we want to
        return the actual elements that make up a page on our website. How do we do this? Let's take a
        look at the properties of our response object.
      </p>
      <PrismBlock lang='jsx'>
        {
`ReactDOM.render((
  <Navigator config={config} render={(response, action, config) => {
    console.log('response:', response);
    return null;
  }} />
), document.getElementById('root'));
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
*/`
        }
      </PrismBlock>
      <Note>
        The <Link to='Guide' params={{ slug: 'responses' }} details={{ hash: 'properties' }}>
        Rendering with Responses</Link> guide goes into more detail about each of the properties
        of a response object.
      </Note>

      <p>
        Your first thought about how to use a response to render might be to use <IJS>response.name</IJS>.
        {' '}You could setup a <IJS>switch</IJS> to render different content based on the name. However,
        that would grow increasingly complex as you add more routes to your application.
      </p>
      <p>
        Instead, we are going to use one of the <IJS>undefined</IJS> properties of the above response:{' '}
        <IJS>body</IJS>. What is this property? The <IJS>body</IJS> property of a response is set by
        calling the <IJS>body</IJS> function property of a matched route.
      </p>
      <PrismBlock lang='jsx'>
        {
`const routes = [
  {
    name: 'Home',
    path: '',
    body: () => 'You are here!'
  }
];
// when the user visits the location{ pathname: '/' }, the
// response will look like this:
{
  name: 'Home',
  status: 200,
  body: 'You are here!',
  ...
}`
        }
      </PrismBlock>
      <p>
        Now, instead of returning a string, what if our <IJS>route.body</IJS> properties
        were functions that returned React components? Then, our render function can
        use <IJS>response.body</IJS> to render our website.
      </p>
      <PrismBlock lang='jsx'>
        {
`ReactDOM.render((
  <Navigator config={config} render={(response, action, config) => {
    const { body: Body } = response;
    return <Body />;
  }} />
), document.getElementById('root'));`
        }
      </PrismBlock>
      <p>
        We'll expand on that later on, but for now, let's go ahead and define the components
        for each of our routes.
      </p>
    </Section>
    <Section
      title='The Route Components'
      id='route-components'
    >
      <p>
        To refresh your memory, we have "Home", "Contact", "Book List", "Book", "Checkout", and
        "Not Found" pages that we will need to create components for. We can write some barebones
        components and add some more content later on.
      </p>
      <p>
        Let's create a <IJS>components</IJS> directory inside of our <IJS>src</IJS>
        {' '}directory. Then, we can add files for each route in there.
      </p>
      <PrismBlock lang='bash'>
        {
`mkdir -p src/components`
        }
      </PrismBlock>
      <PrismBlock lang='jsx'>
        {
`// components/Home.js
import React from 'react';
const Home = () => (
  <div className='home'>
    Home Page
  </div>
);
export default Home;`
        }
      </PrismBlock>
      <PrismBlock lang='jsx'>
        {
`// components/Contact.js
import React from 'react';
const Contact = () => (
  <div className='contact'>
    Contact
  </div>
);
export default Contact;`
        }
      </PrismBlock>
      <PrismBlock lang='jsx'>
        {
`// components/BookList.js
import React from 'react';
const BookList = () => (
  <div className='book-list'>Available Books</div>
);
export default BookList;`
        }
      </PrismBlock>
      <PrismBlock lang='jsx'>
        {
`// components/Book.js
import React from 'react';
const Book = () => (
  <div className='book'>
    Book
  </div>
);
export default Book;`
        }
      </PrismBlock>
      <PrismBlock lang='jsx'>
        {
`// components/Checkout.js
import React from 'react';
const Checkout = () => (
  <div className='checkout'>
    Checkout
  </div>
);
export default Checkout;`
        }
      </PrismBlock>
      <PrismBlock lang='jsx'>
        {
`// components/NotFound.js
import React from 'react';
const NotFound = () => (
  <div className='not-found'>
    Page not found
  </div>
);
export default NotFound;`
        }
      </PrismBlock>
      <p>
        All of these components should be imported in our <IJS>routes.js</IJS> and
        set as the return value of their respective route's <IJS>body</IJS> function.
      </p>
      <PrismBlock lang='javascript'>
        {
`// routes.js
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
    body: () => Home
  },
  {
    name: 'Contact',
    path: 'contact',
    body: () => Contact
  },
  {
    name: 'Checkout',
    path: 'checkout',
    body: () => Checkout
  },
  {
    name: 'Book List',
    path: 'books',
    body: () => BookList,
    children: [
      {
        name: 'Book',
        path: ':id',
        body: () => Book
      }
    ]
  },
  {
    name: 'Not Found',
    path: '(.*)',
    body: () => NotFound
  }
];`
        }
      </PrismBlock>
      <p>
        Now, if we load up our application, we will render our home page. Unfortunately,
        there is no way to navigate to any of our other pages. We will need to add some{' '}
        <Cmp>Link</Cmp>s to our application.
      </p>
    </Section>

    <Section
      title='A Navigation Menu'
      id='nav-menu'
    >
      <p>
        We can write a simple <Cmp>Nav</Cmp> menu component to add navigation to our application.
        From this menu, we only need to be able to navigate to our "Home", "Contact", "Book List",
        and "Checkout" routes. Navigation to individual books will be done from the book list
        page.
      </p>
      <p>
        We will use a <Cmp>nav</Cmp> element as the parent for our <Cmp>Nav</Cmp> (note the lowercase/uppercase
        difference). Inside of that is a <Cmp>ul</Cmp> and then each of our routes will be <Cmp>Link</Cmp>s
        wrapped in <Cmp>li</Cmp>s.
      </p>
      <PrismBlock lang='jsx'>
        {
`// components/Nav.js
import React from 'react';
const Nav = () => (
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
export default Nav;`
        }
      </PrismBlock>
      <p>
        That is simple enough, but where should we render this? Our <Cmp>Link</Cmp> components
        rely on the context variables that are provided by the <Cmp>Navigator</Cmp>. This means that
        our <Cmp>Nav</Cmp> needs to be a child of the <Cmp>Navigator</Cmp>.
      </p>
      <p>
        The easiest way for us to do that would be to modify our render function. Instead of just
        returning the <IJS>response.body</IJS> component, we can return a <Cmp>div</Cmp> that wraps
        both <IJS>response.body</IJS> and our <Cmp>Nav</Cmp> component.
      </p>
      <PrismBlock lang='jsx'>
        {
`// index.js
ReactDOM.render((
  <Navigator config={config} render={(response, action, config) => {
    const { body: Body } = response;
    return (
      <div>
        <header>
          <Nav />
        </header>
        <main>
          <Body />
        </main>
      </div>
    );
  }} />
), document.getElementById('root'));`
        }
      </PrismBlock>
      <p>
        At this point, we can navigate between most of our routes. However, we still
        need to add navigation to our books.
      </p>
    </Section>
    <Section
      title='Navigating to Our Books'
      id='param-navigation'
    >
      <p>
        Our "Book" route is different than all of our other routes because the book path
        includes an <IJS>id</IJS> param. This means that we need to actually have "id"
        values to pass to our <Cmp>Link</Cmp>s. Later on, we'll generate some better data,
        but for now we can just generate a placeholder list in a module called <IJS>books.js</IJS>.
      </p>
      <PrismBlock lang='jsx'>
        {
` // books.js
const books = [
  { id: 0 },
  { id: 1 },
  { id: 2 },
  { id: 3 }
];
export default books;`
          }
        </PrismBlock>
        <p>
          Then, in <Cmp>BookList</Cmp> we can iterate over this list to generate links to our books.
        </p>
        <PrismBlock lang='jsx'>
        {
`// components/BookList.js
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
);`
        }
      </PrismBlock>
    </Section>
    <Section
      title='Book Props'
      id='book-props'
    >
      <p>
        The <Cmp>Link</Cmp>s above allow us to navigate to our books, but we don't actually have
        any information about which book we are supposed to be seeing. It would really help if
        our <Cmp>Book</Cmp> was able to access the parsed params so that it can render the
        information for the correct book.
      </p>
      <p>
        The <IJS>params</IJS> object is a property of our response object. That means that if
        we pass our response object as a prop to the <Cmp>Body</Cmp>, we can access these params
        in our route components.
      </p>
      <PrismBlock lang='jsx'>
        {
`// index.js
ReactDOM.render((
  <Navigator config={config} render={(response, action, config) => {
    const { body: Body } = response;
    return (
      <div>
        <header>
          <Nav />
        </header>
        <main>
          <Body response={response} />
        </main>
      </div>
    );
  }} />
), document.getElementById('root'));`
        }
      </PrismBlock>
      <Note>
        There are a number of ways that you can decide to pass props to your route components. The
        one thing to keep in mind is that <em>all</em> of your route components will receive
        the same set of props. You can either be very specific and only pass the props that
        are necessary (e.g. <Cmp>Body params={`{params}`}</Cmp>) or you can just pass the entire
        response object (e.g. <Cmp>Body response={`{response}`}</Cmp>) so you don't have to worry
        about updating this every time one of your route components needs another prop from the
        response.
      </Note>
      <p>
        Next, we just need to update our <Cmp>Book</Cmp> component so that it can access its{' '}
        <IJS>params</IJS> prop and figure out which book to render content for.
      </p>
      <PrismBlock lang='jsx'>
        {
`// components/Book.js
const Book = ({ response }) => (
  <div className='book'>
    Book {response.params.id}
  </div>
);`
        }
      </PrismBlock>
    </Section>
    <Section
      title='Next'
      id='next'
    >
      <p>
        At this point, we have a website with a number of pages. It isn't particularly useful yet,
        but at least we can navigate between pages. Next we will take a step back from React and
        look at how we can implement data loading with{' '}
        <Link to='Tutorial' params={{ name: '07-load' }}>Part 7: The Load Function</Link>.
      </p>
    </Section>
  </BaseTutorial>
);
