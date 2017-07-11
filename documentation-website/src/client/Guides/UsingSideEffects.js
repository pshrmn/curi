import React from 'react';
import BaseGuide from '../components/BaseGuide';
import { InlineJS, PrismBlock } from '../components/PrismBlocks';
import Note from '../components/Note';
import { Link } from 'curi-react';

const slug = 'side-effects';
const name = 'Using Side Effects';

const UsingSideEffects = () => (
  <BaseGuide>
    <h1>{name}</h1>

    <p>
      Curi side effects are essentially permament subscribers to your configuration object.
      They can be considered slightly more convenient than subscribers since you don't have
      to subscribe to your configuration object to set them up. However, you also cannot
      unsubscribe them.
    </p>

    <p>
      Whenever a new response is generated, all of the side effect functions will be called.
      They will be given two arguments: the new response object and the action that was used
      to trigger the navigation (POP, PUSH, or REPLACE).
    </p>

    <PrismBlock lang='javascript'>
      {
`function logResponse(response) {
  // call your logging API to record the response
}`
      }
    </PrismBlock>

    <div className='section'>      
      <h2>Adding Side Effects</h2>

      <p>
        You add side effect functions to your configuration object by adding a{' '}
        <InlineJS>sideEffects</InlineJS> array to the options object (the third agument)
        of <InlineJS>createConfig</InlineJS>.
      </p>

      <PrismBlock lang='javascript'>
        {
`const config = createConfig(history, routes, {
  sideEffects: [logResponse]
});`
        }
      </PrismBlock>

      <div className='subsection'>
        <h3>Official Side Effects</h3>
        <p>
          Curi has two "official" side effect packages:
        </p>
        <ul>
          <li>
            <Link to='Package' params={{ package: 'curi-side-effect-title' }}>curi-side-effect-title</Link>
          </li>
          <li>
            <Link to='Package' params={{ package: 'curi-side-effect-scroll' }}>curi-side-effect-scroll</Link>
          </li>
        </ul>
      </div>
    </div>

    <div className='section'>
      <h2>Creating Side Effects</h2>

      <p>
        Side effects are just simple functions that receive a response object and an action
        string and do something with them. One thing that they should not do, however, is to
        modify the response.
      </p>

      <p>
        Below is a side effect function that sets a modified property on the object.
      </p>
      <PrismBlock lang='javascript'>
        {
`function mySideEffect(response, action) {
  console.log('Navigating to', response.location);
}

const config = createConfig(history, routes, {
  sideEffects: [mySideEffect]
});`
        }
      </PrismBlock>

      <p>
        You can write a side effect factory if you need to create a more customizable side effect.
      </p>

      <PrismBlock lang='javascript'>
        {
`function AnalyticsLogger(options) {
  // do some setup with the provided options
  const logger = setupMyLogger(options);

  // and return the actual side effect function
  return sideEffect(response, action) {
    logger(response);
  }
}`
        }
      </PrismBlock>

      <p>
        That really is all there is required to know in order to write your own side effects. You may want
        to review the <Link to='Guide' params={{ slug: 'responses' }}>response</Link> properties to know
        which properties you should expect a response to have, but other than that they are pretty simple.
      </p>
    </div>

    <div>
      <h2>Next</h2>
      <p>
        <InlineJS>createConfig</InlineJS>'s options object has three arguments. We have covered the first
        two, so finally we will cover the cache option in the{' '}
        <Link to='Guide' params={{ slug: 'response-caching' }}>response caching</Link> guide.
      </p>
    </div>
  </BaseGuide>
);

export default {
  name,
  slug,
  component: UsingSideEffects
};
