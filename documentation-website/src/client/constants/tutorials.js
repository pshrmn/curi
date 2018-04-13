const tutorials = [
  {
    title: "React Basics",
    slug: "react-basics",
    type: "Basic",
    description:
      "Learn the basics of setting up a single-page application using Curi and React"
  },
  {
    title: "Vue Basics",
    slug: "vue-basics",
    type: "Basic",
    description:
      "Learn the basics of setting up a single-page application using Curi and Vue"
  }
];

export const groupedTutorials = tutorials.reduce((acc, curr) => {
  if (!acc[curr.type]) {
    acc[curr.type] = [curr];
  } else {
    acc[curr.type].push(curr);
  }
  return acc;
}, {});

export const byName = tutorials.reduce((acc, curr) => {
  acc[curr.slug] = curr;
  return acc;
}, {});

export default tutorials;
