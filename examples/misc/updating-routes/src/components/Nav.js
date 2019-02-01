import React from "react";
import { Link } from "@curi/react-dom";

export default ({ admin, login, logout }) => (
  <nav>
    <ul>
      <li>
        <Link name="Home">Home</Link>
      </li>
      <li>
        <Link name="About">About</Link>
      </li>
      {admin && (
        <li>
          <Link name="Admin">Admin</Link>
        </li>
      )}
      <li>
        {admin ? (
          <button type="button" onClick={logout}>
            Logout
          </button>
        ) : (
          <button type="button" onClick={login}>
            Login
          </button>
        )}
      </li>
    </ul>
  </nav>
);
