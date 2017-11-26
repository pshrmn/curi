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
    <h1>Part 6: Vue Pages</h1>
    <p>
      Now that we have our configuration object ready to go, we can think
      about what our pages should look like. This tutorial will be rendering
      our website using Vue. If you prefer to use React, you should check
      out the <Link to='Tutorial' params={{ name: '06-pages-react' }}>
      Part 6: React Pages</Link> tutorial.
    </p>
    <div>
      <p>
        In this tutorial, we will be doing the following:
      </p>
      <ul>
        <li>
          Modifying our Webpack configuration to support Vue.
        </li>
        <li>
          Installing the <IJS>@curi/vue</IJS> package, learning about
          the <IJS>CuriPlugin</IJS> and one of the components it
          provides (<Cmp>curi-link</Cmp>).
        </li>
        <li>
          Using the response object emitted by Curi to render
          our website.
        </li>
        <li>
          Defining page components for each of the routes.
        </li>
        <li>
          Adding links so that users can navigate between locations
          in the website.
        </li>
      </ul>
    </div>
    <TutorialBranch name='06-pages-vue' />
    <Section
      title='Webpack'
      id='webpack'
    >
      <p>
        Before we dive in, let's make sure that our build scripts can handle
        Vue. To do this, we just need to install Webpack's Vue loader
        and add support for <IJS>.vue</IJS> files to our Webpack configuration.
      </p>
      <PrismBlock lang='bash'>
        {
`npm install --save-dev vue-loader vue-template-compiler`
        }
      </PrismBlock>
      <PrismBlock lang='javascript'>
        {
`// webpack.config.js
const config = {
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
};`
        }
      </PrismBlock>
    </Section>
    <Section
      title={<span>The <IJS>@curi/vue</IJS> Package</span>}
      id='package'
    >
      <p>
        The <IJS>@curi/vue</IJS> package exports a Vue plugin, which provides
        components that know how to interact with Curi. For this tutorial,
        we will only be using one: <Cmp>curi-link</Cmp>. You can read more about
        the package in the{' '}
        <Link
          to='Package'
          params={{ package: 'vue' }}
          details={{ hash: 'API' }}
        >
          <IJS>@curi/vue</IJS> documentation
        </Link>.
      </p>
      <Subsection
        title='Installation'
        id='installation'
      >
        <p>
          Let's start by installing the <IJS>@curi/vue</IJS> package as well
          as Vue.
        </p>
        <PrismBlock lang='bash'>
          {
`npm install @curi/vue vue`
          }
        </PrismBlock>
      </Subsection>
      <Subsection
        title='The Plugin'
        id='plugin'
      >
        <p>
          The <IJS>CuriPlugin</IJS> exported by <IJS>@curi/vue</IJS>, should
          be registered with Vue after the Curi configuration object has been
          created. When registering it (via <IJS>Vue.use</IJS>), you should
          pass a second argument: an object with a <IJS>config</IJS> property
          whose value is your Curi configuration object.
        </p>
        <PrismBlock lang='javascript'>
          {
`// index.js
import Vue from 'vue';
import CuriPlugin from '@curi/vue';

const config = createConfig(history, routes);
Vue.use(CuriPlugin, { config });`
          }
        </PrismBlock>

        <p>
          This plugins does a couple things. First, it will make your Curi
          configuration object accessible to every component as{' '}
          <IJS>this.$curi</IJS>. Second, it will register Curi specific
          components. For this tutorial, the only component that we care
          about is <Cmp>curi-link</Cmp>.
        </p>
      </Subsection>

      <Subsection
        title={<span>The <Cmp>curi-link</Cmp> Component</span>}
        id='Link'
      >
        <p>
          The <Cmp>curi-link</Cmp> component renders anchor (<Cmp>a</Cmp>)
          elements. However, unlike an anchor, we don't actually have to write
          the URI that we want to navigate to (the <IJS>href</IJS>). Instead,
          you use the <IJS>to</IJS> prop to pass the name of the route that
          you want to navigate to.
        </p>
        <PrismBlock lang='jsx'>
          {
`<curi-link to='Home'>Home</curi-link>
// <a href='/'>Home</a>`
          }
        </PrismBlock>
        <p>
          If the route that you are navigating to has any params, you pass
          them using the <IJS>params</IJS> prop.
        </p>
        <PrismBlock lang='jsx'>
          {
`// { name: 'Book', path: ':id' }
// (inherits 'books' path from parent route)
<curi-link to='Book' params={{ id: 1357 }}>
  Some Book
</curi-link>
// <a href='/books/1357'>Some Book</a>`
          }
        </PrismBlock>
        <p>
          If you need to pass any other location properties (<IJS>query</IJS>,
          <IJS>hash</IJS>, or <IJS>state</IJS>), you can provide them using
          the <IJS>details</IJS> prop.
        </p>
        <PrismBlock lang='jsx'>
          {
`<curi-link to='Contact' details={{ hash: 'email' }}>
  Contact by Email
</curi-link>
// <a href='/contact#email>Contact by Email</a>`
          }
        </PrismBlock>
        <Note>
          If you want to navigate outside of the application, use an anchor not
          a <Cmp>curi-link</Cmp>.
          <PrismBlock lang='jsx'>
            {
`// interal
<curi-link to='Contact'>Contact</curi-link>
// external
<a href="https://github.com">GitHub</a>`
            }
          </PrismBlock>
        </Note>
      </Subsection>
    </Section>

    <Section
      title='The Response'
      id='response'
    >
      <p>
        Being able to access the Curi configuration object is nice, but what we really
        need is to access the response objects that are emitted by Curi whenever the
        location changes. We can do this the <IJS>subscribe</IJS> method that we covered
        in the <Link to='Tutorial' params={{ name: '05-config' }}>configuration object</Link>
        {' '}tutorial.
      </p>

      <p>
        First, we need to have a variable that will be used to store our Vue instance.
        Then, we will subscribe to the configuration object.
      </p>

      <PrismBlock lang='javascript'>
        {
`// index.js
let vm;
config.subscribe(response => {
  // ...
});`
        }
      </PrismBlock>

      <p>
        Inside of the subscribe function, we have two branches. The first is when
        we don't have a Vue instance. When that is the case, we should create a new
        Vue instance. When we already have a Vue instance, we just need to update
        the <IJS>response</IJS> object.
      </p>
      <p>
        When we are creating a Vue instance, the response object should be passed as
        a data property to the instance. We will have our Vue instance render
        an <Cmp>app</Cmp> component, which we will define next. The <Cmp>app</Cmp> is
        passed the <IJS>response</IJS> object as a prop, which it will use to determine
        what to render.
      </p>
      <p>
        When we are updating a Vue instance, we just need to set the new property on the
        Vue instance and Vue's reactivity will handle re-rendering the application.
      </p>
      <PrismBlock lang='javascript'>
        {
`// index.js
import app from './components/App';

let vm;
config.subscribe(response => {
  if (!vm) {
    vm = new Vue({
      el: '#root',
      data: {
        response
      },
      // we'll get into the <app> soon
      template: '<app :response="response" />',
      components: { app }
    });
  } else {
    vm.response = response;
  }
});`
        }
      </PrismBlock>
    </Section>

    <Section
      title='The App'
      id='app'
    >
      <p>
        At this point we have the ability to access our configuration
        object throughout our components and we are passing response
        objects to some <Cmp>app</Cmp> component that we haven't actually
        written yet. We should do that now.
      </p>

      <p>
        Our <Cmp>app</Cmp> component will be responsible for rendering
        our website based on the response object. To start, let's add
        a <IJS>components</IJS> directory to our <IJS>src</IJS> directory.
      </p>

      <PrismBlock lang='bash'>
        {
`mkdir -p src/components`
        }
      </PrismBlock>

      <p>
        From up above, we know that our <Cmp>app</Cmp> will be receiving the response
        object as a prop. What should it render, though?
      </p>

      <PrismBlock lang='html'>
        {
`<!-- components/App.vue -->
<template>
</template>

<script>
  export default {
    name: 'app',
    props: ['response']
  };
</script>`
        }
      </PrismBlock>

      <p>
        Let's take a look at the properties of our response object to see which
        of its properties would be helpful for rendering our website.
      </p>
      <PrismBlock lang='javascript'>
        {
`{
 body: undefined,
 data: undefined,
 error: undefined,
 key: '1.0',
 location: { pathname: '/', ... },
 name: 'Home',
 params: {},
 partials: [],
 status: 200
}`
        }
      </PrismBlock>
      <Note>
        The <Link to='Guide' params={{ slug: 'responses' }} details={{ hash: 'properties' }}>
        Rendering with Responses</Link> guide goes into more detail about
        each of the properties of a response object.
      </Note>

      <p>
        Your first thought about how to use a response to render might
        be to use <IJS>response.name</IJS>. You could use a template full of
        if/else attributes and render a different component based on the{' '}
        <IJS>response.name</IJS>. In the same vein, you could add a computed
        property that returns a component for each possible <IJS>name</IJS>
        {' '}value and use <Cmp>component :is</Cmp> to render the computed
        property. Neither of those sounds very convenient, especially as your
        application gets more complex, although <Cmp>component :is</Cmp> is
        something we will want to use.
      </p>
      <p>
        Instead, we are going to use one of the <IJS>undefined</IJS> properties
        from the above response: <IJS>body</IJS>. What is this property? The{' '}
        <IJS>body</IJS> property of a response is set by calling the <IJS>body</IJS>
        {' '}function property of a matched route.
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
        Now, instead of returning a string, what if our <IJS>route.body</IJS>
        {' '}properties were functions that returned Vue components? We can use{' '}
        <Cmp>component :is</Cmp> to dynamically set the component that Vue should
        render. Then, our render function can use <IJS>response.body</IJS> to
        render our website. 
      </p>
      <PrismBlock lang='html'>
        {
`<!-- components/App.vue -->
<template>
  <component :is="response.body" />
</template>

<script>
export default {
  name: 'app',
  props: ['response']
};
</script>`
        }
      </PrismBlock>
      <p>
        Next, we should define the components for each of our routes.
      </p>
    </Section>
    <Section
      title='The Route Components'
      id='route-components'
    >
      <p>
        To refresh your memory, we have "Home", "Contact", "Book List", "Book",
        "Checkout", and "Not Found" pages that we will need to create components
        for. We can write some barebones components and add some more content
        later on.
      </p>

      <PrismBlock lang='html'>
        {
`<!-- components/Home.vue -->
<template>
  <div class='home'>
    Welcome to our book store!
  </div>
</template>`
        }
      </PrismBlock>
      <PrismBlock lang='html'>
        {
`<!-- components/Contact.vue -->
<template>
  <div class='contact'>
    You can contact us by fax at 1-206-555-0123.
  </div>
</template>`
        }
      </PrismBlock>
      <PrismBlock lang='html'>
        {
`<!-- components/BookList.vue -->
<template>
  <div class='book-list'>
    Available Books
  </div>
</template>`
        }
      </PrismBlock>
      <PrismBlock lang='html'>
        {
`<!-- components/Book.vue -->
<template>
  <div class='book'>
    Book
  </div>
</template>`
        }
      </PrismBlock>
      <PrismBlock lang='html'>
        {
`<!-- components/Checkout.vue -->
<template>
  <div class='checkout'>
    Checkout
  </div>
</template>`
        }
      </PrismBlock>
      <PrismBlock lang='html'>
        {
`<!-- components/NotFound.vue -->
<template>
  <div class='not-found'>
    Page not found
  </div>
</template>`
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
];

