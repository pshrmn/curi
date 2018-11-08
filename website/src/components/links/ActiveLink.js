import React from "react";
import { Active, Link } from "@curi/react-dom";

const ActiveLink = React.forwardRef(
  ({ name, params, forward, ...rest }, ref) => (
    <Active name={name} params={params} partial={true}>
      {active => (
        <Link
          ref={ref}
          name={name}
          params={params}
          {...rest}
          forward={{
            ...forward,
            className: [
              (forward && forward.className) || "",
              active ? "active" : ""
            ].join(" ")
          }}
        />
      )}
    </Active>
  )
);

export default ActiveLink;
