import React from "react";

import TUTORIAL_API from "../../../constants/tutorials";
import ActiveLink from "../ActiveLink";
import Container from "./Container";

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

function TutorialLinks({ active }) {
  const groups = TUTORIAL_API.grouped();
  return (
    <Container active={active}>
      {Object.keys(groups).map(title => (
        <div key={title}>
          <h3>{title}</h3>
          <GroupTutorials tutorials={groups[title]} />
        </div>
      ))}
    </Container>
  );
}

export default React.memo(TutorialLinks);
