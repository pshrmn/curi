import React from "react";
import { PrismBlock } from "../PrismBlocks";

const SvelteBanner = () => (
  <PrismBlock lang="javascript">
    {`import Browser from '@hickory/browser';
import curi from '@curi/core';
import { Store } from 'svelte/store';

const history = Browser();
const routes = [...];
const router = curi(history, routes);
const target = document.getElementById('root');

// create a Svelte store so that components can access
// the router, responses, and navigations
const store = new Store({
  router,
  curi: { response: undefined, navigation: undefined }
});

// setup a response handler that will update the store when
// the location changes.
router.respond(({ response, navigation }) => {
  store.set({ curi: { response, navigation } });
}, { observe: true });

// add a one time response handler for the initial render
router.respond(() => {
  const view = new app({ target, store });
});`}
  </PrismBlock>
);

export default SvelteBanner;
