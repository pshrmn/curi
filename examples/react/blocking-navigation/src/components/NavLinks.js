import React from "react";
import { Link } from "@curi/react-dom";

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link to="Home">Home</Link>
      </li>
      <li>
        <Link to="Contact">Contact</Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
