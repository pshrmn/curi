import React from 'react';
import { Link } from '@curi/react';

import BaseTutorial from './base/BaseTutorial';
import { InlineJS as IJS, PrismBlock } from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Section, Subsection } from '../components/Sections';

export default () => (
  <BaseTutorial>
    <h1>Part 7: The Load Function</h1>
    <p>
      In the previous tutorial, we wrote a quick <IJS>books.js</IJS> file to
      have some data to load, but it wasn't very realistic. We just imported
      an array, whereas in a "real" website, we would most likely make a
      request to our server which would return our data (possibly after
      running a database query).
    </p>
    <div>
      <p>
        In this tutorial, we will be doing the following:
      </p>
      <ul>
        <li>
          Writing a fake API to simulate data requests.
        </li>
        <li>
          Adding <IJS>load</IJS> functions to our "Book List" and "Book"
          routes.
        </li>
      </ul>
    </div>
    <Section
      title='Fake API'
      id='api'
    >
      <p>
        There are a number of ways that we might make a request to the server,
        but in this tutorial   we will simulate using the{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">Fetch API</a>.
        {' '}The <IJS>fetch</IJS> function makes a request to the server and returns
        a Promise that will resolve with the server's response.
      </p>
      <p>
        Let's create an <IJS>api</IJS> directory and start writing our fake fetch functions.
      </p>
      <PrismBlock lang='bash'>
        {
`mkdir -p src/api
touch src/api/books.js`
        }
      </PrismBlock>
      <p>
        We'll need to write two functions. The first will fetch all of our
        books and the second will fetch a specific book given an <IJS>id</IJS>.
        Since we are emulating how <IJS>fetch</IJS> works, both of our
        functions should return a Promise.
      </p>
      <PrismBlock lang='javascript'>
        {
`// api/books.js
export function fetchAllBooks() {
  return new Promise((resolve, reject) => {

  });
}

export function fetchBook(id) {
  return new Promise((resolve, reject) => {
  
  });
}`
        }
      </PrismBlock>
      <p>
        We need some actual data for our fetch functions to return, so let's
        write an array of book objects. You can make up your own data or just
        copy the list from below.
      </p>
      <PrismBlock lang='javascript'>
        {
`// api/books.js
const books = [
  {
    id: 0,
    title: 'Harry Potter and the Deathly Hollows',
    author: 'J.K. Rowling',
    published: '2007',
    pages: 759
  },
  {
    id: 1,
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    published: '2007',
    pages: 662
  },
  {
    id: 2,
    title: "The Wise Man\'s Fear",
    author: 'Patrick Rothfuss',
    published: '2011',
    pages: 994
  },
  {
    id: 3,
    title: 'The Way of Kings',
    author: 'Brandon Sanderson',
    published: '2010',
    pages: 1007
  },
  {
    id: 4,
    title: 'A Storm of Swords',
    author: 'George R.R. Martin',
    published: '2003',
    pages: 1177
  },
  {
    id: 5,
    title: 'Clockwork Princess',
    author: 'Cassandra Clare',
    published: '2013',
    pages: 567
  },
  {
    id: 6,
    title: 'Words of Radiance',
    author: 'Brandon Sanderson',
    published: '2014',
    pages: 1087
  },
  {
    id: 7,
    title: 'Collected Fictions',
    author: 'Jorge Luis Borges',
    published: '1999',
    pages: 565
  },
  {
    id: 8,
    title: 'Heir of Fire',
    author: 'Sarah J. Maas',
    published: '2014',
    pages: 565
  },
  {
    id: 9,
    title: 'The House of Hades',
    author: 'Rick Riordan',
    published: '2013',
    pages: 597
  }
];`
        }
      </PrismBlock>
      <p>
        With this data, we can now finish our data fetching functions.
        Our <IJS>fetchAllBooks</IJS> function should just resolve with
        the books array. <IJS>fetchBook</IJS> should search the books
        array for the book with the requested id. If it finds a matching
        book object, the function should resolve with that book object.
        If the requested book is not found, it should reject with an
        error message.
      </p>
      <PrismBlock lang='javascript'>
        {
`// api/books.js
const books = [...];

export function fetchAllBooks() {
  return new Promise((resolve, reject) => {
    resolve(books);
  });
}

export function fetchBook(id) {
  return new Promise((resolve, reject) => {
    const book = books.find(book => book.id === id);
    if (book) {
      resolve(book);
    } else {
      reject(\`Could not find the requested book: \${id}\`);
    }
  });
}`
        }
      </PrismBlock>
    </Section>

    <Section
      title='route.load'
      id='load'
    >
      <p>
        Do you remember before when we said that Curi is an{' '}
        <strong>asynchronous</strong> router? Now is the time that we
        will see why.
      </p>
      <p>
        Each route can have a <IJS>load</IJS> property. This is a function
        that can perform data loading related to a route prior to emitting
        a response. In fact, we can use the <IJS>load</IJS> function
        to modify the response.
      </p>
      <PrismBlock lang='javascript'>
        {
`{
  name: 'Book List',
  path: 'books',
  load: function() {
    // ...
  }
}`
        }
      </PrismBlock>
      <Subsection
        title='Load Arguments'
        id='load-arguments'
        type='aside'
      >
        <p>
          In order to load data/modify the response, <IJS>load</IJS> functions
          need to receive a few arguments.
        </p>
        <PrismBlock lang='javascript'>
          {
  `{
    name: 'Book',
    load: (route, mods, addons) {
      const { params, location, name } = route;
      const { setData, redirect, fail, setStatus } = mods;
      const { pathname, ...rest } = addons;   
    }
  }`
          }
        </PrismBlock>
        <p>
          The first argument that will be passed to your load function is an object
          whose properties are related to the matched route. The are <IJS>params</IJS>,
          which is the object of path params parsed from the location's pathname,{' '}
          <IJS>location</IJS>, which is the location object used to match the route,
          and <IJS>name</IJS>, which is the name of the matched route.
        </p>
        <p>
          The second argument that will be passed to your load function is an object
          whose properties are functions that you can use to modify the response object.
          These functions are <IJS>setData</IJS>, <IJS>redirect</IJS>, <IJS>setStatus</IJS>,
          and <IJS>fail</IJS>. The{' '}
          <Link
            to='Guide'
            params={{ slug: 'routes' }}
            details={{ hash: 'load' }}
          >All About Routes</Link> guide goes into detail about all four of those. For
          this tutorial, we will only be using <IJS>setData</IJS>.
        </p>
        <p>
          The third, and final, argument that will be passed to your load function is
          an object containing all of the Curi addons that are registered with your
          Curi configuration object. This includes the <IJS>pathname</IJS> addon, which
          you may find useful for generating pathnames in your <IJS>load</IJS> (particularly
          if you plan to use the <IJS>redirect</IJS> function).
        </p>
      </Subsection>
      <Subsection
        title='Load Return Value'
        id='load-return'
        type='aside'
      >
        <p>
          <IJS>load</IJS> functions are expected to return a Promise. Curi uses{' '}
          <IJS>Promise.all</IJS> to wait for your <IJS>load</IJS> function to resolve
          before it emits a response. Technically speaking, your <IJS>load</IJS> function
          does not have to return a Promise, but it is recommended.
        </p>
        <PrismBlock lang='javascript'>
          {
`{
  load: (route, mods, addons) {
    return fetch(\`/api/book/\${route.params.id}\`)
      .then(resp => {...});
  }
}`
          }
        </PrismBlock>
      </Subsection>

      <p>
        We have two routes to add load functions to: "Book List" and "Book". Let's
        start by having each one call their respective API functions that we
        defined above.
      </p>
      <PrismBlock lang='javascript'>
        {
`// routes.js
import { fetchAllBooks, fetchBook } from './api/books';
const routes = [
  // ...,
  {
    name: 'Book List',
    path: 'books',
    body: () => BookList,
    load: (route, response, addons) => {
      return fetchAllBooks();
    },
    children: [
      {
        name: 'Book',
        path: ':id',
        body: () => Book,
        params: { id: n => parseInt(n, 10) },
        load: (route, response, addons) => {
          return fetchBook(route.params.id);
        }
      }
    ]
  },
  // ...
];`
        }
      </PrismBlock>
      <Note>
        In the above "Book" route, we introduce <IJS>route.params</IJS>. This
        is an object whose keys are path param names and whose value is a
        function that will parse the param string. For example, the above function
        takes the input string and returns that string parsed as an integer.
      </Note>
      <p>
        If the only thing that our <IJS>load</IJS> functions do is
        return a Promise, they aren't particularly useful. Instead, we
        need to use the results of our fetch functions to call the{' '}
        <IJS>setData</IJS> function that is provided by the second argument
        to our load function. <IJS>setData</IJS> takes an object and will add
        that object to the response object as its <IJS>data</IJS> property. Let's
        add <IJS>then</IJS> functions to our fetches to do this.
      </p>
      <PrismBlock lang='javascript'>
        {
`// routes.js
import { fetchAllBooks, fetchBook } from './api/books';
const routes = [
  // ...,
  {
    name: 'Book List',
    path: 'books',
    body: () => BookList,
    load: (route, response, addons) => {
      return fetchAllBooks()
        .then(books => {
          response.setData({ books });
        });
    },
    children: [
      {
        name: 'Book',
        path: ':id',
        body: () => Book,
        params: { id: n => parseInt(n, 10) },
        load: (route, response, addons) => {
          return fetchBook(route.params.id)
            .then(
              book => {
                response.setData({ book });
              },
              err => {
                console.error(err);
              }
            );
        }
      }
    ]
  },
  // ...
];`
        }
      </PrismBlock>
      <Note>
        You are responsible for catching any errors within your{' '}
        <IJS>load</IJS> function. If you do not, they can be swallowed
        and cause unexpected errors in your website.
      </Note>
      <p>
        Now, when a user visits <IJS>/books</IJS>, the response generated
        by Curi will look like this:
      </p>
      <PrismBlock lang='javascript'>
        {
`{
  name: 'Book List',
  data: {
    books: [...]
  },
  ...
}`
        }
      </PrismBlock>
      <p>
        Likewise, visiting <IJS>/books/0</IJS> will generate a response whose{' '}
        <IJS>data</IJS> property is a book object.
      </p>
      <PrismBlock lang='javascript'>
        {
`{
  name: 'Book',
  params: { id: 0 }
  data: {
    book: { title: '...', ... }
  },
  ...
}`
        }
      </PrismBlock>
    </Section>

    <Section
      title='Next'
      id='next'
    >
      <p>
        Now that we are loading data for our routes, we should modify our
        "Book List" and "Book" pages to render using this data. Once again, we
        will break this down for React and Vue users.
      </p>
      <p>
        If you are using React, continue with{' '}
        <Link to='Tutorial' params={{ name: '08-render-data-react' }}>Part 8: Rendering
        Data (React)</Link>.
      </p>
      <p>
        If you are using Vue, continue with{' '}
        <Link to='Tutorial' params={{ name: '08-render-data-vue' }}>Part 8: Rendering
        Data (Vue)</Link>.
      </p>
    </Section>
  </BaseTutorial>
);
