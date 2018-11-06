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
    <Tag>
      <Link hash={id} forward={{ className: "header-link" }}>
        {title} <span className="hash">#</span>
      </Link>
    </Tag>
    {children}
  </Wrapper>
);
