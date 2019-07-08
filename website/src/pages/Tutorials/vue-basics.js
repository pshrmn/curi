import React from "react";
import { Link } from "@curi/react-dom";

import {
  PlainSection,
  HashSection,
  HashAside,
  CodeBlock,
  Outline,
  Note,
  IJS,
  Cmp,
  ScrollableTable
} from "../../components/tutorial/common";

const demoMeta = {
  title: "Demo",
  hash: "demo"
};

const setupMeta = { title: "Setup", hash: "setup" };

const historyMeta = { title: "History and Locations", hash: "history" };

const pathMeta = {
  title: "Path basics",
  hash: "path-basics"
};
const routesMeta = {
  title: "Defining the Routes",
  hash: "defining-routes",
  children: [pathMeta]
};

const a11yMeta = {
  title: "Announcing Navigation",
  hash: "announcing-navigation"
};
const pluginMeta = { title: "The Vue Plugin", hash: "plugin" };
const routerMeta = {
  title: "The Router",
  hash: "router",
  children: [a11yMeta, pluginMeta]
};

const responseMeta = {
  title: "Responses and Navigation",
  hash: "responses"
};
const renderingMeta = {
  title: "Rendering with Vue",
  hash: "rendering",
  children: [responseMeta]
};

const linkMeta = {
  title: "The <curi-link> Component",
  hash: "link-component"
};
const menuMeta = { title: "A Navigation Menu", hash: "nav-menu" };
const bookLinkMeta = { title: "Linking to Books", hash: "book-links" };
const navigatingMeta = {
  title: "Navigating between locations",
  hash: "navigating",
  children: [linkMeta, menuMeta, bookLinkMeta]
};

const urlAndNavigateMeta = {
  title: "The Router's URL & Navigate Methods",
  hash: "url-nav-method"
};
const shoppingMeta = {
  title: "Let's go shopping",
  hash: "shopping",
  children: [urlAndNavigateMeta]
};

const nextMeta = { title: "What's next?", hash: "next" };

const contents = [
  //demoMeta,
  setupMeta,
  historyMeta,
  routesMeta,
  routerMeta,
  renderingMeta,
  navigatingMeta,
  shoppingMeta,
  nextMeta
];

