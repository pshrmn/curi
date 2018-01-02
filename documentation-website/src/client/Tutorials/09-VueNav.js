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
    <h1>Part 9: Forms & Programmatic Navigation</h1>
    <p>
      In this tutorial, we are going to be using another property of our Curi
      router: <IJS>history</IJS>. This property is the Hickory history instance.
      We will use it to perform navigation between pages in our website.
    </p>
    <div>
      <p>In this tutorial, we will be doing the following:</p>
      <ul>
        <li>
          Creating another fake API, this time for getting/setting items in our
          shopping cart.
        </li>
        <li>
          Adding the ability to add books to the shopping cart from the "Book"
          page.
        </li>
        <li>
          Displaying books in the shopping cart from the "Checkout" page and
          allowing users to "purchase" their selected books.
        </li>
        <li>
          Performing programmatic navigation to automatically navigate to
          another location.
        </li>
      </ul>
    </div>
    <TutorialBranch name="09-nav-vue" />
    <Section title="The (Fake) API" id="API">
      <p>
        Since we do not have a backend to store the books that a user wants to
        purchase, we will simulate this using <IJS>localStorage</IJS>. This will
        be done by maintaining an object whose keys are book <IJS>id</IJS>s and
        whose values is how many of that book should be purchased.
      </p>
      <p>
        Our API should export three methods: the first will get the current
        state of the shopping cart, the second will update the shopping cart,
        and the third will reset the shopping cart.
      </p>
      <PrismBlock lang="javascript">
        {`// api/shoppingCart.js
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// read from localStorage and parse the value
export function getCart() {
  let cart = JSON.parse(localStorage.getItem('cart'));
  // initialize cart if it doesn't already exist
  if (cart == null) {
    cart = {};
    saveCart(cart);
  }
  return Promise.resolve(cart);
}

// add the book and count to the cart
export function updateCart(bookID, count) {
  return getCart()
    .then(cart => {
      cart[bookID] = count;
      saveCart(cart);
      return cart;
    });
}

// reset the cart to an empty object
export function resetCart() {
  const cart = {};
  saveCart(cart);
}`}
      </PrismBlock>
      <Note>
        We are using <IJS>localStorage</IJS>, which is synchronous, but our API
        functions return Promises to simulate having to make these requests to
        the server.
      </Note>
      <p>
        We will need to access this API in two places. Our "Book" pages need to
        use <IJS>updateCart</IJS> in order to add books to the shopping cart.
        The "Checkout" page need to know which books (and how many of each) are
        currently in the shopping cart. The page should also clear the cart out
        after a user has "purchased" the book in their shopping cart.
      </p>
    </Section>
    <Section title="Adding Books to the Shopping Cart" id="add-books">
      <p>
        On the "Book" page, users should be able to specify how many copies of a
        book they want to purchase and add those to their shopping cart. We will
        do this by adding a new component, <Cmp>AddToCart</Cmp>.
      </p>
      <p>
        We can start by creating a component with renders a <Cmp>select</Cmp>.
        Users can buy 1-4 copies of a book (an arbitrary restriction), so we
        need an <Cmp>option</Cmp> for each possible value.
      </p>
      <PrismBlock lang="html">
        {`<!-- components/AddToCart.vue -->
<template>
  <form>
    <select v-model="count">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </select>
  </form>
</template>

<script>
  export default {
    data: function() {
      return {
        count: '1'
      };
    }
  };
</script>
`}
      </PrismBlock>
      <p>
        Next, we need to add a button to add the book to the shopping cart.
        We're actually going to add two buttons. The first will just add the
        book/count to the shopping cart. The second will add the book/count to
        the shopping cart and then redirect to the "Checkout" page.
      </p>
      <p>
        How will we redirect? So far, all navigation within the website has been
        performed using <Cmp>curi-link</Cmp>s. However, sometimes you might want
        to navigate programmatically. To do this, we can take advantage of our
        Hickory history object. The history object has <IJS>push</IJS>,{' '}
        <IJS>replace</IJS>, and <IJS>update</IJS> methods that we can call to
        trigger navigation. You can read about each of these in the{' '}
        <a href="https://github.com/pshrmn/hickory/blob/master/docs/api/Browser.md#methods">
          Hickory documentation
        </a>. For this tutorial, we will be using <IJS>push</IJS>.
      </p>
      <p>
        The <IJS>CuriPlugin</IJS> makes our router available to all of our
        components as <IJS>this.$router</IJS>. That means that we can call{' '}
        <IJS>this.$router.history.push</IJS> (a bit of a mouthful) to
        automatically redirect to another page.
      </p>
      <p>
        We can also access all of our Curi <IJS>addons</IJS> from our router, so
        we will use <IJS>curi.addons.pathname</IJS> to generate the pathname for
        the location that we wan to redirect to.
      </p>
      <p>
        When the user clicks either of the buttons, we will want to use the{' '}
        <IJS>updateCart</IJS> API method to add the book to the shopping cart.
        The <Cmp>AddToCart</Cmp> component doesn't inherently know which book it
        is for, so we will need to pass it the <IJS>id</IJS> of the book as a
        prop when we render it.
      </p>
      <PrismBlock lang="html">
        {`<!-- components/AddToCart.vue -->
<template>
  <form>
    <select v-model="count">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </select>
    <button type="button" v-on:click="addToCart">Add To Cart</button>
    <button type="button" v-on:click="addAndCheckout">Add To Cart and Checkout</button>
  </form>
</template>

<script>
  import { updateCart } from '../api/shoppingCart';

  export default {
    props: ['bookID'],
    data: function() {
      return {
        count: '1'
      };
    },
    methods: {
      addToCart(event) {
        updateCart(this.bookID, parseInt(this.count));
      },
      addAndCheckout(event) {
        updateCart(this.bookID, parseInt(this.count))
          .then(() => {
            const pathname = this.$router.addons.pathname('Checkout');
            this.$router.history.push({ pathname });
          });
      }
    }
  };
</script>
`}
      </PrismBlock>
      <p>
        Now, we can modify our <Cmp>Book</Cmp> component to render the{' '}
        <Cmp>AddToCart</Cmp> component. Remember that we need to pass it a{' '}
        <IJS>bookID</IJS> prop so that we can know which book to add to the
        shopping cart.
      </p>
      <PrismBlock lang="html">
        {`<!-- components/Book.vue -->
<template>
  <div v-if="$curi.response.error" class='book'>
    {{error}}
  </div>
  <div v-else class='book'>
    <h2>{{book.title}}</h2>
    <p>By {{book.author}}</p>
    <p>Published in {{book.published}}</p>
    <p>This book is {{book.pages}} pages</p>
    <AddToCart :bookID="book.id" />
  </div>
</template>

<script>
  import AddToCart from './AddToCart';

  export default {
    computed: {
      book: function() {
        const { response } = this.$curi;
        return !response.error && response.data.book;
      }
    },
    components: { AddToCart }
  };
</script>`}
      </PrismBlock>
    </Section>
    <Section title="The Checkout Page" id="checkout">
      <p>
        Now that we can add books to our shopping cart, we also should give the
        user the ability to buy them. Of course, this isn't a real store website
        that we are building, so instead of asking for payment and shipping
        information, we will just redirect the user once they "purchase" their
        books.
      </p>
      <p>
        Let's start out in our <IJS>routes.js</IJS> file. We want our "Checkout"
        page to know which books are in the shopping cart. We can use the{' '}
        <IJS>match.every</IJS> function of the "Checkout" route to load all of
        the books and our shopping cart. We can merge the two together to create
        an array of items in the cart.
      </p>
      <p>
        While we're at it, we should also add one more route to our website.
        This will be a "Checkout Complete" route that we redirect to after a
        user has "purchased" their books.
      </p>
      <PrismBlock lang="javascript">
        {`// routes.js
import CheckoutComplete from './components/CheckoutComplete';

import { getCart } from './api/shoppingCart';

const routes = [
  // ...
  {
    name: 'Checkout',
    path: 'checkout',
    match: {
      every: () => {
        return Promise.all([
          fetchAllBooks(),
          getCart()
        ])
      },
      response: ({ resolved, set }) => {
        set.body(Checkout);

        /*
         * We will iterate over all of the items in
         * our shopping cart and find the matching
         * book. Then, we combine the book and the
         * number being purchased into one object.
         *
         * We then assign that array of objects as
         * the "items" property of our response's
         * data object.
         */ 
        const [ books, cart ] = resolved.every;
        const items = Object.keys(cart).map(key => {
          const id = parseInt(key, 10);
          const count = cart[key];
          const book = books.find(b => b.id === id);
          return Object.assign({}, book, { count });
        });
        set.data({ items });
      }
    },
    children: [
      {
        name: 'Checkout Complete',
        path: 'complete',
        match: {
          response: ({ set }) => {
            set.body(CheckoutComplete);
          }
        }
      }
    ]
  }
  // ...
];`}
      </PrismBlock>
      <p>
        Before we update our <Cmp>Checkout</Cmp> component, let's write the{' '}
        <Cmp>CheckoutComplete</Cmp> component. This should just be a simple
        component thanking the user for their purchase.
      </p>
      <PrismBlock lang="html">
        {`<!-- components/CheckoutComplete.vue -->
<template>
  <div className='checkout-complete'>
    Thanks for your purchase!
  </div>
</template>`}
      </PrismBlock>
      <p>
        We aren't going to get too fancy with displaying the items in our
        shopping cart. We can just place them all in a <Cmp>table</Cmp> so that
        they are neatly organized. Then, we will just need to add a button to
        "purchase" the books.
      </p>
      <p>
        We will once again be taking advantage of <IJS>this.$curi</IJS> to
        access our Curi router from within a component.
      </p>
      <PrismBlock lang="html">
        {`<!-- components/Checkout.vue -->
<template>
  <div class='checkout'>
    <h1>Checkout</h1>
    <div>
      <table>
        <thead>
          <tr>
            <td>Book</td>
            <td>Quantity</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in $curi.response.data.items" :key="book.id">
            <td>{{book.title}}</td>
            <td>{{book.count}}</td>
          </tr>
        </tbody>
      </table>
      <button type='button' v-on:click="purchase">
        Purchase Books
      </button>
    </div>
  </div>
</template>

<script>
  import { resetCart } from '../api/shoppingCart';

  export default {
    methods: {
      purchase: function(event) {
        // when the user "purchases" their books, we just
        // reset the cart and redirect to the "Checkout Complete" page
        resetCart();
        const pathname = this.$router.addons.pathname('Checkout Complete');
        this.$router.history.push({ pathname });
      }
    }
  };
</script>`}
      </PrismBlock>
      <p>
        One last thing to consider about our <Cmp>Checkout</Cmp> component is
        what we should display when there are no items in the shopping cart. We
        can just check our <IJS>response.data.items</IJS> array and display a
        message stating that the cart is empty when the list's length is zero.
      </p>
      <PrismBlock lang="html">
        {`<!-- component/Checkout.vue -->
<template>
  <div class='checkout'>
    <h1>Checkout</h1>
    <div v-if="$curi.response.data.items.length">
      <table>
        <thead>
          <tr>
            <td>Book</td>
            <td>Quantity</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in response.data.items" :key="book.id">
            <td>{{book.title}}</td>
            <td>{{book.count}}</td>
          </tr>
        </tbody>
      </table>
      <button type='button' v-on:click="purchase">
        Purchase Books
      </button>
    </div>
    <div v-else>
      You have not added any items to your shopping cart!
    </div>
  </div>
</template>`}
      </PrismBlock>
    </Section>
    <Section title="Review" id="review">
      <p>
        We can now add books to our shopping cart and "buy" them from the
        checkout page.
      </p>
      <CompleteBranch name="10-now-what-vue" />
      <CodeSandboxDemo id="github/pshrmn/curi-tutorial/tree/10-now-what-vue" />
      <Note>
        The embedded sandbox will not work if your browser is blocking
        third-party data. If this is the case for you, you <em>could</em>{' '}
        disable this through your browser's settings, but a better solution is
        to click the "Edit on CodeSandbox" button to view the sandbox there.
      </Note>
    </Section>
    <Section title="Next" id="next">
      <p>
        With that, we have considered pretty much everything you need to know to
        get started building your website with Curi. We have one last part,{' '}
        <Link to="Tutorial" params={{ name: '10-now-what' }}>
          Part 10: Now What?
        </Link>, that gives some suggestions on what you can do with your new
        knowledge.
      </p>
    </Section>
  </BaseTutorial>
);