export default routes;`
        }
      </PrismBlock>
      <p>
        Now, if we load up our application, we will render our home page.
        Unfortunately, there is no way to navigate to any of our other pages.
        We will need to add some <Cmp>curi-link</Cmp>s to our application.
      </p>
    </Section>

    <Section
      title='A Navigation Menu'
      id='nav-menu'
    >
      <p>
        We can write a simple <Cmp>NavLinks</Cmp> menu component to add
        navigation to our application. From this menu, we only need to be
        able to navigate to our "Home", "Contact", "Book List", and "Checkout"
        routes. Navigation to individual books will be done from the book list
        page.
      </p>
      <p>
        We will use a <Cmp>nav</Cmp> element as the parent for our{' '}
        <Cmp>NavLinks</Cmp>. Inside of that is a <Cmp>ul</Cmp> and then each of
        our routes will be <Cmp>Link</Cmp>s wrapped in <Cmp>li</Cmp>s.
      </p>
      <PrismBlock lang='html'>
        {
`<!-- components/NavLinks.vue -->
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
</template>`
        }
      </PrismBlock>
      <p>
        Let's import and render that the <Cmp>NavLinks</Cmp> in
        our <Cmp>app</Cmp>. We'll also add some wrapper elements
        to keep our content organized.
      </p>
      <PrismBlock lang='html'>
        {
`<!-- components/App.vue -->
<template>
  <div>
    <header>
      <NavLinks />
    </header>
    <main>
      <component :is="response.body" />
    </main>
  </div>
