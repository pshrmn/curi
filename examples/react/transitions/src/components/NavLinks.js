import React from "react";
import { Link } from "@curi/react";

const NavLinks = () => (
  <nav>
    <ul>
      <li>
        <Link to="Home">Home</Link>
      </li>
      <li>
        <Link to="Contact">Contact</Link>
        <ol>
          <li>
            <Link to="Method" params={{ method: "phone" }}>
              By Phone
            </Link>
          </li>
          <li>
            <Link to="Method" params={{ method: "email" }}>
              By Email
            </Link>
          </li>
          <li>
            <Link to="Method" params={{ method: "mail" }}>
              By Mail
            </Link>
          </li>
        </ol>
      </li>
    </ul>
  </nav>
);

export default NavLinks;
