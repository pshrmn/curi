import React from 'react';
import { Link } from '@curi/react';

import BaseTutorial from './base/BaseTutorial';
import { TutorialBranch, CompleteBranch } from './base/Branch';
import {
  InlineJS as IJS,
  InlineComponent as Cmp,
  PrismBlock
} from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Section, Subsection } from '../components/Sections';
import CodeSandboxDemo from '../components/CodeSandboxDemo';

export default () => (
  <BaseTutorial>
    <h1>Part 8: Rendering Data with Vue</h1>
    <p>
      Now that our responses have <IJS>data</IJS>, we should update
      our <Cmp>BookList</Cmp> and <Cmp>Book</Cmp> components to use
      that. Accessing the <IJS>data</IJS> is really easy because it
      is a property of our <IJS>response</IJS> object.
    </p>
    <div>
      <p>
        In this tutorial, we will be doing the following:
      </p>
      <ul>
        <li>
          Updating our <Cmp>BookList</Cmp> and <Cmp>Book</Cmp>
          {' '}components to render using <IJS>response.data</IJS>.
        </li>
      </ul>
    </div>
    <TutorialBranch name='08-render-data-vue' />
    <Section
      title='Using Data with the Book List'
      id='book-list'
    >
      <p>
        Currently, in our <IJS>BookList.vue</IJS> file, we are importing
        the books from a file. Now, we can remove that import and instead
        use the <IJS>response</IJS> prop to access our data. Since we also
        have better data, we can now use each book's title for the link text.
      </p>
      <PrismBlock lang='html'>
        {
`<!-- components/BookList.vue -->
<template>
  <div class='book-list'>
    <h1>Available Books</h1>
    <div class='books'>
      <div
        v-for="book in response.data.books"
        :key="book.id"
        class='book-item'
      >
        <curi-link to='Book' :params="{ id: book.id }">
          {{book.title}}
        </curi-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['response']
  };
</script>
`
        }
      </PrismBlock>
    </Section>
    <Section
      title='Using Data with the Book'
      id='book'
    >
      <p>
        We are already using the <IJS>response</IJS> prop in <Cmp>Book</Cmp>.
        Now, instead of using <IJS>params</IJS>, we will switch to using{' '}
        <IJS>data</IJS>. We can also take advantage of the <IJS>data.book</IJS>
        {' '}properties to expand on our <Cmp>Book</Cmp> implementation.
      </p>
      <p>
        We also have a special case that we need to consider: what should we do
        when there is no matching book? In the sample data, we have books with ids
        that range from 0-9. What if the user navigates to <IJS>/books/123</IJS>?
        Our <IJS>fetchBook</IJS> call will reject and <IJS>response.data</IJS>
        {' '}will be <IJS>undefined</IJS>. For now, we should detect that and render
        a simple message stating that the requested book does not exist.
      </p>
      <PrismBlock lang='html'>
        {
`<!-- components/Book.vue -->
<template>
  <div v-if="book" class='book'>
    <h2>{{book.title}}</h2>
    <p>By {{book.author}}</p>
    <p>Published in {{book.published}}</p>
    <p>This book is {{book.pages}} pages</p>
  </div>
  <div v-else class='book'>
    The requested book does not exist
  </div>
</template>

<script>
  export default {
    props: ['response'],
    computed: {
      book: function() {
        return this.response.data && this.response.data.book;
      }
    }
  };
</script>`
        }
      </PrismBlock>
    </Section>
    <p>
      Now that we are using <IJS>response.data</IJS> in both the{' '}
      <Cmp>BookList</Cmp> and <Cmp>Book</Cmp> components, we can remove
      the <IJS>books.js</IJS> file.
    </p>
    <PrismBlock lang='bash'>
      {
`git rm src/books.js`
      }
    </PrismBlock>
    <Section
      title='Review'
      id='review'
    >
      <p>
        Our "Book List" and "Book" pages are now rendered using data
        from <IJS>response.data</IJS>.
      </p>
      <CompleteBranch name='08-render-data-vue-complete' />
      <CodeSandboxDemo id='github/pshrmn/curi-tutorial/tree/08-render-data-vue-complete' />
    </Section>
    <Section
      title='Next'
      id='next'
    >
      <p>
        Our book component still isn't complete. We are building a book store after all,
        so we should really provide the user a way to actually "buy" a book. In{' '}
        <Link to='Tutorial' params={{ name: '09-nav-vue' }}>Part 9: Forms & Navigation</Link>,
        we will add the ability to add books to a shopping cart and "purchase"
        them from our "Checkout" route.
      </p>
    </Section>
  </BaseTutorial>
);
