import React from "react";
import { Link } from "@curi/react-dom";

import TUTORIAL_API from "../../constants/tutorials";
import Page from "../layout/Page";
import { PlainSection } from "../layout/Sections";

const GroupTutorials = ({ tutorials }) => (
  <ul className="link-list">
    {tutorials.map(g => (
      <li key={g.title} className="solo">
        <Link name="Tutorial" params={{ slug: g.slug }}>
          {g.title}
        </Link>
      </li>
    ))}
  </ul>
);

function TutorialLinks() {
  const groups = TUTORIAL_API.grouped();
  return (
    <div>
      {Object.keys(groups).map(title => (
        <div key={title}>
          <h3>{title}</h3>
          <GroupTutorials tutorials={groups[title]} />
        </div>
      ))}
    </div>
  );
}

export default function TutorialList() {
  return (
    <Page>
      <PlainSection>
        <h1>Curi Tutorials</h1>

        <p>A few tutorials to help get you up to speed with Curi.</p>
      </PlainSection>

      <PlainSection>
        <TutorialLinks />
      </PlainSection>
    </Page>
  );
}
