import preferDefault from "../preferDefault";

const examples = {
  react: [
    {
      name: "Accessibility",
      category: "react",
      slug: "accessibility",
      description: "Focus content after navigating",
      import: () =>
        preferDefault(
          import(/* webpackChunkName: 'example--react-accessibility' */
          `../pages/Examples/react/accessibility.js`)
        )
    },
    {
      name: "Active Links",
      category: "react",
      slug: "active-links",
      description: "Style links when they match the current location",
      import: () =>
        preferDefault(
          import(/* webpackChunkName: 'example--react-active-links' */
          `../pages/Examples/react/active-links.js`)
        )
    },
    {
      name: "Async Navigation",
      category: "react",
      slug: "async-nav",
      description:
        "Display a spinner to indicate that navigation is loading content for async routes",
      import: () =>
        preferDefault(
          import(/* webpackChunkName: 'example--react-async-nav' */
          `../pages/Examples/react/async-nav.js`)
        )
    },
    {
      name: "Authentication",
      category: "react",
      slug: "authentication",
      description:
        "Automatically redirect to a login page when attempting to access private content",
      import: () =>
        preferDefault(
          import(/* webpackChunkName: 'example--react-authentication' */
          `../pages/Examples/react/authentication.js`)
        )
    },
    {
      name: "Basic",
      category: "react",
      slug: "basic",
      description: "A simple Curi app rendered using React",
      import: () =>
        preferDefault(
          import(/* webpackChunkName: 'example--react-basic' */
          `../pages/Examples/react/basic.js`)
        )
    },
    {
      name: "Blocking Navigation",
      category: "react",
      slug: "blocking-navigation",
      description: "Prevent navigation away from a half-filled form",
      import: () =>
        preferDefault(
          import(/* webpackChunkName: 'example--react-blocking-navigation' */
          `../pages/Examples/react/blocking-navigation.js`)
        )
    },
    {
      name: "Breadcrumbs",
      category: "react",
      slug: "breadcrumbs",
      description: "Render breadcrumb links to ancestor routes",
      import: () =>
        preferDefault(
          import(/* webpackChunkName: 'example--react-breadcrumbs' */
          `../pages/Examples/react/breadcrumbs.js`)
        )
    },
    /*{
      name: "Data Loading",
      category: "react",
      slug: "data-loading",
      description: "Display a loading bar while waiting for data to load",
      import: () => preferDefault(
        import(
          /* webpackChunkName: 'example--react-data-loading'
          `../pages/Examples/react/data-loading.js`
          )
        )
    },*/
    {
      name: "Modal Routes",
      category: "react",
      slug: "modal",
      description: "Load a route in a modal (the Pinterest model)",
      import: () =>
        preferDefault(
          import(/* webpackChunkName: 'example--react-modal' */
          `../pages/Examples/react/modal.js`)
        )
    },
    {
      name: "Multiple Body Components",
      category: "react",
      slug: "multi-body",
      description: "Attach multiple components to a route",
      import: () =>
        preferDefault(
          import(/* webpackChunkName: 'example--react-multi-body' */
          `../pages/Examples/react/multi-body.js`)
        )
    },
    {
      name: "Transitions",
      category: "react",
      slug: "transitions",
      description: "Transition between routes using react-transition-group",
      import: () =>
        preferDefault(
          import(/* webpackChunkName: 'example--react-transitions' */
          `../pages/Examples/react/transitions.js`)
        )
    }
  ],
  vue: [
    {
      name: "Accessibility",
      category: "vue",
      slug: "accessibility",
      description: "Focus content after navigating",
      import: () =>
        preferDefault(
          import(/* webpackChunkName: 'example--vue-accessibility' */
          `../pages/Examples/vue/accessibility.js`)
        )
    },
    {
      name: "Active Links",
      category: "vue",
      slug: "active-links",
      description: "Style links when they match the current location",
      import: () =>
        preferDefault(
          import(/* webpackChunkName: 'example--vue-active-links' */
          `../pages/Examples/vue/active-links.js`)
        )
    },
    {
      name: "Async Navigation",
      category: "vue",
      slug: "async-nav",
      description:
        "Display a spinner to indicate that navigation is loading content for async routes",
      import: () =>
        preferDefault(
          import(/* webpackChunkName: 'example--vue-async-nav' */
          `../pages/Examples/vue/async-nav.js`)
        )
    },
    {
      name: "Authentication",
      category: "vue",
      slug: "authentication",
      description:
        "Automatically redirect to a login page when attempting to access private content",
      import: () =>
        preferDefault(
          import(/* webpackChunkName: 'example--vue-authentication' */
          `../pages/Examples/vue/authentication.js`)
        )
    },
    {
      name: "Basic",
      category: "vue",
      slug: "basic",
      description: "A simple Curi app rendered using Vue",
      import: () =>
        preferDefault(
          import(/* webpackChunkName: 'example--vue-basic' */
          `../pages/Examples/vue/basic.js`)
        )
    },
    {
      name: "Breadcrumbs",
      category: "vue",
      slug: "breadcrumbs",
      description: "Render breadcrumb links to ancestor routes",
      import: () =>
        preferDefault(
          import(/* webpackChunkName: 'example--vue-breadcrumbs' */
          `../pages/Examples/vue/breadcrumbs.js`)
        )
    },
    {
      name: "Blocking Navigation",
      category: "vue",
      slug: "blocking-navigation",
      description: "Prevent navigation away from a half-filled form",
      import: () =>
        preferDefault(
          import(/* webpackChunkName: 'example--vue-blocking-navigation' */
          `../pages/Examples/vue/blocking-navigation.js`)
        )
    },
    {
      name: "Modal Routes",
      category: "vue",
      slug: "modal",
      description: "Load a route in a modal (the Pinterest model)",
      import: () =>
        preferDefault(
          import(/* webpackChunkName: 'example--vue-modal' */
          `../pages/Examples/vue/modal.js`)
        )
    },
    {
      name: "Transitions",
      category: "vue",
      slug: "transitions",
      description: "Transition between routes",
      import: () =>
        preferDefault(
          import(/* webpackChunkName: 'example--vue-transitions' */
          `../pages/Examples/vue/transitions.js`)
        )
    }
  ],
  /*svelte: [
    {
      name: "Basic",
      category: "svelte",
      slug: "basic",
      description: "A simple Curi app rendered using Svelte",
      import: () => preferDefault(
        import(
          /* webpackChunkName: 'example--svelte-basic'
          `../pages/Examples/svelte/basic.js`
          )
        )
    }
  ],*/
  /*full: [
    {
      name: "Twitch Clone",
      category: "full",
      slug: "twitch",
      description: "A clone of Twitch.tv built with Curi + Vue",
      import: () => preferDefault(
        import(
          /* webpackChunkName: 'example--full-twitch'
          `../pages/Examples/full/twitch.js`
          )
        )
    }
  ],*/
  misc: [
    {
      name: "Code Splitting",
      category: "misc",
      slug: "code-splitting",
      description: "Use import() to enable Webpack code splitting",
      import: () =>
        preferDefault(
          import(/* webpackChunkName: 'example--misc-code-splitting' */
          `../pages/Examples/misc/code-splitting`)
        )
    },
    {
      name: "Script Tags",
      category: "misc",
      slug: "script-tags",
      description: "Load Curi packages using script tags instead of a bundle",
      import: () =>
        preferDefault(
          import(/* webpackChunkName: 'example--misc-script-tags' */
          `../pages/Examples/misc/script-tags`)
        )
    },
    {
      name: "Server Rendering",
      category: "misc",
      slug: "server-rendering",
      description:
        "Render your application on the server using Node (this example uses Express)",
      import: () =>
        preferDefault(
          import(/* webpackChunkName: 'example--misc-server-rendering' */
          `../pages/Examples/misc/server-rendering`)
        )
    },
    {
      name: "Side Effects",
      category: "misc",
      slug: "side-effect",
      description: "Add side effects that always respond to navigation",
      import: () =>
        preferDefault(
          import(/* webpackChunkName: 'example--misc-side-effect' */
          `../pages/Examples/misc/side-effect`)
        )
    }
  ]
};

export default {
  find: function findExample(category, slug) {
    if (!examples[category]) {
      return;
    } else {
      return examples[category].find(e => e.slug === slug);
    }
  },
  all: function() {
    return examples;
  }
};
