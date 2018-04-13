const guides = [
  {
    name: "Installation",
    slug: "installation",
    description: "Learn how to install Curi",
    type: "basic"
  },
  {
    name: "Getting Started",
    slug: "getting-started",
    description:
      "Learn the basic concepts that you'll need to know to setup your project",
    type: "basic"
  },
  {
    name: "Sync or Async",
    slug: "sync-or-async",
    description: "Match routes synchronously or asynchronously",
    type: "basic"
  },
  {
    name: "Routes",
    slug: "routes",
    description: "Learn about Curi routes and their properties",
    type: "basic"
  },
  {
    name: "Response Handlers",
    slug: "response-handlers",
    description: "Learn how to use response handlers to react to navigation",
    type: "basic"
  },
  {
    name: "Response Objects",
    slug: "responses",
    description: "Learn about the objects created for matching routes",
    type: "basic"
  },
  {
    name: "Navigation Objects",
    slug: "navigation-objects",
    description: "Learn about the objects created for matching routes",
    type: "basic"
  },
  {
    name: "Using Add-ons",
    slug: "addons",
    description:
      "Learn how to use add-ons to interact with your routes in your project",
    type: "advanced"
  },
  {
    name: "Using Side Effects",
    slug: "side-effects",
    description:
      "Learn how to use side effect functions to trigger behavior after navigation",
    type: "advanced"
  },
  {
    name: "Response Caching",
    slug: "response-caching",
    description:
      "Learn how to cache responses to prevent recreating duplicate responses",
    type: "advanced"
  },
  {
    name: "Code Splitting",
    slug: "code-splitting",
    description: "Learn how to code split your project using Webpack",
    type: "advanced"
  },
  {
    name: "Loading Route Data",
    slug: "loading",
    description:
      "Learn how to load data for a route and modify the response object",
    type: "advanced"
  },
  {
    name: "React Basics",
    slug: "react",
    description: "Learn the basics of how to use Curi with a React application",
    type: "advanced"
  },
  {
    name: "React Native Tips",
    slug: "react-native",
    description: "Tips for using Curi with React Native",
    type: "advanced"
  },
  {
    name: "Migrate from React Router v2/3 to Curi",
    slug: "migrate-rrv3",
    descriptioni:
      "Learn how to migrate an application from React Router v2 or v3 to Curi",
    type: "migration"
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
