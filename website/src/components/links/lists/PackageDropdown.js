import React from "react";

import PACKAGE_API from "../../../constants/packages";
import ActiveLink from "../ActiveLink";

const GroupPackages = ({ packages }) => (
  <ul className="link-list">
    {packages.map(p => (
      <li key={p.name} className="solo">
        <ActiveLink
          name="Package"
          params={{ package: p.name, version: p.latest }}
        >
          {p.name}
        </ActiveLink>
      </li>
    ))}
  </ul>
);

function PackageLinks() {
  const groups = PACKAGE_API.grouped();
  return Object.keys(groups).map(title => (
    <div key={title}>
      <h3>{title}</h3>
      <GroupPackages packages={groups[title]} />
    </div>
  ));
}

export default React.memo(PackageLinks);
