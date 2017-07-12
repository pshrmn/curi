import React from 'react';
import BaseGuide from '../components/BaseGuide';
import { InlineJS, PrismBlock } from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Link } from 'curi-react';
import { Section, Subsection } from '../components/Sections';
const slug = 'response-caching';
const name = 'Response Caching';

const ResponseCaching = () => (
  <BaseGuide>
    <h1>{name}</h1>
    <p>
      The cache option passed to <InlineJS>createConfig</InlineJS> allows you to save response objects.
      The actual caching mechanism is left up to you. It only has two requirements:
    </p>
    <ul>
      <li>
        It provides a set function which receives a response object as its argument.
      </li>
      <li>
        It provides a get function which receives a location object as its argument and returns a
        response object associated with the location (if one exists)
      </li>
    </ul>
    <PrismBlock lang='javascript'>
      {
`const createSimpleCache = () => {
  const cache = {};

  return {
    get: location => {
      const { key } = location;
      return cache[key];
    },
    set: response => {
      const { key } = response.location;
      cache[key] = response;
    }
  };
}

const myCache = createSimpleCache();

const config = createConfig(history, routes, {
  cache: myCache
});`
      }
    </PrismBlock>

    <p>
      The above cache uses a location's key property to store values.
    </p>
    <p>
      So why would you want to use a cache? When the user uses the browser's forward/back buttons,
      Curi will generate a new response. This means that if the route has a load function, it will
      be re-called. You can mitigate this by adding a cache to your load function, but you may also
      find it preferable to just re-use the existing response.
    </p>
    <p>
      This isn't built-in because it is possible that you don't actually want responses to be re-used.
      If you are caching responses, you will need to be aware of what to do when an authenticated user
      logs out. You will probably want to clear the cache so that they aren't still seeing content as
      if they were logged in.
    </p>
  </BaseGuide>
);

export default {
  name,
  slug,
  component: ResponseCaching
};