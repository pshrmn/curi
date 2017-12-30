const tutorials = [
  {
    name: '01-introduction',
    displayName: 'Part 1: Introduction to Curi'
  },
  {
    name: '02-setup',
    displayName: 'Part 2: Curi Setup'
  },
  {
    name: '03-routes',
    displayName: 'Part 3: Curi Routes'
  },
  {
    name: '04-hickory',
    displayName: 'Part 4: Hickory'
  },
  {
    name: '05-router',
    displayName: 'Part 5: The Curi router'
  },
  {
    name: '06-pages',
    displayName: 'Part 6: Rendering Pages',
    frameworks: ['react', 'vue']
  },
  {
    name: '07-loading-data',
    displayName: 'Part 7: Loading Data'
  },
  {
    name: '08-render-data',
    displayName: 'Part 8: Rendering Data',
    frameworks: ['react', 'vue']
  },
  {
    name: '09-nav',
    displayName: 'Part 9: Forms & Programmatic Navigation',
    frameworks: ['react', 'vue']
  },
  {
    name: '10-now-what',
    displayName: 'Part 10: Now What?'
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
