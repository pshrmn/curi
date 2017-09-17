import React from 'react';
import BasePackage from '../components/BasePackage';
import { InlineJS as IJS, PrismBlock } from '../components/PrismBlocks';
import APIBlock from '../components/APIBlock';

export default ({ name, version, globalName }) => (
  <BasePackage
    name={name}
    version={version}
    globalName={globalName}
    about={(
      <p>
        This package enables you to use Curi alongside Svelte. This is more of a proof of concept
        than a fleshed out routing solution and only provides bare routing functionality.
      </p>
    )}
  >
    <APIBlock>
      <h3>setConfig</h3>
      <p>
        In order for the components provided by this package to work, they need to have access to
        your Curi config object.
      </p>

      <PrismBlock lang='javascript'>
        {
`import { setConfig } from '@curi/svelte';

const config = createConfig(history, routes);
setConfig(config);`
        }
      </PrismBlock>

      <h3>getConfig</h3>
      <p>
        <IJS>getConfig</IJS> complements <IJS>setConfig</IJS> by returning the configuration object
        set by calling <IJS>setConfig</IJS>. This can be used to access the configuration object
        throughout your application. It is used internally by <IJS>@curi/svelte</IJS> components.
      </p>

      <PrismBlock lang='javascript'>
        {
`import { getConfig } from '@curi/svelte';

// config will be undefined if you haven't called setConfig yet!
const config = getConfig();`
        }
      </PrismBlock>
    </APIBlock>

    <div id='usage'>
      <h2>Usage</h2>

      <p>
        The following is one way to setup rendering for a Curi + Vue application.
      </p>

      <PrismBlock lang='javascript'>
        {
`
import { setConfig } from '@curi/svelte';
const config = createConfig(history, routes);
setConfig(config);

const root = document.getElementById('root');
let view;
function subscriber(response) {
  if (view) {
    view.destroy();
  }
  view = new response.body({
    target: root,
    data: response
  });
}
config.subscribe(subscriber);
`
        }
      </PrismBlock>
    </div>
  </BasePackage>
);
