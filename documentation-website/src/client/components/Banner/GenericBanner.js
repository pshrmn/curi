import React from 'react';
import { PrismBlock } from '../PrismBlocks';

const GenericBanner = () => (
  <PrismBlock lang="javascript">
    {`import Browser from '@hickory/browser';
import curi from '@curi/core';

// create your history object
const history = Browser();

// define your routes
const routes = [
  { name: 'Home', path: '', ... },
  { name: 'User', path: 'u/:userID', ... },
  ...
];

// create your Curi router
const router = curi(history, routes);

// subscribe to the router object with a function
// that will be called whenever the location changes
router.respond((response, action) => {
  // handle any rendering inside of this function
});`}
  </PrismBlock>
);

export default GenericBanner;
