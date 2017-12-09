import Browser from '@hickory/browser';
import createConfig from '@curi/core';
import { Store } from 'svelte/store';

import routes from './routes';
import app from './components/App';

const history = Browser();
const config = createConfig(history, routes);
const store = new Store({
  curi: { config, response: undefined, action: undefined }
});

let view;
const target = document.getElementById('root');

config.respond((response, action) => {
  store.set({ curi: { config, response, action } });
});

config.respond(() => {
  view = new app({ target, store });
}, { once: true });

