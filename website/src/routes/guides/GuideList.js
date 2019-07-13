import React from "react";
import { Link } from "@curi/react-dom";

import GUIDE_API from "../../constants/guides";
import Page from "../../components/layout/Page";
import {
  TitledPlainSection,
  PlainSection
} from "../../components/layout/Sections";

const GroupGuides = ({ guides }) => (
  <ul className="link-list">
    {guides.map(g => (
      <li key={g.name} className="solo">
        <Link name="Guide" params={{ slug: g.slug }}>
          {g.name}
        </Link>
      </li>
    ))}
  </ul>
);

function GuideLinks() {
  const groups = GUIDE_API.grouped();
  return (
    <menu>
      {Object.keys(groups).map(title => (
        <section key={title}>
          <h3>{title}</h3>
          <GroupGuides guides={groups[title]} />
        </section>
      ))}
    </menu>
  );
}

export default function GuideList() {
  return (
    <Page>
      <TitledPlainSection title="Curi Guides">
        <p>
          There are a number of guides to help you make the most of Curi in your
          application.
        </p>

        <p>
          The "basic" guides are designed to give you a solid understanding of
          how to use Curi and how it works.
        </p>

        <p>
          The "rendering" guides give an overview of how to use Curi with the
          currently supported renderers.
        </p>

        <p>
          The "advanced" guides will help you take advantage of more Curi
          features to get the most out of Curi.
        </p>

        <p>
          The "migration" guides are helpful for transitioning to Curi from
          other single-page application routers.
        </p>
      </TitledPlainSection>

      <PlainSection>
        <GuideLinks />
      </PlainSection>
    </Page>
  );
}
