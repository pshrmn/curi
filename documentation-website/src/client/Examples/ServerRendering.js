import React from 'react';
import BaseExample from './base/BaseExample';
import { Section } from '../components/Sections';
import {
  InlineJS as IJS,
  PrismBlock
} from '../components/PrismBlocks';

export default ({ name }) => (
  <BaseExample>
    <h1>{name}</h1>
    <Section
      title='Explanation'
      id='explanation'
    >
      <p>
        Server rendering with Curi is fairly straightforward. You should have a catch all route handler that
        will respond to all (non-static file) requests.
      </p>

      <PrismBlock lang='javascript'>
        {
`function catchAll(req, res) {
  // 1. Create a memory history using the requested location
  const history = InMemory({ locations: [req.url]});

  // 2. Create a config
  const config = createConfig(history, routes);

  // 3. Wait for the response to be generated
  config.respond((response, action) => {
    // 4. Generate the HTML markup by rendering a <CuriBase> and
    // passing it the response
    const markup = renderToString(
      <CuriBase
        response={response}
        action={action}
        config={config}
        render={renderFunction}
      />
    );
    // 5. Insert the markup into the page's html and send it
    res.send(renderFullPage(markup));
  }, { once: true });
}`
        }
      </PrismBlock>

      <p>
        The above example is very basic. Some other things that you might need to consider are:
      </p>

      <ul>
        <li>
          Data loading — You would need to maintain two copies of your routes if you want to handle
          data fetching on the server differently than it works on the client side. This is not
          something that I have explored very closely yet, so I don't have any recommendations on
          exactly how to approach this.
        </li>
        <li>
          Code splitting — In order to use dynamic imports on the server, you will probably need to use
          a Babel plugin like <IJS>dynamic-import-node</IJS>. Unfortunately, <IJS>dynamic-import-node</IJS>
          {' '}breaks Webpack's code splitting. In order for your code to be split into multiple bundles,
          you should ensure that <IJS>dynamic-import-node</IJS> isn't being run when building your client
          side bundle. The solution used in this experiment is to use the <IJS>env</IJS> property.
          <PrismBlock lang='javascript'>
            {
`{
  "presets": [ "es2015", "react" ],
  "plugins": [
    "syntax-dynamic-import"
  ],
  "env": {
    "server": {
      "plugins": ["dynamic-import-node"]
    }
  }
}`
            }
          </PrismBlock>
          Then, when starting the server, make sure that BABEL_ENV=server.
          <PrismBlock lang='markup'>
            {
`cross-env BABEL_ENV=server npm start`
            }
          </PrismBlock>
        </li>
      </ul>
    </Section>

    <Section
      title='On GitHub'
      id='source'
    >
      If you want to run this code locally, the source code is available on GitHub{' '}
      <a href='https://github.com/pshrmn/curi/tree/master/examples/server-rendering'>here</a>.
    </Section>
  </BaseExample>
);
