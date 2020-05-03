import React from "react";

import PACKAGE_API from "../../../../constants/packages";
import ActiveLink from "../../../links/ActiveLink";
import Container from "./Container";
import DropdownMenu from "./DropdownMenu";
import usePrefetch from "./usePrefetch";

let GroupPackages = ({ packages }) => (
  <ul>
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

let groups = PACKAGE_API.versioned("v2");
let pkgs = PACKAGE_API.all().map(pkg => ({
  name: "Package",
  params: {
    package: pkg.name,
    version: pkg.latest
  }
}));

let PackageLinks = ({ hidden }) => {
  usePrefetch(pkgs, !hidden);

  return (
    <Container hidden={hidden}>
      {Object.keys(groups).map(title => (
        <li key={title}>
          <DropdownMenu>
            <h3>{title}</h3>
            <GroupPackages packages={groups[title]} />
          </DropdownMenu>
        </li>
      ))}
    </Container>
  );
};

export default React.memo(PackageLinks);
