import React from "react";
import { Link } from "@curi/react";

import BaseGuide from "./base/BaseGuide";
import { InlineJS as IJS, PrismBlock } from "../../components/PrismBlocks";
import { Section, Subsection } from "../../components/Sections";

export default ({ name }) => (
  <BaseGuide>
    <h1>{name}</h1>

    <p>
      Route interactions let you interact with a registered route using its
      name.
    </p>
    <p>
      A registered route is generally any route that is in the array of routes
      that you used to create your router. However, some interactions only
      register routes that meet some criteria.
    </p>

    <p>
      Route interactions are defined using objects with four properties: name,
      register, get, and reset.
    </p>

    <PrismBlock lang="javascript">
      {`{
  // The string you will use to call the interaction.
  name: 'my',

  // A function used internally to register routes
  // with the interaction. You only need to use this when
  // writing your own interactions.
  register: function(route, parentData) {...},

  // This is the function that you will call. For example,
  // with this interaction, the get function will be called
  // when you call router.route.my('...')
  get: function(route) {...},
  reset: function() {...}
}`}
    </PrismBlock>

    <p>
      Instead of importing the actual route interaction object, you typically
      import a factory function to create the object. This isn't absolutely
      necessary, but is useful for server-side rendering.
    </p>

    <PrismBlock lang="javascript">
      {`// interactions/my.js
export default function createMyInteraction() {
  return {
    name: "my",
    register() {...},
    get() {...},
    reset() {...}
  };
}

// index.js
import createMyInteraction from "./interactions/my";

const interaction = createMyInteraction();`}
    </PrismBlock>

    <Section title="Adding Interactions" id="adding">
      <p>
        Route interactions are provided to the router call as an array using the{" "}
        <IJS>route</IJS> property of the options object (the third argument).
      </p>

      <PrismBlock lang="javascript">
        {`const router = curi(history, routes, {
  route: [createMyInteraction()]
});`}
      </PrismBlock>

      <p>
        The route interaction will be added to the router's <IJS>route</IJS>{" "}
        property. To call an interaction, you simply use its name.
      </p>

      <PrismBlock lang="javascript">
        {`const myValue = router.route.my('Some Route', ...);`}
      </PrismBlock>
    </Section>

    <Section title="Creating Route Interactions" id="creating">
      <p>There are just a few steps to creating your own route interactions.</p>

      <p>
        Remember to export a function that will create the interaction object,
        not the actual interaction object.
      </p>

      <PrismBlock lang="javascript">
        {`// we'll create an interaction confirms a route is registered
export default function confirmInteraction() {
  ...
}`}
      </PrismBlock>

      <p>
        The function should return an object with four properties:{" "}
        <IJS>name</IJS>, <IJS>register</IJS>, <IJS>get</IJS>, and{" "}
        <IJS>reset</IJS>.
      </p>
      <ul>
        <li>
          <IJS>name</IJS> is a unique identifier for the route interaction.
        </li>
        <li>
          <IJS>register</IJS> is a function to internally store information
          about routes.
        </li>
        <li>
          <IJS>get</IJS> is a function that will receive a route's name (and
          possibly other arguments) and perform some task using the related
          route
        </li>
        <li>
          <IJS>reset</IJS> is a function that will reset the interaction's
          internal state (this is used if you call{" "}
          <IJS>router.replaceRoutes()</IJS>).
        </li>
      </ul>

      <PrismBlock lang="javascript">
        {`export default function confirmInteraction() {
  // maintain an object of known routes
  let knownRoutes = {};
  return {
    name: 'confirm',
    // when a route is registered, we store it using its name
    register: route => {
      knownRoutes[route.name] = true;
    },
    // get checks the known routes to see if one exists with
    // the requested name
    get: (name) => {
      return knownRoutes[name] != null
    },
    // reset the known routes
    reset: () => {
      knownRoutes = {};
    }
  };
}`}
      </PrismBlock>

      <p>
        In your application, you can import it, call the factory to create the
        interaction, and register the interaction when you create the router.
      </p>

      <PrismBlock lang="javascript">
        {`import curi from '@curi/core';
import confirmFactory from './interactions/confirm'

const routes = [{ name: 'Home', path: '' }];

const router = curi(history, routes, {
  route: [confirmFactory()]
});

router.route.confirm('Home'); // true
router.route.confirm('Elsewhere'); // false`}
      </PrismBlock>

      <Subsection title="Slightly more advanced" id="Slightly-more-advanced">
        <p>
          You might want to write an interaction that uses data from parent
          routes when registering a route. For example, the built-in pathname
          interaction joins a route's path with it parent path(s).
        </p>

        <p>
          The second argument passed to a router interaction's{" "}
          <IJS>register()</IJS> function is a parent data object. For root
          routes, this will be <IJS>undefined</IJS>. For nested routes, this is
          the value returned by the parent route's <IJS>register()</IJS>{" "}
          function.
        </p>

        <PrismBlock lang="javascript">
          {`function ParentFactory() {
  let routeTree = {};
  return {
    name: 'routeParent',
    register: (route, parent) => {
      routeTree[route.name] = parent;
      // we return route.name and any child routes will receive that
      // as their parent value
      return route.name;
    },
    get: (name) => {
      return routeTree[name];
    },
    reset: () => {
      routeTree = {};
    }
  }
}`}
        </PrismBlock>
      </Subsection>
    </Section>

    <div>
      <h2>Next</h2>
      <p>
        Next on the list are side effects, which you can learn more about in the{" "}
        <Link to="Guide" params={{ slug: "side-effects" }}>
          Using Side Effects
        </Link>{" "}
        guide.
      </p>
    </div>
  </BaseGuide>
);
