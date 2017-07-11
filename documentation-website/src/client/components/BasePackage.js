import React from 'react';

import Installation from './Installation';
import GitHubLink from './GitHubLink';
import PackageLinks from './PackageLinks';

const BasePackage = ({ name, version, children }) => (
  <div className='package'>
    <div className='content'>
      <h1>{name}</h1>
      <GitHubLink name={name} />
      <Installation name={name} version={version} />
      {children || null}
    </div>
    <div className='sidebar'>
      <h2>Packages</h2>
      <PackageLinks />
    </div>
  </div>

  
);

export default BasePackage;
