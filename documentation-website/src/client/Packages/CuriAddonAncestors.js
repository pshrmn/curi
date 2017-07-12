import React from 'react';
import BasePackage from '../components/BasePackage';
import { InlineJS, PrismBlock } from '../components/PrismBlocks';
import APIBlock from '../components/APIBlock';

const name = 'curi-addon-ancestors';
const globalName = 'CuriAddonAncestors';
const version = require('./versions').default[name];
const type = 'addon';

const CuriAddonAncestors = () => (
  <BasePackage name={name} version={version} globalName={globalName}>
    <APIBlock>
      <h3>createAncestorsAddon</h3>

      <p>
        curi-addon-ancestors has one, default export function (so you can import it with
        whatever name you want to. It is an addon factory that will add an{' '}
        <InlineJS>ancestors</InlineJS> function to your configuration object's addon property.
      </p>

      <PrismBlock lang='javascript'>
        {
`import createConfig from 'curi';
import createAncestorsAddon from 'curi-addon-ancestors';

const routes = [
  {
    name: 'Grandparent', path: '0',
    children: [
      {
        name: 'Parent', path: '1',
        children: [ { name: 'Child', path: '2' } ]
      }
    ]
  }
];

const config = createConfig(history,routes, {
  addons: [createAncestorsAddon]
});`
        }
      </PrismBlock>

      <p>
        The ancestors addon takes the name of the route and the ancestor "level" that you want to get.
        1 refers to the route's parent, 2 is its grandparent, etc. If the provided value is not a positive
        integer or if there is no ancestor at the requested level, the addon will return undefined.
      </p>

      <PrismBlock lang='javascript'>
        {
`const parent = config.addons.ancestors('Child', 1);
// parent === 'Parent'
`
        }
      </PrismBlock>

      <p>
        If the level value is undefined (or null), then you will receive the array of all ancestors.
        This can be used to build breadcrumbs for a given route.
      </p>
    </APIBlock>
  </BasePackage>
);

export default {
  name,
  version,
  type,
  component: CuriAddonAncestors
};
