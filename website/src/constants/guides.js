const guides = [
  {
    name: "Installation",
    slug: "installation",
    description: "Learn how to install Curi",
    type: "basic",
    import: () =>
      import(/* webpackChunkName: 'guide--installation' */
      `../pages/Guides/installation.js`)
  },
  {
    name: "Getting Started",
    slug: "getting-started",
    description:
      "Learn the core concepts that you'll need to know to setup your project",
    type: "basic",
    import: () =>
      import(/* webpackChunkName: 'guide--getting-started' */
      `../pages/Guides/getting-started.js`)
  },
  {
    name: "History",
    slug: "history",
    description: "Learn about navigation and locations.",
    type: "basic",
    import: () =>
      import(/* webpackChunkName: 'guide--history' */
      `../pages/Guides/history.js`)
  },
  {
    name: "Routes",
    slug: "routes",
    description: "An introduction to route objects",
    type: "basic",
    import: () =>
      import(/* webpackChunkName: 'guide--routes' */
      `../pages/Guides/routes.js`)
  },
  {
    name: "Responses",
    slug: "responses",
    description: "An introduction to response objects",
    type: "basic",
    import: () =>
      import(/* webpackChunkName: 'guide--responses' */
      `../pages/Guides/responses.js`)
  },
  {
    name: "Navigation Objects",
    slug: "navigation-objects",
    description: "An introduction to navigation objects",
    type: "basic",
    import: () =>
      import(/* webpackChunkName: 'guide--navigation' */
      `../pages/Guides/navigation-objects.js`)
  },
  {
    name: "Sync or Async",
    slug: "sync-or-async",
    description: "Match routes synchronously or asynchronously",
    type: "basic",
    import: () =>
      import(/* webpackChunkName: 'guide--sync-or-async' */
      `../pages/Guides/sync-or-async.js`)
  },
  {
    name: "New Responses",
    slug: "new-responses",
    description: "Learn how to use observers to react to new responses",
    type: "basic",
    import: () =>
      import(/* webpackChunkName: 'guide--new-responses' */
      `../pages/Guides/new-responses.js`)
  },

  {
    name: "React DOM",
    slug: "react-dom",
    description: "Learn the basics of using Curi and React DOM",
    type: "rendering",
    import: () =>
      import(/* webpackChunkName: 'guide--react-dom' */
      `../pages/Guides/react-dom.js`)
  },
  {
    name: "React Native",
    slug: "react-native",
    description: "Learn the basics of using Curi and React Native",
    type: "rendering",
    import: () =>
      import(/* webpackChunkName: 'guide--react-native' */
      `../pages/Guides/react-native.js`)
  },
  {
    name: "Svelte",
    slug: "svelte",
    description: "Learn the basics of using Curi and Svelte",
    type: "rendering",
    import: () =>
      import(/* webpackChunkName: 'guide--svelte' */
      `../pages/Guides/svelte.js`)
  },
  {
    name: "Vue",
    slug: "vue",
    description: "Learn the basics of using Curi and Vue",
    type: "rendering",
    import: () =>
      import(/* webpackChunkName: 'guide--vue' */
      `../pages/Guides/vue.js`)
  },

  {
    name: "Route Interactions",
    slug: "route-interactions",
    description: "Learn how to interact with your routes",
    type: "advanced",
    import: () =>
      import(/* webpackChunkName: 'guide--route-interactions' */
      `../pages/Guides/route-interactions.js`)
  },
  {
    name: "Side Effects",
    slug: "side-effects",
    description:
      "Learn how to use side effect functions to trigger behavior after navigation",
    type: "advanced",
    import: () =>
      import(/* webpackChunkName: 'guide--side-effects' */
      `../pages/Guides/side-effects.js`)
  },
  {
    name: "Code Splitting",
    slug: "code-splitting",
    description: "Learn how to code split your project using Webpack",
    type: "advanced",
    import: () =>
      import(/* webpackChunkName: 'guide--code-splitting' */
      `../pages/Guides/code-splitting.js`)
  },
  {
    name: "Loading Route Data",
    slug: "loading",
    description:
      "Learn how to load data for a route and modify the response object",
    type: "advanced",
    import: () =>
      import(/* webpackChunkName: 'guide--loading' */
      `../pages/Guides/loading.js`)
  },
  {
    name: "Server-Side Rendering",
    slug: "ssr",
    description: "Cover the basics of server-side rendering an application",
    type: "advanced",
    import: () =>
      import(/* webpackChunkName: 'guide--ssr' */
      `../pages/Guides/ssr.js`)
  },
  {
    name: "Accessibility",
    slug: "accessibility",
    description: "Make your site inclusive to users who use screen readers.",
    type: "advanced",
    import: () =>
      import(/* webpackChunkName: 'guide--accessibility' */
      `../pages/Guides/accessibility.js`)
  },
  {
    name: "Apollo Integration",
    slug: "apollo",
    description: "Integrating Curi and Apollo",
    type: "advanced",
    import: () =>
      import(/* webpackChunkName: 'guide--apollo' */
      `../pages/Guides/apollo.js`)
  },
  {
    name: "Development Tips",
    slug: "dev-tips",
    description: "Tips on developing using Curi",
    type: "advanced",
    import: () =>
      import(/* webpackChunkName: 'guide--dev-tips' */
      `../pages/Guides/dev-tips.js`)
  },
  {
    name: "React Router v2/3",
    slug: "migrate-rrv3",
    descriptioni:
      "Learn how to migrate an application from React Router v2 or v3 to Curi",
    type: "migration",
    import: () =>
      import(/* webpackChunkName: 'guide--migrate-rrv3' */
      `../pages/Guides/migrate-rrv3.js`)
  },
  {
    name: "React Router v4",
    slug: "migrate-rrv4",
    descriptioni:
      "Learn how to migrate an application from React Router v4 to Curi",
    type: "migration",
    import: () =>
      import(/* webpackChunkName: 'guide--migrate-rrv4' */
      `../pages/Guides/migrate-rrv4.js`)
  }
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
