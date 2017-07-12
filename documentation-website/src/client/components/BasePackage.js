import React from 'react';

import Installation from './Installation';
import GitHubLink from './GitHubLink';
import NPMLink from './NPMLink';
import PackageLinks from './PackageLinks';

const BasePackage = ({ name, version, globalName, children }) => (
  <div className='package'>
    <div className='content'>
      <h1>{name}</h1>
      <div className='package-info'>
        <div>v{version}</div>
        <GitHubLink name={name} />
        <NPMLink name={name} />
      </div>
      <Installation name={name} version={version} globalName={globalName} />
      {children || null}
    </div>
    <div className='sidebar'>
      <h2>Packages</h2>
      <PackageLinks />
    </div>
  </div>
);

export default BasePackage;
