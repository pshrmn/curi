import React from "react";
import { Link } from "@curi/react-dom";

const NavLinks = () => (
  <nav>
    <ul>
      <li>
        <Link name="Home">Home</Link>
      </li>
      <li>
        Paints
        <ol>
          <li>
            <Link
              name="Product"
              params={{ color: "DarkSlateBlue" }}
              state={{ name: "Dark Slate Blue" }}
            >
              Dark Slate Blue
            </Link>
          </li>
          <li>
            <Link
              name="Product"
              params={{ color: "SeaGreen" }}
              state={{ name: "Sea Green" }}
            >
              Sea Green
            </Link>
          </li>
          <li>
            <Link
              name="Product"
              params={{ color: "Crimson" }}
              state={{ name: "Crimson" }}
            >
              Crimson
            </Link>
          </li>
        </ol>
      </li>
    </ul>
  </nav>
);

export default NavLinks;
