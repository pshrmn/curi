import React from "react";
import { Link } from "@curi/react";

import styleActive from "../../utils/styleActive";
import { groupedTutorials } from "../../constants/tutorials";

const GroupTutorials = ({ tutorials }) => (
  <ul className="link-list">
    {tutorials.map(g => (
      <li key={g.title} className="solo">
        <Link
          to="Tutorial"
          params={{ slug: g.slug }}
          active={{ merge: styleActive }}
        >
          {g.title}
        </Link>
      </li>
    ))}
  </ul>
);

export default () => (
  <ul>
    {Object.keys(groupedTutorials).map(name => (
      <li className="link-group" key={name}>
        <h3>{name}</h3>
        <GroupTutorials tutorials={groupedTutorials[name]} />
      </li>
    ))}
  </ul>
);
