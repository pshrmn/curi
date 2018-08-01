const guides = [
  {
    name: "Installation",
    slug: "installation",
    description: "Learn how to install Curi",
    type: "basic"
  },
  {
    name: "Creating a Router",
    slug: "creating-a-router",
    description:
      "Learn the basic concepts that you'll need to know to setup your project",
    type: "basic"
  },
  {
    name: "Routes & Responses",
    slug: "routes-and-responses",
    description: "An introduction to how routes and responses work",
    type: "basic"
  },
  {
    name: "Sync or Async",
    slug: "sync-or-async",
    description: "Match routes synchronously or asynchronously",
    type: "basic"
  },
  {
    name: "Detecting Navigation",
    slug: "detecting-navigation",
    description: "Learn how to use observers to react to navigation",
    type: "basic"
  },
  {
    name: "Navigation Objects",
    slug: "navigation-objects",
    description: "Learn about the objects created for matching routes",
    type: "basic"
  },
  {
    name: "Route Interactions",
    slug: "route-interactions",
    description: "Learn how to interact with your routes",
    type: "advanced"
  },
  {
    name: "Side Effects",
    slug: "side-effects",
    description:
      "Learn how to use side effect functions to trigger behavior after navigation",
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
    name: "Accessibility",
    slug: "accessibility",
    description: "Make your site inclusive to users who use screen readers.",
    type: "advanced"
  },
  {
    name: "React Native Tips",
    slug: "react-native",
    description: "Tips for using Curi with React Native",
    type: "advanced"
  },
  {
    name: "Apollo Integration",
    slug: "apollo",
    description: "Integrating Curi and Apollo",
    type: "advanced"
  },
  {
    name: "React Router v2/3",
    slug: "migrate-rrv3",
    descriptioni:
      "Learn how to migrate an application from React Router v2 or v3 to Curi",
    type: "migration"
  },
  {
    name: "React Router v4",
    slug: "migrate-rrv4",
    descriptioni:
      "Learn how to migrate an application from React Router v4 to Curi",
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
