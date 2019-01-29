import React from "react";
import { Link } from "@curi/react-dom";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import { color, screen } from "../../constants/styles";

const allSectionCSS = css`
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

  @media only screen and (min-width: ${screen.medium}) {
    max-width: ${screen.medium};
  }
`;

const sectionCSS = css`
  ${allSectionCSS}
`;

export function Plain({
  children,
  wrapper: Wrapper = "div",
  className = "section"
}) {
  return (
    <Wrapper css={sectionCSS} className={className} id={id}>
      {children}
    </Wrapper>
  );
}

const hashSectionCSS = css`
  ${allSectionCSS}

  p {
    margin: 0 0 25px;
    font-size: 0.8em;
  }

  .header-link {
    text-decoration: none;

    &::after {
      content: "#";
      color: ${color.darkGray};
      margin-left: 5px;
    }
  }

  @media only screen and (min-width: ${screen.medium}) {
    p {
      font-size: 1em;
    }

    .header-link {
      &::after {
        display: none;
      }

      &:hover::after {
        display: inline-block;
      }
    }

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

export function HashSection({
  title,
  id,
  children,
  tag: Tag = "h2",
  wrapper: Wrapper = "div",
  className = "section"
}) {
  return (
    <Wrapper css={hashSectionCSS} className={className} id={id}>
      <Tag className="displaced-header">
        <Link hash={id} forward={{ className: "header-link" }}>
          {title}
        </Link>
      </Tag>
      {children}
    </Wrapper>
  );
}
