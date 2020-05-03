import React from "react";
import { Link } from "@curi/react-dom";

import TUTORIAL_API from "../../constants/tutorials";
import Page from "../../components/layout/Page";
import {
  TitledPlainSection,
  PlainSection,
  Paragraph
} from "../../components/layout/Sections";

let GroupTutorials = ({ tutorials }) => (
  <ul>
    {tutorials.map(g => (
      <li key={g.title}>
        <Link name="Tutorial" params={{ slug: g.slug }}>
          {g.title}
        </Link>
      </li>
    ))}
  </ul>
);

function TutorialLinks() {
  let groups = TUTORIAL_API.grouped();
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
        <Paragraph>
          A few tutorials to help get you up to speed with Curi.
        </Paragraph>
      </TitledPlainSection>

      <PlainSection>
        <TutorialLinks />
      </PlainSection>
    </Page>
  );
}
