import React from "react";

import GUIDE_API from "../../../constants/guides";
import ActiveLink from "../ActiveLink";

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

function GuideLinks() {
  const groups = GUIDE_API.grouped();
  return Object.keys(groups).map(title => (
    <div key={title}>
      <h3>{title}</h3>
      <GroupGuides guides={groups[title]} />
    </div>
  ));
}

export default React.memo(GuideLinks);