</template>

<script>
  import NavLinks from './NavLinks';
  export default {
    name: 'app',
    props: ['response'],
    components: { NavLinks }
  };
</script>`
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
        values to pass to our <Cmp>curi-link</Cmp>s. Later on, we'll generate some better data,
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
      <PrismBlock lang='html'>
        {
`<!-- components/BookList.vue -->
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
`
        }
      </PrismBlock>
    </Section>
    <Section
      title='Book Props'
      id='book-props'
    >
      <p>
        The <Cmp>curi-link</Cmp>s above allow us to navigate to our books, but we don't actually have
        any information about which book we are supposed to be seeing. It would really help if
        our <Cmp>Book</Cmp> was able to access the parsed params so that it can render the
        information for the correct book.
      </p>
      <p>
        The <IJS>params</IJS> object is a property of our response object. That means that if
        we pass our response object as a prop to the <IJS>response.body</IJS>, we can access these
        params in our route components.
      </p>
      <PrismBlock lang='html'>
      {
`<!-- components/App.vue -->
<template>
  <div>
    <header>
      <NavLinks />
    </header>
    <main>
      <component
        :is="response.body"
        :response="response"
      />
    </main>
  </div>
</template>

<script>
  import NavLinks from './NavLinks';

  export default {
    name: 'app',
    props: ['response'],
    components: { NavLinks }
  };
