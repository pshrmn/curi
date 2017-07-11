import React from 'react';
import BasePackage from '../components/BasePackage';
import { InlineJS, PrismBlock } from '../components/PrismBlocks';
import APIBlock from '../components/APIBlock';

const name = 'curi';
const version = '0.10.1';
const type = 'base';

const Curi = () => (
  <BasePackage name={name} version={version}>
    <APIBlock>
      <h3>createConfig</h3>
      
      <p>
        The Curi package has one export, which is a function that returns a Curi configuration object.
        It is a default export, so you can name it whatever you like when importing it. Throughout the
        documentation, it is imported as{' '} <InlineJS>createConfig</InlineJS> for consistency and
        because that is what the function does.
      </p>

      <PrismBlock lang='javascript'>
        {
`import createConfig from 'curi';

const config = createConfig(history, routes, options);`
        }
      </PrismBlock>

      <div>
        <h4>Arguments</h4>

        <div>
          <h5>history</h5>
          <p>A Hickory history object</p>
        </div>

        <div>
          <h5>routes</h5>
          <p>An array of route objects</p>
        </div>

        <div>
          <h5>options</h5>
          <p>
            An optional object with additional properties that can be passed to your configuration object.
          </p>
          <ul>
            <li>
              addons - An array of addon functions. The pathname addon is included by
              default, but any other addons that you wish to use should be provided in this array.
            </li>
            <li>
              middleware - An array of middleware functions. These are functions that
              will be able to interact with/modify response objects before they are emitted to subscribed
              functions.
            </li>
            <li>
              cache - An object with get/set properties. This allows you to cache old
              responses, preventing any load functions from being re-called when navigating to an
              already-visited location.
            </li>
          </ul>
        </div>
      </div>


      <div>
        <h4>Configuration Object Properties</h4>
        <p>
          The configuration object has a number of properties for you to use when rendering
          your application.
        </p>

        <div>
          <h5>subscribe(fn)</h5>
          <p>
            The returned object provides a subscribe method that allows your application to be informed of
            navigation. It expects to be passed a function, which will be called whenever a new response is
            generated.
          </p>
          <p>
            If the best-matched route has either a preload and/or load loading function, the configuration
            object will not call the subscribed functions until the loading functions have all resolved.
          </p>
          <PrismBlock lang='javascript'>
            {
`config.subscribe((response) => {
  // render the application based on the response
});`
            }
          </PrismBlock>
        </div>

        <div>
          <h5>ready()</h5>
          <p>
            When you create a new configuration object, an initial response will be created for the current
            location (<InlineJS>history.location</InlineJS>). One thing to note, though, is that route matching
            is an asynchronous process. This allows for behavior like code splitting for bundles and ensuring
            that data is loaded prior to rendering. However, this means that we can not rely on the response
            being fully prepared right after the configuration object is created.
          </p>
          <p>
            The ready method returns a Promise that will not resolve until the response has been fully
            prepared. The returned Promise will resolve with the prepared response (unless an error
            occurred in preparing the response, which you will need to catch yourself).
          </p>
          <p>
            If a response has already been generated before ready is called, then ready will resolve with
            that response.
          </p>
          <PrismBlock lang='javascript'>
            {
`config.ready().then(resp => {
  // now we know that the response is ready
});`
            }
          </PrismBlock>
        </div>

        <div>
          <h5>addons</h5>
          <p>
            You can access all of the configuration object's addons through the addons property. This allows
            you to call an addon's get method directly.
          </p>
          <p>
            For example, with the builtin pathname addon, you can do the following:
          </p>
          <PrismBlock lang='javascript'>
            {
`const config = createConfig(history, [{ name: 'User', path: 'user/:id' }]);
const userPathname = config.addons.pathname('User', { id: '12345' });
// userPathname === '/user/12345'`
            }
          </PrismBlock>
        </div>

        <div>
          <h5>history</h5>
          <p>
            You can access the history object that you passed to <InlineJS>createConfig</InlineJS> through the
            configuration object's history property. This allows you to just pass the configuration object
            throughout your project instead of both that and the history object.
          </p>
        </div>
      </div>
    </APIBlock>
  </BasePackage>
);

export default {
  name,
  version,
  type,
  component: Curi
};
