const reactExamples = [
  {
    name: "Basic",
    category: "react",
    slug: "basic",
    import: () =>
      import(/* webpackChunkName: 'example--react-basic' */
      `../pages/Examples/react/basic.js`)
  },
  {
    name: "Active Links",
    category: "react",
    slug: "active-links",
    import: () =>
      import(/* webpackChunkName: 'example--react-active-links' */
      `../pages/Examples/react/active-links.js`)
  },
  {
    name: "Accessibility",
    category: "react",
    slug: "accessibility",
    import: () =>
      import(/* webpackChunkName: 'example--react-accessibility' */
      `../pages/Examples/react/accessibility.js`)
  },
  {
    name: "Redirects",
    category: "react",
    slug: "redirects",
    import: () =>
      import(/* webpackChunkName: 'example--react-redirects' */
      `../pages/Examples/react/redirects.js`)
  },
  {
    name: "Breadcrumbs",
    category: "react",
    slug: "breadcrumbs",
    import: () =>
      import(/* webpackChunkName: 'example--react-breadcrumbs' */
      `../pages/Examples/react/breadcrumbs.js`)
  },
  {
    name: "Async Navigation",
    category: "react",
    slug: "async-nav",
    import: () =>
      import(/* webpackChunkName: 'example--react-async-nav' */
      `../pages/Examples/react/async-nav.js`)
  },
  {
    name: "Multiple Body Components",
    category: "react",
    slug: "multi-body",
    import: () =>
      import(/* webpackChunkName: 'example--react-multi-body' */
      `../pages/Examples/react/multi-body.js`)
  },
  {
    name: "Transitions",
    category: "react",
    slug: "transitions",
    import: () =>
      import(/* webpackChunkName: 'example--react-transitions' */
      `../pages/Examples/react/transitions.js`)
  },
  {
    name: "Modal Routes",
    category: "react",
    slug: "modal",
    import: () =>
      import(/* webpackChunkName: 'example--react-modal' */
      `../pages/Examples/react/modal.js`)
  }
];

const vueExamples = [
  {
    name: "Basic",
    category: "vue",
    slug: "basic",
    import: () =>
      import(/* webpackChunkName: 'example--vue-basic' */
      `../pages/Examples/vue/basic.js`)
  },
  {
    name: "Active Links",
    category: "vue",
    slug: "active-links",
    import: () =>
      import(/* webpackChunkName: 'example--vue-active-links' */
      `../pages/Examples/vue/active-links.js`)
  },
  {
    name: "Accessibility",
    category: "vue",
    slug: "accessibility",
    import: () =>
      import(/* webpackChunkName: 'example--vue-accessibility' */
      `../pages/Examples/vue/accessibility.js`)
  },
  {
    name: "Redirects",
    category: "vue",
    slug: "redirects",
    import: () =>
      import(/* webpackChunkName: 'example--vue-redirects' */
      `../pages/Examples/vue/redirects.js`)
  },
  {
    name: "Breadcrumbs",
    category: "vue",
    slug: "breadcrumbs",
    import: () =>
      import(/* webpackChunkName: 'example--vue-breadcrumbs' */
      `../pages/Examples/vue/breadcrumbs.js`)
  },
  {
    name: "Async Navigation",
    category: "vue",
    slug: "async-nav",
    import: () =>
      import(/* webpackChunkName: 'example--vue-async-nav' */
      `../pages/Examples/vue/async-nav.js`)
  },
  {
    name: "Transitions",
    category: "vue",
    slug: "transitions",
    import: () =>
      import(/* webpackChunkName: 'example--vue-transitions' */
      `../pages/Examples/vue/transitions.js`)
  },
  {
    name: "Modal Routes",
    category: "vue",
    slug: "modal",
    import: () =>
      import(/* webpackChunkName: 'example--vue-modal' */
      `../pages/Examples/vue/modal.js`)
  }
];

const svelteExamples = [
  {
    name: "Basic",
    category: "svelte",
    slug: "basic",
    import: () =>
      import(/* webpackChunkName: 'example--svelte-basic' */
      `../pages/Examples/svelte/basic.js`)
  },
  {
    name: "Active Links",
    category: "svelte",
    slug: "active-links",
    import: () =>
      import(/* webpackChunkName: 'example--svelte-active-links' */
      `../pages/Examples/svelte/active-links.js`)
  },
  {
    name: "Redirects",
    category: "svelte",
    slug: "redirects",
    import: () =>
      import(/* webpackChunkName: 'example--svelte-redirects' */
      `../pages/Examples/svelte/redirects.js`)
  },
  {
    name: "Breadcrumbs",
    category: "svelte",
    slug: "breadcrumbs",
    import: () =>
      import(/* webpackChunkName: 'example--svelte-breadcrumbs' */
      `../pages/Examples/svelte/breadcrumbs.js`)
  },
  {
    name: "Async Navigation",
    category: "svelte",
    slug: "async-nav",
    import: () =>
      import(/* webpackChunkName: 'example--svelte-async-nav' */
      `../pages/Examples/svelte/async-nav.js`)
  }
];

const miscExamples = [
  {
    name: "Code Splitting",
    category: "misc",
    slug: "code-splitting",
    import: () =>
      import(/* webpackChunkName: 'example--misc-code-splitting' */
      `../pages/Examples/misc/code-splitting`)
  },
  {
    name: "Script Tags",
    category: "misc",
    slug: "script-tags",
    import: () =>
      import(/* webpackChunkName: 'example--misc-script-tags' */
      `../pages/Examples/misc/script-tags`)
  },
  {
    name: "Server Rendering",
    category: "misc",
    slug: "server-rendering",
    import: () =>
      import(/* webpackChunkName: 'example--misc-server-rendering' */
      `../pages/Examples/misc/server-rendering`)
  },
  {
    name: "Side Effects",
    category: "misc",
    slug: "side-effect",
    import: () =>
      import(/* webpackChunkName: 'example--misc-side-effect' */
      `../pages/Examples/misc/side-effect`)
  }
];

const examples = {
  react: reactExamples,
  vue: vueExamples,
  svelte: svelteExamples,
  /*full: [
    {
      name: "Twitch Clone",
      category: "full",
      slug: "twitch",
      import: () => 
        import(/* webpackChunkName: 'example--full-twitch'
          `../pages/Examples/full/twitch.js`)
    }
  ],*/
  misc: miscExamples
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
