import React from "react";
import { Link } from "@curi/react-dom";

export const Home = () => {
  return <div>Home.</div>;
};

export const HomeMenu = props => {
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
