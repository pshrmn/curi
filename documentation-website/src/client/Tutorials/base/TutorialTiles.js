import React from "react";
import { Link } from "@curi/react";

import { groupedTutorials } from "../../constants/tutorials";
import { Section } from "../../components/Sections";
import styleActive from "../../utils/styleActive";

const Category = ({ name, tutorials }) => (
  <ul className="tiles">
    {tutorials.map(tutorial => (
      <li key={`${tutorial.category}/${tutorial.slug}`} className="tile">
        <Link
          to="Tutorial"
          params={{ slug: tutorial.slug }}
          active={{ merge: styleActive }}
        >
          <h2>{tutorial.title}</h2>
          <p className="description">{tutorial.description}</p>
        </Link>
      </li>
    ))}
  </ul>
);

export default () => {
  const categories = Object.keys(groupedTutorials);
  return (
    <div>
      {categories.map(key => (
        <Section title={key} id={key} key={key}>
          <Category name={key} tutorials={groupedTutorials[key]} />
        </Section>
      ))}
    </div>
  );
};
