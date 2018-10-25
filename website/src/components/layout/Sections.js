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
      {title}
      <Link className="header-link" hash={id}>
        #
      </Link>
    </Tag>
    {children}
  </Wrapper>
);
