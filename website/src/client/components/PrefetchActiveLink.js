import React from "react";
import { Prefetch } from "@curi/react";

import ActiveLink from "./ActiveLink";

const PrefetchActiveLink = ({ to, params, children, className = "" }) => (
  <Prefetch match={{ name: to, params }}>
    {ref => (
      <ActiveLink ref={ref} to={to} params={params} className={className}>
        {children}
      </ActiveLink>
    )}
  </Prefetch>
);

export default PrefetchActiveLink;
