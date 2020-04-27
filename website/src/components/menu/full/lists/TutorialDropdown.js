import React from "react";

import TUTORIAL_API from "../../../../constants/tutorials";
import ActiveLink from "../../../links/ActiveLink";
import Container from "./Container";
import StyledDropdownMenu from "./DropdownMenu";
import usePrefetch from "./usePrefetch";

let GroupTutorials = ({ tutorials }) => (
  <ul>
    {tutorials.map(g => (
      <li key={g.title}>
        <ActiveLink
          name="Tutorial"
          params={{ slug: g.slug }}
          activeClassName="font-bold"
        >
          {g.title}
        </ActiveLink>
      </li>
    ))}
  </ul>
);

let tutorialGroups = TUTORIAL_API.grouped();
let flatTutorials = TUTORIAL_API.all().map(t => ({
  name: "Tutorial",
  params: { slug: t.slug }
}));

let TutorialLinks = ({ hidden }) => {
  usePrefetch(flatTutorials, !hidden);

  return (
    <Container hidden={hidden}>
      {Object.keys(tutorialGroups).map(title => (
        <StyledDropdownMenu key={title}>
          <h3>{title}</h3>
          <GroupTutorials tutorials={tutorialGroups[title]} />
        </StyledDropdownMenu>
      ))}
    </Container>
  );
};

export default React.memo(TutorialLinks);
