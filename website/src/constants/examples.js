const examples = [
  {
    name: "Basic",
    slug: "basic",
    description: "A basic Curi example",
    load: () =>
      import(
        /* webpackChunkName: 'example--basic' */
        `../pages/Examples/basic.js`
      )
  },

  {
    name: "Focus Management",
    slug: "accessibility",
    description: "Focusing content after navigation for improved accessibility",
    load: () =>
      import(
        /* webpackChunkName: 'example--accessibility' */
        `../pages/Examples/accessibility.js`
      )
  },

  {
    name: "Active",
    slug: "active",
    description: 'Determine if a route is "active"',
    load: () =>
      import(
        /* webpackChunkName: 'example--active' */
        `../pages/Examples/active.js`
      )
  },

  {
    name: "Async Routes & Navigation",
    slug: "async",
    description: "Async navigation to routes with resolve methods",
    load: () =>
      import(
        /* webpackChunkName: 'example--async' */
        `../pages/Examples/async.js`
      )
  },

  {
    name: "Breadcrumbs",
    slug: "breadcrumbs",
    description: "Access a route's ancestors to create breadcrumbs",
    load: () =>
      import(
        /* webpackChunkName: 'example--breadcrumbs' */
        `../pages/Examples/breadcrumbs.js`
      )
  },

  {
    name: "Redirects",
    slug: "redirects",
    description: "Routes can redirect to other routes",
    load: () =>
      import(
        /* webpackChunkName: 'example--redirects' */
        `../pages/Examples/redirects.js`
      )
  },

  {
    name: "Multiple Body Components",
    slug: "multi-body",
    description: "A response's body property can contain multiple components.",
    load: () =>
      import(
        /* webpackChunkName: 'example--multi-body' */
        `../pages/Examples/multi-body.js`
      )
  },

  {
    name: "Route Transitions",
    slug: "transitions",
    description: "CSS can be used to animate transitions between routes",
    load: () =>
      import(
        /* webpackChunkName: 'example--transitions' */
        `../pages/Examples/transitions.js`
      )
  },

  {
    name: "Modal Content",
    slug: "modal",
    description:
      "Modal routes can render content on top of another route's content",
    load: () =>
      import(
        /* webpackChunkName: 'example--modal' */
        `../pages/Examples/modal.js`
      )
  },

  {
    name: "Twitch Clone",
    slug: "twitch",
    load: () =>
      import(
        /* webpackChunkName: 'example--full-twitch'*/
        `../pages/Examples/twitch.js`
      )
  },

  {
    name: "Code Splitting",
    slug: "code-splitting",
    description: "An example of code splitting in a Curi application",
    load: () =>
      import(
        /* webpackChunkName: 'example--code-splitting' */
        `../pages/Examples/code-splitting.js`
      )
  },

  {
    name: "Script Tags",
    slug: "script-tags",
    description: "An example of a project that uses script tags to import Curi",
    load: () =>
      import(
        /* webpackChunkName: 'example--script-tags' */
        `../pages/Examples/script-tags.js`
      )
  },

  {
    name: "Server Rendering",
    slug: "server-rendering",
    description:
      "An example of a Curi application that does server-side rendering",
    load: () =>
      import(
        /* webpackChunkName: 'example--server-rendering' */
        `../pages/Examples/server-rendering.js`
      )
  },

  {
    name: "Side Effects",
    slug: "side-effects",
    description: "An example of a Curi application that uses side effects",
    load: () =>
      import(
        /* webpackChunkName: 'example--side-effects' */
        `../pages/Examples/side-effects.js`
      )
  }
];

export default {
  find: function findExample(slug) {
    return examples.find(e => e.slug === slug);
  },
  all: function() {
    return examples;
  }
};
