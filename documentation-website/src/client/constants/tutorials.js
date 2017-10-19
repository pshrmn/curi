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
    name: '05-config',
    displayName: 'Part 5: The Curi Configuration Object'
  },
  {
    name: '06-views-react',
    displayName: 'Part 6: Rendering Views (React)'
  },
  {
    name: '06-views-vue',
    displayName: 'Part 6: Rendering Views (Vue)'
  }
];

export const byName = tutorials.reduce((acc, curr) => {
  acc[curr.name] = curr;
  return acc;
}, {});

export default tutorials;
