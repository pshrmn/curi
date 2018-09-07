const examples = {
  react: [
    {
      name: "Accessibility",
      category: "react",
      slug: "accessibility",
      description: "Focus content after navigating"
    },
    {
      name: "Active Links",
      category: "react",
      slug: "active-links",
      description: "Style links when they match the current location"
    },
    {
      name: "Async Navigation",
      category: "react",
      slug: "async-nav",
      description:
        "Display a spinner to indicate that navigation is loading content for async routes"
    },
    {
      name: "Authentication",
      category: "react",
      slug: "authentication",
      description:
        "Automatically redirect to a login page when attempting to access private content"
    },
    {
      name: "Basic",
      category: "react",
      slug: "basic",
      description: "A simple Curi app rendered using React"
    },
    {
      name: "Blocking Navigation",
      category: "react",
      slug: "blocking-navigation",
      description: "Prevent navigation away from a half-filled form"
    },
    {
      name: "Breadcrumbs",
      category: "react",
      slug: "breadcrumbs",
      description: "Render breadcrumb links to ancestor routes"
    },
    /*{
      name: "Data Loading",
      category: "react",
      slug: "data-loading",
      description: "Display a loading bar while waiting for data to load"
    },*/
    {
      name: "Modal Routes",
      category: "react",
      slug: "modal",
      description: "Load a route in a modal (the Pinterest model)"
    },
    {
      name: "Multiple Body Components",
      category: "react",
      slug: "multi-body",
      description: "Attach multiple components to a route"
    },
    {
      name: "Transitions",
      category: "react",
      slug: "transitions",
      description: "Transition between routes using react-transition-group"
    }
  ],
  /*vue: [
    {
      name: "Accessibility",
      category: "vue",
      slug: "accessibility",
      description: "Focus content after navigating"
    },
    {
      name: "Active Links",
      category: "vue",
      slug: "active-links",
      description: "Style links when they match the current location"
    },
    {
      name: "Async Navigation",
      category: "vue",
      slug: "async-nav",
      description:
        "Display a spinner to indicate that navigation is loading content for async routes"
    },
    {
      name: "Authentication",
      category: "vue",
      slug: "authentication",
      description:
        "Automatically redirect to a login page when attempting to access private content"
    },
    {
      name: "Basic",
      category: "vue",
      slug: "basic",
      description: "A simple Curi app rendered using VueJS"
    },
    {
      name: "Breadcrumbs",
      category: "vue",
      slug: "breadcrumbs",
      description: "Render breadcrumb links to ancestor routes"
    },
    {
      name: "Blocking Navigation",
      category: "vue",
      slug: "blocking-navigation",
      description: "Prevent navigation away from a half-filled form"
    },
    {
      name: "Modal Routes",
      category: "vue",
      slug: "modal",
      description: "Load a route in a modal (the Pinterest model)"
    },
    {
      name: "Transitions",
      category: "vue",
      slug: "transitions",
      description: "Transition between routes"
    }
  ],*/
  /*svelte: [
    {
      name: "Basic",
      category: "svelte",
      slug: "basic",
      description: "A simple Curi app rendered using Svelte"
    }
  ],*/
  /*full: [
    {
      name: "Twitch Clone",
      category: "full",
      slug: "twitch",
      description: "A clone of Twitch.tv built with Curi + Vue"
    }
  ],*/
  misc: [
    {
      name: "Code Splitting",
      category: "misc",
      slug: "code-splitting",
      description: "Use import() to enable Webpack code splitting"
    },
    {
      name: "Script Tags",
      category: "misc",
      slug: "script-tags",
      description: "Load Curi packages using script tags instead of a bundle"
    },
    {
      name: "Server Rendering",
      category: "misc",
      slug: "server-rendering",
      description:
        "Render your application on the server using Node (this example uses Express)"
    },
    {
      name: "Side Effects",
      category: "misc",
      slug: "side-effect",
      description: "Add side effects that always respond to navigation"
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
