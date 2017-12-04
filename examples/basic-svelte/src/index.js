import Browser from '@hickory/browser';
import createConfig from '@curi/core';
import { Store } from 'svelte/store';

import routes from './routes';

const history = Browser();
const config = createConfig(history, routes);
const store = new Store({
  curi: { config }
});

let view;
const root = document.getElementById('root');

// This function is called after every location
// change. The response's `body` will be a Svelte
// function, so we will call that to render the
// route
function render(response) {
  if (!response) {
    root.innerHTML = 'Loading...';
    return;
  }
  if (view) {
    view.destroy();
  } else {
    root.innerHTML = '';
  }

  view = new response.body({
    target: root,
    store,
    data: {
      response
    }
  });
}

config.respond(render)

