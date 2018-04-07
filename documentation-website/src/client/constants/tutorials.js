const tutorials = [
  {
    name: "react-basics",
    displayName: "React Basics"
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
