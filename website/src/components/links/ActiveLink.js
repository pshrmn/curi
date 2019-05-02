import React from "react";
import { useActive, Link } from "@curi/react-dom";

const ActiveLink = React.forwardRef(
  ({ name, params, className = "", ...rest }, ref) => {
    const active = useActive({ name, params, partial: true });
    return (
      <Link
        ref={ref}
        name={name}
        params={params}
        {...rest}
        className={`${className} ${active ? "active" : ""}`}
      />
    );
  }
);

export default ActiveLink;
