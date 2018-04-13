import React from "react";
import { Link } from "@curi/react";

import PACKAGE_API from "../../constants/packages";
import styleActive from "../../utils/styleActive";

const GroupPackages = ({ packages }) => (
  <ul className="link-list">
    {packages.map(p => (
      <li key={p.name} className="solo">
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
