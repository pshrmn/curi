const tutorials = [
  {
    name: '01-setup',
    displayName: 'Part 1: Curi Setup'
  },
  {
    name: '02-routes',
    displayName: 'Part 2: Curi Routes'
  },
  {
    name: '03-hickory',
    displayName: 'Part 3: Hickory'
  },
  {
    name: '04-router',
    displayName: 'Part 4: The Curi router'
  },
  {
    name: '05-pages',
    displayName: 'Part 5: Rendering Pages',
    frameworks: ['react', 'vue']
  },
  {
    name: '06-loading-data',
    displayName: 'Part 6: Loading Data'
  },
  {
    name: '07-render-data',
    displayName: 'Part 7: Rendering Data',
    frameworks: ['react', 'vue']
  },
  {
    name: '08-nav',
    displayName: 'Part 8: Forms & Programmatic Navigation',
    frameworks: ['react', 'vue']
  },
  {
    name: '09-now-what',
    displayName: 'Part 9: Now What?'
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
