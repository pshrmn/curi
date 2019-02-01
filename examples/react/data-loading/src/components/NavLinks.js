import React from "react";
import { Link } from "@curi/react-dom";

const albums = [1, 2, 3, 4, 5];

const NavLinks = () => (
  <nav>
    <ul>
      <li>
        <Link name="Home">Home</Link>
      </li>
      {albums.map(i => (
        <li key={i}>
          <Link name="Album" params={{ id: i }}>
            Album {i}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default NavLinks;
