import React from 'react';
import BasePackage from '../components/BasePackage';
import { InlineJS as IJS, PrismBlock } from '../components/PrismBlocks';
import APIBlock from '../components/APIBlock';
import { Section, Subsection } from '../components/Sections';

export default ({ name, version, globalName }) => (
  <BasePackage
    name={name}
    version={version}
    globalName={globalName}
    about={(
      <p>
        The core Curi package provides the function that creates Curi configuration objects.
        While you can pick and choose between the other Curi packages, every application that
        uses Curi for its routing/navigation <em>must</em> use <IJS>@curi/core</IJS>.
      </p>
    )}
  >
    <APIBlock>
      <Section
        tag='h3'
        title='createConfig'
        id='createConfig'
      >
        
        <p>
          The Curi package has one export, which is a function that returns a Curi configuration object.
          It is a default export, so you can name it whatever you like when importing it. Throughout the
          documentation, it is imported as{' '} <IJS>createConfig</IJS> for consistency and
          because that is what the function does.
        </p>

        <PrismBlock lang='javascript'>
          {
`import createConfig from '@curi/core';

const config = createConfig(history, routes, options);`
          }
        </PrismBlock>

        <Section
          tag='h4'
          title='Arguments'
          id='arguments'
        >

          <Subsection
            tag='h5'
            title='history'
            id='history'
          >
            <p>A Hickory history object</p>
          </Subsection>

          <Subsection
            tag='h5'
            title='routes'
            id='routes'
          >
            <p>An array of route objects</p>
          </Subsection>

          <Subsection
            tag='h5'
            title='options'
            id='options'
          >
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
          </Subsection>
        </Section>


        <Section
          tag='h4'
          title='Configuration Object Properties'
          id='properties'
        >
          <p>
            The configuration object has a number of properties for you to use when rendering
            your application.
          </p>

          <Subsection
            tag='h5'
            title='subscribe(fn)'
            id='subscribe'
          >
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
          </Subsection>

          <Subsection
            tag='h5'
            title='ready()'
            id='ready'
          >
            <p>
              When you create a new configuration object, an initial response will be created for the current
              location (<IJS>history.location</IJS>). One thing to note, though, is that route matching
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
          </Subsection>

          <Subsection
            tag='h5'
            title='addons'
            id='addons'
          >
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
          </Subsection>

          <Subsection
            tag='h5'
            title='history'
            id='history-property'
          >
            <p>
              You can access the history object that you passed to <IJS>createConfig</IJS> through the
              configuration object's history property. This allows you to just pass the configuration object
              throughout your project instead of both that and the history object.
            </p>
          </Subsection>
        </Section>
      </Section>
    </APIBlock>
  </BasePackage>
);
