import React from "react";

import GUIDE_API from "../../constants/guides";
import ActiveLink from "./ActiveLink";
import CollapsibleGroup from "./CollapsibleGroup";

const GroupGuides = ({ guides, hide }) => (
  <ul className="link-list">
    {guides.map(g => (
      <li key={g.name} className="solo">
        <ActiveLink
          to="Guide"
          params={{ slug: g.slug }}
          onClick={e => {
            if (hide) {
              hide();
            }
          }}
        >
          {g.name}
        </ActiveLink>
      </li>
    ))}
  </ul>
);

export default function GuideLinks({ hide }) {
  const groups = GUIDE_API.grouped();
  return Object.keys(groups).map(title => (
    <CollapsibleGroup key={title} title={title}>
      <GroupGuides guides={groups[title]} hide={hide} />
    </CollapsibleGroup>
  ));
}
