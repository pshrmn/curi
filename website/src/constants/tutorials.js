const tutorials = [
  {
    title: "React Basics",
    slug: "react-basics",
    type: "Basic",
    description:
      "Learn the basics of setting up a single-page application using Curi and React"
  },
  {
    title: "React Advanced",
    slug: "react-advanced",
    type: "Advanced",
    description: "Add code splitting and data preloading to an application."
  },
  {
    title: "Vue Basics",
    slug: "vue-basics",
    type: "Basic",
    description:
      "Learn the basics of setting up a single-page application using Curi and Vue"
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
