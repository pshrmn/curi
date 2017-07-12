import React from 'react';
import {PrismCode} from 'react-prism';

const NPM = ({ name }) => (
  <div>
    <p>
      You can install the {name} package from NPM.
    </p>
    <PrismCode
      className='language-bash'
      component='pre'
    >
      npm install {name}
    </PrismCode>
  </div>
);

const Unpkg = ({ name, version }) => (
  <div>
    <p>
      If you prefer to use script tags, <a href='https://unpkg.com'>Unpkg</a> will
      always have the latest version of {name} available for your.
    </p>
    <PrismCode
      className='language-markup'
      component='pre'
    >
        &lt;script src="https://unpkg.com/{name}@{version}/dist/{name}.js" /&gt;
    </PrismCode>
    <p>
      There is also a minimized version available if you change the filename to{' '}
      <code className='language-markup'>{name}.min.js</code>
    </p>
  </div>
);

export default ({ name, version }) => (
  <div id='installation' className='section'>
    <h2>Installation</h2>
    <NPM name={name} />
    <Unpkg name={name} version={version} />
  </div>
);
