import React from "react";

import GUIDE_API from "../../../../constants/guides";
import ActiveLink from "../../../links/ActiveLink";
import Container from "./Container";
import StyledDropdownMenu from "./DropdownMenu";
import usePrefetch from "./usePrefetch";

const GroupGuides = ({ guides }) => (
  <ul className="link-list">
    {guides.map(g => (
      <li key={g.name} className="solo">
        <ActiveLink name="Guide" params={{ slug: g.slug }}>
          {g.name}
        </ActiveLink>
      </li>
    ))}
  </ul>
);

const groups = GUIDE_API.grouped();
const guides = GUIDE_API.all().map(g => ({
  name: "Guide",
  params: {
    slug: g.slug
  }
}));

function GuideLinks({ active, close }) {
  usePrefetch(guides, active);

  if (!active) {
    return null;
  }

  return (
    <Container active={active} close={close}>
      {Object.keys(groups).map(title => (
        <StyledDropdownMenu key={title}>
          <h3>{title}</h3>
          <GroupGuides guides={groups[title]} />
        </StyledDropdownMenu>
      ))}
    </Container>
  );
}

export default React.memo(GuideLinks);
