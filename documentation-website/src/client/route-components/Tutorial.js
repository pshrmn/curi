import React from 'react';

import TutorialComponents from '../Tutorials';

export default ({ params }) => {
  const Component = TutorialComponents[params.name];
  if (!Component) {
    return (
      <div>
        The requested tutorial could not be found.
      </div>
    );
  }
  return <Component />
};
