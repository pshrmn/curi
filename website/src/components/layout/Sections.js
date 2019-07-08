import React from "react";
import { Link } from "@curi/react-dom";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";

import { color, screen } from "../../constants/styles";

const sectionCSS = css`
  margin-top: 15px;

  p {
    margin: 0 0 25px;
    font-size: 0.8em;
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

const StyledSection = styled("section")`
  ${sectionCSS}
`;

const StyledAside = styled("aside")`
  ${sectionCSS}

  padding: 5px 10px;
  border-left: 2px solid $border-green;
  background: ${color.lightGreen};
  margin-top: 15px;

  .inline-code {
    background: ${color.green} !important;
  }
`;

const tagCSS = css`
  .header-link {
    text-decoration: none;

    &::after {
      content: "#";
      color: ${color.darkGray};
      margin-left: 5px;
    }
  }

  @media only screen and (min-width: ${screen.medium}) {
    margin-top: -50px;
    padding-top: 50px;

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

export function PlainSection({
  children,
  wrapper: Wrapper = "section",
  className = "section"
}) {
  return (
    <Wrapper css={sectionCSS} className={className}>
      {children}
    </Wrapper>
  );
}

function ArticleSection({
  meta: { title, hash },
  children,
  tag: Tag,
  wrapper: Wrapper
}) {
  return (
    <Wrapper>
      <Tag id={hash} css={tagCSS}>
        <Link hash={hash} className="header-link">
          {title}
        </Link>
      </Tag>
      {children}
    </Wrapper>
  );
}

export function HashSection(props) {
  return <ArticleSection {...props} wrapper={StyledSection} />;
}

export function HashAside(props) {
  return <ArticleSection {...props} wrapper={StyledAside} />;
}
