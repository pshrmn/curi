import React from "react";
import { Link } from "@curi/react-dom";

import fakeAuth from "../fakeAuth";

const NavLinks = () => (
  <nav>
    <ul>
      <li>
        <Link name="Home">Home</Link>
      </li>
      <li>
        <Link name="Protected">Protected</Link>
      </li>
      <li>
        {fakeAuth.authenticated() ? (
          <Link name="Logout">Logout</Link>
        ) : (
          <Link name="Login">Login</Link>
        )}
      </li>
    </ul>
  </nav>
);

export default NavLinks;
