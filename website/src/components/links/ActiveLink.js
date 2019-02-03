import React from "react";
import { useActive, Link } from "@curi/react-dom";

const ActiveLink = React.forwardRef(
  ({ name, params, forward, ...rest }, ref) => {
    const active = useActive({ name, params, partial: true });
    return (
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
    );
  }
);

export default ActiveLink;
