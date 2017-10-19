import React from 'react';
import BasePackage from './base/BasePackage';
import APIBlock from './base/APIBlock';
import { InlineJS as IJS, PrismBlock } from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Section } from '../components/Sections';

export default ({ name, version, globalName }) => (
  <BasePackage
    name={name}
    version={version}
    globalName={globalName}
    about={(
      <p>
        The prefetch addon can be used to make data fetching calls prior to navigation by
        calling a route's <IJS>load</IJS> function. This is different than calling the load
        function while generating the response because this is done without actually changing
        locations.
      </p>
    )}
  >
    <APIBlock>
      <Section
        tag='h3'
        title='createPrefetchAddon'
        id='createPrefetchAddon'
      >

        <p>
          curi-addon-prefetch has one, default export function (so you can import it with
          whatever name you want to. It is an addon factory that will add an{' '}
          <IJS>prefetch</IJS> function to your configuration object's addon property.
        </p>

        <PrismBlock lang='javascript'>
          {
`import createConfig from '@curi/core';
import prefetch from '@curi/addon-prefetch';

const config = createConfig(history, routes, { addons: [prefetch()] });
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
      </Section>
    </APIBlock>
  </BasePackage>

);
