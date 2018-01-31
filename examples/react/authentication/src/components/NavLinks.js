import React from "react";
import { Link } from "@curi/react";

import fakeAuth from "../fakeAuth";

const NavLinks = () => (
  <nav>
    <ul>
      <li>
        <Link to="Home">Home</Link>
      </li>
      <li>
        <Link to="Protected">Protected</Link>
      </li>
      <li>
        {fakeAuth.authenticated() ? (
          <Link to="Logout">Logout</Link>
        ) : (
          <Link to="Login">Login</Link>
        )}
      </li>
    </ul>
  </nav>
);

export default NavLinks;
