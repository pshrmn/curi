import React from 'react';

import GuideLinks from './GuideLinks';

export default ({ children }) => (
  <div className="guide">
    <div className="content">{children || null}</div>
    <div className="sidebar">
      <h2>Guides</h2>
      <GuideLinks />
    </div>
  </div>
);
