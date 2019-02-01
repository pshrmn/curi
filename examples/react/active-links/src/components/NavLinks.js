import React from "react";
import { Active, Link } from "@curi/react-dom";

const ActiveLink = ({ name, params, partial, ...rest }) => (
  <Active name={name} params={params} partial={partial}>
    {active => (
      <Link
        name={name}
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
        <ActiveLink name="Home">Home</ActiveLink>
      </li>
      <li>
        <ActiveLink name="Contact" partial={true}>
          Contact
        </ActiveLink>
        <ul>
          <li>
            <ActiveLink name="Method" params={{ method: "phone" }}>
              By Phone
            </ActiveLink>
          </li>
          <li>
            <ActiveLink name="Method" params={{ method: "email" }}>
              By Email
            </ActiveLink>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
);

export default NavLinks;
