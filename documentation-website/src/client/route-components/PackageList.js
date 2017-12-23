import React from 'react';
import { Link } from '@curi/react';
import PackageLinks from '../Packages/base/PackageLinks';
import { Note } from '../components/Messages';
import { InlineJS } from '../components/PrismBlocks';

export default () => (
  <div>
    <h1>Curi Packages</h1>
    <p>
      Curi is split into a number of different packages that you can pick and
      choose from in order to only use what you need. You will always need the{' '}
      <Link to="Package" params={{ package: 'core' }}>
        core
      </Link>{' '}
      package, but no other package is necessary.
    </p>
    <Note>
      All of the Curi packages are scoped under <InlineJS>@curi</InlineJS>. For
      example, to install the <InlineJS>core</InlineJS>, you would call{' '}
      <InlineJS>npm install @curi/core</InlineJS>.
    </Note>
    <div>
      <h2>List of Official Packages</h2>
      <PackageLinks />
    </div>
  </div>
);
