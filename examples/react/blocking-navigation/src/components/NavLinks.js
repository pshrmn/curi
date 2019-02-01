import React from "react";
import { Link } from "@curi/react-dom";

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link name="Home">Home</Link>
      </li>
      <li>
        <Link name="Contact">Contact</Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
