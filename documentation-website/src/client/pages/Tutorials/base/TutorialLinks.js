import React from "react";
import { Link } from "@curi/react";

import styleActive from "../../../utils/styleActive";
import TUTORIAL_API from "../../../constants/tutorials";

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

export default () => {
  const groups = TUTORIAL_API.grouped();
  return (
    <ul>
      {Object.keys(groups).map(name => (
        <li className="link-group" key={name}>
          <h3>{name}</h3>
          <GroupTutorials tutorials={groups[name]} />
        </li>
      ))}
    </ul>
  );
};
