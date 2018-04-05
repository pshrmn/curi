const tutorials = [
  {
    name: "01-setup",
    displayName: "Part 1: Curi Setup"
  },
  {
    name: "02-routes",
    displayName: "Part 2: Curi Routes"
  },
  {
    name: "03-router",
    displayName: "Part 3: The Curi Router"
  },
  {
    name: "04-pages",
    displayName: "Part 4: Rendering Pages",
    frameworks: ["react", "vue"]
  },
  {
    name: "05-loading-data",
    displayName: "Part 5: Loading Data"
  },
  {
    name: "06-render-data",
    displayName: "Part 6: Rendering Data",
    frameworks: ["react", "vue"]
  },
  {
    name: "07-nav",
    displayName: "Part 7: Forms & Programmatic Navigation",
    frameworks: ["react", "vue"]
  },
  {
    name: "08-now-what",
    displayName: "Part 8: Now What?"
  }
];

export const byName = tutorials.reduce((acc, curr) => {
  if (curr.frameworks) {
    curr.frameworks.forEach(f => {
      acc[`${curr.name}-${f}`] = curr;
    });
  } else {
    acc[curr.name] = curr;
  }
  return acc;
}, {});

export default tutorials;
