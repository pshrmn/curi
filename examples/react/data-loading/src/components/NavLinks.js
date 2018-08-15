import React from "react";
import { Link } from "@curi/react";

const albums = [1, 2, 3, 4, 5];

const NavLinks = () => (
  <nav>
    <ul>
      <li>
        <Link to="Home">Home</Link>
      </li>
      {albums.map(i => (
        <li key={i}>
          <Link to="Album" params={{ id: i }}>
            Album {i}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default NavLinks;
