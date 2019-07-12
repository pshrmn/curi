import React from "react";

import PACKAGE_API from "../../../../constants/packages";
import ActiveLink from "../../../links/ActiveLink";
import Container from "./Container";
import StyledDropdownMenu from "./DropdownMenu";
import usePrefetch from "./usePrefetch";

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

const groups = PACKAGE_API.versioned("v2");
const pkgs = PACKAGE_API.all().map(pkg => ({
  name: "Package",
  params: {
    package: pkg.name,
    version: pkg.latest
  }
}));

function PackageLinks({ hidden }) {
  usePrefetch(pkgs, !hidden);

  return (
    <Container hidden={hidden}>
      {Object.keys(groups).map(title => (
        <li key={title}>
          <StyledDropdownMenu>
            <h3>{title}</h3>
            <GroupPackages packages={groups[title]} />
          </StyledDropdownMenu>
        </li>
      ))}
    </Container>
  );
}

export default React.memo(PackageLinks);
