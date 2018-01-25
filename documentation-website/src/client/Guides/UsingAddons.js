import React from "react";
import { Link } from "@curi/react";

import BaseGuide from "./base/BaseGuide";
import { InlineJS as IJS, PrismBlock } from "../components/PrismBlocks";
import { Section, Subsection } from "../components/Sections";

export default ({ name }) => (
  <BaseGuide>
    <h1>{name}</h1>

    <p>
      Add-ons in Curi allow you to interact with a registered route using its
      name. A registered route is generally any route that is in the array of
      routes that you used to create your router. However, some add-ons only
      register routes that meet some criteria.
    </p>

    <p>Add-ons are objects with three properties: name, register, and get.</p>

    <PrismBlock lang="javascript">
      {`{
  // the string you will use to call the add-on
  name: 'MyAddon',

  // a function used internally to register routes
  // with the add-on. You only need to use this when
  // writing your own add-ons
  register: function(route, parentData) {...},

  // this is the function that will be added to your
  // router object's add-ons property. For example, with
  // this add-on, the get function will be called when
  // you call router.addons.MyAddon('...')
  get: function(route) {...},
  reset: function() {...}
}`}
    </PrismBlock>

    <p>
      However, when you import them, you are actually importing an add-on
      factory function. You need to call the function to create the add-on that
      you will pass to your Curi router.
    </p>

    <PrismBlock lang="javascript">
      {`function myAddonFactory() {
  return { name: ..., register: ..., get: ..., };
}`}
    </PrismBlock>

    <Section title="Adding add-ons" id="adding">
      <p>
        As stated above, whenever you include add-ons in your router object, you
        do not pass the actual add-on object. Instead, you pass an add-on
        instance (multiple routers would each have their own instance of the
        add-on), which can be useful for server-side rendering.
      </p>

      <p>
        Addons are provided to the <IJS>curi</IJS> call as an array using the
        addons property of the options object (the third argument to{" "}
        <IJS>curi</IJS>).
      </p>

      <PrismBlock lang="javascript">
        {`const router = curi(history, routes, {
  addons: [createMyAddon()]
});`}
      </PrismBlock>

      <p>
        The add-on will be added to the router's addons property. To call an
        add-on, you simply use its name.
      </p>

      <PrismBlock lang="javascript">
        {`const myValue = router.addons.myAddon('Some Route', ...);`}
      </PrismBlock>
    </Section>

    <Section title="Creating Addons" id="creating">
      <p>
        You may find yourself wanting to add a custom add-on to your
        application. There are just a few steps that you should follow in order
        to write your own add-on.
      </p>

      <p>
        Remember that you need to export a function that will create the add-on
        object, not the actual add-on object.
      </p>

      <PrismBlock lang="javascript">
        {`export default function myAddonFactory() {
  ...
}`}
      </PrismBlock>

      <p>
        The function should return an object with four properties:{" "}
        <IJS>name</IJS>, <IJS>register</IJS>, <IJS>get</IJS>, and{" "}
        <IJS>reset</IJS>. name is a unique identifier for the add-on, register
        is a function that will be used for your add-on to store information
        about each route, get is a function that will receive a route's name
        (and possibly other arguments) and perform some task using the related
        route, and reset is a function that will reset the add-on's internal
        state (this is used if you call <IJS>router.refresh</IJS>).
      </p>

      <PrismBlock lang="javascript">
        {`export default function myAddonFactory() {
  let knownRoutes = {};
  return {
    name: 'MyFirstAddon',
    register: route => {
      knownRoutes[route.name] = true;
    },
    get: (name) => {
      return knownRoutes[name] != null
    },
    reset: () => {
      knownRoutes = {};
    }
  };
}`}
      </PrismBlock>

      <p>
        That is all there is to creating a basic add-on. Now, you just need to
        make sure to pass it to your router and you will be able to call your
        add-on's get function from your router.
      </p>

      <PrismBlock lang="javascript">
        {`import curi from '@curi/core';
import myAddonFactory from './myAddon'

const routes = [{ name: 'Home', path: '' }];

const router = curi(history, routes, {
  addons: [myAddonFactory()]
});

router.addons.MyFirstAddon('Home'); // true
router.addons.MyFirstAddon('Elsewhere'); // false`}
      </PrismBlock>

      <Subsection title="Slightly more advanced" id="Slightly-more-advanced">
        <p>
          You might want to write an add-on that uses data from parent routes
          when registering a route. For example, the built-in pathname add-on
          joins a route's path with it parent path(s).
        </p>

        <p>
          If you want your add-on to provide similar functionality, all you have
          to do is have the register function return the data that should be
          passed to its child routes. Then, when any children of that route are
          registered, they will be passed the return value from their parent as
          the second argument of the register function.
        </p>
        <PrismBlock lang="javascript">
          {`function ParentFactory() {
  let routeTree = {};
  return {
    name: 'routeParent',
    register: (route, parent) => {
      // parent is the value returned by the route's parent route
      // and will be undefined when a route does not have a parent
      routeTree[route.name] = parent;
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
