import preferDefault from "../preferDefault";

const guides = [
  {
    name: "Installation",
    slug: "installation",
    description: "Learn how to install Curi",
    type: "basic",
    import: () =>
      preferDefault(
        import(/* webpackChunkName: 'guide--installation' */
        `../pages/Guides/installation.js`)
      )
  },
  {
    name: "Creating a Router",
    slug: "creating-a-router",
    description:
      "Learn the basic concepts that you'll need to know to setup your project",
    type: "basic",
    import: () =>
      preferDefault(
        import(/* webpackChunkName: 'guide--creating-a-router' */
        `../pages/Guides/creating-a-router.js`)
      )
  },
  {
    name: "Routes & Responses",
    slug: "routes-and-responses",
    description: "An introduction to how routes and responses work",
    type: "basic",
    import: () =>
      preferDefault(
        import(/* webpackChunkName: 'guide--routes-and-responses' */
        `../pages/Guides/routes-and-responses.js`)
      )
  },
  {
    name: "Sync or Async",
    slug: "sync-or-async",
    description: "Match routes synchronously or asynchronously",
    type: "basic",
    import: () =>
      preferDefault(
        import(/* webpackChunkName: 'guide--sync-or-async' */
        `../pages/Guides/sync-or-async.js`)
      )
  },
  {
    name: "Navigating & Observing",
    slug: "navigating-and-observing",
    description:
      "Learn how to programmatically navigate and use observers to detect navigation",
    type: "basic",
    import: () =>
      preferDefault(
        import(/* webpackChunkName: 'guide--navigating-and-observing' */
        `../pages/Guides/navigating-and-observing.js`)
      )
  },

  {
    name: "React DOM",
    slug: "react-dom",
    description: "Learn the basics of using Curi and React DOM",
    type: "rendering",
    import: () =>
      preferDefault(
        import(/* webpackChunkName: 'guide--react-dom' */
        `../pages/Guides/react-dom.js`)
      )
  },
  {
    name: "React Native",
    slug: "react-native",
    description: "Learn the basics of using Curi and React Native",
    type: "rendering",
    import: () =>
      preferDefault(
        import(/* webpackChunkName: 'guide--react-native' */
        `../pages/Guides/react-native.js`)
      )
  },
  {
    name: "Svelte",
    slug: "svelte",
    description: "Learn the basics of using Curi and Svelte",
    type: "rendering",
    import: () =>
      preferDefault(
        import(/* webpackChunkName: 'guide--svelte' */
        `../pages/Guides/svelte.js`)
      )
  },
  {
    name: "Vue",
    slug: "vue",
    description: "Learn the basics of using Curi and Vue",
    type: "rendering",
    import: () =>
      preferDefault(
        import(/* webpackChunkName: 'guide--vue' */
        `../pages/Guides/vue.js`)
      )
  },

  {
    name: "Route Interactions",
    slug: "route-interactions",
    description: "Learn how to interact with your routes",
    type: "advanced",
    import: () =>
      preferDefault(
        import(/* webpackChunkName: 'guide--route-interactions' */
        `../pages/Guides/route-interactions.js`)
      )
  },
  {
    name: "Side Effects",
    slug: "side-effects",
    description:
      "Learn how to use side effect functions to trigger behavior after navigation",
    type: "advanced",
    import: () =>
      preferDefault(
        import(/* webpackChunkName: 'guide--side-effects' */
        `../pages/Guides/side-effects.js`)
      )
  },
  {
    name: "Code Splitting",
    slug: "code-splitting",
    description: "Learn how to code split your project using Webpack",
    type: "advanced",
    import: () =>
      preferDefault(
        import(/* webpackChunkName: 'guide--code-splitting' */
        `../pages/Guides/code-splitting.js`)
      )
  },
  {
    name: "Loading Route Data",
    slug: "loading",
    description:
      "Learn how to load data for a route and modify the response object",
    type: "advanced",
    import: () =>
      preferDefault(
        import(/* webpackChunkName: 'guide--loading' */
        `../pages/Guides/loading.js`)
      )
  },
  {
    name: "Accessibility",
    slug: "accessibility",
    description: "Make your site inclusive to users who use screen readers.",
    type: "advanced",
    import: () =>
      preferDefault(
        import(/* webpackChunkName: 'guide--accessibility' */
        `../pages/Guides/accessibility.js`)
      )
  },
  {
    name: "Apollo Integration",
    slug: "apollo",
    description: "Integrating Curi and Apollo",
    type: "advanced",
    import: () =>
      preferDefault(
        import(/* webpackChunkName: 'guide--apollo' */
        `../pages/Guides/apollo.js`)
      )
  },
  {
    name: "Development Tips",
    slug: "dev-tips",
    description: "Tips on developing using Curi",
    type: "advanced",
    import: () =>
      preferDefault(
        import(/* webpackChunkName: 'guide--dev-tips' */
        `../pages/Guides/dev-tips.js`)
      )
  },
  {
    name: "React Router v2/3",
    slug: "migrate-rrv3",
    descriptioni:
      "Learn how to migrate an application from React Router v2 or v3 to Curi",
    type: "migration",
    import: () =>
      preferDefault(
        import(/* webpackChunkName: 'guide--migrate-rrv3' */
        `../pages/Guides/migrate-rrv3.js`)
      )
  },
  {
    name: "React Router v4",
    slug: "migrate-rrv4",
    descriptioni:
      "Learn how to migrate an application from React Router v4 to Curi",
    type: "migration",
    import: () =>
      preferDefault(
        import(/* webpackChunkName: 'guide--migrate-rrv4' */
        `../pages/Guides/migrate-rrv4.js`)
      )
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
