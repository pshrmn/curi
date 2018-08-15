import React from "react";

import PACKAGE_API from "../../../constants/packages";
import ActiveLink from "../../../components/ActiveLink";

const GroupPackages = ({ packages }) => (
  <ul className="link-list">
    {packages.map(p => (
      <li key={p.name} className="solo">
        <ActiveLink to="Package" params={{ package: p.name }}>
          {p.name}
        </ActiveLink>
      </li>
    ))}
  </ul>
);

export default () => {
  const groups = PACKAGE_API.grouped();
  return (
    <ul>
      {Object.keys(groups).map(name => (
        <li className="link-group" key={name}>
          <h3>{name}</h3>
          <GroupPackages packages={groups[name]} />
        </li>
      ))}
    </ul>
  );
};
