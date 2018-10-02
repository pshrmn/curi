import React from "react";
import { Link } from "@curi/react-dom";

import "../../scss/section.scss";

const Sectional = ({
  title,
  id,
  children,
  tag: Tag,
  wrapper: Wrapper = "div",
  type = "section"
}) => (
  <Wrapper className={type} id={id}>
    <Tag>
      {title}
      <Link className="header-link" hash={id}>
        #
      </Link>
    </Tag>
    {children}
  </Wrapper>
);

export const Section = ({ tag = "h2", ...rest }) => (
  <Sectional type="section" tag={tag} {...rest} />
);

export const Subsection = ({ tag = "h3", ...rest }) => (
  <Sectional type="subsection" tag={tag} {...rest} />
);
