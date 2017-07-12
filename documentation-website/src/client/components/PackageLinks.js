import React from 'react';
import { Link } from 'curi-react';

import { groupedPackages } from '../Packages';
import styleActive from '../utils/styleActive';

const GroupPackages = ({ packages }) => (
  <ul>
    {
      packages.map(p => (
        <li key={p.name}>
          <Link
            to='Package'
            params={{ package: p.name }}
            active={{ merge: styleActive }}
          >
            {p.name}
          </Link>
        </li>
      ))
    }
  </ul>
)

export default () => (
  <ul>
    {
      Object.keys(groupedPackages).map(name => (
        <li key={name}>
          <h3>{name}</h3>
          <GroupPackages packages={groupedPackages[name]} />
        </li>
      ))
    }
  </ul>
)