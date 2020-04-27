import React from "react";

import TUTORIAL_API from "../../../constants/tutorials";
import ActiveLink from "../ActiveLink";
import CollapsibleGroup from "./CollapsibleGroup";

let GroupTutorials = ({ tutorials }) => (
  <ul className="ml-2">
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

let TutorialLinks = () => {
  let groups = TUTORIAL_API.grouped();
  return Object.keys(groups).map(title => (
    <CollapsibleGroup key={title} title={title} initial={false}>
      <GroupTutorials tutorials={groups[title]} />
    </CollapsibleGroup>
  ));
};

export default React.memo(TutorialLinks);
