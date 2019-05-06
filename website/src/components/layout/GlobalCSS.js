import React from "react";
/** @jsx jsx */
import { css, jsx, Global } from "@emotion/core";

import { color, screen, font } from "../../constants/styles";

const globalCSS = css`
  body {
    font-family: ${font.serif};
    font-weight: 300;
    font-size: 24px;
    line-height: 36px;
    margin: 0;
    box-sizing: border-box;
  }

  @media only screen and (min-width: ${screen.medium}) {
    body {
      font-size: 20px;
    }
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: normal;
    margin: 5px 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    margin: 5px 0;
    word-break: break-word;
  }

  h1 {
    font-size: 1.75em;
    line-height: 1.5em;
  }

  h2 {
    font-size: 1.5em;
    line-height: 1.2em;
  }

  h3 {
    font-size: 1.35em;
    line-height: 1.1em;
  }

  h4 {
    font-size: 1.2em;
    line-height: 1.1em;
  }

  h5 {
    font-size: 1.1em;
    line-height: 1.1em;
  }

  h6 {
    font-size: 1em;
    line-height: 1.1em;
  }

  table,
  th,
  td {
    border: 1px solid ${color.borderGray};
    border-collapse: collapse;
  }

  table {
    margin-bottom: 10px;
  }

  th {
    text-align: left;
  }

  th,
  td {
    padding: 10px;
  }

  /* prismjs overrides */
  pre[class*="language-"] {
    margin: 0;
    background: ${color.purple};
  }

  :not(pre) > code[class*="language-"] {
    white-space: nowrap;
  }
`;

export default function GlobalCSS() {
  return <Global styles={globalCSS} />;
}
