import React from 'react';
import { Link } from '@curi/react';

import { groupedPackages } from '../../constants/packages';
import styleActive from '../../utils/styleActive';

const GroupPackages = ({ packages, withDescription }) => (
  <ul className="link-list">
    {packages.map(p => (
      <li key={p.name} className={withDescription ? 'with' : 'solo'}>
        <Link
          to="Package"
          params={{ package: p.name }}
          active={{ merge: styleActive }}
        >
          {p.name}
        </Link>
      </li>
    ))}
  </ul>
);

export default ({ withDescription = false }) => (
  <ul>
    {Object.keys(groupedPackages).map(name => (
      <li className="link-group" key={name}>
        <h3>{name}</h3>
        <GroupPackages
          packages={groupedPackages[name]}
          withDescription={withDescription}
        />
      </li>
    ))}
  </ul>
);
