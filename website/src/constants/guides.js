const guides = [
  {
    name: "Installation",
    slug: "installation",
    description: "Learn how to install Curi",
    type: "basic",
    import: () =>
      import(
        /* webpackChunkName: 'guide--installation' */
        `../pages/Guides/installation.js`
      )
  },
  {
    name: "Getting Started",
    slug: "getting-started",
    description: "Learn the core concepts for adding Curi to an application",
    type: "basic",
    import: () =>
      import(
        /* webpackChunkName: 'guide--getting-started' */
        `../pages/Guides/getting-started.js`
      )
  },
  {
    name: "History",
    slug: "history",
    description: "Learn about Curi navigation and locations.",
    type: "basic",
    import: () =>
      import(
        /* webpackChunkName: 'guide--history' */
        `../pages/Guides/history.js`
      )
  },
  {
    name: "Routes",
    slug: "routes",
    description: "An introduction to Curi route objects",
    type: "basic",
    import: () =>
      import(
        /* webpackChunkName: 'guide--routes' */
        `../pages/Guides/routes.js`
      )
  },
  {
    name: "Responses",
    slug: "responses",
    description: "An introduction to Curi response objects",
    type: "basic",
    import: () =>
      import(
        /* webpackChunkName: 'guide--responses' */
        `../pages/Guides/responses.js`
      )
  },
  {
    name: "Navigation Objects",
    slug: "navigation-objects",
    description: "An introduction to Curi navigation objects",
    type: "basic",
    import: () =>
      import(
        /* webpackChunkName: 'guide--navigation' */
        `../pages/Guides/navigation-objects.js`
      )
  },
  {
    name: "Sync or Async",
    slug: "sync-or-async",
    description: "Match Curi routes synchronously or asynchronously",
    type: "basic",
    import: () =>
      import(
        /* webpackChunkName: 'guide--sync-or-async' */
        `../pages/Guides/sync-or-async.js`
      )
  },
  {
    name: "New Responses",
    slug: "new-responses",
    description:
      "Learn how to use Curi router observers to react to new responses",
    type: "basic",
    import: () =>
      import(
        /* webpackChunkName: 'guide--new-responses' */
        `../pages/Guides/new-responses.js`
      )
  },

  {
    name: "Accessibility",
    slug: "accessibility",
    description:
      "Make your Curi application inclusive to users who use screen readers.",
    type: "basic",
    import: () =>
      import(
        /* webpackChunkName: 'guide--accessibility' */
        `../pages/Guides/accessibility.js`
      )
  },

  {
    name: "React DOM",
    slug: "react-dom",
    description: "Learn the basics of using Curi and React DOM",
    type: "rendering",
    import: () =>
      import(
        /* webpackChunkName: 'guide--react-dom' */
        `../pages/Guides/react-dom.js`
      )
  },
  {
    name: "React Native",
    slug: "react-native",
    description: "Learn the basics of using Curi and React Native",
    type: "rendering",
    import: () =>
      import(
        /* webpackChunkName: 'guide--react-native' */
        `../pages/Guides/react-native.js`
      )
  },
  {
    name: "Svelte",
    slug: "svelte",
    description: "Learn the basics of using Curi and Svelte",
    type: "rendering",
    import: () =>
      import(
        /* webpackChunkName: 'guide--svelte' */
        `../pages/Guides/svelte.js`
      )
  },
  {
    name: "Vue",
    slug: "vue",
    description: "Learn the basics of using Curi and Vue",
    type: "rendering",
    import: () =>
      import(
        /* webpackChunkName: 'guide--vue' */
        `../pages/Guides/vue.js`
      )
  },

  {
    name: "Route Interactions",
    slug: "route-interactions",
    description: "Learn how to interact with your Curi routes",
    type: "advanced",
    import: () =>
      import(
        /* webpackChunkName: 'guide--route-interactions' */
        `../pages/Guides/route-interactions.js`
      )
  },
  {
    name: "Side Effects",
    slug: "side-effects",
    description:
      "Learn how to use Curi side effect functions to trigger behavior after navigation",
    type: "advanced",
    import: () =>
      import(
        /* webpackChunkName: 'guide--side-effects' */
        `../pages/Guides/side-effects.js`
      )
  },
  {
    name: "Code Splitting",
    slug: "code-splitting",
    description: "Learn how to code split your Curi routes using Webpack",
    type: "advanced",
    import: () =>
      import(
        /* webpackChunkName: 'guide--code-splitting' */
        `../pages/Guides/code-splitting.js`
      )
  },
  {
    name: "Loading Route Data",
    slug: "loading",
    description:
      "Learn how to load data for a Curi route and modify the response object",
    type: "advanced",
    import: () =>
      import(
        /* webpackChunkName: 'guide--loading' */
        `../pages/Guides/loading.js`
      )
  },
  {
    name: "Server-Side Rendering",
    slug: "ssr",
    description:
      "Cover the basics of server-side rendering an application with Curi",
    type: "advanced",
    import: () =>
      import(
        /* webpackChunkName: 'guide--ssr' */
        `../pages/Guides/ssr.js`
      )
  },
  {
    name: "Apollo Integration",
    slug: "apollo",
    description: "Integrating Curi and Apollo",
    type: "advanced",
    import: () =>
      import(
        /* webpackChunkName: 'guide--apollo' */
        `../pages/Guides/apollo.js`
      )
  }
  /* {
    name: "Development Tips",
    slug: "dev-tips",
    description: "Tips on developing using Curi",
    type: "advanced",
    import: () =>
      import(/* webpackChunkName: 'guide--dev-tips'
      `../pages/Guides/dev-tips.js`)
  }*/
];

let groupedGuides;

export default {
  find: function findGuide(slug) {
    return guides.find(g => g.slug === slug);
  },
  grouped: function groupGuides() {
    if (!groupedGuides) {
      groupedGuides = guides.reduce((acc, curr) => {
        if (!acc[curr.type]) {
          acc[curr.type] = [curr];
        } else {
          acc[curr.type].push(curr);
        }
        return acc;
      }, {});
    }
    return groupedGuides;
  },
  all: function() {
    return guides;
  }
};
