import React from "react";

import PACKAGE_API from "../../constants/packages";
import ActiveLink from "./ActiveLink";
import CollapsibleGroup from "./CollapsibleGroup";

const GroupPackages = ({ packages, hide }) => (
  <ul className="link-list">
    {packages.map(p => (
      <li key={p.name} className="solo">
        <ActiveLink
          to="Package"
          params={{ package: p.name }}
          onClick={e => {
            if (hide) {
              hide();
            }
          }}
        >
          {p.name}
        </ActiveLink>
      </li>
    ))}
  </ul>
);

export default function PackageLinks({ hide }) {
  const groups = PACKAGE_API.grouped();
  return Object.keys(groups).map(title => (
    <CollapsibleGroup key={title} title={title}>
      <GroupPackages packages={groups[title]} hide={hide} />
    </CollapsibleGroup>
  ));
}
