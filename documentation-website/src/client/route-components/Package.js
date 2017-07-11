import React from 'react';
import { InlineJS } from '../components/PrismBlocks';

export default ({ params, data }) => {
  const Component = data.component
  return Component
    ? <Component />
    : <div>
        The package <InlineJS>{params.package}</InlineJS> could
        not be found
      </div>;
};
