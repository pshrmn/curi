import React from 'react';
import { Link } from '@curi/react';

import BaseTutorial from './base/BaseTutorial';
import { TutorialBranch, CompleteBranch, Outline } from './base/Branch';
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
    <h1>Part 5: Vue Pages</h1>
    <p>
      Now that we have our router ready to go, we can think about what our pages
      should look like. This tutorial will be rendering our website using Vue.
      If you prefer to use React, you should check out the{' '}
      <Link to="Tutorial" params={{ name: '05-pages-react' }}>
        Part 5: React Pages
      </Link>{' '}
      tutorial.
    </p>
    <Outline>
      <ul>
        <li>Modifying our Webpack configuration to support Vue.</li>
        <li>
          Installing the <IJS>@curi/vue</IJS> package, learning about the{' '}
          <IJS>CuriPlugin</IJS> and one of the components it provides (<Cmp>
            curi-link
          </Cmp>).
        </li>
        <li>
          Using the response object emitted by Curi to render our website.
        </li>
        <li>Defining page components for each of the routes.</li>
        <li>
          Adding links so that users can navigate between locations in the
          website.
        </li>
      </ul>
    </Outline>
    <TutorialBranch name="05-pages-vue" />
    <Section title="Webpack" id="webpack">
      <p>
        Before we dive in, let's make sure that our build scripts can handle
        Vue. To do this, we just need to install Webpack's Vue loader and add
        support for <IJS>.vue</IJS> files to our Webpack configuration.
      </p>
      <PrismBlock lang="bash">
        {`npm install --save-dev vue-loader vue-template-compiler`}
      </PrismBlock>
      <PrismBlock lang="javascript">
        {`// webpack.router.js
const router = {
  // ...,
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      // ...
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  }
};`}
      </PrismBlock>
    </Section>
    <Section
      title={
        <span>
          The <IJS>@curi/vue</IJS> Package
        </span>
      }
      id="package"
    >
      <p>
        The <IJS>@curi/vue</IJS> package exports a Vue plugin, which provides
        components that know how to interact with Curi. For this tutorial, we
        will only be using one: <Cmp>curi-link</Cmp>. You can read more about
        the package in the{' '}
        <Link
          to="Package"
          params={{ package: 'vue' }}
          details={{ hash: 'API' }}
        >
          <IJS>@curi/vue</IJS> documentation
        </Link>.
      </p>
      <Subsection title="Installation" id="installation">
        <p>
          Let's start by installing the <IJS>@curi/vue</IJS> package as well as
          Vue.
        </p>
        <PrismBlock lang="bash">{`npm install @curi/vue vue`}</PrismBlock>
      </Subsection>
      <Subsection title="The Plugin" id="plugin">
        <p>
          The <IJS>CuriPlugin</IJS> exported by <IJS>@curi/vue</IJS>, should be
          registered with Vue after the Curi router has been created. The plugin
          does a couple things. First, it will make your Curi router and new
          responses/actions accessible to every component. The router will be
          accessible as <IJS>this.$router</IJS> while through the{' '}
          <IJS>response</IJS> and <IJS>action</IJS> are grouped under the{' '}
          <IJS>this.$curi</IJS> object. Second, it will register Curi specific
          components. For this tutorial, the only component that we care about
          is <Cmp>curi-link</Cmp>.
        </p>
        <PrismBlock lang="javascript">
          {`// index.js
import Vue from 'vue';
import { CuriPlugin } from '@curi/vue';

const router = curi(history, routes);
Vue.use(CuriPlugin, { router });`}
        </PrismBlock>
      </Subsection>

      <Subsection
        title={
          <span>
            The <Cmp>curi-link</Cmp> Component
          </span>
        }
        id="Link"
      >
        <p>
          The <Cmp>curi-link</Cmp> component renders anchor (<Cmp>a</Cmp>)
          elements. However, unlike an anchor, we don't actually have to write
          the URI that we want to navigate to (the <IJS>href</IJS>). Instead,
          you use the <IJS>to</IJS> prop to pass the name of the route that you
          want to navigate to.
        </p>
        <PrismBlock lang="jsx">
          {`<curi-link to='Home'>Home</curi-link>
// <a href='/'>Home</a>`}
        </PrismBlock>
        <p>
          If the route that you are navigating to has any params, you pass them
          using the <IJS>params</IJS> prop.
        </p>
        <PrismBlock lang="jsx">
          {`// { name: 'Book', path: ':id' }
// (inherits 'books' path from parent route)
<curi-link to='Book' params={{ id: 1357 }}>
  Some Book
</curi-link>
// <a href='/books/1357'>Some Book</a>`}
        </PrismBlock>
        <p>
          If you need to pass any other location properties (<IJS>query</IJS>,
          <IJS>hash</IJS>, or <IJS>state</IJS>), you can provide them using the{' '}
          <IJS>details</IJS> prop.
        </p>
        <PrismBlock lang="jsx">
          {`<curi-link to='Contact' details={{ hash: 'email' }}>
  Contact by Email
</curi-link>
// <a href='/contact#email>Contact by Email</a>`}
        </PrismBlock>
        <Note>
          If you want to navigate outside of the application, use an anchor not
          a <Cmp>curi-link</Cmp>.
          <PrismBlock lang="jsx">
            {`// interal
<curi-link to='Contact'>Contact</curi-link>
// external
<a href="https://github.com">GitHub</a>`}
          </PrismBlock>
        </Note>
      </Subsection>
    </Section>

    <Section title="The Response" id="response">
      <p>
        Being able to access the Curi router is nice, but what we really need is
        to access the response objects that are emitted by Curi whenever the
        location changes. We <em>could</em> use the <IJS>router.respond</IJS>{' '}
        method that we covered in the{' '}
        <Link to="Tutorial" params={{ name: '04-router' }}>
          router
        </Link>{' '}
        tutorial, but the <IJS>CuriPlugin</IJS> takes care of that step for us.{' '}
        <IJS>CuriPlugin</IJS> calls <IJS>router.respond</IJS> and in the
        response handler, it updates the reactive <IJS>response</IJS> and{' '}
        <IJS>action</IJS> properties of <IJS>this.$curi</IJS> whenever a new
        response is emitted.
      </p>

      <p>
        While we do not have to manually subscribe to all responses, we do need
        to listen for the first response to be emitted so that we can render the
        application. The second argument to <IJS>router.respond</IJS> is an
        options object. If we pass the options <IJS>{`{ once: true }`}</IJS>,
        then that function will only be called after the initial response is
        emitted.
      </p>
      <p>
        Inside of the response handler function, we just need to render our root
        application component. All of our Curi related data will be available
        through <IJS>this.$curi</IJS>, so we don't have to attach any data to
        the Vue instance.
      </p>
      <PrismBlock lang="javascript">
        {`// index.js
import app from './components/app';

router.respond(response => {
  const vm = new Vue({
    el: '#root',
    template: '<app />',
    components: { app }
  });
}, { once: true });`}
      </PrismBlock>
    </Section>

    <Section title="The App" id="app">
      <p>
        At this point we have the ability to access our router throughout our
        components and we are passing response objects to some <Cmp>app</Cmp>{' '}
        component that we haven't actually written yet. We should write those
        components now.
      </p>

      <p>
        Our <Cmp>app</Cmp> component will be responsible for rendering our
        website based on the response object. To start, let's add a{' '}
        <IJS>components</IJS> directory to our <IJS>src</IJS> directory.
      </p>

      <PrismBlock lang="bash">{`mkdir -p src/components`}</PrismBlock>

      <p>
        From up above, we know that our <Cmp>app</Cmp> will be receiving the
        response object as a prop. What should it render, though?
      </p>

      <PrismBlock lang="html">
        {`<!-- components/App.vue -->
<template>
</template>

<script>
  export default {
    name: 'app'
  };
</script>`}
      </PrismBlock>

      <p>
        Let's take a look at the properties of our response object to see which
        of its properties would be helpful for rendering our website.
      </p>
      <PrismBlock lang="javascript">
        {`{
 body: undefined,
 data: undefined,
 error: undefined,
 key: '1.0',
 location: { pathname: '/', ... },
 name: 'Home',
 params: {},
 partials: [],
 status: 200
}`}
      </PrismBlock>
      <Note>
        The{' '}
        <Link
          to="Guide"
          params={{ slug: 'responses' }}
          details={{ hash: 'properties' }}
        >
          Rendering with Responses
        </Link>{' '}
        guide goes into more detail about each of the properties of a response
        object.
      </Note>

      <p>
        In{' '}
        <Link to="Tutorial" params={{ name: '02-routes' }}>
          Part 3
        </Link>{' '}
        of this tutorial, we added <IJS>match.response</IJS> functions that set
        the <IJS>body</IJS> property for each of our routes. There, we just used
        a placeholder string, but now we can actually set the component for each
        route. Instead of returning a string, what if <IJS>set.body</IJS> set
        the <IJS>body</IJS> to be a Vue component? Then, our render function can
        use the <IJS>body</IJS> property of our response object to render our
        website.
      </p>
      <PrismBlock lang="html">
        {`<!-- components/App.vue -->
<template>
  <component :is="$curi.response.body" />
</template>

<script>
export default {
  name: 'app'
};
</script>`}
      </PrismBlock>
      <p>
        We'll expand on that later on, but for now, let's go ahead and define
        the components for each of our routes.
      </p>
    </Section>
    <Section title="The Route Components" id="route-components">
      <p>
        To refresh your memory, we have "Home", "Contact", "Book List", "Book",
        "Checkout", and "Not Found" pages that we will need to create components
        for. We can write some barebones components and add some more content
        later on.
      </p>

      <PrismBlock lang="html">
        {`<!-- components/Home.vue -->
<template>
  <div class='home'>
    Welcome to our book store!
  </div>
</template>`}
      </PrismBlock>
      <PrismBlock lang="html">
        {`<!-- components/Contact.vue -->
<template>
  <div class='contact'>
    You can contact us by fax at 1-206-555-0123.
  </div>
</template>`}
      </PrismBlock>
      <PrismBlock lang="html">
        {`<!-- components/BookList.vue -->
<template>
  <div class='book-list'>
    Available Books
  </div>
</template>`}
      </PrismBlock>
      <PrismBlock lang="html">
        {`<!-- components/Book.vue -->
<template>
  <div class='book'>
    Book
  </div>
</template>`}
      </PrismBlock>
      <PrismBlock lang="html">
        {`<!-- components/Checkout.vue -->
<template>
  <div class='checkout'>
    Checkout
  </div>
</template>`}
      </PrismBlock>
      <PrismBlock lang="html">
        {`<!-- components/NotFound.vue -->
<template>
  <div class='not-found'>
    Page not found
  </div>
</template>`}
      </PrismBlock>
      <p>
        All of these components should be imported in our <IJS>routes.js</IJS>{' '}
        and set using <IJS>set.body</IJS> in their respective{' '}
        <IJS>match.response</IJS> functions.
      </p>
      <PrismBlock lang="javascript">
        {`// routes.js
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
        Now, if we load up our application, we will render our home page.
        Unfortunately, there is no way to navigate to any of our other pages. We
        will need to add some <Cmp>curi-link</Cmp>s to our application.
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
        We will use a <Cmp>nav</Cmp> element as the parent for our{' '}
        <Cmp>NavLinks</Cmp>. Inside of that is a <Cmp>ul</Cmp> and then each of
        our routes will be <Cmp>Link</Cmp>s wrapped in <Cmp>li</Cmp>s.
      </p>
      <PrismBlock lang="html">
        {`<!-- components/NavLinks.vue -->
<template>
  <nav>
    <ul>
      <li>
        <curi-link to='Home'>Home</curi-link>
      </li>
      <li>
        <curi-link to='Contact'>Contact Us</curi-link>
      </li>
      <li>
        <curi-link to='Book List'>Books for Sale</curi-link>
      </li>
      <li>
        <curi-link to='Checkout'>Checkout</curi-link>
      </li>
    </ul>
  </nav>
</template>`}
      </PrismBlock>
      <p>
        Let's import and render that the <Cmp>NavLinks</Cmp> in our{' '}
        <Cmp>app</Cmp>. We'll also add some wrapper elements to keep our content
        organized.
      </p>
      <PrismBlock lang="html">
        {`<!-- components/App.vue -->
<template>
  <div>
    <header>
      <NavLinks />
    </header>
    <main>
      <component :is="$curi.response.body" />
    </main>
  </div>
</template>

<script>
  import NavLinks from './NavLinks';

  export default {
    name: 'app',
    components: { NavLinks }
  };
</script>`}
      </PrismBlock>
      <p>
        At this point, we can navigate between most of our routes. However, we
        still need to add navigation to our books.
      </p>
    </Section>
    <Section title="Navigating to Our Books" id="param-navigation">
      <p>
        Our "Book" route is different than all of our other routes because the
        book path includes an <IJS>id</IJS> param. This means that we need to
        actually have "id" values to pass to our <Cmp>curi-link</Cmp>s. Later
        on, we'll generate some better data, but for now we can just generate a
        placeholder list in a module called <IJS>books.js</IJS>.
      </p>
      <PrismBlock lang="jsx">
        {` // books.js
const books = [
  { id: 0 },
  { id: 1 },
  { id: 2 },
  { id: 3 }
];
export default books;`}
      </PrismBlock>
      <p>
        Then, in <Cmp>BookList</Cmp> we can iterate over this list to generate
        links to our books.
      </p>
      <PrismBlock lang="html">
        {`<!-- components/BookList.vue -->
<template>
  <div class='book-list'>
    <h1>Available Books</h1>
    <div class='books'>
      <div v-for="book in books" :key="book.id" class='book-item'>
        <curi-link to='Book' :params="{ id: book.id }">
          Book {{book.id}}
        </curi-link>
      </div>
    </div>
  </div>
</template>

<script>
  import books from '../books';
  export default {
    data: function() {
      return { books };
    }
  };
</script>
`}
      </PrismBlock>
    </Section>
    <Section title="Book Props" id="book-props">
      <p>
        The <Cmp>curi-link</Cmp>s above allow us to navigate to our books, but
        we don't actually have any information about which book we are supposed
        to be seeing. It would really help if our <Cmp>Book</Cmp> was able to
        access the parsed params so that it can render the information for the
        correct book.
      </p>
      <p>
        The <IJS>params</IJS> object is a property of our response object. We
        can access the response in our components using{' '}
        <IJS>this.$curi.response</IJS>, so we don't actually have to manually
        pass it as a prop.
      </p>

      <p>
        Next, we just need to update our <Cmp>Book</Cmp> component to access the{' '}
        <IJS>params</IJS> object and figure out which book to render content
        for.
      </p>
      <PrismBlock lang="html">
        {`<!-- components/Book.vue -->
<template>
  <div class='book'>
    Book {{$curi.response.params.id}}
  </div>
</template>`}
      </PrismBlock>
    </Section>
    <Section title="Review" id="review">
      <p>
        After completing this tutorial, we now have a semi-functional website
        that renders basic content for each of our pages.
      </p>
      <CompleteBranch name="06-loading-data-vue" />
      <CodeSandboxDemo id="github/pshrmn/curi-tutorial/tree/06-loading-data-vue" />
    </Section>
    <Section title="Next" id="next">
      <p>
        At this point, we have a website with a number of pages. It isn't
        particularly useful yet, but at least we can navigate between pages.
        Next we will take a step back from Vue and look at how we can implement
        data loading with with{' '}
        <Link to="Tutorial" params={{ name: '06-loading-data' }}>
          Part 6: Loading Data
        </Link>.
      </p>
    </Section>
  </BaseTutorial>
);
