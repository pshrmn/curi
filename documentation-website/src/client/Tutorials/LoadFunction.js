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
      running a database query). Let's start out by writing another fake, but
      more realistic, way to access our data. Then, we'll introduce another
      property of route objects: <IJS>load</IJS>.
    </p>
    <Section
      title='Fake API'
      id='api'
    >
      <p>
        There are a number of ways that we might make a request to the server,
        but here we will simulate using the{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">Fetch API</a>.
      </p>
      <p>
        The <IJS>fetch</IJS> function makes a request to the server and returns
        a Promise that will resolve with the server's response. Let's create
        an <IJS>api</IJS> directory and start writing our fake fetch functions.
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
  return new Promse((resolve, reject) => {

  });
}

export function fetchBook(id) {
  return new Promse((resolve, reject) => {
  
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
    title: 'The Wise Man\'s Fear',
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
        array for the book with the requested id. If it finds it, the
        function should resolve with the book object. If the requested
        book is not found, it should reject with an error message.
      </p>
      <PrismBlock lang='javascript'>
        {
`// api/books.js
const books = [...];

export function fetchAllBooks() {
  return new Promse((resolve, reject) => {
    resolve(books);
  });
}

export function fetchBook(id) {
  return new Promse((resolve, reject) => {
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
      <p>
        In order to 
      </p>
    </Section>

    <Section
      title='Next'
      id='next'
    >
    </Section>
  </BaseTutorial>
);
