import React from 'react';
import BaseGuide from '../components/BaseGuide';
import { InlineJS, PrismBlock } from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Link } from 'curi-react';

const slug = 'addons';
const name = 'Using Addons';

const UsingAddons = () => (
  <BaseGuide>
    <h1>{name}</h1>

    <p>
      Addons in Curi allow you to interact with a registered route using its name. A registered route
      is generally any route that is in the array of routes that you used to create your configuration
      object. However, some addons only register routes that meet some criteria.
    </p>

    <p>
      Addons are objects with three properties: name, register, and get.
    </p>

    <PrismBlock lang='javascript'>
      {
`{
  // the string you will use to call the addon
  name: 'MyAddon',

  // a function used internally to register routes
  // with the addon. You only need to use this when
  // writing your own addons
  register: function(route, parentData) {...},

  // this is the function that will be added to your
  // config object's addons property. For example, with
  // this addon, the get function will be called when
  // you call config.addons.MyAddon('...')
  get: function(route) {...}
}`
      }
    </PrismBlock>

    <p>
      However, when you import them, you are actually importing an addon factory. Curi will create
      the actual addon while creating your configuration object.
    </p>

    <PrismBlock lang='javascript'>
      {
`function myAddonFactory() {
  return { name: ..., register: ..., get: ..., };
}`
      }
    </PrismBlock>

    <div className='section'>
      <h2>Adding addons</h2>
      <p>
        As stated above, whenever you include addons in your configuration object, you do not pass
        the actual addon object. Instead, you pass a factory function that will return the addon
        object. This allows addons to be instanced (multiple configuration objects would each
        have their own instance of the addon), which can be useful for server-side rendering.
      </p>

      <p>
        Addons are provided to the <InlineJS>createConfig</InlineJS> call as an array using the addons
        property of the options object (the third argument to <InlineJS>createConfig</InlineJS>).
      </p>

      <PrismBlock lang='javascript'>
        {
`const config = createConfig(history, routes, {
  addons: [createMyAddon]
});`
        }
      </PrismBlock>

      <p>
        The addon will be added to the configuration object's addons property. To call an addon,
        you simply use its name.
      </p>

      <PrismBlock lang='javascript'>
        {
`const myValue = config.addons.myAddon('Some Route', ...);`
        }
      </PrismBlock>
    </div>

    <div className='section'>
      <h2>Creating Addons</h2>

      <p>
        You may find yourself wanting to add a custom addon to your application. There are just a few
        steps that you should follow in order to write your own addon.
      </p>

      <p>
        Remember that you need to export a function that will create the addon object, not the actual
        addon object.
      </p>

      <PrismBlock lang='javascript'>
        {
`export default function myAddonFactory() {
  ...
}`
        }
      </PrismBlock>

      <p>
        The function should return an object with three properties: name, register, and get. name is a
        unique identifier for the addon, register is a function that will be used for your addon to store
        information about each route, and get is a function that will receive a route's name and perform
        some task using the related route.
      </p>

      <PrismBlock lang='javascript'>
        {
`export default function myAddonFactory() {
  const knownRoutes = {};
  return {
    name: 'MyFirstAddon',
    register: route => {
      knownRoutes[route.name] = true;
    },
    get: (name) => {
      return knownRoutes[name] != null
    }
  };
}`
        }
      </PrismBlock>

      <p>
        That is all there is to creating a basic addon. Now, you just need to make sure to pass it to
        your configuration object and you will be able to call your addon's get function from your
        configuration object.
      </p>

      <PrismBlock lang='javascript'>
        {
`import createConfig from 'curi';
import myAddonFactory from './myAddon'

const routes = [{ name: 'Home', path: '' }];

const config = createConfig(history, routes, {
  addons: [myAddonFactory]
});

config.addons.MyFirstAddon('Home'); // true
config.addons.MyFirstAddon('Elsewhere'); // false`
        }
      </PrismBlock>

      <div className='subsection'>
        <h3>Slightly more advanced</h3>

        <p>
          You might want to write an addon that uses data from parent routes when registering a route.
          For example, the built-in pathname addon joins a route's path with it parent path(s).
        </p>

        <p>
          If you want your addon to provide similar functionality, all you have to do is have the register
          function return the data that should be passed to its child routes. Then, when any children of
          that route are registered, they will be passed the return value from their parent as the second
          argument of the register function.
        </p>
        <PrismBlock lang='javascript'>
          {
`function ParentFactory() {
  const routeTree = {};
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
    }
  }
}`
          }
        </PrismBlock>
      </div>
    </div>

    <div>
      <h2>Next</h2>
      <p>
        Next on the list are side effects, which you can learn more about in the{' '}
        <Link to='Guide' params={{ slug: 'side-effects' }}>Using Side Effects</Link> guide.
      </p>
    </div>
  </BaseGuide>
);

export default {
  name,
  slug,
  component: UsingAddons
};
