import React from "react";

import GUIDE_API from "../../../constants/guides";
import ActiveLink from "../ActiveLink";
import CollapsibleGroup from "./CollapsibleGroup";

let GroupGuides = ({ guides }) => {
  return (
    <ul className="ml-2">
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
};

let GuideLinks = () => {
  let groups = GUIDE_API.grouped();
  return Object.keys(groups).map(title => (
    <CollapsibleGroup key={title} title={title} initial={false}>
      <GroupGuides guides={groups[title]} />
    </CollapsibleGroup>
  ));
};

export default React.memo(GuideLinks);
