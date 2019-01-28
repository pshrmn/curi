import React from "react";
import { Link } from "@curi/react-dom";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import { color, screen } from "../../constants/styles";

const sectionCSS = css`
  margin-top: 15px;

  .aside {
    padding: 5px 10px;
    border-left: 2px solid $border-green;
    background: ${color.lightGreen};
    margin-top: 15px;

    .inline-code {
      background: ${color.green} !important;
    }
  }

  .header-link {
    text-decoration: none;

    &::after {
      content: "#";
      color: ${color.darkGray};
      margin-left: 5px;
      display: none;
    }

    &:hover::after {
      display: inline-block;
    }
  }

  @media only screen and (min-width: ${screen.medium}) {
    max-width: 800px;

    .displaced-header {
      &:before {
        content: "";
        display: block;
        margin-top: -50px;
        height: 50px;
        visibility: hidden;
      }
    }
  }
`;

export const HashSection = ({
  title,
  id,
  children,
  tag: Tag = "h2",
  wrapper: Wrapper = "div",
  className = "section"
}) => (
  <Wrapper css={sectionCSS} className={className} id={id}>
    <Tag className="displaced-header">
      <Link hash={id} forward={{ className: "header-link" }}>
        {title}
      </Link>
    </Tag>
    {children}
  </Wrapper>
);
