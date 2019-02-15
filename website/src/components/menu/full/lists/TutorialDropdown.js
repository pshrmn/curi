import React from "react";

import TUTORIAL_API from "../../../../constants/tutorials";
import ActiveLink from "../../../links/ActiveLink";
import Container from "./Container";
import usePrefetch from "./usePrefetch";

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

const tutorialGroups = TUTORIAL_API.grouped();
const flatTutorials = TUTORIAL_API.all().map(t => ({
  name: "Tutorial",
  params: { slug: t.slug }
}));

function TutorialLinks({ active, close }) {
  usePrefetch(flatTutorials, active);

  if (!active) {
    return null;
  }

  return (
    <Container active={active} close={close}>
      {Object.keys(tutorialGroups).map(title => (
        <div key={title}>
          <h3>{title}</h3>
          <GroupTutorials tutorials={tutorialGroups[title]} />
        </div>
      ))}
    </Container>
  );
}

export default React.memo(TutorialLinks);
