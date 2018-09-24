import React from "react";
import { Link } from "@curi/react-dom";

import TUTORIAL_API from "../../constants/tutorials";
import ActiveLink from "./ActiveLink";
import CollapsibleGroup from "./CollapsibleGroup";

const GroupTutorials = ({ tutorials, hide }) => (
  <ul className="link-list">
    {tutorials.map(g => (
      <li key={g.title} className="solo">
        <ActiveLink
          to="Tutorial"
          params={{ slug: g.slug }}
          onClick={e => {
            if (hide) {
              hide();
            }
          }}
        >
          {g.title}
        </ActiveLink>
      </li>
    ))}
  </ul>
);

export default function TutorialLinks({ hide }) {
  const groups = TUTORIAL_API.grouped();
  return Object.keys(groups).map(title => (
    <CollapsibleGroup key={title} title={title}>
      <GroupTutorials tutorials={groups[title]} hide={hide} />
    </CollapsibleGroup>
  ));
}
