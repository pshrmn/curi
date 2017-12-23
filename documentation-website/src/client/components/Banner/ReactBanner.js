import React from 'react';
import { PrismBlock } from '../PrismBlocks';

const ReactBanner = () => (
  <PrismBlock lang="jsx">
    {`import React from 'react';
import ReactDOM from 'react-dom';

import Browser from '@hickory/browser';
import createConfig from '@curi/core';
import { CuriBase } from '@curi/react';

// create your history object
const history = Browser();

// define your routes
const routes = [
  { name: 'Home', path: '', ... },
  { name: 'User', path: 'u/:userID', ... },
  ...
];

// create your Curi configuration object
const config = createConfig(history, routes);

const root = document.getElementById('root');
// subscribe to the config object with a function
// that will be called whenever the location changes
config.respond((response) => {
  ReactDOM.render((
    <CuriBase
      response={response}
      config={config}
      render={response => {
        return <response.body />;
      }}
    />
  ), root);
});`}
  </PrismBlock>
);

export default ReactBanner;
