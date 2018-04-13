import React from "react";
import { Link } from "@curi/react";

import { groupedGuides } from "../../constants/guides";
import styleActive from "../../utils/styleActive";

const GroupGuides = ({ guides }) => (
  <ul className="link-list">
    {guides.map(g => (
      <li key={g.name} className="solo">
        <Link
          to="Guide"
          params={{ slug: g.slug }}
          active={{ merge: styleActive }}
        >
          {g.name}
        </Link>
      </li>
    ))}
  </ul>
);

export default () => (
  <ul>
    {Object.keys(groupedGuides).map(name => (
      <li className="link-group" key={name}>
        <h3>{name}</h3>
        <GroupGuides guides={groupedGuides[name]} />
      </li>
    ))}
  </ul>
);
