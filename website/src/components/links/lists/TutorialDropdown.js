import React from "react";

import TUTORIAL_API from "../../../constants/tutorials";
import ActiveLink from "../ActiveLink";

const GroupTutorials = ({ tutorials }) => (
  <ul className="link-list">
    {tutorials.map(g => (
      <li key={g.title} className="solo">
        <ActiveLink name="Tutorial" params={{ slug: g.slug }}>
          {g.title}
        </ActiveLink>
      </li>
    ))}
  </ul>
);

function TutorialLinks() {
  const groups = TUTORIAL_API.grouped();
  return Object.keys(groups).map(title => (
    <div key={title}>
      <h3>{title}</h3>
      <GroupTutorials tutorials={groups[title]} />
    </div>
  ));
}

export default React.memo(TutorialLinks);
