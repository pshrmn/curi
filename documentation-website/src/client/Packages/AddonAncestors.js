import React from 'react';
import BasePackage from './base/BasePackage';
import APIBlock from './base/APIBlock';
import { InlineJS as IJS, PrismBlock } from '../components/PrismBlocks';
import { Section } from '../components/Sections';

export default ({ name, version, globalName }) => (
  <BasePackage
    name={name}
    version={version}
    globalName={globalName}
    about={
      <p>
        This addon allows you to get the names of ancestor routes. This can be
        useful for generating breadcrumb links.
      </p>
    }
  >
    <APIBlock>
      <Section tag="h3" title="createAncestorsAddon" id="createAncestorsAddon">
        <p>
          curi-addon-ancestors has one, default export function (so you can
          import it with whatever name you want to. It is an addon factory that
          will add an <IJS>ancestors</IJS> function to your configuration
          object's addon property.
        </p>

        <PrismBlock lang="javascript">
          {`import createConfig from '@curi/core';
import createAncestorsAddon from '@curi/addon-ancestors';

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
  addons: [createAncestorsAddon()]
});`}
        </PrismBlock>

        <p>
          The ancestors addon takes the name of the route and the ancestor
          "level" that you want to get. 1 refers to the route's parent, 2 is its
          grandparent, etc. If the provided value is not a positive integer or
          if there is no ancestor at the requested level, the addon will return
          undefined.
        </p>

        <PrismBlock lang="javascript">
          {`const parent = config.addons.ancestors('Child', 1);
// parent === 'Parent'
`}
        </PrismBlock>

        <p>
          If the level value is undefined (or null), then you will receive the
          array of all ancestors. This can be used to build breadcrumbs for a
          given route.
        </p>
      </Section>
    </APIBlock>
  </BasePackage>
);
