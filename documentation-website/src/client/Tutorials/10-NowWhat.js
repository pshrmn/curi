import React from 'react';
import { Link } from '@curi/react';

import BaseTutorial from './base/BaseTutorial';
import {
  InlineJS as IJS,
  InlineComponent as Cmp,
  PrismBlock
} from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Section, Subsection } from '../components/Sections';

export default () => (
  <BaseTutorial>
    <h1>Part 10: Now What?</h1>
    <p>
      This is the end. You have completed all of the parts of the tutorial
      and have built a website powered by Curi. It isn't a complete site,
      but it works, and hopefully you learned a lot while we built it.
    </p>
    <p>
      Thanks for following along! If you have any questions or comments,
      you can reach out to me on Twitter{' '}
      <a href="https://twitter.com/pshrmn">@pshrmn</a>. Any feedback is
      appreciated!
    </p>
    <p>
      Now, you may be wondering what else to do. My first suggestion would
      be to build your own website! The tutorial went through everything you
      need to know to get started building a site with Curi, so why not
      build your own?
    </p>
    <p>
      If you are looking to learn/build more, you can also try some of the
      suggestions listed below.
    </p>
    <ol>
      <li>
        The current home page is quite boring. You could add a "featured"
        book to it using the "Home" route's <IJS>load</IJS> function
        to attach a random book to the response.
      </li>
      <li>
        Similar to the previous suggestion, the contact page could use some
        work as well. Perhaps you could add some child routes for different
        methods of contact.
      </li>
      <li>
        You can try using a Curi <Link to='Guide' params={{ slug: 'side-effects' }}>side
        effect</Link> with the website. You could use{' '}
        <Link to='Package' params={{ package: 'side-effect-title' }}>
          <IJS>@curi/side-effect-title</IJS>
        </Link> and the <IJS>route.title</IJS> property to update the title whenever
        you navigate.
      </li>
      <li>
        If you're concerned about the bundle size, you could check out the{' '}
        <Link to='Guide' params={{ slug: 'code-splitting' }}>code splitting guide</Link>
        {' '}and break up the bundle using <IJS>route.preload</IJS>.
      </li>
      <li>
        While we used <IJS>response.data</IJS> to pass data to our components, you might
        prefer a global store like Redux or Vuex. You could rewrite the application to
        use these, <IJS>response.data</IJS> is a convenience, not a requirement. You
        can even continue to use <IJS>route.load</IJS> with a global store. Instead of
        calling <IJS>setData</IJS>, you could just dispatch the data to your store. You
        can check out the <Link to='Example' params={{ slug: 'redux' }}>Redux example</Link>
        {' '}to see how this might be implemented.
      </li>
      <li>
        You can explore the other response methods available in <IJS>route.load</IJS>.
        For example, you could use the <IJS>redirect</IJS> function to automatically
        redirect when the user attempt to navigate to a "Book" page that doesn't exist
        (e.g. there is no book whose <IJS>id</IJS> equals <IJS>params.id</IJS>).
      </li>
      <li>
        We only had ten books in our data, but what if there were hundreds? You could
        implement pagination on the "Book List" page. You could add query strings to
        the location and only display certain books. If you're feeling adventurous,
        you could pass a{' '}
        <a href="https://github.com/pshrmn/hickory/blob/master/docs/api/Browser.md#options">
          <IJS>query</IJS> object
        </a> to your history object to use query objects instead of strings.
      </li>
      <li>
        You can read through the <Link to='Guide' params={{ slug: 'getting-started'}}>guides</Link>,
        {' '}browse the <Link to='Examples'>examples</Link>, and check out
        the available Curi <Link to='Packages'>packages</Link>. This tutorial covered what
        you need to know to get started, but there is plenty more you can dive into
        for advanced usage.
      </li>
    </ol>
  </BaseTutorial>
);
