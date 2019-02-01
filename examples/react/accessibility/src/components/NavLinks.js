import React from "react";
import { Link } from "@curi/react-dom";

const NavLinks = () => (
  <nav>
    <ul>
      <li>
        <Link name="Home">Home</Link>
      </li>
      <li>
        <Link name="Contact">Contact</Link>
        <ul>
          <li>
            <Link name="Method" params={{ method: "phone" }}>
              By Phone
            </Link>
          </li>
          <li>
            <Link name="Method" params={{ method: "email" }}>
              By Email
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
);

export default NavLinks;
