import React from "react";
import { Link } from "@curi/react-dom";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import { color, screen } from "../../constants/styles";

const allSectionCSS = css`
  margin-top: 15px;

  p {
    margin: 0 0 25px;
    font-size: 0.8em;
  }

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

    p {
      font-size: 1em;
    }

    &.centered {
      margin: 0 auto;
    }
  }
`;

const sectionCSS = css`
  ${allSectionCSS}
`;

export function PlainSection({
  children,
  wrapper: Wrapper = "div",
  className = "section"
}) {
  return (
    <Wrapper css={sectionCSS} className={className}>
      {children}
    </Wrapper>
  );
}

const hashSectionCSS = css`
  ${allSectionCSS}

  .header-link {
    text-decoration: none;

    &::after {
      content: "#";
      color: ${color.darkGray};
      margin-left: 5px;
    }
  }

  @media only screen and (min-width: ${screen.medium}) {
    &:before {
      content: "";
      display: block;
      margin-top: -50px;
      height: 50px;
      visibility: hidden;
    }

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
  }
`;

export function HashSection({
  meta: { title, hash },
  children,
  tag: Tag,
  wrapper: Wrapper = "div",
  className = "section"
}) {
  return (
    <Wrapper css={hashSectionCSS} className={className} id={hash}>
      <Tag>
        <Link hash={hash} className="header-link">
          {title}
        </Link>
      </Tag>
      {children}
    </Wrapper>
  );
}
