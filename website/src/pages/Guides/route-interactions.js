import React from "react";

import {
  PlainSection,
  HashSection,
  CodeBlock,
  IJS
} from "../../components/guide/common";

const meta = {
  title: "Route Interactions"
};

const addingMeta = {
  title: "Adding Interactions",
  hash: "adding"
};

const advancedMeta = {
  title: "Slightly more advanced",
  hash: "Slightly-more-advanced"
};
const creatingMeta = {
  title: "Creating Route Interactions",
  hash: "creating",
  children: [advancedMeta]
};

const contents = [addingMeta, creatingMeta];

function RouterInteractionsGuide() {
  return (
    <React.Fragment>
      <PlainSection>
        <h1>{meta.title}</h1>

        <p>
          Route interactions let you interact with a registered route using its
          name.
        </p>
        <p>
          A registered route is generally any route that is in the array of
          routes that you used to create your router. However, some interactions
          only register routes that meet some criteria. For example, the{" "}
          <IJS>prefetch</IJS> interaction only registers routes with
          asynchronous methods.
        </p>

        <p>
          Route interactions are defined using objects with three properties:
          name, register, and get.
        </p>

        <CodeBlock>
          {`{
  // The string you will use to call the interaction.
  name: 'my',

  // A function used internally to register routes
  // with the interaction. You only need to use this when
  // writing your own interactions.
  register: function(route, parentData) {...},

  // This is the function that you will call. For example,
  // with this interaction, the get function will be
  // called when you call router.route.my('...')
  get: function(route) {...}
}`}
        </CodeBlock>

        <p>
          Instead of importing the actual route interaction object, you
          typically import a factory function to create the object. This isn't
          absolutely necessary, but is useful for server-side rendering.
        </p>

        <CodeBlock>
          {`// interactions/my.js
function createMyInteraction() {
  return {
    name: "my",
    register() {...},
    get() {...}
  };
}

// index.js
import createMyInteraction from "./interactions/my";

const interaction = createMyInteraction();`}
        </CodeBlock>
      </PlainSection>

      <HashSection meta={addingMeta}>
        <p>
          Route interactions are provided to the router call as an array using
          the <IJS>route</IJS> property of the options object (the third
          argument).
        </p>

        <CodeBlock>
          {`const router = createRouter(browser, routes, {
  route: [createMyInteraction()]
});`}
        </CodeBlock>

        <p>
          The route interaction will be added to the router's <IJS>route</IJS>{" "}
          property. When you call an interaction, you pass the name of the route
          that you want to interact with.
        </p>

        <CodeBlock>
          {`const myValue = router.route.my('Some Route', ...);`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={creatingMeta}>
        <p>There are a few steps to creating your own route interactions.</p>

        <p>
          Remember to export a function that will create the interaction object,
          not the actual interaction object.
        </p>

        <CodeBlock>
          {`// we'll create an interaction that confirms
// a route is registered
function confirmInteraction() {
  ...
}`}
        </CodeBlock>

        <p>
          The function should return an object with three properties:{" "}
          <IJS>name</IJS>, <IJS>register</IJS>, and <IJS>get</IJS>.
        </p>

        <HashSection tag="h3" meta={{ title: "name", hash: "property-name" }}>
          <p>A unique identifier for the route interaction.</p>
        </HashSection>

        <HashSection
          tag="h3"
          meta={{ title: "register", hash: "property-register" }}
        >
          <p>A function to internally store information about routes.</p>
        </HashSection>

        <HashSection tag="h3" meta={{ title: "get", hash: "property-get" }}>
          <p>
            A function that will receive a route's name (and possibly other
            arguments) and perform some task using the related route.
          </p>
        </HashSection>

        <CodeBlock>
          {`function confirmInteraction() {
  // maintain an object of known routes
  let knownRoutes = {};
  return {
    name: 'confirm',
    // when a route is registered,
    // we store it using its name
    register: route => {
      knownRoutes[route.name] = true;
    },
    // get checks the known routes to see if one exists
    // with the requested name
    get: (name) => {
      return knownRoutes[name] != null
    }
  };
}`}
        </CodeBlock>

        <p>
          In your application, you can import it, call the factory to create the
          interaction, and register the interaction when you create the router.
        </p>

        <CodeBlock>
          {`import { curi, prepareRoutes } from '@curi/router';
import confirmFactory from './interactions/confirm'

const routes = prepareRoutes([{ name: 'Home', path: '' }]);

const router = createRouter(browser, routes, {
  route: [confirmFactory()]
});

router.route.confirm('Home'); // true
router.route.confirm('Elsewhere'); // false`}
        </CodeBlock>

        <HashSection meta={advancedMeta} tag="h3">
          <p>
            You might want to write an interaction that uses data from parent
            routes when registering a route. For example, the built-in pathname
            interaction joins a route's path with it parent path(s).
          </p>

          <p>
            The second argument passed to a router interaction's{" "}
            <IJS>register</IJS> function is a parent data object. For root
            routes, this will be <IJS>undefined</IJS>. For nested routes, this
            is the value returned by the parent route's <IJS>register</IJS>{" "}
            function.
          </p>

          <CodeBlock>
            {`function ParentFactory() {
  let routeTree = {};
  return {
    name: 'routeParent',
    register: (route, parent) => {
      routeTree[route.name] = parent;
      // we return route.name and any child routes will
      // receive that as their parent value
      return route.name;
    },
    get: (name) => {
      return routeTree[name];
    }
  }
}`}
          </CodeBlock>
        </HashSection>
      </HashSection>
    </React.Fragment>
  );
}

export { RouterInteractionsGuide as component, contents };
