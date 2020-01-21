import React from "react";
import { Link } from "@curi/react-dom";

export let Home = () => {
  return <div>Home.</div>;
};

export let HomeMenu = props => {
  return (
    <nav>
      <ul>
        <li>
          <Link name="Contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};
