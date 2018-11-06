import React from "react";
import { Link } from "@curi/react-dom";

import Outline from "../../components/tutorial/Outline";
import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../components/highlight/Inline";
import { CodeBlock } from "../../components/layout/Groups";
import { Note } from "../../components/Messages";
import { Section } from "../../components/layout/Sections";
import CodeSandboxDemo from "../../components/CodeSandboxDemo";

export default function VueBasicsTutorial() {
  return (
    <React.Fragment>
      <h1>Vue Basics Tutorial</h1>
      <p>
        In this tutorial, we will be building a website for a bookstore. This
        will focus on the front-end part of the application.
      </p>
      <Outline>
        <ul>
          <li>Learn how to define routes and setup the Curi router.</li>
          <li>
            Learn how to render Vue components based on the current location.
          </li>
          <li>Learn how to navigate within the application.</li>
        </ul>
      </Outline>
      {/*<Section title="Demo" id="demo">
      <p>You can run a demo of the site we are building with CodeSandbox.</p>
      <CodeSandboxDemo id="github/curijs/vue-basic-tutorial/tree/master/" />
</Section>*/}
      <Section title="Setup" id="setup">
        <p>
          We will be using{" "}
          <a href="https://github.com/vuejs/vue-cli">
            <IJS>@vue/cli</IJS>
          </a>{" "}
          to develop this website.
        </p>
        <Note>
          The instructions here assume that you have NodeJS and NPM > 5.2
          installed on your computer. If you do not, cannot, or prefer to avoid
          setup altogether, you can follow along using{" "}
          <a href="https://codesandbox.io/">CodeSandbox</a>. Some of the
          boilerplate will be different, but the differences are minor.
        </Note>
        <p>
          Begin by opening a terminal and navigating to the directory where you
          want to save your code. Then, we will use <IJS>@vue/cli</IJS> to
          create the application. We
        </p>
        <CodeBlock lang="bash">
          {`# install vue-cli if it isn't already
npm install --global @vue/cli
# create the application
vue create curi-bookstore
# select the default option

# enter the new app directory
cd curi-bookstore
# start the dev server
yarn serve`}
        </CodeBlock>
        <p>
          The dev server will automatically update when we change files, so we
          can leave that running. We will still be working in the terminal, so
          you will want to open up a new terminal window/tab and navigate to the
          application's directory. Once you have done that, there are a few
          packages that need to be installed.
        </p>
        <CodeBlock lang="bash">
          {`yarn add @hickory/browser @curi/router @curi/vue`}
        </CodeBlock>
        <p>
          The <IJS>@hickory/browser</IJS> package will be used to create an
          object that interacts with the browser to power navigation (e.g.
          updates the URI in the address bar when you click a link).{" "}
          <IJS>@curi/router</IJS> provides the function to actually create the
          router. <IJS>@curi/vue</IJS> gives us a plugin for Vue and some Vue
          components that interact with the router.
        </p>
      </Section>
      <Section title="History and Locations" id="history">
        <p>
          URIs can be broken into parts to identify a location. With a
          single-page application, we don't care about the URI's protocol (http,
          https) or its hostname (www.example.com). The properties we care about
          are the <IJS>pathname</IJS>, <IJS>hash</IJS>, and <IJS>query</IJS>.
        </p>
        <CodeBlock lang="javascript">
          {`// uri = "https://example.com/one?key=value#id
{
  pathname: "/one",
  query: "key=value",
  hash: "id"
}`}
        </CodeBlock>
        <p>
          The router will match its routes against a location's{" "}
          <IJS>pathname</IJS> to figure out which route matches. The{" "}
          <IJS>query</IJS> and <IJS>hash</IJS> values are not used for matching
          routes.
        </p>
        <p>
          Curi uses the <a href="https://github.com/pshrmn/hickory">Hickory</a>{" "}
          library to create a history object that will enable us to navigate
          within our application. Hickory provides a few different packages to
          create history objects for different environments, but the only one we
          care about right now is the browser history, which comes from the{" "}
          <IJS>@hickory/browser</IJS> package. A browser history object will
          interact with the browser's native{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/History_API">
            History API
          </a>{" "}
          so that our application can change locations (and the URI in the
          address bar) without making a request to a server and reloading the
          page.
        </p>
        <p>
          We can import the <IJS>Browser</IJS> function from{" "}
          <IJS>@hickory/browser</IJS> in our main file (<IJS>src/main.js</IJS>,
          which <IJS>@vue/cli</IJS> created for us). To create a history object,
          we call that function.
        </p>
        <Note>
          The history object can be configured with{" "}
          <a href="https://github.com/pshrmn/hickory/blob/master/docs/api/Browser.md#options">
            an options object
          </a>, but we will stick with the defaults.
        </Note>
        <CodeBlock lang="javascript" data-line="3,9">
          {`// src/main.js
import Vue from 'vue'
import Browser from '@hickory/browser'

import App from './App.vue'

Vue.config.productionTip = false

const history = Browser()

new Vue({
  render: h => h(App)
}).$mount('#app')`}
        </CodeBlock>
        <Note>
          Eslint will complain here because we haven't actually used the new{" "}
          <IJS>history</IJS> object. We can ignore that warning for now because
          we'll get rid of it soon enough.
        </Note>
      </Section>
      <Section title="Defining the Routes" id="defining-routes">
        <p>
          Routes are JavaScript objects that define the valid locations for a
          router. They have a <IJS>name</IJS> and a <IJS>path</IJS>.
        </p>
        <CodeBlock lang="javascript">
          {`// this is a route
{ name: "Home", path: "" }`}
        </CodeBlock>
        <p>
          A route's <IJS>name</IJS> needs to be unique. We will use route names
          when we navigate within the application. A route's <IJS>path</IJS>{" "}
          describes the location pathname that it should match.
        </p>

        <Section
          title="Path basics"
          id="path-basics"
          className="aside"
          tag="h3"
        >
          <p>
            Route paths are strings describing the pathname segments they should
            match.
          </p>
          <CodeBlock lang="javascript">
            {`{ path: '' } // matches "/"
{ path: 'about/stuff' } // matches "/about/stuff"`}
          </CodeBlock>
          <p>Paths never begin with a slash.</p>
          <CodeBlock lang="javascript">
            {`// yes
{ path: '' }
// no
{ path: '/' }`}
          </CodeBlock>
          <p>
            Paths can include dynamic parameters. These are specified with a
            string that starts with a colon (<IJS>:</IJS>) followed by the name
            of the params.
          </p>
          <CodeBlock lang="javascript">
            {`// a param named "id"
{ path: ':id' }`}
          </CodeBlock>
          <p>
            Routes can be nested using the <IJS>children</IJS> property of a
            route. A nested route inherits the path from its ancestor route(s),
            so its <IJS>path</IJS> is only the additional part of the pathname
            that should be matched.
          </p>
          <CodeBlock lang="javascript">
            {`{
  name: "Parent",
  path: "parent", // matches /parent
  children: [
    // matches /parent/daughter
    { name: "Daughter", path: "daughter" },
    // matches /parent/son
    { name: "Son", path: "son" }
  ]
}`}
          </CodeBlock>
        </Section>
        <p>The website will start with four routes.</p>
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>path</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Home</td>
              <td>
                <IJS>""</IJS>
              </td>
              <td>Lists books available for purchase</td>
            </tr>
            <tr>
              <td>Book</td>
              <td>
                <IJS>"book/:id"</IJS>
              </td>
              <td>Details about an individual book</td>
            </tr>
            <tr>
              <td>Checkout</td>
              <td>
                <IJS>"checkout"</IJS>
              </td>
              <td>"Buy" the books in the shopping cart</td>
            </tr>
            <tr>
              <td>Catch All</td>
              <td>
                <IJS>"(.*)"</IJS>
              </td>
              <td>Display a not found page for all other locations</td>
            </tr>
          </tbody>
        </table>
        <Note>
          The catch all route uses a regular expression syntax to indicate that
          it should match everything. Curi uses the{" "}
          <a href="https://github.com/pillarjs/path-to-regexp">
            <IJS>path-to-regexp</IJS>
          </a>{" "}
          package for route matching. We will only be using some of its basic
          syntax, but you can read its documentation to learn about more
          advanced path syntax.
        </Note>
        <p>
          Inside of the <IJS>src</IJS> directory, we will create a{" "}
          <IJS>routes.js</IJS> file where we can define the application's
          routes.
        </p>
        <CodeBlock lang="bash">{`touch src/routes.js`}</CodeBlock>
        <CodeBlock lang="javascript">
          {`// src/routes.js
export default [
  {
    name: "Home",
    path: ""
  },
  {
    name: "Book",
    path: "book/:id"
  },
  {
    name: "Checkout",
    path: "checkout"
  },
  {
    name: "Catch All",
    path: "(.*)"
  }
];`}
        </CodeBlock>
      </Section>
      <Section title="The Router" id="router">
        <p>
          With the history object created and the routes defined, we are ready
          to create the router. Back in the <IJS>src/index.js</IJS> file, we
          should import the <IJS>curi</IJS> function from{" "}
          <IJS>@curi/router</IJS> as well as our routes from{" "}
          <IJS>src/routes.js</IJS>. Creating the router is done by calling the{" "}
          <IJS>curi()</IJS> function and passing it the <IJS>history</IJS>{" "}
          object and the <IJS>routes</IJS> array.
        </p>
        <CodeBlock lang="javascript" data-line="3,6,12">
          {`// src/main.js
import Vue from 'vue'
import { curi } from '@curi/router';
import Browser from '@hickory/browser'

import routes from './routes';
import App from './App.vue'

Vue.config.productionTip = false

const history = Browser()
const router = curi(history, routes)

new Vue({
  render: h => h(App)
}).$mount('#app')`}
        </CodeBlock>
        <Note>
          The Eslint warning has now moved to the <IJS>router</IJS>, but this is
          still nothing to worry about.
        </Note>
        <p>
          We will add router support to the Vue application using a plugin. This
          plugin does a couple of things. First, it makes some Curi components
          available within the application. The only one of these components
          that we will be using is the <Cmp>curi-link</Cmp>. Second, it makes
          router related values accessible to the components in the application.
          The router is available as <IJS>this.$router</IJS> and the{" "}
          <IJS>response</IJS> and <IJS>navigation</IJS> (we will cover these
          next) are grouped under <IJS>this.$curi</IJS>. When the{" "}
          <IJS>CuriPlugin</IJS> is installed, the <IJS>router</IJS> as passed in
          the options object.
        </p>
        <CodeBlock lang="javascript" data-line="5,14">
          {`// src/main.js
import Vue from 'vue'
import { curi } from '@curi/router';
import Browser from '@hickory/browser'
import { CuriPlugin } from '@curi/vue'

import routes from './routes';
import App from './App.vue'

Vue.config.productionTip = false

const history = Browser()
const router = curi(history, routes)
Vue.use(CuriPlugin, { router })

new Vue({
  render: h => h(App)
}).$mount('#app')`}
        </CodeBlock>
      </Section>
      <Section title="Rendering with Vue" id="rendering">
        <p>
          We can now render our application. We will re-use the provide{" "}
          <IJS>App.vue</IJS> file.
        </p>
        <Section
          title="Responses and Navigation"
          id="responses"
          className="aside"
          tag="h3"
        >
          <p>
            Whenever Curi receives a location, it matches its routes against it
            and generates a response. This is an object with data related to the
            route that matched the location. Later on we will modify this data
            ourselves, but for now the important thing to know is that the
            response lets us know about the current route.
          </p>
          <CodeBlock lang="javascript">
            {`// a sample response object
{
  body: undefined,
  data: undefined,
  error: undefined,
  location: { pathname: '/', ... },
  name: 'Home',
  params: {},
  partials: [],
  status: 200
}`}
          </CodeBlock>
          <p>
            The router uses an observer model to let functions subscribe to be
            called when a new response is generated. The <IJS>CuriPlugin</IJS>{" "}
            sets up an observer so that it can trigger a re-render whenever
            there is a new one.
          </p>
          <p>
            The <IJS>navigation</IJS> object contains additional information
            about a navigation that doesn't make sense to include in the
            response object. This includes the navigation's "action" (<IJS>
              PUSH
            </IJS>, <IJS>POP</IJS>, or <IJS>REPLACE</IJS>) and the previous
            response object. This can be useful for animation and modals.
          </p>
        </Section>
        <p>
          Most of the time, the response is the only property you will need to
          use to render, but the other two may occasionally be useful.
        </p>
        <p>
          How do we use the response to render? Any way you want. Based on the
          sample response above, the <IJS>name</IJS> stands out as the best way
          to identify which route matched. We can make this even easier by
          adding another property to the response: <IJS>body</IJS>.
        </p>
        <p>
          Earlier it was mentioned that response objects can be modified. This
          is done by returning an object from a route's <IJS>response()</IJS>{" "}
          function. <IJS>response()</IJS> receives an object with a whole bunch
          of properties that we can use to help determine how to modify the
          response, but for the time being, we don't care about any of those.
          All we need to know is that if we return an object with a{" "}
          <IJS>body</IJS> property, that value will be set on our response
          object.
        </p>
        <CodeBlock lang="javascript">
          {`{
  name: "Home",
  path: "",
  response() {
    return {
      body: "Home, sweet home."
    };
    /*
      * response = {
      *   body: "Home, sweet home.",
      *   // ...
      * }
      */
  }
}`}
        </CodeBlock>
        <p>
          If the return object's <IJS>body</IJS> property is a Vue component, we
          can render it using <Cmp>Component :is</Cmp>.
        </p>
        <p>
          We haven't actually defined components for our routes yet, so we
          should throw together some placeholders.
        </p>
        <CodeBlock lang="bash">
          {`touch src/components/Home.vue src/components/Book.vue \\
  src/components/Checkout.vue src/components/NotFound.vue`}
        </CodeBlock>
        <CodeBlock lang="html">
          {`<!-- src/components/Home.vue -->
<template>
  <div>Home</div>
</template>`}
        </CodeBlock>
        <CodeBlock lang="html">
          {`<!-- src/components/Book.vue -->
<template>
  <div>Book</div>
</template>`}
        </CodeBlock>
        <CodeBlock lang="html">
          {`<!-- src/components/Checkout.vue -->
<template>
  <div>Checkout</div>
</template>`}
        </CodeBlock>
        <CodeBlock lang="html">
          {`<!-- src/components/NotFound.vue -->
<template>
  <div>Not Found</div>
</template>`}
        </CodeBlock>
        <p>
          These components can be imported in <IJS>src/routes.js</IJS> and
          attached to their respective routes.
        </p>
        <CodeBlock lang="javascript" data-line="2-5,11-15,20-24,29-33,38-42">
          {`// src/routes.js
import Home from './components/Home';
import Book from './components/Book';
import Checkout from './components/Checkout';
import NotFound from './components/NotFound';

export default [
  {
    name: "Home",
    path: "",
    response() {
      return {
        body: Home
      };
    }
  },
  {
    name: "Book",
    path: "book/:id",
    response() {
      return {
        body: Book
      };
    }
  },
  {
    name: "Checkout",
    path: "checkout",
    response() {
      return {
        body: Checkout
      };
    }
  },
  {
    name: "Catch All",
    path: "(.*)",
    response() {
      return {
        body: NotFound
      };
    }
  }
];`}
        </CodeBlock>
        <p>
          We can now update <IJS>App.vue</IJS> to render{" "}
          <IJS>response.body</IJS> as a component, which as mentioned above is
          available through <IJS>this.$curi</IJS>.
        </p>

        <CodeBlock lang="html">
          {`<!-- src/App.vue -->
<template>
  <component :is="$curi.response.body" />
</template>
`}
        </CodeBlock>
        <p>
          We can also remove the <Cmp>HelloWorld</Cmp> component.
        </p>
        <CodeBlock lang="bash">{`rm src/components/HelloWorld.vue`}</CodeBlock>
        <p>
          At this point in time our app is rendering, but is isn't very
          interesting because we cannot navigate between locations.
        </p>
      </Section>
      <Section title="Navigating between locations" id="navigating">
        <p>
          The <IJS>CuriPlugin</IJS> makes a <Cmp>curi-link</Cmp> component
          available with the appliaction. We can use that to navigate between
          locations within our application.
        </p>
        <Section
          title={
            <span>
              The <Cmp>curi-link</Cmp> Component
            </span>
          }
          id="link-component"
          className="aside"
          tag="h3"
        >
          <p>
            Navigation isn't done by manually typing the pathname of the
            location the link should navigate to. Instead, we specify the name
            of the route using the <IJS>to</IJS> prop.
          </p>
          <CodeBlock lang="html">
            {`<!-- { name: "Home", path: "" } -->
<curi-link to="Home">Home</curi-link>
<!-- <a href="/">Home</a> -->`}
          </CodeBlock>
          <p>
            If a route has params, we provide these to the <Cmp>curi-link</Cmp>{" "}
            as a <IJS>params</IJS> object. For a nested route, we would also
            need to provide params for any ancestor routes.
          </p>
          <CodeBlock lang="html">
            {`<!-- { name: "Book", path: "book/:id" } -->
<curi-link to="Book" :params="{ id: 7 }">The Dark Forest</curi-link>
<!-- <a href="/book/7">The Dark Forest</a> -->`}
          </CodeBlock>
          <p>
            The <Cmp>curi-link</Cmp> is only for in-app navigation. If you want
            to link to pages outside of the application, use an anchor.
          </p>
          <CodeBlock lang="html">
            {`<!-- in-app -->
<curi-link to="Some Route">Some Route</curi-link>

<!-- out of app -->
<a href="https://github.com">GitHub</a>`}
          </CodeBlock>
          <p>
            If you need to attach query or hash data to a <Cmp>curi-link</Cmp>,
            use the <IJS>query</IJS> and <IJS>hash</IJS> props.
          </p>
          <CodeBlock lang="html">
            {`<!-- { name: "Checkout", path: "checkout" } -->
<curi-link to="Checkout" :query="a=123">Checkout</curi-link>
<!-- <a href="/checkout?a=123">Checkout</a> -->`}
          </CodeBlock>
        </Section>

        <Section title="A Navigation Menu" id="nav-menu" tag="h3">
          <p>
            We will start with creating a navigation menu component with links
            to our home page and checkout page.
          </p>
          <CodeBlock lang="bash">{`touch src/components/NavMenu.vue`}</CodeBlock>
          <CodeBlock lang="html">
            {`<!-- src/components/NavMenu.vue -->
<template>
  <nav>
    <ul>
      <li>
        <curi-link to="Home">Home</curi-link>
      </li>
      <li>
        <curi-link to="Checkout">Checkout</curi-link>
      </li>
    </ul>
  </nav>
</template>`}
          </CodeBlock>
          <p>
            We can import that in our <IJS>App.vue</IJS> file and add it to our
            template. This is a good opportunity to also add some structure to
            the elements in the template.
          </p>
          <CodeBlock lang="html">
            {`<!-- src/App.vue -->
<template>
  <div>
    <header>
      <nav-menu />
    </header>
    <main>
      <component :is="$curi.response.body" />
    </main>
  </div>
</template>

<script type="src/javascript">
  import NavMenu from './components/NavMenu';

  export default {
    name: 'app',
    components: {
      'nav-menu': NavMenu
    }
  };
</script>`}
          </CodeBlock>
        </Section>

        <Section title="Linking to Books" id="book-links" tag="h3">
          <p>
            We want to be able to link to individual books from the home page.
            First, we need data about the books. For now, we're going to
            hard-code the books in the <IJS>src/books.js</IJS> module.
          </p>
          <CodeBlock lang="bash">{`touch src/books.js`}</CodeBlock>
          <p>
            You can copy+paste or modify the data, but the structure of the
            provided data should stay the same.
          </p>
          <CodeBlock lang="javascript">
            {`// src/books.js
export default [
  {
    id: 0,
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    published: '2007',
    pages: 662
  },
  {
    id: 1,
    title: "The Wise Man's Fear",
    author: 'Patrick Rothfuss',
    published: '2011',
    pages: 994
  },
  {
    id: 2,
    title: 'The Way of Kings',
    author: 'Brandon Sanderson',
    published: '2010',
    pages: 1007
  },
  {
    id: 3,
    title: 'A Storm of Swords',
    author: 'George R.R. Martin',
    published: '2003',
    pages: 1177
  },
  {
    id: 78,
    title: 'Words of Radiance',
    author: 'Brandon Sanderson',
    published: '2014',
    pages: 1087
  }
];`}
          </CodeBlock>
          <p>
            The data can be imported in the <Cmp>Home</Cmp> component. We will
            iterate over the books with a <Cmp>Link</Cmp> to each one.
          </p>
          <CodeBlock lang="html">
            {`<!-- src/components/Home.vue -->
<template>
  <div>
    <ul>
      <li v-for="b in books" :key="b.id">
        <curi-link to="Book" :params="{ id: b.id }">
          {{b.title}} by {{b.author}}
        </curi-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import books from '../books';

  export default {
    name: 'home',
    data() {
      return { books };
    }
  }
</script>`}
          </CodeBlock>
          <p>
            Now that we can navigate to the books, we should fill out the UI for
            the <Cmp>Book</Cmp> component. We will once again import the{" "}
            <IJS>books.js</IJS> data. We can use <IJS>params.id</IJS> to select
            the correct book. <IJS>params.id</IJS> is a string, so we will need
            to parse it into an integer. Sometimes there won't be a valid book
            for the <IJS>params.id</IJS>. In that case, we will also want to
            display a message that the requested book could not be found.
          </p>
          <CodeBlock lang="html">
            {`<!-- src/components/Book.vue -->
<template>
  <div v-if="book">
    <h1>{{book.title}}</h1>
    <h2>by {{book.author}}</h2>
    <p>Published in {{book.published}}</p>
    <p>{{book.pages}} pages</p>
  </div>
  <div v-else>
    The requested book could not be found
  </div>
</template>

<script>
  import books from '../books';

  export default {
    name: 'book',
    computed: {
      book() {
        const id = parseInt(this.$curi.response.params.id, 10);
        return books.find(b => b.id === id);
      }
    }
  }
</script>`}
          </CodeBlock>
        </Section>
      </Section>
      <Section title="Let's go shopping" id="shopping">
        <p>
          We want to be able to add books to our shopping cart. Since this is a
          play site, we will store the cart data in memory.
        </p>
        <CodeBlock lang="bash">{`touch src/cart.js`}</CodeBlock>
        <p>
          The shopping cart implementation will be a JavaScript <IJS>Map</IJS>.
          We can call its <IJS>set</IJS> method to add books, its{" "}
          <IJS>clear</IJS> method to reset the cart, and iterate over its{" "}
          <IJS>entries</IJS> with a <IJS>for...of</IJS> loop.
        </p>
        <CodeBlock lang="javascript">
          {`// src/cart.js
const cart = new Map();

export default {
  add(book, quantity) {
    cart.set(book, quantity);
  },
  items() {
    const books = [];
    for (let [book, quantity] of cart.entries()) {
      books.push({
        title: book.title,
        quantity
      });
    }
    return books;
  },
  reset() {
    cart.clear();
    return [];
  }
};`}
        </CodeBlock>
        <p>
          As stated above, we can access our <IJS>router</IJS> in the{" "}
          <Cmp>Book</Cmp> component using <IJS>this.$router</IJS>. The router's{" "}
          <IJS>navigate()</IJS> function can be used to navigate to a new
          location. This means that when the user clicks a button to add a book
          to their shopping cart, we can automatically navigate to the checkout
          page.
        </p>

        <Section
          title="Navigate Method"
          id="nav-method"
          className="aside"
          tag="h3"
        >
          <p>
            <IJS>router.navigate()</IJS> is used to navigate to new locations.
            There are three methods of navigation: <IJS>PUSH</IJS>,{" "}
            <IJS>REPLACE</IJS>, and <IJS>ANCHOR</IJS>.
          </p>
          <p>
            <IJS>PUSH</IJS> pushes a new location after the current index,
            removing any locations after the current location.
          </p>
          <CodeBlock lang="javascript">
            {`// session = ['/one', '/two', '/three'], index = 1
router.navigate({ name: "New", method: "PUSH" });
// session = ['/one', '/two', '/new'], index = 2`}
          </CodeBlock>
          <p>
            <IJS>REPLACE</IJS> replaces the location at the current index.
          </p>
          <CodeBlock lang="javascript">
            {`// session = ['/one', '/two', '/three'], index = 1
router.navigate({ name: "Replace", method: "REPLACE" });
// session = ['/one', '/replacement', '/three'], index = 1`}
          </CodeBlock>
          <p>
            <IJS>ANCHOR</IJS> is a mix between <IJS>PUSH</IJS> and{" "}
            <IJS>REPLACE</IJS>. It mimics the behavior of clicking on links, so
            if you navigate to the same location as the current one it will
            replace, and if you navigate to a new location it will push.
          </p>
          <p>
            If <IJS>method.navigate()</IJS> is called without a navigation{" "}
            <IJS>method</IJS>, it will default to <IJS>ANCHOR</IJS>.
          </p>
          <CodeBlock lang="javascript">
            {`// session = ['/one', '/two', '/three'], index = 1
router.navigate({ name: "Two", method: "ANCHOR" });
// session = ['/one', '/two', '/three'], index = 1
router.navigate({ name: "New", method: "ANCHOR" });
// session = ['/one', '/two', '/new'], index = 2`}`}
          </CodeBlock>
        </Section>
        <p>
          We also want to import our shopping cart API so that we can add a book
          to the cart.
        </p>
        <CodeBlock lang="html" data-line="8-10,19,29-35">
          {`<!-- src/components/Book.vue -->
<template>
  <div v-if="book">
    <h1>{{book.title}}</h1>
    <h2>by {{book.author}}</h2>
    <p>Published in {{book.published}}</p>
    <p>{{book.pages}} pages</p>
    <button type="button" v-on:click="onClick">
      Add to Cart
    </button>
  </div>
  <div v-else>
    The requested book could not be found
  </div>
</template>

<script>
  import books from '../books';
  import cart from '../cart';

  export default {
    name: 'book',
    computed: {
      book() {
        const id = parseInt(this.$curi.response.params.id, 10);
        return books.find(b => b.id === id);
      }
    },
    methods: {
      onClick: function() {
        cart.add(this.book, 1);
        this.$router.navigate({ name: "Checkout" });
      }
    }
  }
</script>`}
        </CodeBlock>
        <p>
          Finally, we can update our <Cmp>Checkout</Cmp> component to display
          the books in the shopping cart. To do this, we will import our cart
          and books. Our cart only stores book <IJS>id</IJS>s, so we will need
          to merge the book data with the cart data.
        </p>
        <p>
          When a user "buys" the books in their shopping cart, we need to clear
          out the cart. We will also replace the current location with one whose{" "}
          <IJS>location.hash</IJS> is the string "thanks". When that is present
          in the URI, we can render a "Thanks for your purchase" message to
          "confirm" the purchase.
        </p>
        <CodeBlock lang="html">
          {`<!-- src/components/Checkout.vue -->
<template>
  <div v-if="books.length">
    <h1>Checkout</h1>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.title">
          <td>{{book.title}}</td>
          <td>{{book.quantity}}</td>
        </tr>
      </tbody>
    </table>
    <button type="button" v-on:click="onClick">
      Buy
    </button>
  </div>
  <div v-else-if="$curi.response.location.hash === 'thanks'">
    Thanks for your purchase!
  </div>
  <div v-else>
    The cart is currently empty
  </div>
</template>

<script>
  import cart from '../cart';

  export default {
    name: 'checkout',
    data() {
      return {
        books: cart.items()
      };
    },
    methods: {
      onClick: function() {
        this.books = cart.reset();
        this.$router.navigate(
          { name: "Checkout",
          hash: "thanks",
          method: "REPLACE"
        });
      }
    }
  }
</script>`}
        </CodeBlock>
      </Section>
      <Section title="What's next?" id="next">
        <p>
          We now have a functional website built with Vue and Curi. What should
          you do next? Build another site! You can also check out the{" "}
          <Link name="Guides">guides</Link> for information on advanced
          techniques.
        </p>
      </Section>
    </React.Fragment>
  );
}
