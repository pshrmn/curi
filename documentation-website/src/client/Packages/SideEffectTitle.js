import React from 'react';
import { Link } from '@curi/react';

import BasePackage from './base/BasePackage';
import APIBlock from './base/APIBlock';
import { InlineJS as IJS, PrismBlock } from '../components/PrismBlocks';
import { Section } from '../components/Sections';

export default ({ name, version, globalName }) => (
  <BasePackage
    name={name}
    version={version}
    globalName={globalName}
    about={(
      <p>
        This package allows you to set <IJS>title</IJS> properties on your routes
        and will automatically set the page's title whenever the location changes.
      </p>
    )}
  >
    <APIBlock>
      <Section
        tag='h3'
        title='createTitleSideEffect'
        id='createTitleSideEffect'
      >
        <PrismBlock lang='javascript'>      
          {
`import createConfig from '@curi/core';
import createTitleSideEffect from '@curi/side-effect-title';

const setTitle = createTitleSideEffect({
  suffix: 'My Site',
  delimiter: '|'
});

const config = createConfig(history, routes, {
  sideEffects: [{ fn: setTitle }]
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
`const prefixedTitle = createTitleSideEffect({ prefix: 'Before'});
// response.title = 'Middle'
// document.title = 'Before Middle';

const suffixedTitle = createTitleSideEffect({ suffix: 'After'});
// response.title = 'Middle'
// document.title = 'Middle After';`
          }
        </PrismBlock>
        <p>
          A <IJS>delimiter</IJS> can be specified for joining the <IJS>prefix</IJS>
          {' '}and <IJS>suffix</IJS> to the title string. Spaces will be placed between
          the prefix, title, and suffix strings and the delimiters.
        </p>
        <PrismBlock lang='javascript'>
          {
`const prefixedTitle = createTitleSideEffect({
  prefix: 'Before',
  suffix: 'After',
  delimiter: '&'
});
// response.title = 'Middle'
// document.title = 'Before & Middle & After';`
          }
        </PrismBlock>
        <PrismBlock lang='javascript'>      
          {
`const prefixedTitle = createTitleSideEffect({ prefix: 'Before'});
// response.title = 'Middle'
// document.title = 'Before Middle';

const suffixedTitle = createTitleSideEffect({ suffix: 'After'});
// response.title = 'Middle'
// document.title = 'Middle After';`
          }
        </PrismBlock>
        <p>
          A <IJS>delimiter</IJS> can be specified for joining the <IJS>prefix</IJS>
          {' '}and <IJS>suffix</IJS> to the title string. Spaces will be placed between
          the prefix, title, and suffix strings and the delimiters.
        </p>
        <PrismBlock lang='javascript'>      
          {
`const prefixedTitle = createTitleSideEffect({
  prefix: 'Before',
  suffix: 'After',
  delimiter: '&'
});
// response.title = 'Middle'
// document.title = 'Before & Middle & After';`
          }
        </PrismBlock>
      </Section>
    </APIBlock>
  </BasePackage>
);
