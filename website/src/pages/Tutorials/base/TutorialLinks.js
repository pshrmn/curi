import React from "react";
import { Link } from "@curi/react-dom";

import ActiveLink from "../../../components/ActiveLink";
import TUTORIAL_API from "../../../constants/tutorials";

const GroupTutorials = ({ tutorials }) => (
  <ul className="link-list">
    {tutorials.map(g => (
      <li key={g.title} className="solo">
        <ActiveLink to="Tutorial" params={{ slug: g.slug }}>
          {g.title}
        </ActiveLink>
      </li>
    ))}
  </ul>
);

export default function TutorialLinks() {
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
}