function VueBasicsTutorial() {
  return (
    <React.Fragment>
      <PlainSection>
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
      </PlainSection>

      {/*<HashSection meta={demoMeta} tag="h2">
      <p>You can run a demo of the site we are building with CodeSandbox.</p>

      <CodeSandboxDemo
        id="github/curijs/vue-basic-tutorial/tree/master/"
        title="Curi Vue basic tutorial"
      />
</HashSection>*/}

      <HashSection meta={setupMeta} tag="h2">
        <p>
          We will be using{" "}
          <a href="https://github.com/vuejs/vue-cli">
            <IJS>@vue/cli</IJS>
          </a>{" "}
          to develop this website.
        </p>

        <Note>
          <p>
            The instructions here assume that you have NodeJS and NPM > 5.2
            installed on your computer. If you do not, cannot, or prefer to
            avoid setup altogether, you can follow along using{" "}
            <a href="https://codesandbox.io/">CodeSandbox</a>. Some of the
            boilerplate will be different, but the differences are minor.
          </p>
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
      </HashSection>

      <HashSection meta={historyMeta} tag="h2">
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
          The routes define what the application renders for a particular
          location, but we also need to define how the application navigates.
          When we create the router, we will pass it a history function that
          will be used to enable navigation.
        </p>

        <p>
          Curi uses the <a href="https://github.com/pshrmn/hickory">Hickory</a>{" "}
          library for its history. There are a few Hickory packages to choose
          from for different environments. For most websites, the{" "}
          <IJS>@hickory/browser</IJS> is the right choice for the front end.
        </p>

        <p>
          We can import the <IJS>browser</IJS> function from{" "}
          <IJS>@hickory/browser</IJS> in our index file (<IJS>src/index.js</IJS>
          , which <IJS>create-react-app</IJS> created for us).
        </p>

        <CodeBlock lang="javascript" data-line="3">
          {`// src/main.js
import Vue from 'vue';
import { browser } from '@hickory/browser';

import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={routesMeta} tag="h2">
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

        <HashAside meta={pathMeta} tag="h3">
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
        </HashAside>

        <p>The website will start with four routes.</p>

        <ScrollableTable>
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
        </ScrollableTable>

        <Note>
          <p>
            The catch all route uses a regular expression syntax to indicate
            that it should match everything. Curi uses the{" "}
            <a href="https://github.com/pillarjs/path-to-regexp">
              <IJS>path-to-regexp</IJS>
            </a>{" "}
            package for route matching. We will only be using some of its basic
            syntax, but you can read its documentation to learn about more
            advanced path syntax.
          </p>
        </Note>

        <p>
          Inside of the <IJS>src</IJS> directory, we will create a{" "}
          <IJS>routes.js</IJS> file where we can define the application's
          routes.
        </p>

        <CodeBlock lang="bash">{`touch src/routes.js`}</CodeBlock>

        <p>We can create an array of routes using the above names and paths.</p>
        <p>
          <IJS>@curi/router</IJS> provides a <IJS>prepareRoutes</IJS> function,
          which is used to setup routes for the router. We will pass the routes
          array to <IJS>prepareRoutes</IJS> and export the result of that
          function call.
        </p>

        <CodeBlock lang="javascript">
          {`// src/routes.js
import { prepareRoutes } from "@curi/router";

export default prepareRoutes([
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
]);`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={routerMeta} tag="h2">
        <p>
          With the history object created and the routes defined, we are ready
          to create the router. Back in the <IJS>src/index.js</IJS> file, we
          should import the <IJS>createRouter</IJS> function from{" "}
          <IJS>@curi/router</IJS> as well as our routes from{" "}
          <IJS>src/routes.js</IJS>. Creating the router is done by calling the{" "}
          <IJS>createRouter</IJS> function and passing it the history function
          and the <IJS>routes</IJS> array.
        </p>

        <CodeBlock lang="javascript" data-line="3,6,11">
          {`// src/main.js
import Vue from 'vue';
import { createRouter } from "@curi/router";
import { browser } from '@hickory/browser';

import routes from './routes';
import App from './App.vue';

Vue.config.productionTip = false;

const router = createRouter(browser, routes);

new Vue({
  render: h => h(App)
}).$mount('#app')`}
        </CodeBlock>

        <Note>
          <p>
            The Eslint warning has now moved to the <IJS>router</IJS>, but this
            is still nothing to worry about.
          </p>
        </Note>

        <p>
          The router is now ready and we can render the application, but first
          we should do something really important: make the site more
          accessible.
        </p>

        <HashSection meta={a11yMeta} tag="h3">
          <p>
            In a multi-page application, a screen reader will announce
            navigation to users. This happens automatically when a new Document
            is loaded. A single-page application reuses its Document, which is
            great for removing unnecessary server requests, but also means that
            the navigation is no longer automatically announced.
          </p>

          <p>
            Curi has a concept of "side effects". These are functions that are
            called after a navigation happens and are passed an object with data
            about the navigation.
          </p>

          <p>
            The <IJS>@curi/router</IJS> package provides a few side effects that
            are useful for websites. For now, we will focus on the{" "}
            <Link
              name="Package"
              params={{ package: "router", version: "v2" }}
              hash="announce"
            >
              <IJS>announce</IJS>
            </Link>{" "}
            side effect. The <IJS>announce</IJS> side effect returns a string,
            which sets the text content of a{" "}
            <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions">
              ARIA Live region
            </a>
            . Screen readers will detect the changed text and read it to the
            users.
          </p>

          <p>
            Let's go ahead and add the <IJS>announce</IJS> side effect to the
            router. We will have it return a string of the response's{" "}
            <IJS>pathname</IJS>.
          </p>

          <CodeBlock lang="javascript" data-line="3,11-17">
            {`// src/main.js
import Vue from 'vue';
import { createRouter, announce } from "@curi/router";
import { browser } from '@hickory/browser';

import routes from './routes';
import App from './App.vue';

Vue.config.productionTip = false;

const router = createRouter(browser, routes, {
  sideEffects: [
    announce(({ response }) => {
      return \`Navigated to \${response.location.pathname}\`;
    })
  ]
});

new Vue({
  render: h => h(App)
}).$mount('#app');`}
          </CodeBlock>
        </HashSection>

        <HashSection meta={pluginMeta} tag="h3">
          <p>
            We will add router support to the Vue application using a plugin.
            This plugin does a couple of things. First, it makes some Curi
            components available within the application. The only one of these
            components that we will be using is the <IJS>curi-link</IJS>.
            Second, it makes router related values accessible to the components
            in the application. The router is available as{" "}
            <IJS>this.$router</IJS> and the <IJS>response</IJS> and{" "}
            <IJS>navigation</IJS> (we will cover these next) are grouped under{" "}
            <IJS>this.$curi</IJS>. When the <IJS>CuriPlugin</IJS> is installed,
            the <IJS>router</IJS> as passed in the options object.
          </p>

          <CodeBlock lang="javascript" data-line="5,19">
            {`// src/main.js
import Vue from 'vue'
import { createRouter, announce } from "@curi/router";
import { browser } from '@hickory/browser';
import { CuriPlugin } from '@curi/vue';

import routes from './routes';
import App from './App.vue';

Vue.config.productionTip = false;

const router = createRouter(browser, routes, {
  sideEffects: [
    announce(({ response }) => {
      return \`Navigated to \${response.location.pathname}\`;
    })
  ]
});
Vue.use(CuriPlugin, { router });

new Vue({
  render: h => h(App)
}).$mount('#app');`}
          </CodeBlock>
        </HashSection>
      </HashSection>

      <HashSection meta={renderingMeta} tag="h2">
        <p>
          We can now render our application. We will re-use the provide{" "}
          <IJS>App.vue</IJS> file.
        </p>

        <HashAside meta={responseMeta} tag="h3">
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
  location: { pathname: '/', ... },
  name: 'Home',
  params: {},
  partials: [],
  meta: {
    status: 200
  }
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
            response object. This includes the navigation's "action" (
            <IJS>push</IJS>, <IJS>pop</IJS>, or <IJS>replace</IJS>) and the
            previous response object. This can be useful for animation and
            modals.
          </p>
        </HashAside>

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
          is done by returning an object from a route's <IJS>respond</IJS>{" "}
          function. <IJS>respond</IJS> receives an object with a whole bunch of
          properties that we can use to help determine how to modify the
          response, but for the time being, we don't care about any of those.
          All we need to know is that if we return an object with a{" "}
          <IJS>body</IJS> property, that value will be set on our response
          object.
        </p>

        <CodeBlock lang="javascript">
          {`{
  name: "Home",
  path: "",
  respond() {
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
  <article>
    <p>Home</p>
  </article>
</template>`}
        </CodeBlock>

        <CodeBlock lang="html">
          {`<!-- src/components/Book.vue -->
<template>
  <article>
    <p>Book</p>
  </article>
</template>`}
        </CodeBlock>

        <CodeBlock lang="html">
          {`<!-- src/components/Checkout.vue -->
<template>
  <article>
    <p>Checkout</p>
  </article>
</template>`}
        </CodeBlock>

        <CodeBlock lang="html">
          {`<!-- src/components/NotFound.vue -->
<template>
  <article>
    <p>Not Found</p>
  </article>
</template>`}
        </CodeBlock>

        <p>
          These components can be imported in <IJS>src/routes.js</IJS> and
          attached to their respective routes.
        </p>

        <CodeBlock lang="javascript" data-line="4-7,14-18,23-27,32-36,41-45">
          {`// src/routes.js
import { prepareRoutes } from "@curi/router";

import Home from './components/Home';
import Book from './components/Book';
import Checkout from './components/Checkout';
import NotFound from './components/NotFound';

export default prepareRoutes([
  {
    name: "Home",
    path: "",
    respond() {
      return {
        body: Home
      };
    }
  },
  {
    name: "Book",
    path: "book/:id",
    respond() {
      return {
        body: Book
      };
    }
  },
  {
    name: "Checkout",
    path: "checkout",
    respond() {
      return {
        body: Checkout
      };
    }
  },
  {
    name: "Catch All",
    path: "(.*)",
    respond() {
      return {
        body: NotFound
      };
    }
  }
]);`}
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
          We can also remove the <IJS>HelloWorld</IJS> component.
        </p>

        <CodeBlock lang="bash">{`rm src/components/HelloWorld.vue`}</CodeBlock>

        <p>
          At this point in time our app is rendering, but is isn't very
          interesting because we cannot navigate between locations.
        </p>
      </HashSection>

      <HashSection meta={navigatingMeta} tag="h2">
        <p>
          The <IJS>CuriPlugin</IJS> makes a <IJS>curi-link</IJS> component
          available with the appliaction. We can use that to navigate between
          locations within our application.
        </p>

        <HashAside meta={linkMeta} tag="h3">
          <p>
            Navigation isn't done by manually typing the pathname of the
            location the link should navigate to. Instead, we specify the name
            of the route using the <IJS>name</IJS> prop.
          </p>

          <CodeBlock lang="html">
            {`<!-- { name: "Home", path: "" } -->
<curi-link name="Home">Home</curi-link>
<!-- <a href="/">Home</a> -->`}
          </CodeBlock>

          <p>
            If a route has params, we provide these to the <IJS>curi-link</IJS>{" "}
            as a <IJS>params</IJS> object. For a nested route, we would also
            need to provide params for any ancestor routes.
          </p>

          <CodeBlock lang="html">
            {`<!-- { name: "Book", path: "book/:id" } -->
<curi-link name="Book" :params="{ id: 7 }">The Dark Forest</curi-link>
<!-- <a href="/book/7">The Dark Forest</a> -->`}
          </CodeBlock>

          <p>
            The <IJS>curi-link</IJS> is only for in-app navigation. If you want
            to link to pages outside of the application, use an anchor.
          </p>

          <CodeBlock lang="html">
            {`<!-- in-app -->
<curi-link name="Some Route">Some Route</curi-link>

<!-- out of app -->
<a href="https://github.com">GitHub</a>`}
          </CodeBlock>

          <p>
            If you need to attach query or hash data to a <IJS>curi-link</IJS>,
            use the <IJS>query</IJS> and <IJS>hash</IJS> props.
          </p>

          <CodeBlock lang="html">
            {`<!-- { name: "Checkout", path: "checkout" } -->
<curi-link name="Checkout" :query="a=123">Checkout</curi-link>
<!-- <a href="/checkout?a=123">Checkout</a> -->`}
          </CodeBlock>
        </HashAside>

        <HashSection meta={menuMeta} tag="h3">
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
        <curi-link name="Home">Home</curi-link>
      </li>
      <li>
        <curi-link name="Checkout">Checkout</curi-link>
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
        </HashSection>

        <HashSection meta={bookLinkMeta} tag="h3">
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
            The data can be imported in the <IJS>Home</IJS> component. We will
            iterate over the books with a <IJS>curi-link</IJS> to each one.
          </p>

          <CodeBlock lang="html">
            {`<!-- src/components/Home.vue -->
<template>
  <article>
    <ul>
      <li v-for="b in books" :key="b.id">
        <curi-link name="Book" :params="{ id: b.id }">
          {{b.title}} by {{b.author}}
        </curi-link>
      </li>
    </ul>
  </article>
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
            the <IJS>Book</IJS> component. We will once again import the{" "}
            <IJS>books.js</IJS> data. We can use <IJS>params.id</IJS> to select
            the correct book. <IJS>params.id</IJS> is a string, so we will need
            to parse it into an integer. Sometimes there won't be a valid book
            for the <IJS>params.id</IJS>. In that case, we will also want to
            display a message that the requested book could not be found.
          </p>

          <CodeBlock lang="html">
            {`<!-- src/components/Book.vue -->
<template>
  <article v-if="book">
    <h1>{{book.title}}</h1>
    <h2>by {{book.author}}</h2>
    <p>Published in {{book.published}}</p>
    <p>{{book.pages}} pages</p>
  </article>
  <article v-else>
    <p>
      The requested book could not be found
    </p>
  </article>
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
        </HashSection>
      </HashSection>

      <HashSection meta={shoppingMeta} tag="h2">
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
          <IJS>Book</IJS> component using <IJS>this.$router</IJS>. The router's{" "}
          <IJS>navigate</IJS> function can be used to navigate to a new
          location. This means that when the user clicks a button to add a book
          to their shopping cart, we can automatically navigate to the checkout
          page.
        </p>

        <HashAside meta={urlAndNavigateMeta} tag="h3">
          <p>
            The router has a <IJS>url</IJS> method that is used to generate a
            URL string using the name of a route and an object of the route's
            params.
          </p>

          <CodeBlock>{`const url = router.url({ name: "New" });`}</CodeBlock>

          <p>
            The router's <IJS>navigate</IJS> method is used to navigate; it
            takes a URL (such as one defined using <IJS>router.url</IJS>). The
            function can also take a <IJS>method</IJS> type for the navigation:{" "}
            <IJS>push</IJS>, <IJS>replace</IJS>, or <IJS>anchor</IJS>.
          </p>

          <p>
            <IJS>push</IJS> pushes a new location after the current index,
            removing any locations after the current location.
          </p>

          <CodeBlock>
            {`// session = ['/one', '/two', '/three']
// index = 1
// current = '/two'
router.navigate({ url: "/new", method: "push" });
// session = ['/one', '/two', '/new']
// index = 2
// current = '/new'`}
          </CodeBlock>

          <p>
            <IJS>replace</IJS> replaces the location at the current index.
          </p>

          <CodeBlock>
            {`// session = ['/one', '/two', '/three']
// index = 1
// current = '/two'
router.navigate({ url: "/replacement", method: "replace" });
// session = ['/one', '/replacement', '/three']
// index = 1
// current = '/replacement'`}
          </CodeBlock>

          <p>
            <IJS>anchor</IJS> is a mix between <IJS>push</IJS> and{" "}
            <IJS>replace</IJS>. It mimics the behavior of clicking on links, so
            if you navigate to the same location as the current one it will
            replace, and if you navigate to a new location it will push.
          </p>
          <p>
            If <IJS>method.navigate</IJS> is called without a navigation{" "}
            <IJS>method</IJS>, it will default to <IJS>anchor</IJS>.
          </p>

          <CodeBlock>
            {`// session = ['/one', '/two', '/three']
// index = 1
// current = '/two'
router.navigate({ url: "/two", method: "anchor" });
// session = ['/one', '/two', '/three']
// index = 1
// current = '/two'
router.navigate({ url: "/new", method: "anchor" });
// session = ['/one', '/two', '/new']
// index = 2
// current = '/new'`}
            `}
          </CodeBlock>
        </HashAside>

        <p>
          We also want to import our shopping cart API so that we can add a book
          to the cart.
        </p>

        <CodeBlock lang="html" data-line="8-10,19,29-35">
          {`<!-- src/components/Book.vue -->
<template>
  <article v-if="book">
    <h1>{{book.title}}</h1>
    <h2>by {{book.author}}</h2>
    <p>Published in {{book.published}}</p>
    <p>{{book.pages}} pages</p>
    <button type="button" v-on:click="onClick">
      Add to Cart
    </button>
  </article>
  <article v-else>
    <p>
      The requested book could not be found
    </p>
  </article>
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
        const url = this.$router.url({ name: "Checkout "});
        this.$router.navigate({ url });
      }
    }
  }
</script>`}
        </CodeBlock>

        <p>
          Finally, we can update our <IJS>Checkout</IJS> component to display
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
  <article v-if="books.length">
    <h1>Checkout</h1>
    <ScrollableTable>
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
    </ScrollableTable>
    <button type="button" v-on:click="onClick">
      Buy
    </button>
  </article>
  <article v-else-if="$curi.response.location.hash === 'thanks'">
    <p>Thanks for your purchase!</p>
  </article>
  <article v-else>
    <p>The cart is currently empty</p>
  </article>
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
        const url = this.$router.url({
          name: "Checkout",
          hash: "thanks"
        });
        this.$router.navigate({ url, method: "replace" });
      }
    }
  }
</script>`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={nextMeta} tag="h2">
        <p>
          We now have a functional website built with Vue and Curi. What should
          you do next? Build another site! You can also check out the{" "}
          <Link name="Guides">guides</Link> for information on advanced
          techniques.
        </p>
      </HashSection>
    </React.Fragment>
  );
}

export { VueBasicsTutorial as component, contents };
