import React from "react";

import GUIDE_API from "../../../constants/guides";
import ActiveLink from "../../../components/ActiveLink";

const GroupGuides = ({ guides }) => (
  <ul className="link-list">
    {guides.map(g => (
      <li key={g.name} className="solo">
        <ActiveLink to="Guide" params={{ slug: g.slug }}>
          {g.name}
        </ActiveLink>
      </li>
    ))}
  </ul>
);

export default () => {
  const groups = GUIDE_API.grouped();
  return (
    <ul>
      {Object.keys(groups).map(name => (
        <li className="link-group" key={name}>
          <h3>{name}</h3>
          <GroupGuides guides={groups[name]} />
        </li>
      ))}
    </ul>
  );
};
