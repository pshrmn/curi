import React from "react";
import { Link } from "@curi/react-dom";

import GUIDE_API from "../../constants/guides";
import Page from "../layout/Page";
import { PlainSection } from "../layout/Sections";

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
    <div>
      {Object.keys(groups).map(title => (
        <div key={title}>
          <h3>{title}</h3>
          <GroupGuides guides={groups[title]} />
        </div>
      ))}
    </div>
  );
}

export default function GuideList() {
  return (
    <Page>
      <PlainSection>
        <h1>Curi Guides</h1>

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
      </PlainSection>

      <PlainSection>
        <GuideLinks />
      </PlainSection>
    </Page>
  );
}
