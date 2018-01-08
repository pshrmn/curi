import React from 'react';
import BasePackage from './base/BasePackage';
import APIBlock from './base/APIBlock';
import { InlineJS as IJS, PrismBlock } from '../components/PrismBlocks';
import { Section, Subsection } from '../components/Sections';

export default ({ name, version, globalName }) => (
  <BasePackage
    name={name}
    version={version}
    globalName={globalName}
    about={
      <p>
        The core Curi package provides the function that creates Curi routers.
        While you can pick and choose between the other Curi packages, every
        application that uses Curi for its routing/navigation <em>must</em> use{' '}
        <IJS>@curi/core</IJS>.
      </p>
    }
  >
    <APIBlock>
      <Section tag="h3" title="curi" id="curi">
        <p>
          The Curi package has one export, which is a function that returns a
          router. It is a default export, so you can name it whatever you like
          when importing it. Throughout the documentation, it is imported as{' '}
          <IJS>curi</IJS>.
        </p>

        <PrismBlock lang="javascript">
          {`import curi from '@curi/core';

const router = curi(history, routes, options);`}
        </PrismBlock>

        <Section tag="h4" title="Arguments" id="arguments">
          <Subsection tag="h5" title="history" id="history">
            <p>A Hickory history object</p>
          </Subsection>

          <Subsection tag="h5" title="routes" id="routes">
            <p>An array of route objects</p>
          </Subsection>

          <Subsection tag="h5" title="options" id="options">
            <p>
              An optional object with additional properties that can be passed
              to your router.
            </p>
            <ul>
              <li>
                addons - An array of add-on instances. The pathname add-on is
                included by default, but any other add-ons that you wish to use
                should be provided in this array.
              </li>
              <li>
                middleware - An array of middleware functions. These are
                functions that will be able to interact with/modify response
                objects before they are emitted to subscribed functions.
              </li>
              <li>
                cache - An object with get/set properties. This allows you to
                cache old responses, preventing any <IJS>match.every</IJS>{' '}
                functions from being re-called when navigating to an
                already-visited location.
              </li>
              <li>
                pathnameOptions - An object with an <IJS>encode</IJS> function
                that will be used to encode the string created when generating a
                pathname from a route and its params.
              </li>
              <li>
                emitRedirects - When <IJS>false</IJS> (default is <IJS>true</IJS>),
                response objects with the <IJS>redirectTo</IJS> property will not
                be emitted to response handlers (but they will still trigger
                automatic redirects).
              </li>
            </ul>
          </Subsection>
        </Section>

        <Section tag="h4" title="Router Properties" id="properties">
          <p>
            The router has a number of properties for you to use when rendering
            your application.
          </p>

          <Subsection tag="h5" title="respond(fn, options)" id="respond">
            <p>
              The returned object provides a <IJS>respond</IJS> method that
              allows your application to be informed of navigation. It expects
              to be passed a function, which will be called whenever a new
              response is generated.
            </p>
            <p>
              If the best-matched route has either a <IJS>match.initial</IJS> or{' '}
              <IJS>match.every</IJS> loading function, the router will not call
              the subscribed functions until the loading functions have all
              resolved.
            </p>
            <PrismBlock lang="javascript">
              {`router.respond((response) => {
  // render the application based on the response
});`}
            </PrismBlock>

            <Subsection tag="h6" title="options" id="respond-options">
              <PrismBlock lang="javascript">
                {`{ once: true } // default false
// When true, the response handler function will only be called once. When
// once is true, router.respond does not return an unsubscribe function.`}
              </PrismBlock>
            </Subsection>
          </Subsection>

          <Subsection tag="h5" title="addons" id="addons">
            <p>
              You can access all of the router's add-ons through the addons
              property. This allows you to call an add-on's get method directly.
            </p>
            <p>
              For example, with the builtin pathname add-on, you can do the
              following:
            </p>
            <PrismBlock lang="javascript">
              {`const router = curi(history, [{ name: 'User', path: 'user/:id' }]);
const userPathname = router.addons.pathname('User', { id: '12345' });
// userPathname === '/user/12345'`}
            </PrismBlock>
          </Subsection>

          <Subsection tag="h5" title="history" id="history-property">
            <p>
              You can access the history object that you passed to{' '}
              <IJS>curi</IJS> through the router's history property. This allows
              you to just pass the router throughout your project instead of
              both that and the history object.
            </p>
          </Subsection>
        </Section>
      </Section>
    </APIBlock>
  </BasePackage>
);
