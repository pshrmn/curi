import React from "react";

import PACKAGE_API from "../../../constants/packages";
import ActiveLink from "../ActiveLink";
import CollapsibleGroup from "./CollapsibleGroup";

const GroupPackages = ({ packages }) => (
  <ul className="link-list">
    {packages.map(p => (
      <li key={p.name} className="solo">
        <ActiveLink name="Package" params={{ package: p.name }}>
          {p.name}
        </ActiveLink>
      </li>
    ))}
  </ul>
);

function PackageLinks() {
  const groups = PACKAGE_API.grouped();
  return Object.keys(groups).map(title => (
    <CollapsibleGroup key={title} title={title} initial={false}>
      <GroupPackages packages={groups[title]} />
    </CollapsibleGroup>
  ));
}

export default React.memo(PackageLinks);
