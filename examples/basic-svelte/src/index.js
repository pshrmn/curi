import Browser from '@hickory/browser';
import createConfig from '@curi/core';
import { setConfig } from '@curi/svelte';

import routes from './routes';

const history = Browser();
const config = createConfig(history, routes);
// Use setConfig so that the @curi/svelte components
// (curently just the <Link>) can interact with the
// configuration object.
setConfig(config);

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
    data: {
      response
    }
  });

}

config.subscribe(render)

