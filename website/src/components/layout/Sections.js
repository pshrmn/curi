import React from "react";
import { Link } from "@curi/react-dom";

import "../../scss/section.scss";

export const Section = ({
  title,
  id,
  children,
  tag: Tag = "h2",
  wrapper: Wrapper = "div",
  className = "section"
}) => (
  <Wrapper className={className} id={id}>
    <Tag className="displaced-header">
      <Link hash={id} forward={{ className: "header-link" }}>
        {title}
      </Link>
    </Tag>
    {children}
  </Wrapper>
);
