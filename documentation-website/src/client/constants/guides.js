const guides = [
  {
    name: 'Installation',
    slug: 'installation',
    description: 'Learn how to install Curi'
  },
  {
    name: 'Getting Started',
    slug: 'getting-started',
    description: 'Learn the basic concepts that you\'ll need to know to setup your project'
  },
  {
    name: 'All About Routes',
    slug: 'routes',
    description: 'Learn about Curi routes and their properties'
  },
  {
    name: 'Rendering with Responses',
    slug: 'responses',
    description: 'Learn how to render your project using a response object'
  },
  {
    name: 'Using Addons',
    slug: 'addons',
    description: 'Learn how to use addons to interact with your routes in your project'
  },
  {
    name: 'Using Side Effects',
    slug: 'side-effects',
    description: 'Learn how to use side effect functions to trigger behavior after navigation'
  },
  {
    name: 'Response Caching',
    slug: 'response-caching',
    description: 'Learn how to cache responses to prevent recreating duplicate responses'
  },
  {
    name: 'Code Splitting with the Preload Property',
    slug: 'code-splitting',
    description: 'Learn how to code split your project using Webpack'
  },
  {
    name: 'The Load Property',
    slug: 'load',
    description: 'Learn how to use a route\'s load function to modify responses'
  }
];

export const byName = guides.reduce((acc, curr) => {
  acc[curr.slug] = curr;
  return acc;
}, {});

export default guides;
