# Server rendering tutorial

Rendering on the server with Curi is not much different than rendering on the client. There are just a few things that you will have to keep in mind.

## The Base Client-Side Project

Let's start out by defining a simple client-side application. It has two routes: `Home` and `About`. Like our other tutorials, this one uses React for its rendering, but you can adapt it to use whatever you prefer.

```js
// src/routes.js
import Home from './components/Home.js';
import About from './components/About.js';

export default [
  { name: 'Home', path: '', value: Home },
  { name: 'About', path: 'about', value: About }
];
```

```js
// src/renderFunction.js
import React from 'react';
import Nav from './components/Nav';

export default function(response) {
  if (!response) {
    return null;
  }
  const { body } = response;
  const Body = body ? body : null;
  return (
    <div>
      <Nav />
      <Body />
    </div>
  );
}
```

```js
// src/components/Home.js
import React from 'react';
export default function() {
  return <div>Home</div>;
}

// src/components/About.js
import React from 'react';
export default function() {
  return <div>About</div>;
}

// src/components/Nav.js
import React from 'react';
import Link from 'curi-react-link';
export default function() {
  return (
    <nav>
      <ul>
        <li><Link to='Home'>Home</Link></li>
        <li><Link to='About'>About</Link></li>
      </ul>
    </nav>
  );
}
```

```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createHashHistory';
import createConfig from 'curi';
import Navigator from 'curi-react-navigator';
import routes from './routes';
import renderFunction from './renderFunction'

const history = createHistory();
const config = createConfig(history, routes);

ReactDOM.render((
  <Navigator config={config}>
    {renderFunction}
  </Navigator>
), document.getElementById('root'));
```

A few things to note about the client-side code is that it uses a hash history (because we have not yet implemented the server) and it does not wait for the initial response to be generated before it renders.

## Rendering on the server

We will be reusing most of our code on the server, but we will need to replace the `index.js` file. Instead of using a hash history, we will create a memory history. Also, we will only be rendering once, so we need to wait for the initial response to resolve before we can render.

Also, we will be placing all of our code inside of a request handler function. We don't want to be sharing histories/configs across requests.

```js
// renderApp.js
import React from 'react';
import { renderToString } from 'react-dom/server';
import createHistory from 'history/createMemoryHistory';
import routes from './src/routes';
import renderFunction from './src/renderFunction';

export default function curiRequestHandler(req, res) {
  // the memory history should be initialized
  // with the current location
  const history = createHistory({ initialEntries: [req.url] });
  const config = createConfig(history, routes);

  // we need to wait for the initial response to be generated, so
  // we use config.ready
  config.ready().then(response => {
    // we will pass the response to the <Navigator> because we
    // are only rendering once and don't need to subscribe
    const output = renderToString(
      <Navigator
        response={response}
        config={config}
        children={renderFunction}
      />
    );
    // we need to send the full page's HTML,
    // not just our application's
    res.send(renderHTML(output));
  });
}

function renderHTML(app) {
  return `
    <!doctype html>
    <html>
      <body>
        <div id="root">${html}</div>
        <script src="https://unpkg.com/react@15.5.3/dist/react.min.js"></script>
        <script src="https://unpkg.com/react-dom@15.5.3/dist/react-dom.min.js"></script>
        <script src="/static/js/bundle.js"></script>
      </body>
    </html>
  `;
}
```

### Route handling

Because Curi handles routing, our server just needs to catch any URIs that aren't part of our application. This includes requests for static files and possibly other things like requests to an API you have setup.

```js
// server.js
require('babel-core/register');
const express = require('express');
const path = require('path');
const curiRequestHandler = require('./renderApp').default;

const app = express();

// requests for URIs that begin with /static
// will go to the static handler
app.use('/static', express.static(path.join(__dirname, 'public')));
// everything else will go to our request handler
app.get('*', curiRequestHandler);

app.listen('8000', () => {
  console.log(`Server started at ${new Date()}. Listening on port 8000.`);
});
```

At this point, our server should be able to render our application.

### Code splitting on the server

If you are using code splitting on the server (and babel), you will probably need to add the [`dynamic-import-node`](https://github.com/airbnb/babel-plugin-dynamic-import-node) plugin to your `.babelrc` and set `BABEL_ENV` to `server` when you start your server. This will allow you to use `import()` on the server.


```json
{
  "env": {
    "server": {
      "plugins": ["dynamic-import-node"]
    }
  }
}
```

```sh
cross-env BABEL_ENV=server npm start
```

## Fixing the client-side

Now that we have a server setup, there are a few changes we will have to make to our client-side code. The first is that we must switch from a hash history to a browser history.

```js
// src/index.js
import createHistory from 'history/createBrowserHistory'
```

The second is that we want to wait for our initial response to be generated before rendering. If we do not, then our initial render will be different from the one created by the server, which defeats the point of rendering on the server.

```js
// src/index.js
const config = createConfig(history, routes);
config.ready().then(() => {
  ReactDOM.render(...);
});
```

Finally, we can remove the `if` statement that renders `null` when the response is `undefined` from our render function. Now that we are waiting for a response to be generated, we don't have to worry about rendering with an `undefined` response.

```js
// src/renderFunction.js
export default function(resopnse) {
  // no more if statement here
  const { body } = response;
  ...
}
```

At this point, our application should work with server-side rendering. You can check out the [server rendering example](../../examples/server-rendering) for the full code from a working project.
