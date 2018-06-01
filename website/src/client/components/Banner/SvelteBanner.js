import React from "react";
import { PrismBlock } from "../PrismBlocks";

const SvelteBanner = () => (
  <PrismBlock lang="javascript">
    {`import Browser from '@hickory/browser';
import curi from '@curi/core';
import { curiStore } from '@curi/svelte';

const history = Browser();
const routes = [...];
const router = curi(history, routes);
const target = document.getElementById('root');

// create and synchronize a Svelte store
// with your router
const store = curiStore(router);
// You can also re-use an existing store
// curiStore(router, store);

const view = new app({ target, store });`}
  </PrismBlock>
);

export default SvelteBanner;
