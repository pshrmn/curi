import React from "react";
import { Active, Link } from "@curi/react-dom";

const ActiveLink = React.forwardRef(
  ({ to, params, children, className = "" }, ref) => (
    <Active name={to} params={params} partial={true}>
      {active => (
        <Link
          ref={ref}
          to={to}
          params={params}
          className={[className, active ? "active" : ""].join(" ")}
        >
          {children}
        </Link>
      )}
    </Active>
  )
);

export default ActiveLink;
