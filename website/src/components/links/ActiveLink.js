import React from "react";
import { Active, Link } from "@curi/react-dom";

const ActiveLink = React.forwardRef(
  ({ name, params, children, className = "", ...rest }, ref) => (
    <Active name={name} params={params} partial={true}>
      {active => (
        <Link
          {...rest}
          ref={ref}
          name={name}
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
