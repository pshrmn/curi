import React from 'react';
import { PrismBlock } from '../PrismBlocks';

const GenericBanner = () => (
  <PrismBlock lang="javascript">
    {`import Browser from '@hickory/browser';
import createConfig from '@curi/core';

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

// subscribe to the config object with a function
// that will be called whenever the location changes
config.respond((response, action) => {
  // handle any rendering inside of this function
});`}
  </PrismBlock>
);

export default GenericBanner;
