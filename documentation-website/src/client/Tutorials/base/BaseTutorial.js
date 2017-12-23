import React from 'react';

import TutorialLinks from './TutorialLinks';

export default ({ children }) => (
  <div className="tutorial">
    <div className="content">{children || null}</div>
    <div className="sidebar">
      <h2>Tutorials</h2>
      <TutorialLinks />
    </div>
  </div>
);
