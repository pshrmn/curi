import React from 'react';
import { PrismBlock } from '../PrismBlocks';

const SvelteBanner = () => (
  <PrismBlock lang="javascript">
    {`import Browser from '@hickory/browser';
import curi from '@curi/core';
import { Store } from 'svelte/store';

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

// create a Svelte store so that components can access
// the router, responses, and actions
const store = new Store({
  router,
  curi: { response: undefined, action: undefined }
});

let view;
const root = document.getElementById('root');

// setup a subscriber that will update the store when
// the location changes.
router.respond((response, action) => {
  store.set({ curi: { response, action } });
});

// add a one time subscriber for the initial render
router.respond(() => {
  view = new app({ target, store });
}, { once: true });`}
  </PrismBlock>
);

export default SvelteBanner;
