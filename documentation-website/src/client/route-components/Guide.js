import React from 'react';

export default ({ params, data }) => {
  const Component = data && data.component;
  return Component
    ? <Component />
    : <div>
        The requested guide could not be found.
      </div>;
};
