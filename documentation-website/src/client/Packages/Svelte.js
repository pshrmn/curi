import React from 'react';
import BasePackage from './base/BasePackage';
import APIBlock from './base/APIBlock';
import {
  InlineJS as IJS,
  InlineComponent as Cmp,
  PrismBlock
} from '../components/PrismBlocks';
import { Section } from '../components/Sections';

export default ({ name, version, globalName }) => (
  <BasePackage
    name={name}
    version={version}
    globalName={globalName}
    about={(
      <p>
        This package enables you to use Curi alongside Svelte. <strong>This package
        relies on the Svelte store.</strong>
      </p>
    )}
  >
    <APIBlock>
      <Section
        tag='h3'
        title={<Cmp>Link</Cmp>}
        id='link'
      >
        <p>
          In order for the components provided by this package to work, they need to have access to
          your Curi config object.
        </p>

        <PrismBlock lang='html'>
          {
`<div>
  <Link to='Home'>Home</Link>
  <Link to='User' params='{{ { userID: 5 } }}'>Profile</Link>
</div>
<script>
  import { Link } from '@curi/svelte';
  export default {
    components: { Link }
  }
</script>`
          }
        </PrismBlock>
      </Section>
    </APIBlock>

    <Section
      title='Usage'
      id='usage'
    >
      <p>
        The components exported by <IJS>@curi/svelte</IJS> rely on Svelte's
        store. The store should include a <IJS>curi</IJS> property that has
        a <IJS>config</IJS> property. Future releases might also include{' '}
        <IJS>response</IJS> and <IJS>action</IJS> properties, but for now{' '}
        <IJS>config</IJS> is the only required property.
      </p>
      <PrismBlock lang='javascript'>
        {
`import { Store } from 'svelte/store';

const config = createConfig(history, routes);
const store = new Store({
  curi: { config }
});`
        }
      </PrismBlock>
      <p>
        As far as rendering your application goes, you should use the{' '}
        <IJS>respond</IJS> method provided by the Curi configuration object
        to re-render whenever a new response is emitted.
      </p>

      <PrismBlock lang='javascript'>
        {
`const config = createConfig(history, routes);

const store = new Store({
  curi: { config }
});

const root = document.getElementById('root');
let view;

config.respond(response => {
  if (view) {
    view.destroy();
  }
  view = new response.body({
    target: root,
    store,
    data: response
  });
});`
        }
      </PrismBlock>
    </Section>
  </BasePackage>
);
