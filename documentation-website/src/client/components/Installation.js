import React from 'react';
import {
  PrismBlock,
  InlineJS as IJS
} from './PrismBlocks';

const NPM = ({ name }) => (
  <div>
    <p>
      You can install the <IJS>{name}</IJS> package from NPM.
    </p>
    <PrismBlock lang='bash'>
      {`npm install @curi/${name}`}
    </PrismBlock>
  </div>
);

const Unpkg = ({ name, version, globalName }) => (
  <div>
    <p>
      If you prefer to use script tags, <a href='https://unpkg.com'>Unpkg</a> will
      always have the latest version of <IJS>{name}</IJS> available for you.
    </p>
    <PrismBlock lang='markup'>
      {
`<script src="https://unpkg.com/@curi/${name}@${version}/dist/curi-${name}.js" />`
      }
    </PrismBlock>
    <p>
      There is also a minimized version available if you change the filename to{' '}
      <IJS>{name}.min.js</IJS>. The package will be attached
      to the window as <IJS>window.{globalName}</IJS>.
    </p>
  </div>
);

export default ({ name, version, globalName }) => (
  <div id='installation' className='section'>
    <h2>Installation</h2>
    <NPM name={name} />
    <Unpkg name={name} version={version} globalName={globalName} />
  </div>
);
