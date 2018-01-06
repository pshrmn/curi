import React from 'react';
import { Link } from '@curi/react';

import BaseTutorial from './base/BaseTutorial';
import { TutorialBranches, CompleteBranch, Outline } from './base/Branch';
import { InlineJS as IJS, PrismBlock } from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Section, Subsection } from '../components/Sections';

export default () => (
  <BaseTutorial>
    <h1>Part 6: Loading Data</h1>
    <p>
      In the previous tutorial, we wrote mocked book data in <IJS>books.js</IJS>{' '}
      to have some data to load, but it was just filler. We imported the data as
      an array, whereas in a "real" website, we would most likely make a request
      to our server which would return our data.
    </p>
    <Outline>
      <ul>
        <li>Writing a fake API to simulate data requests.</li>
        <li>
          Adding <IJS>match.every</IJS> functions to our "Book List" and "Book"
          routes and updating their <IJS>match.response</IJS> functions.
        </li>
      </ul>
    </Outline>
    <TutorialBranches
      names={['06-loading-data-react', '06-loading-data-vue']}
    />
    <Section title="Fake API" id="api">
      <p>
        There are a number of ways that we might make a request to the server,
        but in this tutorial we will simulate using the{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">
          Fetch API
        </a>. The <IJS>fetch</IJS> function makes a request to the server and
        returns a Promise that will resolve with the server's response.
      </p>
      <p>
        Let's create an <IJS>api</IJS> directory and start writing our fake
        fetch functions.
      </p>
      <PrismBlock lang="bash">
        {`mkdir -p src/api
touch src/api/books.js`}
      </PrismBlock>
      <p>
        We'll need to write two functions. The first will fetch all of our books
        and the second will fetch a specific book given an <IJS>id</IJS>. Since
        we are emulating how <IJS>fetch</IJS> works, both of our functions
        should return a Promise.
      </p>
      <PrismBlock lang="javascript">
        {`// api/books.js
export function fetchAllBooks() {
  return new Promise((resolve, reject) => {

  });
}

export function fetchBook(id) {
  return new Promise((resolve, reject) => {
  
  });
}`}
      </PrismBlock>
      <p>
        We need some actual data for our fetch functions to return, so let's
        write an array of book objects. You can make up your own data or just
        copy the list from below.
      </p>
      <PrismBlock lang="javascript">
        {`// api/books.js
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
];`}
      </PrismBlock>
      <p>
        With this data, we can now finish our data fetching functions. Our{' '}
        <IJS>fetchAllBooks</IJS> function should just resolve with the books
        array. <IJS>fetchBook</IJS> should search the books array for the book
        with the requested id. If it finds a matching book object, the function
        should resolve with that book object. If the requested book is not
        found, it should reject with an error message.
      </p>
      <PrismBlock lang="javascript">
        {`// api/books.js
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
}`}
      </PrismBlock>
    </Section>

    <Section title="match" id="match">
      <p>
        Do you remember before when we said that Curi is an asynchronous router?
        Now is the time that we finally will see why. We have already added{' '}
        <IJS>match</IJS> properties to each of our route objects, but{' '}
        <IJS>match.response</IJS> is a synchronous function.{' '}
        <IJS>match.every</IJS>, on the other hand, is an asynchronous function.
      </p>
      <Subsection title="every" id="every">
        <p>
          <IJS>match.every</IJS> is a function that can perform data loading
          related to a route prior to emitting a response. The function will be
          passed route related props (the <IJS>params</IJS> object, the{' '}
          <IJS>location</IJS>, and the <IJS>name</IJS> of the matched route),
          which it can use to formulate any API calls. Each time that a route
          matches, its <IJS>match.every</IJS> function will be called.
        </p>

        <p>
          <IJS>match.every</IJS> functions are expected to return a Promise.
          Curi uses <IJS>Promise.all</IJS> to wait for your{' '}
          <IJS>match.every</IJS> and{' '}
          <Link
            to="Guide"
            params={{ slug: 'routes' }}
            details={{ hash: 'initial' }}
          >
            <IJS>match.initial</IJS> functions
          </Link>{' '}
          to resolve before it emits a response. Technically speaking, these
          functions don't have to return a Promise, but it is recommended.
        </p>
        <p>
          We have two routes that we need to load data in: "Book List" and
          "Book". Let's start by adding <IJS>match.every</IJS> functions to each
          one, calling their respective API functions that we defined above.
        </p>
        <PrismBlock lang="javascript">
          {`// routes.js
import { fetchAllBooks, fetchBook } from './api/books';
const routes = [
  // ...,
  {
    name: 'Book List',
    path: 'books',
    match: {
      every: () => fetchAllBooks(),
      response: ({ set }) => {
        set.body(BookList);
      }
    },
    children: [
      {
        name: 'Book',
        path: ':id',
        params: { id: n => parseInt(n, 10) },
        match: {
          every: ({ params }) => fetchBook(params.id),
          response: ({ set }) => {
            set.body(Book);
          }
        }
      }
    ]
  }
  // ...
];`}
        </PrismBlock>
        <Note>
          In the above "Book" route, we introduce the <IJS>route.params</IJS>{' '}
          property. This is an object whose keys are path param names and whose
          values are functions that will parse the param string to return a new
          value. For example, the above function takes the input string and
          returns that string parsed as an integer.
        </Note>
      </Subsection>
      <Subsection title="response" id="response">
        <p>
          While we have already used <IJS>match.response</IJS>, we have only
          used the <IJS>set.body</IJS> function so far. If you need to review
          them, you can view all of the properties passed to the{' '}
          <IJS>response</IJS> function in the{' '}
          <Link
            to="Guide"
            params={{ slug: 'routes' }}
            details={{ hash: 'response' }}
          >
            All About Routes
          </Link>{' '}
          guide. We want to attach our loaded data to the response, so we will
          use <IJS>resolved.every</IJS> to access the data from our{' '}
          <IJS>every</IJS> function and <IJS>set.data</IJS> to attach the data
          to the response object. It is also possible that someone might request
          a book that does not exist, to deal with that, we will use the{' '}
          <IJS>error</IJS> property and the <IJS>set.error</IJS> function.
        </p>
        <PrismBlock lang="javascript">
          {`// routes.js
import { fetchAllBooks, fetchBook } from './api/books';
const routes = [
// ...,
{
  name: 'Book List',
  path: 'books',
  match: {
    every: () => fetchAllBooks(),
    response: ({ resolved, set }) => {
      set.body(BookList);
      set.data({ books: resolved.every });
    }
  },
  children: [
    {
      name: 'Book',
      path: ':id',
      params: { id: n => parseInt(n, 10) },
      match: {
        every: ({ params }) => fetchBook(params.id),
        response: ({ error, resolved, set }) => {
          set.body(Book);
          if (error) {
            set.error(error);
          } else {
            set.data({ book: resolved.every });
          }
        }
      }
    }
  ]
}
// ...
];`}
        </PrismBlock>
        <Note>
          If you do not catch errors in your <IJS>every</IJS> function, you
          still get the opportunity to deal with them using the <IJS>error</IJS>{' '}
          property passed to <IJS>match.response</IJS>. However, if you do not
          handle the error there, you may end up with unexpected errors in your
          website.
        </Note>
      </Subsection>
      <p>
        Now, when a user visits <IJS>/books</IJS>, the response generated by
        Curi will look like this:
      </p>
      <PrismBlock lang="javascript">
        {`{
  name: 'Book List',
  data: {
    books: [/*...*/]
  },
  // ...
}`}
      </PrismBlock>
      <p>
        Likewise, visiting <IJS>/books/0</IJS> will generate a response whose{' '}
        <IJS>data</IJS> property is a book object.
      </p>
      <PrismBlock lang="javascript">
        {`{
  name: 'Book',
  params: { id: 0 }
  data: {
    book: { title: '...', /*...*/ }
  },
  // ...
}`}
      </PrismBlock>
    </Section>
    <Section title="Review" id="review">
      <p>If you are following the React path:</p>
      <CompleteBranch name="07-render-data-react" />
      <p>If you are following the Vue path:</p>
      <CompleteBranch name="07-render-data-vue" />
    </Section>
    <Section title="Next" id="next">
      <p>
        Now that we are loading data for our routes, we should modify our "Book
        List" and "Book" pages to render using this data. Once again, we will
        break this down for React and Vue users.
      </p>
      <p>
        If you are using React, continue with{' '}
        <Link to="Tutorial" params={{ name: '07-render-data-react' }}>
          Part 7: Rendering Data with React
        </Link>.
      </p>
      <p>
        If you are using Vue, continue with{' '}
        <Link to="Tutorial" params={{ name: '07-render-data-vue' }}>
          Part 7: Rendering Data with Vue
        </Link>.
      </p>
    </Section>
  </BaseTutorial>
);
