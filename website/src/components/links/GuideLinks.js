import React from "react";

import GUIDE_API from "../../constants/guides";
import ActiveLink from "./ActiveLink";
import CollapsibleGroup from "./CollapsibleGroup";

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

export default function GuideLinks() {
  const groups = GUIDE_API.grouped();
  return Object.keys(groups).map(title => (
    <CollapsibleGroup key={title} title={title}>
      <GroupGuides guides={groups[title]} />
    </CollapsibleGroup>
  ));
}
