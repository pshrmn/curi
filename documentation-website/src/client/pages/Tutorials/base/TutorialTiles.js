import React from "react";
import { Link } from "@curi/react";

import TUTORIAL_API from "../../../constants/tutorials";
import { Section } from "../../../components/Sections";
import PrefetchActiveLink from "../../../components/PrefetchActiveLink";

const Category = ({ name, tutorials }) => (
  <ul className="tiles">
    {tutorials.map(tutorial => (
      <li key={`${tutorial.category}/${tutorial.slug}`} className="tile">
        <PrefetchActiveLink to="Tutorial" params={{ slug: tutorial.slug }}>
          <h2>{tutorial.title}</h2>
          <p className="description">{tutorial.description}</p>
        </PrefetchActiveLink>
      </li>
    ))}
  </ul>
);

export default () => {
  const groups = TUTORIAL_API.grouped();
  return (
    <div>
      {Object.keys(groups).map(key => (
        <Section title={key} id={key} key={key}>
          <Category name={key} tutorials={groups[key]} />
        </Section>
      ))}
    </div>
  );
};
