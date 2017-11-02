import React from 'react';
import { Link } from '@curi/react';

import BaseTutorial from './base/BaseTutorial';
import { TutorialBranch, CompleteBranch } from './base/Branch';
import { InlineJS as IJS, PrismBlock } from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Section, Subsection } from '../components/Sections';

export default () => (
  <BaseTutorial>
    <h1>Part 3: Curi Routes</h1>
    <p>
      Now that we have our project setup, it is time to start thinking about
      the route structure of our website.
    </p>
    <div>
      <p>
        In this tutorial, we will be doing the following:
      </p>
      <ul>
        <li>
          Deciding what pages our website will contain.
        </li>
        <li>
          Learning about basic route properties.
        </li>
        <li>
          Creating route objects for each of our website's pages.
        </li>
      </ul>
    </div>
    <TutorialBranch name='03-routes' />
    <Section
      title='Pages'
      id='pages'
    >
      <p>
        We should start by identifying the pages that we want to have in our website.
        This can always be modified later, but it is a good idea to know what pages
        you are going to need to create.
      </p>
      <p>
        For this website, we will be creating the following pages:
      </p>
      <ol>
        <li>Home - the landing page for the website</li>
        <li>Contact - a listing of how to contact the site's creators</li>
        <li>Book list - a list of all of the books available for purchase</li>
        <li>Book - a page for each book</li>
        <li>Checkout - a page to "buy" books that have been added to the shopping cart</li>
      </ol>
      <p>
        Additionally, we should have a 404 page that is displayed when the user visits a location
        that has no matching route.
      </p>
      <p>
        Each page in our website must have a pathname associated with it. These may either be
        static (literal) or dynamic (include parts that change, like IDs).
      </p>
      <ol>
        <li>Home - <IJS>/</IJS></li>
        <li>Contact - <IJS>/contact</IJS></li>
        <li>Book list - <IJS>/books</IJS></li>
        <li>Book - <IJS>/books/&lt;book id&gt;</IJS> e.g. <IJS>/books/2468</IJS></li>
        <li>Checkout - <IJS>/checkout</IJS></li>
      </ol>
    </Section>

    <Section
      title='Routes'
      id='routes'
    >
      <p>
        At their core, routes are a way to describe the valid pathnames for our website.
        With Curi, routes are simply JavaScript objects with some known properties.
        The two most important properties of a route object are <IJS>name</IJS> and{' '}
        <IJS>path</IJS>. The <IJS>name</IJS> is a <strong>unique</strong> string that you
        will use to identify a particular route. The <IJS>path</IJS> is a{' '}
        <a href='https://github.com/pillarjs/path-to-regexp'><IJS>path-to-regexp</IJS></a>
        {' '}formatted string.
      </p>
      <Note>
        <IJS>path-to-regexp</IJS> provides pathname matching. You give it a path string (possibly
        with special formatting) and it returns a regular expression that can be used for matching
        routes. The regular expression matching will be handled internally by Curi, so you only have
        to care about formatting path strings. Further along in this tutorial, we will cover the basics
        of how to do this. However, for advanced usage, you should check out the documention in the{' '}
        <a href='https://github.com/pillarjs/path-to-regexp'><IJS>path-to-regexp</IJS></a> GitHub repo.
      </Note>
      <p>
        All of the base routes of our application should be placed in an array.
        Nested routes will be defined using a property of their parent route.
      </p>
      <PrismBlock lang='javascript'>
        {
`const routes = [];`
        }
      </PrismBlock>
      <p>
        The first route that we will define is for our homepage. We can name
        it anything we want, but we'll just call it "Home". For the home
        page's <IJS>path</IJS>, we will use an empty string (<IJS>''</IJS>).
      </p>
      <p>
        Up above, we said that the pathname for our "Home" route is{' '}
        <IJS>/</IJS>. However, with Curi, <IJS>path</IJS> strings never
        begin with a forward slash. For all of the pathnames for pages that
        are listed above, we just need to strip off the leading slash.
      </p>
      <PrismBlock lang='javascript'>
        {
`const routes = [
  { name: 'Home', path: '' }
];`
        }
      </PrismBlock>
      <p>
        That is simple enough, yes? Let's go ahead and add our "Contact" and
        "Checkout" routes. They should look just like our "Home" route.
      </p>
      <PrismBlock lang='javascript'>
        {
`const routes = [
  { name: 'Home', path: '' },
  { name: 'Contact', path: 'contact' },
  { name: 'Checkout', path: 'checkout' }
];`
        }
      </PrismBlock>
      <p>
        Now, if a user visits <IJS>https://&lt;our website domain&gt;/checkout</IJS>,
        our checkout page will match (and likewise for <IJS>/contact</IJS>
        {' '}and our contact page).
      </p>
      <p>
        We still have more routes to define, but there are two concepts to
        introduce first: path params and the <IJS>children</IJS> property
        of route objects.
      </p>
      <Subsection
        title='Path Params'
        id='path-params'
        type='aside'
      >
        <p>
          With <IJS>path-to-regexp</IJS>, when you create a path string, it is
          normally interpreted literally. That means that the the path{' '}
          <IJS>'products/hat'</IJS> will only match the location whose pathname
          is <IJS>/products/hat</IJS>. What if we also have a shirt? And socks?
          And shorts? Do you want to define a path for each individual product?
          Of course not. Instead, <IJS>path-to-regexp</IJS> allows us to define
          dynamic parts of pathnames using "params".
        </p>
        <p>
          What is a param? It is a way to tell <IJS>path-to-regexp</IJS> to
          capture part of the pathname at a particular point and store its
          value using the param's name. The param starts with a colon and then
          specifies the param's name.
        </p>
        <PrismBlock lang='javascript'>
          {
`{ path: 'product/:name' }`
          }
        </PrismBlock>
        <p>
          Using the above path, we will capture the portion of the pathname
          that comes after <IJS>product/</IJS> and store it in an object using
          the key "name". When you visit <IJS>'/products/hat'</IJS>,{' '}
          <IJS>path-to-regexp</IJS> will match and return the params object{' '}
          <IJS>{`{ name: 'hat' }`}</IJS>. Likewise, <IJS>'/products/shirt'</IJS>
          {' '}and <IJS>'/products/shorts'</IJS> will capture "shirt" and "shorts"
          as the name param.
        </p>
        <p>
          By default, a param will match all characters up until the next
          forward slash or the end of the string. You can also perform more
          specific matching, but that is outside of the scope of this tutorial.
        </p>

      </Subsection>  
      <Subsection
        title='Route Children'
        id='children'
        type='aside'
      >
        <p>
          Sometimes, you will have routes whose <IJS>path</IJS> extends the
          path of another route. For example, you might have a route whose
          path is <IJS>'parent'</IJS> and a child route with the path{' '}
          <IJS>'parent/child'</IJS>.
        </p>
        <p>
          Using the <IJS>children</IJS> property of route objects, you can
          attach an array of child routes to a parent route. The <IJS>path</IJS>
          {' '}of each child route will extend the parent route's <IJS>path</IJS>.
          That means that using the parent/child paths from above, we can define
          the parent route to have the path <IJS>'parent'</IJS> and a child route
          whose path is <IJS>'child'</IJS>. Curi will treat that child route as
          if its path is <IJS>'parent/child'</IJS>.
        </p>
        <PrismBlock lang='javascript'>
          {
`{
  name: 'Parent',
  path: 'parent',
  children: [
    {
      name: 'Child',
      path: 'child' // will match the pathname /parent/child
    }
  ]
}`
          }
        </PrismBlock>
      </Subsection>

      <p>
        Now, we can go ahead and use path params and route children to
        define our book list/book routes.
      </p>
      <p>
        For this tutorial, we will identify books from a pathname using
        their <IJS>id</IJS>. We can name this anything we want, but "id"
        is simple and to the point.
      </p>
      <PrismBlock lang='javascript'>
        {
`const routes = [
  { name: 'Home', path: '' },
  { name: 'Contact', path: 'contact' },
  { name: 'Checkout', path: 'checkout' },
  {
    name: 'Book List',
    path: 'books',
    children: [
      {
        name: 'Book',
        path: ':id'
      }
    ]
  }
];`
        }
      </PrismBlock>
      <Subsection
        title='Wildcard Routes'
        id='wildcard'
      >
        <p>
          We have one last "route" to define. This isn't really a route,
          just a catch all that we can use to identify locations that we
          don't have a route defined for. <IJS>path-to-regexp</IJS> allows
          us to capture everything using the path string <IJS>(.*)</IJS>.
        </p>
        <Note>
          <IJS>(.*)</IJS> uses another of the special <IJS>path-to-regexp</IJS>
          {' '}formats. If you provide a regular expression within parentheses,{' '}
          <IJS>path-to-regexp</IJS> will only match content that is matched
          by the regular expression. This can also be paired with a named path
          param (e.g. <IJS>{`:id(\\d\{4\})`}</IJS>), but is not necessary.
        </Note>          
        <p>
          Since the regular expression <IJS>.*</IJS>
          {' '}matches everything, we can use this to match all possible pathnames
          that someone using the website might navigate to.
        </p>
        <PrismBlock lang='javascript'>
          {
`const routes = [
  { name: 'Home', path: '' },
  { name: 'Contact', path: 'contact' },
  { name: 'Checkout', path: 'checkout' },
  {
    name: 'Book List',
    path: 'books',
    children: [
      {
        name: 'Book',
        path: ':id'
      }
    ]
  },
  {
    name: 'Not Found',
    path: '(.*)'
  }
];
// don't forget to export the routes
export default routes;`
          }
        </PrismBlock>
      </Subsection>
      <Subsection
        title='Route Order'
        id='order'
      >
        <p>
          One last thing to note about routes is that their order in the
          routes array is important. Curi will iterate over them in (depth-first)
          order. This means that with the above config, Curi will first check
          if <IJS>''</IJS> matches the pathname, if it does not, it will move
          on to <IJS>'contact'</IJS>, so on and so forth. If no other routes
          match, then we know that our "Not Found" route will.
        </p>
        <p>
          Curi will only attempt to match children routes if their parent route
          (partially) matches the location's pathname. That means that when the
          pathname is <IJS>'/somewhere'</IJS>, because our "Book List" route does
          not match, Curi will not attempt to match our "Book" route.
        </p>
      </Subsection>
    </Section>
    <Section
      title='Review'
      id='review'
    >
      <CompleteBranch name='03-routes-complete' />
    </Section>
    <Section
      title='Next'
      id='next'
    >
      <p>
        Now that our routes are defined, it is time to talk about history in {' '}
        <Link to='Tutorial' params={{ name: '04-hickory' }}>Part 4: Hickory</Link>
      </p>
    </Section>
  </BaseTutorial>
);
