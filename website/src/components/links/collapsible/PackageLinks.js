import React from "react";

import PACKAGE_API from "../../../constants/packages";
import ActiveLink from "../ActiveLink";
import CollapsibleGroup from "./CollapsibleGroup";

let GroupPackages = ({ packages }) => (
  <ul className="ml-2">
    {packages.map(p => (
      <li key={p.name}>
        <ActiveLink
          name="Package"
          params={{ package: p.name, version: p.latest }}
          activeClassName="font-bold"
        >
          {p.name}
        </ActiveLink>
      </li>
    ))}
  </ul>
);

let PackageLinks = () => {
  let groups = PACKAGE_API.versioned("v2");
  return Object.keys(groups).map(title => (
    <CollapsibleGroup key={title} title={title} initial={false}>
      <GroupPackages packages={groups[title]} />
    </CollapsibleGroup>
  ));
};

export default React.memo(PackageLinks);
