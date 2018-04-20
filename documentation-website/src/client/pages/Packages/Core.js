import React from "react";
import BasePackage from "./base/BasePackage";
import APIBlock from "./base/APIBlock";
import { InlineJS as IJS, PrismBlock } from "../../components/PrismBlocks";
import { Section, Subsection } from "../../components/Sections";
import { Note } from "../../components/Messages";

export default ({ name, version, globalName }) => (
  <BasePackage
    name={name}
    version={version}
    globalName={globalName}
    about={
      <p>
        The core Curi package provides the function that creates Curi routers.
        While you can pick and choose between the other Curi packages, every
        application that uses Curi for its routing/navigation <em>must</em> use{" "}
        <IJS>@curi/core</IJS>.
      </p>
    }
  >
    <APIBlock>
      <Section tag="h3" title="curi" id="curi">
        <p>
          The Curi package has one export, which is a function that returns a
          router. It is a default export, so you can name it whatever you like
          when importing it. Throughout the documentation, it is imported as{" "}
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
                <IJS>addons</IJS> - An array of add-on instances. The pathname
                add-on is included by default, but any other add-ons that you
                wish to use should be provided in this array.
              </li>
              <li>
                <IJS>sideEffects</IJS> - An array of side effect objects.
              </li>
              <li>
                <IJS>cache</IJS> - An object with get/set properties. This
                allows you to cache old responses, preventing any{" "}
                <IJS>on.every()</IJS> functions from being re-called when
                navigating to an already-visited location.
              </li>
              <li>
                <IJS>pathnameOptions</IJS> - An object with an <IJS>encode</IJS>{" "}
                function that will be used to encode the string created when
                generating a pathname from a route and its params.
              </li>
              <li>
                <IJS>emitRedirects</IJS> - When <IJS>false</IJS> (default is{" "}
                <IJS>true</IJS>), response objects with the{" "}
                <IJS>redirectTo</IJS> property will not be emitted to response
                handlers (but they will still trigger automatic redirects).
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
              If the best-matched route has either a <IJS>on.initial()</IJS> or{" "}
              <IJS>on.every()</IJS> function, the router will not call the
              response handler functions until the match functions have all
              resolved.
            </p>
            <PrismBlock lang="javascript">
              {`router.respond(({ response }) => {
  // render the application based on the response
});`}
            </PrismBlock>

            <Subsection tag="h6" title="options" id="respond-options">
              <PrismBlock lang="javascript">
                {`{ observe: true } // default false
// When true, the response handler function will be called for all future
// responses that are emitted by the router.

{ initial: false } // default true
// When false, the response handler will not be called until the
// next response is emitted.`}
              </PrismBlock>
            </Subsection>
          </Subsection>

          <Subsection tag="h5" title="current" id="current-property">
            <p>
              While <IJS>router.respond</IJS> is used to listen for new
              responses, the <IJS>router.current</IJS> method is a synchronous
              way to see the current <IJS>response</IJS> and{" "}
              <IJS>navigation</IJS>.
            </p>
            <Note>
              If you call <IJS>router.current</IJS> before the initial response
              has been emitted, the <IJS>response</IJS> and{" "}
              <IJS>navigation</IJS> properties will be <IJS>null</IJS>.
            </Note>
            <PrismBlock lang="javascript">
              {`const router = curi(history, routes);
const tooSoon = router.current();
// tooSoon.response === null
// tooSoon.navigation === null

router.respond(({ response, navigation }) => {
  const justRight = router.current();
  // justRight.response === response
  // justRight.navigation === navigation
});`}
            </PrismBlock>
          </Subsection>

          <Subsection tag="h5" title="addons" id="addons">
            <p>
              You can access all of the router's add-ons through the addons
              property. This allows you to call an add-on's get method directly.
            </p>
            <Subsection tag="h6" title="pathname" id="pathname-addon">
              <p>
                Curi includes one built-in add-on: <IJS>pathname</IJS>, which
                you can use to generate location pathnames with the name of the
                route and an optional object containing any necessary params.
              </p>
              <PrismBlock lang="javascript">
                {`const router = curi(history, [{ name: 'User', path: 'user/:id' }]);
const userPathname = router.addons.pathname('User', { id: '12345' });
// userPathname === '/user/12345'`}
              </PrismBlock>
            </Subsection>
          </Subsection>

          <Subsection tag="h5" title="history" id="history-property">
            <p>
              You can access the history object that you passed to{" "}
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
