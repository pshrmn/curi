import React from 'react';
import BasePackage from './base/BasePackage';
import APIBlock from './base/APIBlock';
import { InlineJS as IJS, PrismBlock } from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Section, Subsection } from '../components/Sections';

export default ({ name, version, globalName }) => (
  <BasePackage
    name={name}
    version={version}
    globalName={globalName}
    about={
      <p>
        The prefetch add-on can be used to make data fetching calls prior to
        navigation by calling a route's <IJS>match.every</IJS> function. This is
        different than calling the load function while generating the response
        because this is done without actually changing locations.
      </p>
    }
  >
    <Note>
      You should only use this if you implement some sort of caching/lookup in
      your load functions. The <IJS>match.every</IJS> function will be re-called
      when the user actually navigates to the route, so the benefit comes from
      the load function using a cached value instead of sending a new request to
      your server.
    </Note>
    <APIBlock>
      <Section tag="h3" title="createPrefetchAddon" id="createPrefetchAddon">
        <p>
          The default export function is an add-on factory that will add an{' '}
          <IJS>prefetch</IJS> function to your router object's add-on property.
        </p>

        <PrismBlock lang="javascript">
          {`import curi from '@curi/core';
import prefetch from '@curi/addon-prefetch';

const router = curi(history, routes, { addons: [prefetch()] });
`}
        </PrismBlock>

        <p>
          The prefetch add-on allows you to call a route's load function
          manually. Why would you want to do this? Preloading data can give your
          users a faster navigation time when navigating to a page whose data
          has already been loaded.
        </p>

        <Subsection title="Arguments" id="arguments">
          <PrismBlock lang="javascript">
            {`// call a route's load function manually
router.addons.prefetch('User', { id: 2 })`}
          </PrismBlock>
          <ul>
            <li>
              <IJS>name</IJS> - the name of the route whose{' '}
              <IJS>match.every</IJS> function should be called.
            </li>
            <li>
              <IJS>props</IJS> - route props that are used by the{' '}
              <IJS>match.every</IJS> function (the same ones that a{' '}
              <IJS>match.every</IJS> function expects).
            </li>
          </ul>
          <p>
            This add-on will only register routes that have a{' '}
            <IJS>match.every</IJS> function.
          </p>
        </Subsection>
      </Section>
    </APIBlock>
  </BasePackage>
);
