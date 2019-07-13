import React from "react";
import { Link } from "@curi/react-dom";

import TUTORIAL_API from "../../constants/tutorials";
import Page from "../../components/layout/Page";
import {
  TitledPlainSection,
  PlainSection
} from "../../components/layout/Sections";

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
    <menu>
      {Object.keys(groups).map(title => (
        <section key={title}>
          <h3>{title}</h3>
          <GroupTutorials tutorials={groups[title]} />
        </section>
      ))}
    </menu>
  );
}

export default function TutorialList() {
  return (
    <Page>
      <TitledPlainSection title="Curi Tutorials">
        <p>A few tutorials to help get you up to speed with Curi.</p>
      </TitledPlainSection>

      <PlainSection>
        <TutorialLinks />
      </PlainSection>
    </Page>
  );
}
