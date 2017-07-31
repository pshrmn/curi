import React from 'react';
import BasePackage from '../components/BasePackage';
import { InlineJS as IJS, PrismBlock } from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import APIBlock from '../components/APIBlock';

export default ({ name, version, globalName }) => (
  <BasePackage name={name} version={version} globalName={globalName}>
    <APIBlock>

      <h3>createPrefetchAddon</h3>

      <p>
        curi-addon-prefetch has one, default export function (so you can import it with
        whatever name you want to. It is an addon factory that will add an{' '}
        <IJS>prefetch</IJS> function to your configuration object's addon property.
      </p>

      <PrismBlock lang='javascript'>
        {
`import createConfig from '@curi/core';
import prefetch from '@curi/addon-prefetch';

const config = createConfig(history, routes, { addons: [prefetch] });
`
        }
      </PrismBlock>

      <p>
        The prefetch addon allows you to call a route's load function manually. Why would you
        want to do this? Preloading data can give your users a faster navigation time when
        navigating to a page whose data has already been loaded.
      </p>
      <Note>
        You should only use this if you implement some sort of caching/lookup in your load functions.
        The load function will be recalled when the user actually navigates to the route, so the benefit
        comes from the load function using a cached value instead of sending a new request to your server.
      </Note>

      <PrismBlock lang='javascript'>
        {
`// call a route's load function manually
config.addons.prefetch('User', { id: 2 })`
        }
      </PrismBlock>
      <p>
        This addon will only register routes that have a load function in their load object.
      </p>
    </APIBlock>
  </BasePackage>

);
