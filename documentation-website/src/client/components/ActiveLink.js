import React from "react";
import { Active, Link } from "@curi/react";

const ActiveLink = ({ to, params, children, className = "" }) => (
  <Active name={to} params={params} partial={true}>
    {active => (
      <Link
        to={to}
        params={params}
        className={[className, active ? "active" : ""].join(" ")}
      >
        {children}
      </Link>
    )}
  </Active>
);

export default ActiveLink;
