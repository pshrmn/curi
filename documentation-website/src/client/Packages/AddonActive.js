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
        The curi-addon-active package compares a location object's pathname to
        the current location in order to determine if the location object is
        "active". This can be restricted to complete matches or allow partial
        matches so that locations that represent an ancestor of the current
        location are also considered "active".
      </p>
    }
  >
    <APIBlock>
      <Section tag="h3" title="createActiveAddon" id="createActiveAddon">
        <p>
          curi-addon-active has one, default export function (so you can import
          it with whatever name you want to. It is an add-on factory that will
          add an <IJS>active</IJS> function to your configuration object's
          add-on property.
        </p>
        <PrismBlock lang="javascript">
          {`import createConfig from '@curi/core';
import createActiveAddon from '@curi/addon-active';

const config = createConfig(history, routes, {
  addons: [createActiveAddon()]
});`}
        </PrismBlock>
        <p>
          The <IJS>active</IJS> add-on function takes four arguments: the name
          of the route you want to check, the current response object, any
          params of the route that you want to check, and whether to consider
          partial matches as active. A partial match would occur when you check
          an ancestor route of the current route.
        </p>
        <PrismBlock lang="javascript">
          {`const isActive = config.addons.active('Some Route', response, { id: 10 });`}
        </PrismBlock>
      </Section>
    </APIBlock>
  </BasePackage>
);
