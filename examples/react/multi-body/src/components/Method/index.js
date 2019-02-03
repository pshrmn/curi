import React from "react";
import { Link } from "@curi/react-dom";

export const Method = ({ response }) => {
  return <div>Please do not contact us by {response.params.method}.</div>;
};

export const MethodMenu = props => {
  return (
    <nav>
      <ul>
        <li>
          <Link name="Home">Home</Link>
        </li>
        <li>
          <Link name="Contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};
