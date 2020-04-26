import React from "react";

import GUIDE_API from "../../../../constants/guides";
import ActiveLink from "../../../links/ActiveLink";
import Container from "./Container";
import StyledDropdownMenu from "./DropdownMenu";
import usePrefetch from "./usePrefetch";

let GroupGuides = ({ guides }) => (
  <ul>
    {guides.map(g => (
      <li key={g.name}>
        <ActiveLink
          name="Guide"
          params={{ slug: g.slug }}
          activeClassName="font-bold"
        >
          {g.name}
        </ActiveLink>
      </li>
    ))}
  </ul>
);

let groups = GUIDE_API.grouped();
let guides = GUIDE_API.all().map(g => ({
  name: "Guide",
  params: {
    slug: g.slug
  }
}));

function GuideLinks({ hidden }) {
  usePrefetch(guides, !hidden);

  return (
    <Container hidden={hidden}>
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
