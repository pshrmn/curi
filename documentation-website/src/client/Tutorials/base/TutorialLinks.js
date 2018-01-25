import React from "react";
import { Link } from "@curi/react";

import styleActive from "../../utils/styleActive";
import tutorials from "../../constants/tutorials";

const SingleTutorial = ({ tutorial }) => (
  <li key={tutorial.name} className="solo">
    <Link
      to="Tutorial"
      params={{ name: tutorial.name }}
      active={{ merge: styleActive }}
    >
      {tutorial.displayName}
    </Link>
  </li>
);

const SplitTutorial = ({ tutorial }) => (
  <li key={tutorial.name} className="solo">
    <p>{tutorial.displayName}</p>
    <ul className="frameworks">
      {tutorial.frameworks.map(f => (
        <li key={f}>
          <Link
            to="Tutorial"
            params={{ name: `${tutorial.name}-${f}` }}
            active={{ merge: styleActive }}
          >
            {f}
          </Link>
        </li>
      ))}
    </ul>
  </li>
);

export default () => (
  <ul className="link-list">
    {tutorials.map(tutorial => {
      const Component = tutorial.frameworks ? SplitTutorial : SingleTutorial;
      return <Component key={tutorial.name} tutorial={tutorial} />;
    })}
  </ul>
);
