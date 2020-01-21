import React from "react";
import { Link } from "@curi/react-dom";

let NavLinks = () => (
  <nav>
    <ul>
      <li>
        <Link name="Home">Home</Link>
      </li>
      <li>
        <Link name="Contact">Contact</Link>
        <ol>
          <li>
            <Link name="Contact Method" params={{ method: "phone" }}>
              By Phone
            </Link>
          </li>
        </ol>
      </li>
      <li>
        <Link name="Redirect">Redirect (to Home)</Link>
      </li>
    </ul>
  </nav>
);

export default NavLinks;
