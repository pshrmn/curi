import React from "react";
import { Link } from "@curi/react-dom";

const NavLinks = () => (
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

export default NavLinks;
