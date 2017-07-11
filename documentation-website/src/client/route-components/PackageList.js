import React from 'react';
import { Link } from 'curi-react';
import PackageLinks from '../components/PackageLinks';

export default () => (
  <div>
    <h1>Curi Packages</h1>
    <p>
      Curi is split into a number of different packages that you can pick and choose from
      in order to only use what you need. You will always need the main{' '}
      <Link to='Package' params={{ package: 'curi' }}>Curi</Link> package, but no other
      package is necessary.
    </p>
    <div>
      <h2>List of Official Packages</h2>
      <PackageLinks />
    </div>
  </div>
);