</script>`
      }
    </PrismBlock>
      <Note>
        There are a number of ways that you can decide to pass props to your route components. The
        one thing to keep in mind is that <em>all</em> of your route components will receive
        the same set of props. You can either be very specific and only pass the props that
        are necessary (e.g. <Cmp>component :params="response.params"</Cmp>) or you can just pass the entire
        response object (e.g. <Cmp>component :response="response"</Cmp>) so you don't have to worry
        about updating this every time one of your route components needs another prop from the
        response.
      </Note>
      <p>
        Next, we just need to update our <Cmp>Book</Cmp> component so that it can access its{' '}
        <IJS>params</IJS> prop and figure out which book to render content for.
      </p>
      <PrismBlock lang='html'>
        {
`<!-- components/Book.vue -->
<template>
  <div class='book'>
    Book {{response.params.id}}
  </div>
</template>

<script>
  export default {
    props: ['response']
  };
</script>`
        }
      </PrismBlock>
    </Section>
    <Section
      title='Review'
      id='review'
    >
      <p>
        After completing this tutorial, we now have a semi-functional website
        that renders basic content for each of our pages.
      </p>
      <CompleteBranch name='06-pages-vue-complete' />
      <CodeSandboxDemo id='github/pshrmn/curi-tutorial/tree/06-pages-vue-complete' />
    </Section>
    <Section
      title='Next'
      id='next'
    >
      <p>
        At this point, we have a website with a number of pages. It isn't particularly useful yet,
        but at least we can navigate between pages. Next we will take a step back from Vue and
        look at how we can implement data loading with with{' '}
        <Link to='Tutorial' params={{ name: '07-load' }}>Part 7: The Load Function</Link>.
      </p>
    </Section>
  </BaseTutorial>
);
