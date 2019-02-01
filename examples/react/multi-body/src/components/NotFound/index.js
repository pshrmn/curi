import React from "react";
import { Link } from "@curi/react-dom";

export const NotFound = () => {
  return <div>The requested page could not be found :(.</div>;
};

export const NotFoundMenu = props => {
  return (
    <nav>
      <ul>
        <li>
          <Link name="Home">Home</Link>
        </li>
      </ul>
    </nav>
  );
};
