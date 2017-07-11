import React from 'react';
import BasePackage from '../components/BasePackage';
import { InlineJS, PrismBlock } from '../components/PrismBlocks';
import APIBlock from '../components/APIBlock';

const name = 'curi-addon-active';
const version = require('./versions').default[name];
const type = 'addon';

const CuriAddonActive = () => (
  <BasePackage name={name} version={version}>
    <APIBlock>
      <h3>createActiveAddon</h3>

      <p>
        curi-addon-active has one, default export function (so you can import it with
        whatever name you want to. It is an addon factory that will add an{' '}
        <InlineJS>active</InlineJS> function to your configuration object's addon property.
      </p>
      <PrismBlock lang='javascript'>
        {
`import createConfig from 'curi';
import createActiveAddon from 'curi-addon-active';

const config = createConfig(history, routes, {
  addons: [createActiveAddon]
});`
        }
      </PrismBlock>
      <p>
        The <InlineJS>active</InlineJS> addon function takes four arguments: the name of the
        route you want to check, the current response object, any params of the route that
        you want to check, and whether to consider partial matches as active. A partial match
        would occur when you check an ancestor route of the current route.
      </p>
      <PrismBlock lang='javascript'>
        {
`const isActive = config.addons.active('Some Route', response, { id: 10 });`
        }
      </PrismBlock>
    </APIBlock>
  </BasePackage>
);

export default {
  name,
  version,
  type,
  component: CuriAddonActive
};
