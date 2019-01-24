const tutorials = [
  {
    title: "React Basics",
    slug: "react-basics",
    type: "Basic",
    description:
      "Learn the basics of setting up a single-page application using Curi and React",
    import: () =>
      import(/* webpackChunkName: 'tutorial--react-basics' */
      `../pages/Tutorials/react-basics.js`)
  },
  {
    title: "React Advanced",
    slug: "react-advanced",
    type: "Advanced",
    description: "Add code splitting and data preloading to an application",
    import: () =>
      import(/* webpackChunkName: 'tutorial--react-advanced' */
      `../pages/Tutorials/react-advanced.js`)
  },
  {
    title: "Vue Basics",
    slug: "vue-basics",
    type: "Basic",
    description:
      "Learn the basics of setting up a single-page application using Curi and Vue",
    import: () =>
      import(/* webpackChunkName: 'tutorial--vue-basics' */
      `../pages/Tutorials/vue-basics.js`)
  }
];

let groupedTutorials;

export default {
  find: function findTutorial(slug) {
    return tutorials.find(g => g.slug === slug);
  },
  grouped: function groupTutorials() {
    if (!groupedTutorials) {
      groupedTutorials = tutorials.reduce((acc, curr) => {
        if (!acc[curr.type]) {
          acc[curr.type] = [curr];
        } else {
          acc[curr.type].push(curr);
        }
        return acc;
      }, {});
    }
    return groupedTutorials;
  },
  all: function() {
    return tutorials;
  }
};
