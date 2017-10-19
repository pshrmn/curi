import React from 'react';

import ExampleLinks from './ExampleLinks';

export default ({ children }) => (
  <div className='example'>
    <div className='content'>
      { children || null }
    </div>
    <div className='sidebar'>
      <h2>Examples</h2>
      <ExampleLinks />
    </div>
  </div>
);
