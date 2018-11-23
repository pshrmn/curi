import React from "react";
import { Active, Link } from "@curi/react-dom";

const ActiveLink = ({ to, params, partial, ...rest }) => (
  <Active name={to} params={params} partial={partial}>
    {active => (
      <Link
        to={to}
        params={params}
        {...rest}
        className={active ? "active" : ""}
      />
    )}
  </Active>
);

const NavLinks = () => (
  <nav>
    <ul>
      <li>
        <ActiveLink to="Home">Home</ActiveLink>
      </li>
      <li>
        <ActiveLink to="Contact" partial={true}>
          Contact
        </ActiveLink>
        <ul>
          <li>
            <ActiveLink to="Method" params={{ method: "phone" }}>
              By Phone
            </ActiveLink>
          </li>
          <li>
            <ActiveLink to="Method" params={{ method: "email" }}>
              By Email
            </ActiveLink>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
);

export default NavLinks;
