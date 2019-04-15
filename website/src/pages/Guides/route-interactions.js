import React from "react";
import { Link } from "@curi/react-dom";

import {
  PlainSection,
  HashSection,
  CodeBlock,
  IJS
} from "../../components/guide/common";

const meta = {
  title: "Route Interactions"
};

const callingMeta = {
  title: "Calling Intearctions",
  hash: "calling"
};

const builtinMeta = {
  title: "Built-in Interactions",
  hash: "built-in"
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

const contents = [callingMeta, builtinMeta, addingMeta, creatingMeta];

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
          <Link name="Package" params={{ package: "route-prefetch" }}>
            <IJS>prefetch</IJS>
          </Link>{" "}
          interaction only registers routes with a <IJS>resolve</IJS> property.
        </p>
      </PlainSection>

      <HashSection meta={callingMeta}>
        <p>
          Every interaction has a unique <IJS>name</IJS>. The interaction can be
          called as a property of a route's <IJS>route</IJS> object. The first
          argument to the call is always the name of the route to interact with.
          Some interactions may also take additional arguments.
        </p>

        <CodeBlock>
          {`router.route.myInteraction("Home");
router.route.otherInteraction("User", false);`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={builtinMeta}>
        <p>
          Curi comes with two built-in interactions: <IJS>pathname</IJS> and{" "}
          <IJS>active</IJS>.
        </p>

        <p>
          The <IJS>pathname</IJS> interaction is used to generate a pathname
          string for a route. This is done using the route's name and an object
          of route params (if they are necessary).
        </p>

        <CodeBlock>{`router.route.pathname("User", { id: 1 });`}</CodeBlock>

        <p>
          The <IJS>active</IJS> interaction determines if a route is active by
          comparing it to a <IJS>response</IJS> object.
        </p>

        <CodeBlock>{`router.route.active("Home", response);`}</CodeBlock>
      </HashSection>

      <HashSection meta={addingMeta}>
        <p>
          Route interactions are attached to routes using the second argument to{" "}
          <IJS>prepareRoutes</IJS>, which is an array of route interactions.
        </p>

        <p>
          The router will make the interactions that it receives from its{" "}
          <IJS>routes</IJS> available through its <IJS>route</IJS> property.
        </p>

        <CodeBlock>
          {`const routes = prepareRoutes(
  routes,
  [createMyInteraction()] // name = myInteraction
);
const router = createRouter(browser, routes);
router.route // all interactions`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={creatingMeta}>
        <p>
          Curi provides some interactions for common use cases, but you may have
          need to create a custom interaction. There are a few steps to creating
          your own route interactions.
        </p>

        <p>
          While not strictly require, interactions are commonly created from a
          function so that multiple instances of the interaction can be safely
          created.
        </p>

        <p>
          For this example, we'll create an interaction that confirms that a
          route is registered.
        </p>

        <CodeBlock>
          {`function confirmInteraction() {
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
          <p>
            A function to internally store data about routes. The stored data
            will be accessible from the interaction's <IJS>get</IJS> method.
          </p>

          <p>
            The first argument to <IJS>register</IJS> is the "public" data for a
            route, such as its <IJS>name</IJS> and route param <IJS>keys</IJS>.
            Data should be stored using the route's <IJS>name</IJS>.
          </p>

          <p>
            The second argument, which is optional, is data from the route's
            parent. If a <IJS>register</IJS> method returns a value, the
            returned value will be passed as the second value when registering
            the route's children routes.
          </p>
        </HashSection>

        <HashSection tag="h3" meta={{ title: "get", hash: "property-get" }}>
          <p>
            A function that will receive a route's name (and possibly other
            arguments) and perform some task using the related route. If the
            interaction's <IJS>register</IJS> method stored data about the
            route, it can be read here.
          </p>
        </HashSection>

        <p>
          With these properties, we can create our confirmation interaction.
        </p>

        <CodeBlock>
          {`function confirmInteraction() {
  // maintain a set of known routes
  const knownRoutes = new Set();
  return {
    name: 'confirm',
    // when a route is registered,
    // we store it using its name
    register: route => {
      knownRoutes.add(route.name);
    },
    // get checks the known routes to see if one exists
    // with the requested name
    get: (name) => {
      return knownRoutes.has(name);
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
import createConfirmation from './interactions/confirm'

const routes = prepareRoutes(
  [{ name: 'Home', path: '' }],
  [createConfirmation()]
);

const router = createRouter(browser, routes);

router.route.confirm('Home'); // true
router.route.confirm('Elsewhere'); // false`}
        </CodeBlock>

        <HashSection meta={advancedMeta} tag="h3">
          <p>
            For a more advanced example, we can take advantage of the second
            argument to <IJS>register</IJS>.
          </p>

          <p>
            For root routes (no parent route), the second argument will be{" "}
            <IJS>undefined</IJS>. For nested routes, this is the value returned
            by the parent route's <IJS>register</IJS> function.
          </p>

          <CodeBlock>
            {`function parentInteraction() {
  const routeTree = {};
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

          <p>
            Curi handles passing the return value of <IJS>register</IJS> to the
            route's children automatically.
          </p>
        </HashSection>
      </HashSection>
    </React.Fragment>
  );
}

export { RouterInteractionsGuide as component, contents };
