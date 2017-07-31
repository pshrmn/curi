import React from 'react';
import BasePackage from '../components/BasePackage';
import { InlineJS as IJS, PrismBlock } from '../components/PrismBlocks';
import { Link } from '@curi/react';
import APIBlock from '../components/APIBlock';

export default ({ name, version, globalName }) => (
  <BasePackage name={name} version={version} globalName={globalName}>
    <APIBlock>

      <h3>createTitleSideEffect</h3>
      <PrismBlock lang='javascript'>      
        {
`import createConfig from '@curi/core';
import createTitleSideEffect from '@curi/side-effect-title';

const setTitle = createTitleSideEffect({ suffix: '| My Site' });

const config = createConfig(history, routes, {
  sideEffects: [setTitle]
});`
        }
      </PrismBlock>

      <p>
        In order for this to work, you will need to set title properties on your routes. You can
        learn more about <IJS>route.title</IJS> in the{' '}
        <Link to='Guide' params={{ slug: 'routes' }}>all about routes</Link> guide.
      </p>

      <p>
        You can provide a prefix and/or a suffix string that will be included before/after the title.
      </p>

      <PrismBlock lang='javascript'>      
        {
`const prefixedTitle = createTitleSideEffect({ prefix: 'Before |'});
// response.title = 'Middle'
// document.title = 'Before | Middle';

const suffixedTitle = createTitleSideEffect({ suffix: '| After'});
// response.title = 'Middle'
// document.title = 'Middle | After';`
        }
      </PrismBlock>
    </APIBlock>
  </BasePackage>
);
