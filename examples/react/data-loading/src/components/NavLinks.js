import React from "react";
import { Link, Prefetch } from "@curi/react";
import NProgress from "nprogress";

const albums = [1, 2, 3, 4, 5];

const NavLinks = () => (
  <nav>
    <ul>
      <li>
        <Link to="Home">Home</Link>
      </li>
      {albums.map(i => (
        <li key={i}>
          <Prefetch match={{ name: "Album", params: { id: i } }}>
            {ref => (
              <Link to="Album" params={{ id: i }} ref={ref}>
                Album {i}
              </Link>
            )}
          </Prefetch>
        </li>
      ))}
    </ul>
  </nav>
);

export default NavLinks;
