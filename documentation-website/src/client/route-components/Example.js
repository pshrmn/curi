import React from 'react';

export default ({ params, data }) => {
  const Component = data && data.component;
  return Component
    ? <Component />
    : <div>
        The requested example could not be found.
      </div>;
};
