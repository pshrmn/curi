const examples = [
  {
    name: 'Active Links',
    slug: 'active-links',
    description: 'Style links when they match the current location'
  },
  {
    name: 'Authentication',
    slug: 'authentication',
    description: 'Automatically redirect to a login page when attempting to access private content'
  },
  {
    name: 'Basic Vue',
    slug: 'basic-vue',
    description: 'A simple Curi app rendered using VueJS'
  },
  {
    name: 'Basic Svelte',
    slug: 'basic-svelte',
    description: 'A simple Curi app rendered using Svelte'
  },
  {
    name: 'Blocking Navigation (React)',
    slug: 'blocking-navigation',
    description: 'Prevent navigation away from a half-filled form'
  },
  {
    name: 'Blocking Navigation (Vue)',
    slug: 'blocking-navigation-vue',
    description: 'Prevent navigation away from a half-filled form'
  },
  {
    name: 'Breadcrumbs (React)',
    slug: 'breadcrumbs',
    description: 'Render breadcrumb links to ancestor routes'
  },
  {
    name: 'Breadcrumbs (Vue)',
    slug: 'breadcrumbs-vue',
    description: 'Render breadcrumb links to ancestor routes'
  },
  {
    name: 'Code Splitting',
    slug: 'code-splitting',
    description: 'Use import() to enable Webpack code splitting'
  },
  {
    name: 'Data Loading',
    slug: 'data-loading',
    description: 'Display a loading bar while waiting for data to load'
  },
  {
    name: 'Modal Routes',
    slug: 'modal',
    description: 'Load a route in a modal (the Pinterest model)'
  },
  {
    name: 'Redux',
    slug: 'redux',
    description: 'Integrate Redux, React, and Curi (easily!)'
  },
  {
    name: 'Script Tags',
    slug: 'script-tags',
    description: 'Load Curi packages using script tags instead of a bundle'
  },
  {
    name: 'Server Rendering',
    slug: 'server-rendering',
    description: 'Render your application on the server using Node (this example uses Express)'
  },
  {
    name: 'Side Effects',
    slug: 'side-effect',
    description: 'Add side effects that always respond to navigation'
  },
  {
    name: 'Transitions',
    slug: 'transitions',
    description: 'Transition between routes using react-transition-group'
  }
]

export const byName = examples.reduce((acc, curr) => {
  acc[curr.slug] = curr;
  return acc;
}, {});

export default examples;
